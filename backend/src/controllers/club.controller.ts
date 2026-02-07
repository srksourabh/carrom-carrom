import { Request, Response, NextFunction } from 'express';
import * as clubService from '../services/club.service';
import { success } from '../utils/apiResponse';

export async function listClubs(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, district, q } = req.query as any;
    const result = await clubService.listClubs(
      parseInt(page) || 1,
      parseInt(limit) || 20,
      district,
      q
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getClub(req: Request, res: Response, next: NextFunction) {
  try {
    const club = await clubService.getClub(String(req.params.id));
    success(res, club);
  } catch (err) {
    next(err);
  }
}

export async function getClubMembers(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await clubService.getClubMembers(
      String(req.params.id),
      parseInt(page) || 1,
      parseInt(limit) || 20
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getClubLeaderboard(req: Request, res: Response, next: NextFunction) {
  try {
    const leaderboard = await clubService.getClubLeaderboard(String(req.params.id));
    success(res, leaderboard);
  } catch (err) {
    next(err);
  }
}

export async function joinClub(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await clubService.joinClub(req.user!.userId, String(req.params.id));
    success(res, result, 'Joined club successfully');
  } catch (err) {
    next(err);
  }
}

export async function leaveClub(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await clubService.leaveClub(req.user!.userId);
    success(res, result, 'Left club successfully');
  } catch (err) {
    next(err);
  }
}
