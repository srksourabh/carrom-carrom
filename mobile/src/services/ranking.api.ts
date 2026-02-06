import api from './api';

export async function getRankings(page = 1, limit = 50, district?: string) {
  const { data } = await api.get('/rankings', { params: { page, limit, district } });
  return data.data;
}

export async function searchRankings(query: string, limit = 10) {
  const { data } = await api.get('/rankings/search', { params: { q: query, limit } });
  return data.data;
}

export async function getMyRank() {
  const { data } = await api.get('/rankings/me');
  return data.data;
}
