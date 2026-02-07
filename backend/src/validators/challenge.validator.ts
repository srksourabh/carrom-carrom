import { z } from 'zod';

export const createChallengeSchema = z.object({
  receiverId: z.string().uuid('Invalid receiver ID'),
  message: z.string().max(500).optional(),
  proposedDate: z.string().datetime().optional(),
  proposedVenue: z.string().max(255).optional(),
});

export const respondChallengeSchema = z.object({
  action: z.enum(['accept', 'decline']),
});

export const listChallengesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  status: z.enum(['PENDING', 'ACCEPTED', 'DECLINED', 'COMPLETED', 'EXPIRED']).optional(),
  type: z.enum(['sent', 'received', 'all']).default('all'),
});
