import api from './api';

export async function createChallenge(data: {
  receiverId: string;
  message?: string;
  proposedDate?: string;
  proposedVenue?: string;
}) {
  const { data: res } = await api.post('/challenges', data);
  return res.data;
}

export async function getChallenges(page = 1, limit = 20, type = 'all', status?: string) {
  const { data } = await api.get('/challenges', { params: { page, limit, type, status } });
  return data.data;
}

export async function getChallengeById(id: string) {
  const { data } = await api.get(`/challenges/${id}`);
  return data.data;
}

export async function respondToChallenge(id: string, action: 'accept' | 'decline') {
  const { data } = await api.patch(`/challenges/${id}/respond`, { action });
  return data.data;
}

export async function cancelChallenge(id: string) {
  const { data } = await api.patch(`/challenges/${id}/cancel`);
  return data.data;
}
