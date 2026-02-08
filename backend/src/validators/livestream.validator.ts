import { z } from 'zod';

export const createLiveStreamSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  streamUrl: z.string().url('Invalid stream URL'),
  thumbnailUrl: z.string().url('Invalid thumbnail URL').optional(),
});

export const updateLiveStreamSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  thumbnailUrl: z.string().url('Invalid thumbnail URL').optional(),
});
