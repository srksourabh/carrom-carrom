import { z } from 'zod';

export const listRankingsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  district: z.string().optional(),
});

export const searchRankingsSchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});
