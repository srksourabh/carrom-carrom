import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as clubApi from '../services/club.api';

export function useClubs(page = 1, district?: string, q?: string) {
  return useQuery({
    queryKey: ['clubs', page, district, q],
    queryFn: () => clubApi.getClubs(page, 20, district, q),
  });
}

export function useClubDetail(id: string) {
  return useQuery({
    queryKey: ['club', id],
    queryFn: () => clubApi.getClubById(id),
    enabled: !!id,
  });
}

export function useClubMembers(id: string, page = 1) {
  return useQuery({
    queryKey: ['clubMembers', id, page],
    queryFn: () => clubApi.getClubMembers(id, page),
    enabled: !!id,
  });
}

export function useClubLeaderboard(id: string) {
  return useQuery({
    queryKey: ['clubLeaderboard', id],
    queryFn: () => clubApi.getClubLeaderboard(id),
    enabled: !!id,
  });
}

export function useJoinClub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clubApi.joinClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
      queryClient.invalidateQueries({ queryKey: ['clubMembers'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
}

export function useLeaveClub() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clubApi.leaveClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
      queryClient.invalidateQueries({ queryKey: ['clubMembers'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
}
