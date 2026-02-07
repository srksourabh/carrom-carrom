import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as chatApi from '../services/chat.api';

export function useConversations(page = 1) {
  return useQuery({
    queryKey: ['conversations', page],
    queryFn: () => chatApi.getConversations(page),
    refetchInterval: 10000, // Poll every 10 seconds
  });
}

export function useMessages(conversationId: string, page = 1) {
  return useQuery({
    queryKey: ['messages', conversationId, page],
    queryFn: () => chatApi.getMessages(conversationId, page),
    enabled: !!conversationId,
    refetchInterval: 5000, // Poll every 5 seconds for new messages
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) =>
      chatApi.sendMessage(conversationId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useStartConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ participantId, message }: { participantId: string; message: string }) =>
      chatApi.startConversation(participantId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useGetOrCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: chatApi.getOrCreateConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ['unreadCount'],
    queryFn: chatApi.getUnreadCount,
    refetchInterval: 15000, // Poll every 15 seconds
  });
}
