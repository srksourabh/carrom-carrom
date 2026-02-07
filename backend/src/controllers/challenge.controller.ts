import { Request, Response, NextFunction } from 'express';
import * as challengeService from '../services/challenge.service';
import { success } from '../utils/apiResponse';

export async function createChallenge(req: Request, res: Response, next: NextFunction) {
  try {
    const challenge = await challengeService.createChallenge(req.user!.userId, req.body);
    success(res, challenge, 'Challenge sent', 201);
  } catch (err) {
    next(err);
  }
}

export async function respondToChallenge(req: Request, res: Response, next: NextFunction) {
  try {
    const challenge = await challengeService.respondToChallenge(
      String(req.params.id),
      req.user!.userId,
      req.body.action
    );
    success(res, challenge, `Challenge ${req.body.action}ed`);
  } catch (err) {
    next(err);
  }
}

export async function cancelChallenge(req: Request, res: Response, next: NextFunction) {
  try {
    const challenge = await challengeService.cancelChallenge(String(req.params.id), req.user!.userId);
    success(res, challenge, 'Challenge cancelled');
  } catch (err) {
    next(err);
  }
}

export async function getChallenge(req: Request, res: Response, next: NextFunction) {
  try {
    const challenge = await challengeService.getChallenge(String(req.params.id), req.user!.userId);
    success(res, challenge);
  } catch (err) {
    next(err);
  }
}

export async function listChallenges(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, status, type } = req.query as any;
    const result = await challengeService.listChallenges(
      req.user!.userId,
      parseInt(page) || 1,
      parseInt(limit) || 20,
      status,
      type || 'all'
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}
