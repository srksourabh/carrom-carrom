import { useMutation } from '@tanstack/react-query';
import * as authApi from '../services/auth.api';
import { useAuthStore } from '../stores/authStore';

export function useSendOtp() {
  return useMutation({
    mutationFn: (email: string) => authApi.sendOtp(email),
  });
}

export function useVerifyOtp() {
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authApi.verifyOtp(email, otp),
    onSuccess: (response) => {
      const { accessToken, refreshToken, user } = response.data;
      setTokens(accessToken, refreshToken);
      setUser(user);
    },
  });
}
