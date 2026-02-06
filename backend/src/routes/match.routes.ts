import { Router } from 'express';
import * as matchController from '../controllers/match.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createMatchSchema } from '../validators/match.validator';

const router = Router();

router.use(authenticate);

router.post('/', validate(createMatchSchema), matchController.createMatch);
router.get('/', matchController.listMatches);
router.get('/:id', matchController.getMatch);
router.patch('/:id/confirm', matchController.confirmMatch);
router.patch('/:id/dispute', matchController.disputeMatch);

export { router as matchRoutes };
