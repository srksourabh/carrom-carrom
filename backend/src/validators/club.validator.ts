import { z } from 'zod';

export const listClubsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  district: z.string().optional(),
  q: z.string().optional(),
});

export const createClubSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
  logoUrl: z.string().url().optional(),
  district: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  foundedYear: z.number().int().min(1900).max(2030).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
});

export const updateClubSchema = createClubSchema.partial();
