import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export async function listClubs(page: number, limit: number, district?: string, q?: string) {
  const where: any = { isActive: true };
  if (district) where.district = district;
  if (q) {
    where.name = { contains: q, mode: 'insensitive' };
  }

  const [clubs, total] = await Promise.all([
    prisma.club.findMany({
      where,
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: { select: { members: true, tournaments: true } },
      },
    }),
    prisma.club.count({ where }),
  ]);

  return { clubs, total, page, limit };
}

export async function getClub(clubId: string) {
  const club = await prisma.club.findUnique({
    where: { id: clubId },
    include: {
      _count: { select: { members: true, tournaments: true } },
    },
  });
  if (!club) throw new AppError(404, 'Club not found');
  return club;
}

export async function getClubMembers(clubId: string, page: number, limit: number) {
  const club = await prisma.club.findUnique({ where: { id: clubId } });
  if (!club) throw new AppError(404, 'Club not found');

  const [members, total] = await Promise.all([
    prisma.user.findMany({
      where: { clubId, isActive: true },
      orderBy: { eloRating: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        displayName: true,
        avatarUrl: true,
        eloRating: true,
        totalMatches: true,
        wins: true,
        losses: true,
        district: true,
        role: true,
      },
    }),
    prisma.user.count({ where: { clubId, isActive: true } }),
  ]);

  return { members, total, page, limit };
}

export async function joinClub(userId: string, clubId: string) {
  const club = await prisma.club.findUnique({ where: { id: clubId } });
  if (!club) throw new AppError(404, 'Club not found');
  if (!club.isActive) throw new AppError(400, 'Club is not active');

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, 'User not found');
  if (user.clubId === clubId) throw new AppError(400, 'Already a member of this club');
  if (user.clubId) throw new AppError(400, 'You must leave your current club first');

  return prisma.user.update({
    where: { id: userId },
    data: { clubId },
    select: {
      id: true,
      name: true,
      displayName: true,
      clubId: true,
      club: { select: { id: true, name: true } },
    },
  });
}

export async function leaveClub(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, 'User not found');
  if (!user.clubId) throw new AppError(400, 'You are not a member of any club');

  return prisma.user.update({
    where: { id: userId },
    data: { clubId: null },
    select: {
      id: true,
      name: true,
      displayName: true,
      clubId: true,
    },
  });
}

export async function getClubLeaderboard(clubId: string) {
  const club = await prisma.club.findUnique({ where: { id: clubId } });
  if (!club) throw new AppError(404, 'Club not found');

  return prisma.user.findMany({
    where: { clubId, isActive: true },
    orderBy: { eloRating: 'desc' },
    take: 50,
    select: {
      id: true,
      name: true,
      displayName: true,
      avatarUrl: true,
      eloRating: true,
      totalMatches: true,
      wins: true,
      losses: true,
      winStreak: true,
    },
  });
}
