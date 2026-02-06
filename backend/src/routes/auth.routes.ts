import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { sendOtpSchema, verifyOtpSchema, refreshTokenSchema } from '../validators/auth.validator';

const router = Router();

router.post('/send-otp', validate(sendOtpSchema), authController.sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);
router.post('/refresh', validate(refreshTokenSchema), authController.refresh);

export { router as authRoutes };
