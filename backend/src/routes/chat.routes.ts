import { Router, Request, Response } from 'express';
import * as chatController from '../controllers/chat.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { startConversationSchema, sendMessageSchema } from '../validators/chat.validator';
import * as chatService from '../services/chat.service';
import { success } from '../utils/apiResponse';

const router = Router();

// Unauthenticated debug ping
router.get('/ping', (_req, res) => res.json({ pong: true, v: 5, t: Date.now() }));

router.use(authenticate);

// NO validation, directly call service
router.post('/conversations', async (req: Request, res: Response) => {
  try {
    const { participantId, message } = req.body;
    if (!participantId || !message) {
      return res.status(400).json({ success: false, message: 'participantId and message required' });
    }
    const result = await chatService.startConversation(
      req.user!.userId,
      participantId,
      message
    );
    success(res, result, 'Conversation started', 201);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Unknown error',
      code: err.code,
      meta: err.meta,
    });
  }
});

router.get('/conversations', chatController.getConversations);
router.get('/conversations/:id/messages', chatController.getMessages);
router.post('/conversations/:id/messages', validate(sendMessageSchema), chatController.sendMessage);
router.get('/with/:userId', chatController.getOrCreateConversation);
router.get('/unread', chatController.getUnreadCount);

export { router as chatRoutes };
