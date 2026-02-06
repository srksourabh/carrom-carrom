import { prisma } from '../config/database';
import { redis } from '../config/redis';
import { generateOtp, storeOtp, verifyOtp } from '../utils/otp';
import { signAccessToken, signRefreshToken, verifyRefreshToken, JwtPayload } from '../utils/jwt';
import { AppError } from '../middleware/errorHandler';

export async function sendOtp(email: string) {
  const otp = generateOtp();
  await storeOtp(email, otp);
  // In production, send OTP via email/SMS
  console.log(`[DEV] OTP for ${email}: ${otp}`);
  return { message: `OTP sent to ${email}` };
}

export async function verifyOtpAndLogin(email: string, otp: string) {
  const isValid = await verifyOtp(email, otp);
  if (!isValid) {
    throw new AppError(400, 'Invalid or expired OTP');
  }

  let user = await prisma.user.findUnique({ where: { email } });
  let isNewUser = false;

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
      },
    });
    isNewUser = true;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const payload: JwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await redis.setex(`refresh:${user.id}`, 7 * 24 * 60 * 60, refreshToken);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      isNewUser,
    },
  };
}

export async function refreshAccessToken(refreshToken: string) {
  let payload: JwtPayload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(401, 'Invalid refresh token');
  }

  const stored = await redis.get(`refresh:${payload.userId}`);
  if (!stored || stored !== refreshToken) {
    throw new AppError(401, 'Refresh token revoked');
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) {
    throw new AppError(401, 'User not found');
  }

  const newPayload: JwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const newAccessToken = signAccessToken(newPayload);
  const newRefreshToken = signRefreshToken(newPayload);

  await redis.setex(`refresh:${user.id}`, 7 * 24 * 60 * 60, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}
