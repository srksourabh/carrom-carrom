import { Router } from 'express';
import * as feedController from '../controllers/feed.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createPostSchema, createCommentSchema } from '../validators/feed.validator';

const router = Router();

router.use(authenticate);

// Posts
router.post('/posts', validate(createPostSchema), feedController.createPost);
router.get('/posts', feedController.getFeed);
router.get('/posts/explore', feedController.getExploreFeed);
router.get('/posts/:id', feedController.getPost);
router.delete('/posts/:id', feedController.deletePost);

// Likes
router.post('/posts/:id/like', feedController.toggleLike);

// Comments
router.post('/posts/:id/comments', validate(createCommentSchema), feedController.addComment);
router.delete('/posts/:id/comments/:commentId', feedController.deleteComment);

// Follow
router.post('/users/:id/follow', feedController.followUser);
router.delete('/users/:id/follow', feedController.unfollowUser);
router.get('/users/:id/followers', feedController.getFollowers);
router.get('/users/:id/following', feedController.getFollowing);
router.get('/users/:id/is-following', feedController.checkFollowing);

export { router as feedRoutes };
