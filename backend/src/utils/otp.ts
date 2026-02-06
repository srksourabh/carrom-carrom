import crypto from 'crypto';
import { redis } from '../config/redis';
import { config } from '../config';

const OTP_TTL = 300; // 5 minutes
const OTP_PREFIX = 'otp:';

export function generateOtp(): string {
  if (config.otpMockEnabled) {
    return config.otpMockCode;
  }
  return crypto.randomInt(100000, 999999).toString();
}

export async function storeOtp(email: string, otp: string): Promise<void> {
  await redis.setex(`${OTP_PREFIX}${email}`, OTP_TTL, otp);
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  const stored = await redis.get(`${OTP_PREFIX}${email}`);
  if (!stored) return false;
  if (stored !== otp) return false;
  await redis.del(`${OTP_PREFIX}${email}`);
  return true;
}
