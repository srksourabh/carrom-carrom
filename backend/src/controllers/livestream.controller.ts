import { Request, Response, NextFunction } from 'express';
import * as livestreamService from '../services/livestream.service';
import { success } from '../utils/apiResponse';

export async function createLiveStream(req: Request, res: Response, next: NextFunction) {
  try {
    const stream = await livestreamService.createLiveStream(req.user!.userId, req.body);
    success(res, stream, 'Stream created', 201);
  } catch (err) {
    next(err);
  }
}

export async function getLiveStreams(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, liveOnly } = req.query as any;
    const result = await livestreamService.getLiveStreams(
      parseInt(page) || 1,
      parseInt(limit) || 20,
      liveOnly === 'true'
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getLiveStream(req: Request, res: Response, next: NextFunction) {
  try {
    const stream = await livestreamService.getLiveStream(String(req.params.id));
    success(res, stream);
  } catch (err) {
    next(err);
  }
}

export async function joinStream(req: Request, res: Response, next: NextFunction) {
  try {
    const stream = await livestreamService.joinStream(String(req.params.id));
    success(res, stream);
  } catch (err) {
    next(err);
  }
}

export async function leaveStream(req: Request, res: Response, next: NextFunction) {
  try {
    await livestreamService.leaveStream(String(req.params.id));
    success(res, null, 'Left stream');
  } catch (err) {
    next(err);
  }
}

export async function endStream(req: Request, res: Response, next: NextFunction) {
  try {
    const stream = await livestreamService.endStream(String(req.params.id), req.user!.userId);
    success(res, stream, 'Stream ended');
  } catch (err) {
    next(err);
  }
}

export async function updateLiveStream(req: Request, res: Response, next: NextFunction) {
  try {
    const stream = await livestreamService.updateLiveStream(
      String(req.params.id),
      req.user!.userId,
      req.body
    );
    success(res, stream, 'Stream updated');
  } catch (err) {
    next(err);
  }
}
