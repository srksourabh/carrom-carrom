import { z } from 'zod';

export const createTournamentSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().optional(),
  format: z.enum(['SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION', 'ROUND_ROBIN', 'SWISS']).default('SINGLE_ELIMINATION'),
  startDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  endDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  venue: z.string().max(255).optional(),
  district: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  maxParticipants: z.number().int().min(2).optional(),
  entryFee: z.number().min(0).optional(),
  prizePool: z.string().optional(),
  rules: z.string().optional(),
});

export const tournamentResultSchema = z.object({
  results: z.array(z.object({
    userId: z.string().uuid(),
    placement: z.number().int().min(1),
  })).min(1),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(['PLAYER', 'CLUB_ADMIN', 'TOURNAMENT_ADMIN', 'SUPER_ADMIN']),
});
