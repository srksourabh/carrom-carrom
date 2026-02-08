import { Router } from 'express';
import * as gameController from '../controllers/game.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createGameSchema, makeMoveSchema } from '../validators/game.validator';

const router = Router();

router.use(authenticate);

router.post('/', validate(createGameSchema), gameController.createGame);
router.get('/open', gameController.getOpenGames);
router.get('/my', gameController.getMyGames);
router.get('/:id', gameController.getGame);
router.post('/:id/join', gameController.joinGame);
router.post('/:id/move', validate(makeMoveSchema), gameController.makeMove);
router.post('/:id/abandon', gameController.abandonGame);
router.get('/:id/moves', gameController.getGameMoves);

export { router as gameRoutes };
