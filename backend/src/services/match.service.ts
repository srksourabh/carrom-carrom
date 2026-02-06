import { prisma } from '../config/database';
import { cacheDel } from '../config/redis';
import { calculateElo } from '../utils/elo';
import { AppError } from '../middleware/errorHandler';

interface CreateMatchData {
  opponentId: string;
  player1Score: number;
  player2Score: number;
  matchType: 'SINGLES' | 'DOUBLES' | 'PRACTICE';
  venue?: string;
  district?: string;
  playedAt: string;
  notes?: string;
}

export async function createMatch(recordedById: string, data: CreateMatchData) {
  if (recordedById === data.opponentId) {
    throw new AppError(400, 'Cannot record a match against yourself');
  }

  const opponent = await prisma.user.findUnique({ where: { id: data.opponentId } });
  if (!opponent) throw new AppError(404, 'Opponent not found');

  const match = await prisma.match.create({
    data: {
      player1Id: recordedById,
      player2Id: data.opponentId,
      player1Score: data.player1Score,
      player2Score: data.player2Score,
      matchType: data.matchType,
      venue: data.venue,
      district: data.district,
      playedAt: new Date(data.playedAt),
      notes: data.notes,
      recordedById: recordedById,
      status: 'PENDING',
    },
    include: {
      player1: { select: { id: true, name: true, avatarUrl: true, eloRating: true } },
      player2: { select: { id: true, name: true, avatarUrl: true, eloRating: true } },
    },
  });

  return match;
}

export async function confirmMatch(matchId: string, userId: string) {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      player1: true,
      player2: true,
    },
  });

  if (!match) throw new AppError(404, 'Match not found');
  if (match.status !== 'PENDING') throw new AppError(400, 'Match is not pending confirmation');
  if (match.player2Id !== userId) throw new AppError(403, 'Only the opponent can confirm this match');

  const winnerId = match.player1Score > match.player2Score
    ? match.player1Id
    : match.player1Score < match.player2Score
      ? match.player2Id
      : null;

  const elo = calculateElo(
    match.player1.eloRating,
    match.player2.eloRating,
    match.player1Score,
    match.player2Score
  );

  const updateWinLoss = (isP1Winner: boolean | null, isP1: boolean) => {
    if (isP1Winner === null) return { draws: { increment: 1 }, winStreak: 0 };
    const won = isP1 ? isP1Winner : !isP1Winner;
    if (won) {
      return { wins: { increment: 1 }, winStreak: { increment: 1 } };
    }
    return { losses: { increment: 1 }, winStreak: 0 };
  };

  const p1Won = winnerId === match.player1Id ? true : winnerId === null ? null : false;

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.match.update({
      where: { id: matchId },
      data: {
        status: 'CONFIRMED',
        winnerId,
        eloChangeP1: elo.changeP1,
        eloChangeP2: elo.changeP2,
      },
      include: {
        player1: { select: { id: true, name: true, eloRating: true } },
        player2: { select: { id: true, name: true, eloRating: true } },
      },
    });

    const p1Stats = updateWinLoss(p1Won, true);
    await tx.user.update({
      where: { id: match.player1Id },
      data: {
        eloRating: elo.newRatingP1,
        totalMatches: { increment: 1 },
        ...p1Stats,
      },
    });

    // Update bestWinStreak for p1 if applicable
    if (p1Won === true) {
      const p1 = await tx.user.findUnique({ where: { id: match.player1Id }, select: { winStreak: true, bestWinStreak: true } });
      if (p1 && p1.winStreak > p1.bestWinStreak) {
        await tx.user.update({ where: { id: match.player1Id }, data: { bestWinStreak: p1.winStreak } });
      }
    }

    const p2Stats = updateWinLoss(p1Won, false);
    await tx.user.update({
      where: { id: match.player2Id },
      data: {
        eloRating: elo.newRatingP2,
        totalMatches: { increment: 1 },
        ...p2Stats,
      },
    });

    if (p1Won === false) {
      const p2 = await tx.user.findUnique({ where: { id: match.player2Id }, select: { winStreak: true, bestWinStreak: true } });
      if (p2 && p2.winStreak > p2.bestWinStreak) {
        await tx.user.update({ where: { id: match.player2Id }, data: { bestWinStreak: p2.winStreak } });
      }
    }

    return updated;
  });

  // Invalidate rankings cache
  await cacheDel('rankings:*');

  return result;
}

export async function disputeMatch(matchId: string, userId: string) {
  const match = await prisma.match.findUnique({ where: { id: matchId } });
  if (!match) throw new AppError(404, 'Match not found');
  if (match.status !== 'PENDING') throw new AppError(400, 'Match is not pending');
  if (match.player2Id !== userId) throw new AppError(403, 'Only the opponent can dispute this match');

  return prisma.match.update({
    where: { id: matchId },
    data: { status: 'DISPUTED' },
  });
}

export async function getMatch(matchId: string) {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      player1: { select: { id: true, name: true, avatarUrl: true, eloRating: true, district: true } },
      player2: { select: { id: true, name: true, avatarUrl: true, eloRating: true, district: true } },
    },
  });
  if (!match) throw new AppError(404, 'Match not found');
  return match;
}

export async function listMatches(userId: string, page: number, limit: number, filterUserId?: string) {
  const targetUserId = filterUserId || userId;
  const where = {
    OR: [
      { player1Id: targetUserId },
      { player2Id: targetUserId },
    ],
  };

  const [matches, total] = await Promise.all([
    prisma.match.findMany({
      where,
      orderBy: { playedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        player1: { select: { id: true, name: true, avatarUrl: true, eloRating: true } },
        player2: { select: { id: true, name: true, avatarUrl: true, eloRating: true } },
      },
    }),
    prisma.match.count({ where }),
  ]);

  return { matches, total, page, limit };
}
