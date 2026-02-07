import { z } from 'zod';

export const sendMessageSchema = z.object({
  content: z.string().min(1).max(2000),
});

export const startConversationSchema = z.object({
  participantId: z.string().uuid('Invalid participant ID'),
  message: z.string().min(1).max(2000),
});
