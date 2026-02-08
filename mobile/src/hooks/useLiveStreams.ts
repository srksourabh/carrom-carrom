import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as livestreamApi from '../services/livestream.api';

export function useLiveStreams(page = 1, liveOnly = false) {
  return useQuery({
    queryKey: ['liveStreams', page, liveOnly],
    queryFn: () => livestreamApi.getLiveStreams(page, 20, liveOnly),
    refetchInterval: 15000,
  });
}

export function useLiveStream(id: string) {
  return useQuery({
    queryKey: ['liveStream', id],
    queryFn: () => livestreamApi.getLiveStream(id),
    enabled: !!id,
    refetchInterval: 10000,
  });
}

export function useCreateLiveStream() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: livestreamApi.createLiveStream,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liveStreams'] });
    },
  });
}

export function useJoinStream() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: livestreamApi.joinStream,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['liveStream', id] });
    },
  });
}

export function useLeaveStream() {
  return useMutation({
    mutationFn: livestreamApi.leaveStream,
  });
}

export function useEndStream() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: livestreamApi.endStream,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liveStreams'] });
    },
  });
}
