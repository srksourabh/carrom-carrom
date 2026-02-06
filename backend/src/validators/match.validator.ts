import { z } from 'zod';

export const createMatchSchema = z.object({
  opponentId: z.string().uuid('Invalid opponent ID'),
  player1Score: z.number().int().min(0).max(100),
  player2Score: z.number().int().min(0).max(100),
  matchType: z.enum(['SINGLES', 'DOUBLES', 'PRACTICE']).default('SINGLES'),
  venue: z.string().max(255).optional(),
  district: z.string().max(100).optional(),
  playedAt: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  notes: z.string().max(500).optional(),
});

export const listMatchesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  userId: z.string().uuid().optional(),
});
