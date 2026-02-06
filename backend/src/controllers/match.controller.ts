import { Request, Response, NextFunction } from 'express';
import * as matchService from '../services/match.service';
import { success } from '../utils/apiResponse';

export async function createMatch(req: Request, res: Response, next: NextFunction) {
  try {
    const match = await matchService.createMatch(req.user!.userId, req.body);
    success(res, match, 'Match recorded', 201);
  } catch (err) {
    next(err);
  }
}

export async function confirmMatch(req: Request, res: Response, next: NextFunction) {
  try {
    const match = await matchService.confirmMatch(String(req.params.id), req.user!.userId);
    success(res, match, 'Match confirmed');
  } catch (err) {
    next(err);
  }
}

export async function disputeMatch(req: Request, res: Response, next: NextFunction) {
  try {
    const match = await matchService.disputeMatch(String(req.params.id), req.user!.userId);
    success(res, match, 'Match disputed');
  } catch (err) {
    next(err);
  }
}

export async function getMatch(req: Request, res: Response, next: NextFunction) {
  try {
    const match = await matchService.getMatch(String(req.params.id));
    success(res, match);
  } catch (err) {
    next(err);
  }
}

export async function listMatches(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, userId } = req.query as any;
    const result = await matchService.listMatches(
      req.user!.userId,
      parseInt(page) || 1,
      parseInt(limit) || 20,
      userId
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}
