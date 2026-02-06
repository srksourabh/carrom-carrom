import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(150).optional(),
  displayName: z.string().max(50).optional(),
  bio: z.string().max(500).optional(),
  district: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  avatarUrl: z.string().url().optional(),
});

export const searchUsersSchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});
