import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

interface CreateChallengeData {
  receiverId: string;
  message?: string;
  proposedDate?: string;
  proposedVenue?: string;
}

export async function createChallenge(senderId: string, data: CreateChallengeData) {
  if (senderId === data.receiverId) {
    throw new AppError(400, 'Cannot challenge yourself');
  }

  const receiver = await prisma.user.findUnique({ where: { id: data.receiverId } });
  if (!receiver) throw new AppError(404, 'Receiver not found');

  // Check for existing pending challenge between these users
  const existing = await prisma.challenge.findFirst({
    where: {
      senderId,
      receiverId: data.receiverId,
      status: 'PENDING',
    },
  });
  if (existing) throw new AppError(400, 'You already have a pending challenge with this player');

  const challenge = await prisma.challenge.create({
    data: {
      senderId,
      receiverId: data.receiverId,
      message: data.message,
      proposedDate: data.proposedDate ? new Date(data.proposedDate) : undefined,
      proposedVenue: data.proposedVenue,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
    include: {
      sender: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true, district: true } },
      receiver: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true, district: true } },
    },
  });

  return challenge;
}

export async function respondToChallenge(challengeId: string, userId: string, action: 'accept' | 'decline') {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    include: {
      sender: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
      receiver: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
    },
  });

  if (!challenge) throw new AppError(404, 'Challenge not found');
  if (challenge.receiverId !== userId) throw new AppError(403, 'Only the receiver can respond to this challenge');
  if (challenge.status !== 'PENDING') throw new AppError(400, 'Challenge is no longer pending');
  if (challenge.expiresAt < new Date()) throw new AppError(400, 'Challenge has expired');

  const status = action === 'accept' ? 'ACCEPTED' : 'DECLINED';

  const updated = await prisma.challenge.update({
    where: { id: challengeId },
    data: { status },
    include: {
      sender: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
      receiver: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
    },
  });

  return updated;
}

export async function cancelChallenge(challengeId: string, userId: string) {
  const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } });
  if (!challenge) throw new AppError(404, 'Challenge not found');
  if (challenge.senderId !== userId) throw new AppError(403, 'Only the sender can cancel this challenge');
  if (challenge.status !== 'PENDING') throw new AppError(400, 'Only pending challenges can be cancelled');

  // We reuse DECLINED status for cancellation (sender-initiated)
  return prisma.challenge.update({
    where: { id: challengeId },
    data: { status: 'DECLINED' },
    include: {
      sender: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
      receiver: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
    },
  });
}

export async function getChallenge(challengeId: string, userId: string) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    include: {
      sender: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true, district: true } },
      receiver: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true, district: true } },
    },
  });

  if (!challenge) throw new AppError(404, 'Challenge not found');
  if (challenge.senderId !== userId && challenge.receiverId !== userId) {
    throw new AppError(403, 'Not authorized to view this challenge');
  }

  return challenge;
}

export async function listChallenges(
  userId: string,
  page: number,
  limit: number,
  status?: string,
  type: string = 'all'
) {
  const where: any = {};

  if (type === 'sent') {
    where.senderId = userId;
  } else if (type === 'received') {
    where.receiverId = userId;
  } else {
    where.OR = [{ senderId: userId }, { receiverId: userId }];
  }

  if (status) {
    where.status = status;
  }

  const [challenges, total] = await Promise.all([
    prisma.challenge.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        sender: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
        receiver: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
      },
    }),
    prisma.challenge.count({ where }),
  ]);

  return { challenges, total, page, limit };
}
