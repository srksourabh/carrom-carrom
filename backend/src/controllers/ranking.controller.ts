import { Request, Response, NextFunction } from 'express';
import * as rankingService from '../services/ranking.service';
import { success } from '../utils/apiResponse';

export async function getLeaderboard(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, district } = req.query as any;
    const result = await rankingService.getLeaderboard(
      parseInt(page) || 1,
      parseInt(limit) || 50,
      district
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function searchRankings(req: Request, res: Response, next: NextFunction) {
  try {
    const { q, limit } = req.query as any;
    const result = await rankingService.searchRankings(q, parseInt(limit) || 10);
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getMyRank(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await rankingService.getMyRank(req.user!.userId);
    success(res, result);
  } catch (err) {
    next(err);
  }
}
