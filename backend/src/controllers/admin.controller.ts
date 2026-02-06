import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/admin.service';
import { success } from '../utils/apiResponse';

export async function createTournament(req: Request, res: Response, next: NextFunction) {
  try {
    const tournament = await adminService.createTournament(req.body);
    success(res, tournament, 'Tournament created', 201);
  } catch (err) {
    next(err);
  }
}

export async function enterTournamentResults(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await adminService.enterTournamentResults(String(req.params.id), req.body.results);
    success(res, result, 'Results recorded');
  } catch (err) {
    next(err);
  }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await adminService.listUsers(parseInt(page) || 1, parseInt(limit) || 20);
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await adminService.updateUserRole(String(req.params.id), req.body.role);
    success(res, result, 'User role updated');
  } catch (err) {
    next(err);
  }
}
