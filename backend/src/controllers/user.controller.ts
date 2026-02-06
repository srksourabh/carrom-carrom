import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { success } from '../utils/apiResponse';

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getProfile(req.user!.userId);
    success(res, user);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.updateProfile(req.user!.userId, req.body);
    success(res, user, 'Profile updated');
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getUserById(String(req.params.id));
    success(res, user);
  } catch (err) {
    next(err);
  }
}

export async function searchUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const q = String(req.query.q || '');
    const limit = parseInt(String(req.query.limit)) || 10;
    const users = await userService.searchUsers(q, limit);
    success(res, users);
  } catch (err) {
    next(err);
  }
}
