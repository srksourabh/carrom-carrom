import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { matchRoutes } from './match.routes';
import { rankingRoutes } from './ranking.routes';
import { adminRoutes } from './admin.routes';
import { challengeRoutes } from './challenge.routes';
import { clubRoutes } from './club.routes';
import { feedRoutes } from './feed.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/matches', matchRoutes);
router.use('/rankings', rankingRoutes);
router.use('/admin', adminRoutes);
router.use('/challenges', challengeRoutes);
router.use('/clubs', clubRoutes);
router.use('/feed', feedRoutes);

export { router as apiRoutes };
