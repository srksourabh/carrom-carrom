import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as challengeApi from '../services/challenge.api';

export function useChallenges(page = 1, type = 'all', status?: string) {
  return useQuery({
    queryKey: ['challenges', page, type, status],
    queryFn: () => challengeApi.getChallenges(page, 20, type, status),
  });
}

export function useChallengeDetail(id: string) {
  return useQuery({
    queryKey: ['challenge', id],
    queryFn: () => challengeApi.getChallengeById(id),
    enabled: !!id,
  });
}

export function useCreateChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: challengeApi.createChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
}

export function useRespondToChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'accept' | 'decline' }) =>
      challengeApi.respondToChallenge(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
}

export function useCancelChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: challengeApi.cancelChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
    },
  });
}
