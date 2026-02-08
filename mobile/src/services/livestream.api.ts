import api from './api';

export async function createLiveStream(data: {
  title: string;
  description?: string;
  streamUrl: string;
  thumbnailUrl?: string;
}) {
  const { data: res } = await api.post('/streams', data);
  return res.data;
}

export async function getLiveStreams(page = 1, limit = 20, liveOnly = false) {
  const { data } = await api.get('/streams', { params: { page, limit, liveOnly } });
  return data.data;
}

export async function getLiveStream(id: string) {
  const { data } = await api.get(`/streams/${id}`);
  return data.data;
}

export async function updateLiveStream(id: string, data: {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
}) {
  const { data: res } = await api.patch(`/streams/${id}`, data);
  return res.data;
}

export async function joinStream(id: string) {
  const { data } = await api.post(`/streams/${id}/join`);
  return data.data;
}

export async function leaveStream(id: string) {
  const { data } = await api.post(`/streams/${id}/leave`);
  return data.data;
}

export async function endStream(id: string) {
  const { data } = await api.post(`/streams/${id}/end`);
  return data.data;
}
