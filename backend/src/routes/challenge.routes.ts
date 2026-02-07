import { Router } from 'express';
import * as challengeController from '../controllers/challenge.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createChallengeSchema, respondChallengeSchema } from '../validators/challenge.validator';

const router = Router();

router.use(authenticate);

router.post('/', validate(createChallengeSchema), challengeController.createChallenge);
router.get('/', challengeController.listChallenges);
router.get('/:id', challengeController.getChallenge);
router.patch('/:id/respond', validate(respondChallengeSchema), challengeController.respondToChallenge);
router.patch('/:id/cancel', challengeController.cancelChallenge);

export { router as challengeRoutes };
