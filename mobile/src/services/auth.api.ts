import api from './api';

export async function sendOtp(email: string) {
  const { data } = await api.post('/auth/send-otp', { email });
  return data;
}

export async function verifyOtp(email: string, otp: string) {
  const { data } = await api.post('/auth/verify-otp', { email, otp });
  return data;
}

export async function refreshToken(refreshToken: string) {
  const { data } = await api.post('/auth/refresh', { refreshToken });
  return data;
}
