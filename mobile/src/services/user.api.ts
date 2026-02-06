import api from './api';

export async function getMyProfile() {
  const { data } = await api.get('/users/me');
  return data.data;
}

export async function updateMyProfile(profileData: {
  name?: string;
  displayName?: string;
  bio?: string;
  district?: string;
  city?: string;
}) {
  const { data } = await api.put('/users/me', profileData);
  return data.data;
}

export async function getUserById(userId: string) {
  const { data } = await api.get(`/users/${userId}`);
  return data.data;
}

export async function searchUsers(query: string, limit = 10) {
  const { data } = await api.get('/users/search', { params: { q: query, limit } });
  return data.data;
}
