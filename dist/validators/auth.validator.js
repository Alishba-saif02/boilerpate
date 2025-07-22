"use strict";
// src/validators/auth.validator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateItem = exports.itemSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.resendOtpSchema = exports.verifyOTPSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: 'Invalid email format' }),
    username: zod_1.z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' }),
    password: zod_1.z
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
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email format' }),
    password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
//verifyOTPSchema
exports.verifyOTPSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email format' }),
    otp: zod_1.z
        .string()
        .length(6, { message: 'OTP must be 6 characters long' }) // assuming OTP is 6 digits
        .regex(/^\d+$/, { message: 'OTP must contain only digits' }),
});
exports.resendOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Enter a valid email address' }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Valid email required' })
});
exports.resetPasswordSchema = zod_1.z.object({
    newPassword: zod_1.z.string().min(6, 'Password must be at least 6 characters')
});
exports.itemSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    description: zod_1.z.string().min(5),
    price: zod_1.z.number().positive(),
    image: zod_1.z.string().optional(),
    isFeatured: zod_1.z.boolean().optional(),
    isTopSelling: zod_1.z.boolean().optional(),
    soldCount: zod_1.z.number().min(0).optional(),
});
const validateItem = (req, res, next) => {
    try {
        exports.itemSchema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.errors,
        });
    }
};
exports.validateItem = validateItem;
