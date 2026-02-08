import { Request, Response, NextFunction } from 'express';
import * as gameService from '../services/game.service';
import { success } from '../utils/apiResponse';

export async function createGame(req: Request, res: Response, next: NextFunction) {
  try {
    const game = await gameService.createGame(req.user!.userId, req.body.targetScore);
    success(res, game, 'Game created', 201);
  } catch (err) {
    next(err);
  }
}

export async function getOpenGames(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await gameService.getOpenGames(
      req.user!.userId,
      parseInt(page) || 1,
      parseInt(limit) || 20
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getMyGames(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, status } = req.query as any;
    const result = await gameService.getMyGames(
      req.user!.userId,
      parseInt(page) || 1,
      parseInt(limit) || 20,
      status
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function joinGame(req: Request, res: Response, next: NextFunction) {
  try {
    const game = await gameService.joinGame(String(req.params.id), req.user!.userId);
    success(res, game, 'Joined game');
  } catch (err) {
    next(err);
  }
}

export async function getGame(req: Request, res: Response, next: NextFunction) {
  try {
    const game = await gameService.getGame(String(req.params.id), req.user!.userId);
    success(res, game);
  } catch (err) {
    next(err);
  }
}

export async function makeMove(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await gameService.makeMove(
      String(req.params.id),
      req.user!.userId,
      req.body.strikerX,
      req.body.angle,
      req.body.power
    );
    success(res, result, 'Move executed');
  } catch (err) {
    next(err);
  }
}

export async function abandonGame(req: Request, res: Response, next: NextFunction) {
  try {
    const game = await gameService.abandonGame(String(req.params.id), req.user!.userId);
    success(res, game, 'Game abandoned');
  } catch (err) {
    next(err);
  }
}

export async function getGameMoves(req: Request, res: Response, next: NextFunction) {
  try {
    const moves = await gameService.getGameMoves(String(req.params.id), req.user!.userId);
    success(res, moves);
  } catch (err) {
    next(err);
  }
}
