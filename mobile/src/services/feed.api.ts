import api from './api';

export async function createPost(data: { content: string; imageUrl?: string }) {
  const { data: res } = await api.post('/feed/posts', data);
  return res.data;
}

export async function getFeed(page = 1, limit = 20) {
  const { data } = await api.get('/feed/posts', { params: { page, limit } });
  return data.data;
}

export async function getExploreFeed(page = 1, limit = 20) {
  const { data } = await api.get('/feed/posts/explore', { params: { page, limit } });
  return data.data;
}

export async function getPost(id: string) {
  const { data } = await api.get(`/feed/posts/${id}`);
  return data.data;
}

export async function deletePost(id: string) {
  const { data } = await api.delete(`/feed/posts/${id}`);
  return data.data;
}

export async function toggleLike(postId: string) {
  const { data } = await api.post(`/feed/posts/${postId}/like`);
  return data.data;
}

export async function addComment(postId: string, content: string) {
  const { data } = await api.post(`/feed/posts/${postId}/comments`, { content });
  return data.data;
}

export async function deleteComment(postId: string, commentId: string) {
  const { data } = await api.delete(`/feed/posts/${postId}/comments/${commentId}`);
  return data.data;
}

export async function followUser(userId: string) {
  const { data } = await api.post(`/feed/users/${userId}/follow`);
  return data.data;
}

export async function unfollowUser(userId: string) {
  const { data } = await api.delete(`/feed/users/${userId}/follow`);
  return data.data;
}

export async function getFollowers(userId: string, page = 1) {
  const { data } = await api.get(`/feed/users/${userId}/followers`, { params: { page } });
  return data.data;
}

export async function getFollowing(userId: string, page = 1) {
  const { data } = await api.get(`/feed/users/${userId}/following`, { params: { page } });
  return data.data;
}

export async function isFollowing(userId: string) {
  const { data } = await api.get(`/feed/users/${userId}/is-following`);
  return data.data;
}
