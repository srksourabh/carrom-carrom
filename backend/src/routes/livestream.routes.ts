import { Router } from 'express';
import * as livestreamController from '../controllers/livestream.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createLiveStreamSchema, updateLiveStreamSchema } from '../validators/livestream.validator';

const router = Router();

router.use(authenticate);

router.post('/', validate(createLiveStreamSchema), livestreamController.createLiveStream);
router.get('/', livestreamController.getLiveStreams);
router.get('/:id', livestreamController.getLiveStream);
router.patch('/:id', validate(updateLiveStreamSchema), livestreamController.updateLiveStream);
router.post('/:id/join', livestreamController.joinStream);
router.post('/:id/leave', livestreamController.leaveStream);
router.post('/:id/end', livestreamController.endStream);

export { router as livestreamRoutes };
