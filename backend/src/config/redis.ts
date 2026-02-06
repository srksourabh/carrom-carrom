import Redis from 'ioredis';
import { config } from './index';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (!config.redisUrl) return null;
  if (redis) return redis;

  try {
    redis = new Redis(config.redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 3000,
      lazyConnect: true,
      retryStrategy(times) {
        if (times > 2) return null;
        return Math.min(times * 200, 1000);
      },
    });

    redis.on('error', (err) => {
      console.error('Redis connection error:', err.message);
    });

    redis.connect().catch(() => {
      console.warn('Redis not available, caching disabled');
      redis = null;
    });
  } catch {
    console.warn('Redis initialization failed, caching disabled');
    redis = null;
  }

  return redis;
}

// Safe wrappers that gracefully handle Redis being unavailable
export async function cacheGet(key: string): Promise<string | null> {
  try {
    const client = getRedis();
    if (!client) return null;
    return await client.get(key);
  } catch {
    return null;
  }
}

export async function cacheSet(key: string, ttl: number, value: string): Promise<void> {
  try {
    const client = getRedis();
    if (!client) return;
    await client.setex(key, ttl, value);
  } catch {
    // Cache write failed, not critical
  }
}

export async function cacheDel(pattern: string): Promise<void> {
  try {
    const client = getRedis();
    if (!client) return;
    const keys = await client.keys(pattern);
    if (keys.length > 0) await client.del(...keys);
  } catch {
    // Cache delete failed, not critical
  }
}

// Keep backward compat for OTP storage (required for auth)
export { getRedis as getRedisClient };
