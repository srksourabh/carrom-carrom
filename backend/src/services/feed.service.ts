import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export async function createPost(userId: string, data: { content: string; imageUrl?: string }) {
  return prisma.post.create({
    data: {
      userId,
      content: data.content,
      imageUrl: data.imageUrl,
    },
    include: {
      user: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
      _count: { select: { comments: true, postLikes: true } },
    },
  });
}

export async function getFeed(userId: string, page: number, limit: number) {
  // Get IDs of users the current user follows
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);
  // Include own posts + followed users' posts
  const userIds = [userId, ...followingIds];

  const where = { userId: { in: userIds } };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
        _count: { select: { comments: true, postLikes: true } },
        postLikes: {
          where: { userId },
          select: { id: true },
          take: 1,
        },
      },
    }),
    prisma.post.count({ where }),
  ]);

  // Transform to add `isLiked` flag
  const postsWithLiked = posts.map((post) => ({
    ...post,
    isLiked: post.postLikes.length > 0,
    postLikes: undefined,
  }));

  return { posts: postsWithLiked, total, page, limit };
}

export async function getExploreFeed(userId: string, page: number, limit: number) {
  // Global feed - all posts
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
        _count: { select: { comments: true, postLikes: true } },
        postLikes: {
          where: { userId },
          select: { id: true },
          take: 1,
        },
      },
    }),
    prisma.post.count(),
  ]);

  const postsWithLiked = posts.map((post) => ({
    ...post,
    isLiked: post.postLikes.length > 0,
    postLikes: undefined,
  }));

  return { posts: postsWithLiked, total, page, limit };
}

export async function getPost(postId: string, userId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
      comments: {
        orderBy: { createdAt: 'asc' },
        include: {
          user: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
        },
      },
      _count: { select: { comments: true, postLikes: true } },
      postLikes: {
        where: { userId },
        select: { id: true },
        take: 1,
      },
    },
  });

  if (!post) throw new AppError(404, 'Post not found');

  return {
    ...post,
    isLiked: post.postLikes.length > 0,
    postLikes: undefined,
  };
}

export async function deletePost(postId: string, userId: string) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new AppError(404, 'Post not found');
  if (post.userId !== userId) throw new AppError(403, 'Not authorized to delete this post');

  return prisma.post.delete({ where: { id: postId } });
}

export async function toggleLike(postId: string, userId: string) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new AppError(404, 'Post not found');

  const existing = await prisma.postLike.findUnique({
    where: { postId_userId: { postId, userId } },
  });

  if (existing) {
    await prisma.$transaction([
      prisma.postLike.delete({ where: { id: existing.id } }),
      prisma.post.update({ where: { id: postId }, data: { likes: { decrement: 1 } } }),
    ]);
    return { liked: false };
  } else {
    await prisma.$transaction([
      prisma.postLike.create({ data: { postId, userId } }),
      prisma.post.update({ where: { id: postId }, data: { likes: { increment: 1 } } }),
    ]);
    return { liked: true };
  }
}

export async function addComment(postId: string, userId: string, content: string) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new AppError(404, 'Post not found');

  return prisma.comment.create({
    data: { postId, userId, content },
    include: {
      user: { select: { id: true, name: true, displayName: true, avatarUrl: true } },
    },
  });
}

export async function deleteComment(commentId: string, userId: string) {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new AppError(404, 'Comment not found');
  if (comment.userId !== userId) throw new AppError(403, 'Not authorized to delete this comment');

  return prisma.comment.delete({ where: { id: commentId } });
}

// Follow system
export async function followUser(followerId: string, followingId: string) {
  if (followerId === followingId) throw new AppError(400, 'Cannot follow yourself');

  const target = await prisma.user.findUnique({ where: { id: followingId } });
  if (!target) throw new AppError(404, 'User not found');

  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } },
  });
  if (existing) throw new AppError(400, 'Already following this user');

  return prisma.follow.create({
    data: { followerId, followingId },
  });
}

export async function unfollowUser(followerId: string, followingId: string) {
  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } },
  });
  if (!existing) throw new AppError(400, 'Not following this user');

  return prisma.follow.delete({ where: { id: existing.id } });
}

export async function getFollowers(userId: string, page: number, limit: number) {
  const [followers, total] = await Promise.all([
    prisma.follow.findMany({
      where: { followingId: userId },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        follower: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
      },
    }),
    prisma.follow.count({ where: { followingId: userId } }),
  ]);

  return { users: followers.map((f) => f.follower), total, page, limit };
}

export async function getFollowing(userId: string, page: number, limit: number) {
  const [following, total] = await Promise.all([
    prisma.follow.findMany({
      where: { followerId: userId },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        following: { select: { id: true, name: true, displayName: true, avatarUrl: true, eloRating: true } },
      },
    }),
    prisma.follow.count({ where: { followerId: userId } }),
  ]);

  return { users: following.map((f) => f.following), total, page, limit };
}

export async function isFollowing(followerId: string, followingId: string) {
  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } },
  });
  return { isFollowing: !!existing };
}
