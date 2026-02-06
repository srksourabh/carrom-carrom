import api from './api';

export async function createMatch(matchData: {
  opponentId: string;
  player1Score: number;
  player2Score: number;
  matchType?: string;
  venue?: string;
  district?: string;
  playedAt: string;
  notes?: string;
}) {
  const { data } = await api.post('/matches', matchData);
  return data.data;
}

export async function getMatches(page = 1, limit = 20, userId?: string) {
  const { data } = await api.get('/matches', { params: { page, limit, userId } });
  return data.data;
}

export async function getMatchById(matchId: string) {
  const { data } = await api.get(`/matches/${matchId}`);
  return data.data;
}

export async function confirmMatch(matchId: string) {
  const { data } = await api.patch(`/matches/${matchId}/confirm`);
  return data.data;
}

export async function disputeMatch(matchId: string) {
  const { data } = await api.patch(`/matches/${matchId}/dispute`);
  return data.data;
}
