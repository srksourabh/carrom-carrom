import { Request, Response, NextFunction } from 'express';
import * as feedService from '../services/feed.service';
import { success } from '../utils/apiResponse';

export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await feedService.createPost(req.user!.userId, req.body);
    success(res, post, 'Post created', 201);
  } catch (err) {
    next(err);
  }
}

export async function getFeed(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await feedService.getFeed(
      req.user!.userId,
      parseInt(page) || 1,
      parseInt(limit) || 20
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getExploreFeed(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await feedService.getExploreFeed(
      req.user!.userId,
      parseInt(page) || 1,
      parseInt(limit) || 20
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await feedService.getPost(String(req.params.id), req.user!.userId);
    success(res, post);
  } catch (err) {
    next(err);
  }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    await feedService.deletePost(String(req.params.id), req.user!.userId);
    success(res, null, 'Post deleted');
  } catch (err) {
    next(err);
  }
}

export async function toggleLike(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await feedService.toggleLike(String(req.params.id), req.user!.userId);
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function addComment(req: Request, res: Response, next: NextFunction) {
  try {
    const comment = await feedService.addComment(
      String(req.params.id),
      req.user!.userId,
      req.body.content
    );
    success(res, comment, 'Comment added', 201);
  } catch (err) {
    next(err);
  }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    await feedService.deleteComment(String(req.params.commentId), req.user!.userId);
    success(res, null, 'Comment deleted');
  } catch (err) {
    next(err);
  }
}

export async function followUser(req: Request, res: Response, next: NextFunction) {
  try {
    await feedService.followUser(req.user!.userId, String(req.params.id));
    success(res, null, 'Followed');
  } catch (err) {
    next(err);
  }
}

export async function unfollowUser(req: Request, res: Response, next: NextFunction) {
  try {
    await feedService.unfollowUser(req.user!.userId, String(req.params.id));
    success(res, null, 'Unfollowed');
  } catch (err) {
    next(err);
  }
}

export async function getFollowers(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await feedService.getFollowers(
      String(req.params.id),
      parseInt(page) || 1,
      parseInt(limit) || 50
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function getFollowing(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query as any;
    const result = await feedService.getFollowing(
      String(req.params.id),
      parseInt(page) || 1,
      parseInt(limit) || 50
    );
    success(res, result);
  } catch (err) {
    next(err);
  }
}

export async function checkFollowing(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await feedService.isFollowing(req.user!.userId, String(req.params.id));
    success(res, result);
  } catch (err) {
    next(err);
  }
}
