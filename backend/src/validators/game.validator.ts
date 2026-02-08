import { z } from 'zod';

export const createGameSchema = z.object({
  targetScore: z.number().int().min(5).max(50).optional(),
});

export const makeMoveSchema = z.object({
  strikerX: z.number().min(0).max(700),
  angle: z.number().min(0).max(360),
  power: z.number().min(1).max(10),
});
