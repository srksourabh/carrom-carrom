import { Router } from 'express';
import * as rankingController from '../controllers/ranking.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', rankingController.getLeaderboard);
router.get('/search', rankingController.searchRankings);
router.get('/me', rankingController.getMyRank);

export { router as rankingRoutes };
