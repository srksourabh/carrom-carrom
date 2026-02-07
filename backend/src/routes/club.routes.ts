import { Router } from 'express';
import * as clubController from '../controllers/club.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', clubController.listClubs);
router.get('/:id', clubController.getClub);
router.get('/:id/members', clubController.getClubMembers);
router.get('/:id/leaderboard', clubController.getClubLeaderboard);
router.post('/:id/join', clubController.joinClub);
router.post('/leave', clubController.leaveClub);

export { router as clubRoutes };
