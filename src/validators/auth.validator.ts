// src/validators/auth.validator.ts

import { z } from 'zod';

export const registerSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email format' }),

    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' }),

    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .refine((val) => /[A-Z]/.test(val), {
            message: 'Password must contain at least one uppercase letter',
        })
        .refine((val) => /[a-z]/.test(val), {
            message: 'Password must contain at least one lowercase letter',
        })
        .refine((val) => /[0-9]/.test(val), {
            message: 'Password must contain at least one digit',
        })
        .refine((val) => /[^a-zA-Z0-9]/.test(val), {
            message: 'Password must contain at least one special character',
        }),
});
//login schema ADDED
export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
//verifyOTPSchema
export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6), // assuming OTP is 6 chars/digits
});

export const resendOtpSchema = z.object({
    email: z.string().email(),
});