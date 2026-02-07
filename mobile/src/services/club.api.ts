import api from './api';

export async function getClubs(page = 1, limit = 20, district?: string, q?: string) {
  const { data } = await api.get('/clubs', { params: { page, limit, district, q } });
  return data.data;
}

export async function getClubById(id: string) {
  const { data } = await api.get(`/clubs/${id}`);
  return data.data;
}

export async function getClubMembers(id: string, page = 1, limit = 20) {
  const { data } = await api.get(`/clubs/${id}/members`, { params: { page, limit } });
  return data.data;
}

export async function getClubLeaderboard(id: string) {
  const { data } = await api.get(`/clubs/${id}/leaderboard`);
  return data.data;
}

export async function joinClub(id: string) {
  const { data } = await api.post(`/clubs/${id}/join`);
  return data.data;
}

export async function leaveClub() {
  const { data } = await api.post('/clubs/leave');
  return data.data;
}
