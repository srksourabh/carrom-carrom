import { Router } from 'express';
import * as chatController from '../controllers/chat.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { startConversationSchema, sendMessageSchema } from '../validators/chat.validator';

const router = Router();

router.use(authenticate);

router.post('/conversations', validate(startConversationSchema), chatController.startConversation);
router.get('/conversations', chatController.getConversations);
router.get('/conversations/:id/messages', chatController.getMessages);
router.post('/conversations/:id/messages', validate(sendMessageSchema), chatController.sendMessage);
router.get('/with/:userId', chatController.getOrCreateConversation);
router.get('/unread', chatController.getUnreadCount);

export { router as chatRoutes };
