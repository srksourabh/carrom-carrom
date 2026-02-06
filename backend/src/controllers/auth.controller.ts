import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { success } from '../utils/apiResponse';

export async function sendOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.sendOtp(req.body.email);
    success(res, result, 'OTP sent successfully');
  } catch (err) {
    next(err);
  }
}

export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.verifyOtpAndLogin(req.body.email, req.body.otp);
    success(res, result, 'Login successful');
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.refreshAccessToken(req.body.refreshToken);
    success(res, result, 'Token refreshed');
  } catch (err) {
    next(err);
  }
}
