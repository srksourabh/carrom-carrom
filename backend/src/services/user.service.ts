import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

const profileSelect = {
  id: true,
  email: true,
  name: true,
  displayName: true,
  avatarUrl: true,
  bio: true,
  role: true,
  eloRating: true,
  totalMatches: true,
  wins: true,
  losses: true,
  draws: true,
  winStreak: true,
  bestWinStreak: true,
  district: true,
  city: true,
  state: true,
  clubId: true,
  createdAt: true,
  club: {
    select: { id: true, name: true, logoUrl: true },
  },
};

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: profileSelect,
  });
  if (!user) throw new AppError(404, 'User not found');
  return user;
}

export async function updateProfile(userId: string, data: {
  name?: string;
  displayName?: string;
  bio?: string;
  district?: string;
  city?: string;
  phone?: string;
  avatarUrl?: string;
}) {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: profileSelect,
  });
  return user;
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: profileSelect,
  });
  if (!user) throw new AppError(404, 'User not found');
  return user;
}

export async function searchUsers(query: string, limit: number) {
  const users = await prisma.user.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { displayName: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: limit,
    select: {
      id: true,
      name: true,
      displayName: true,
      avatarUrl: true,
      eloRating: true,
      district: true,
      club: { select: { id: true, name: true } },
    },
  });
  return users;
}
