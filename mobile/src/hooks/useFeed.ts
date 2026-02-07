import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import * as feedApi from '../services/feed.api';

export function useFeed(page = 1) {
  return useQuery({
    queryKey: ['feed', page],
    queryFn: () => feedApi.getFeed(page),
  });
}

export function useExploreFeed(page = 1) {
  return useQuery({
    queryKey: ['exploreFeed', page],
    queryFn: () => feedApi.getExploreFeed(page),
  });
}

export function usePostDetail(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => feedApi.getPost(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: feedApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['exploreFeed'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: feedApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['exploreFeed'] });
    },
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: feedApi.toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['exploreFeed'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      feedApi.addComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: feedApi.followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: feedApi.unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
    },
  });
}

export function useIsFollowing(userId: string) {
  return useQuery({
    queryKey: ['isFollowing', userId],
    queryFn: () => feedApi.isFollowing(userId),
    enabled: !!userId,
  });
}
