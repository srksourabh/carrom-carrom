import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1).max(2000),
  imageUrl: z.string().url().optional(),
});

export const createCommentSchema = z.object({
  content: z.string().min(1).max(500),
});
