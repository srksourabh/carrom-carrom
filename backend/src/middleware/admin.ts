import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    throw new AppError(401, 'Authentication required');
  }
  if (!['SUPER_ADMIN', 'TOURNAMENT_ADMIN'].includes(req.user.role)) {
    throw new AppError(403, 'Admin access required');
  }
  next();
}

export function requireSuperAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    throw new AppError(401, 'Authentication required');
  }
  if (req.user.role !== 'SUPER_ADMIN') {
    throw new AppError(403, 'Super admin access required');
  }
  next();
}
