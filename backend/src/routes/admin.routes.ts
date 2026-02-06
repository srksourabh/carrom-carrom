import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth';
import { requireAdmin, requireSuperAdmin } from '../middleware/admin';
import { validate } from '../middleware/validate';
import { createTournamentSchema, tournamentResultSchema, updateUserRoleSchema } from '../validators/admin.validator';

const router = Router();

router.use(authenticate);
router.use(requireAdmin);

router.post('/tournaments', validate(createTournamentSchema), adminController.createTournament);
router.post('/tournaments/:id/results', validate(tournamentResultSchema), adminController.enterTournamentResults);
router.get('/users', adminController.listUsers);
router.patch('/users/:id/role', requireSuperAdmin, validate(updateUserRoleSchema), adminController.updateUserRole);

export { router as adminRoutes };
