import { prisma } from '../config/database';
import { cacheGet, cacheSet } from '../config/redis';

const CACHE_TTL = 300; // 5 minutes

export async function getLeaderboard(page: number, limit: number, district?: string) {
  const cacheKey = `rankings:${district || 'all'}:${page}:${limit}`;

  const cached = await cacheGet(cacheKey);
  if (cached) return JSON.parse(cached);

  const where: any = { isActive: true };
  if (district) where.district = district;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
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
        draws: true,
        district: true,
        city: true,
        club: { select: { id: true, name: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const ranked = users.map((u, i) => ({
    ...u,
    rank: (page - 1) * limit + i + 1,
  }));

  const result = { data: ranked, total, page, limit, totalPages: Math.ceil(total / limit) };

  await cacheSet(cacheKey, CACHE_TTL, JSON.stringify(result));

  return result;
}

export async function searchRankings(query: string, limit: number) {
  const users = await prisma.user.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { displayName: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { eloRating: 'desc' },
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
      club: { select: { id: true, name: true } },
    },
  });
  return users;
}

export async function getMyRank(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { eloRating: true },
  });

  if (!user) return null;

  const rank = await prisma.user.count({
    where: {
      isActive: true,
      eloRating: { gt: user.eloRating },
    },
  }) + 1;

  return { rank, eloRating: user.eloRating };
}
