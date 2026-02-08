import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export async function createLiveStream(
  hostId: string,
  data: { title: string; description?: string; streamUrl: string; thumbnailUrl?: string }
) {
  // Only one active stream per user
  const existing = await prisma.liveStream.findFirst({
    where: { hostId, isLive: true },
  });
  if (existing) throw new AppError(400, 'You already have an active stream');

  return prisma.liveStream.create({
    data: {
      hostId,
      title: data.title,
      description: data.description,
      streamUrl: data.streamUrl,
      thumbnailUrl: data.thumbnailUrl,
      isLive: true,
      startedAt: new Date(),
    },
    include: {
      host: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
    },
  });
}

export async function getLiveStreams(page: number, limit: number, liveOnly: boolean) {
  const where = liveOnly ? { isLive: true } : {};

  const [streams, total] = await Promise.all([
    prisma.liveStream.findMany({
      where,
      orderBy: [{ isLive: 'desc' }, { viewerCount: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
      include: {
        host: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
      },
    }),
    prisma.liveStream.count({ where }),
  ]);

  return { streams, total, page, limit };
}

export async function getLiveStream(id: string) {
  const stream = await prisma.liveStream.findUnique({
    where: { id },
    include: {
      host: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
    },
  });
  if (!stream) throw new AppError(404, 'Stream not found');
  return stream;
}

export async function joinStream(id: string) {
  const stream = await prisma.liveStream.findUnique({ where: { id } });
  if (!stream) throw new AppError(404, 'Stream not found');
  if (!stream.isLive) throw new AppError(400, 'Stream is not live');

  return prisma.liveStream.update({
    where: { id },
    data: { viewerCount: { increment: 1 } },
    include: {
      host: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
    },
  });
}

export async function leaveStream(id: string) {
  const stream = await prisma.liveStream.findUnique({ where: { id } });
  if (!stream) throw new AppError(404, 'Stream not found');

  return prisma.liveStream.update({
    where: { id },
    data: { viewerCount: { decrement: stream.viewerCount > 0 ? 1 : 0 } },
  });
}

export async function endStream(id: string, hostId: string) {
  const stream = await prisma.liveStream.findUnique({ where: { id } });
  if (!stream) throw new AppError(404, 'Stream not found');
  if (stream.hostId !== hostId) throw new AppError(403, 'Only the host can end the stream');
  if (!stream.isLive) throw new AppError(400, 'Stream is already ended');

  return prisma.liveStream.update({
    where: { id },
    data: { isLive: false, endedAt: new Date(), viewerCount: 0 },
    include: {
      host: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
    },
  });
}

export async function updateLiveStream(
  id: string,
  hostId: string,
  data: { title?: string; description?: string; thumbnailUrl?: string }
) {
  const stream = await prisma.liveStream.findUnique({ where: { id } });
  if (!stream) throw new AppError(404, 'Stream not found');
  if (stream.hostId !== hostId) throw new AppError(403, 'Only the host can update the stream');

  return prisma.liveStream.update({
    where: { id },
    data,
    include: {
      host: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
    },
  });
}
