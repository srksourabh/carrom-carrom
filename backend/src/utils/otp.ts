import crypto from 'crypto';
import { getRedisClient } from '../config/redis';
import { config } from '../config';

const OTP_TTL = 300; // 5 minutes
const OTP_PREFIX = 'otp:';

// In-memory fallback for when Redis is unavailable (serverless/dev)
const memoryStore = new Map<string, { otp: string; expiresAt: number }>();

export function generateOtp(): string {
  if (config.otpMockEnabled) {
    return config.otpMockCode;
  }
  return crypto.randomInt(100000, 999999).toString();
}

export async function storeOtp(email: string, otp: string): Promise<void> {
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.setex(`${OTP_PREFIX}${email}`, OTP_TTL, otp);
      return;
    } catch {
      // Fall through to memory store
    }
  }
  memoryStore.set(email, { otp, expiresAt: Date.now() + OTP_TTL * 1000 });
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  // In mock mode, always accept the mock code (works in serverless without persistent store)
  if (config.otpMockEnabled && otp === config.otpMockCode) {
    return true;
  }

  const redis = getRedisClient();
  if (redis) {
    try {
      const stored = await redis.get(`${OTP_PREFIX}${email}`);
      if (!stored) return false;
      if (stored !== otp) return false;
      await redis.del(`${OTP_PREFIX}${email}`);
      return true;
    } catch {
      // Fall through to memory store
    }
  }

  const entry = memoryStore.get(email);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    memoryStore.delete(email);
    return false;
  }
  if (entry.otp !== otp) return false;
  memoryStore.delete(email);
  return true;
}
