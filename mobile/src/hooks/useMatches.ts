import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as matchApi from '../services/match.api';

export function useMatches(page = 1, userId?: string) {
  return useQuery({
    queryKey: ['matches', page, userId],
    queryFn: () => matchApi.getMatches(page, 20, userId),
  });
}

export function useMatchDetail(matchId: string) {
  return useQuery({
    queryKey: ['match', matchId],
    queryFn: () => matchApi.getMatchById(matchId),
    enabled: !!matchId,
  });
}

export function useCreateMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: matchApi.createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
}

export function useConfirmMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: matchApi.confirmMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
    },
  });
}
