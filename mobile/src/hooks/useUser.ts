import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as userApi from '../services/user.api';

export function useMyProfile() {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: userApi.getMyProfile,
  });
}

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => userApi.getUserById(userId),
    enabled: !!userId,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
}

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ['searchUsers', query],
    queryFn: () => userApi.searchUsers(query),
    enabled: query.length >= 2,
  });
}
