import { Router } from "express";
import { Express } from "express";
import { register, login, verifyOtp, resendOtp } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { registerSchema, loginSchema, resendOtpSchema, verifyOtpSchema } from "../validators/auth.validator";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post('/register', validateRequest(registerSchema), register as any);
router.post('/login', validateRequest(loginSchema), login as any);
router.post('/verify-otp', verifyOtp as any);
router.post('/resend-otp', validateRequest(resendOtpSchema), resendOtp as any); // fixed controller & added validation

export default router;
