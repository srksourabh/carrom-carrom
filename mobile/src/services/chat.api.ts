import api from './api';

export async function startConversation(participantId: string, message: string) {
  const { data } = await api.post('/chat/conversations', { participantId, message });
  return data.data;
}

export async function getConversations(page = 1, limit = 20) {
  const { data } = await api.get('/chat/conversations', { params: { page, limit } });
  return data.data;
}

export async function getMessages(conversationId: string, page = 1, limit = 50) {
  const { data } = await api.get(`/chat/conversations/${conversationId}/messages`, { params: { page, limit } });
  return data.data;
}

export async function sendMessage(conversationId: string, content: string) {
  const { data } = await api.post(`/chat/conversations/${conversationId}/messages`, { content });
  return data.data;
}

export async function getOrCreateConversation(userId: string) {
  const { data } = await api.get(`/chat/with/${userId}`);
  return data.data;
}

export async function getUnreadCount() {
  const { data } = await api.get('/chat/unread');
  return data.data;
}
