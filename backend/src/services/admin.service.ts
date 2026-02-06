import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

interface CreateTournamentData {
  name: string;
  description?: string;
  format: 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'SWISS';
  startDate: string;
  endDate?: string;
  venue?: string;
  district?: string;
  city?: string;
  maxParticipants?: number;
  entryFee?: number;
  prizePool?: string;
  rules?: string;
}

export async function createTournament(data: CreateTournamentData) {
  return prisma.tournament.create({
    data: {
      name: data.name,
      description: data.description,
      format: data.format,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      venue: data.venue,
      district: data.district,
      city: data.city,
      maxParticipants: data.maxParticipants,
      entryFee: data.entryFee,
      prizePool: data.prizePool,
      rules: data.rules,
      status: 'UPCOMING',
    },
  });
}

export async function enterTournamentResults(tournamentId: string, results: { userId: string; placement: number }[]) {
  const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
  if (!tournament) throw new AppError(404, 'Tournament not found');

  await prisma.$transaction(async (tx) => {
    for (const result of results) {
      await tx.tournamentParticipant.upsert({
        where: {
          tournamentId_userId: {
            tournamentId,
            userId: result.userId,
          },
        },
        update: { placement: result.placement },
        create: {
          tournamentId,
          userId: result.userId,
          placement: result.placement,
        },
      });
    }

    await tx.tournament.update({
      where: { id: tournamentId },
      data: { status: 'COMPLETED' },
    });
  });

  return { message: 'Tournament results recorded' };
}

export async function listUsers(page: number, limit: number) {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        eloRating: true,
        totalMatches: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  return { users, total, page, limit };
}

export async function updateUserRole(userId: string, role: 'PLAYER' | 'CLUB_ADMIN' | 'TOURNAMENT_ADMIN' | 'SUPER_ADMIN') {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, email: true, name: true, role: true },
  });
}
