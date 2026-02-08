import api from './api';

export async function createGame(targetScore?: number) {
  const { data } = await api.post('/games', { targetScore });
  return data.data;
}

export async function getOpenGames(page = 1, limit = 20) {
  const { data } = await api.get('/games/open', { params: { page, limit } });
  return data.data;
}

export async function getMyGames(page = 1, limit = 20, status?: string) {
  const { data } = await api.get('/games/my', { params: { page, limit, status } });
  return data.data;
}

export async function getGame(id: string) {
  const { data } = await api.get(`/games/${id}`);
  return data.data;
}

export async function joinGame(id: string) {
  const { data } = await api.post(`/games/${id}/join`);
  return data.data;
}

export async function makeMove(id: string, move: { strikerX: number; angle: number; power: number }) {
  const { data } = await api.post(`/games/${id}/move`, move);
  return data.data;
}

export async function abandonGame(id: string) {
  const { data } = await api.post(`/games/${id}/abandon`);
  return data.data;
}

export async function getGameMoves(id: string) {
  const { data } = await api.get(`/games/${id}/moves`);
  return data.data;
}
