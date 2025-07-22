// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { ApiResponse } from '../utils/ApiResponse';
import { generateToken } from '../utils/generateToken.utils';

export const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await AuthService.isEmailTaken(email);
        if (existingUser) {
            return ApiResponse.error(res, 'Email already exists', 400, {
                errors: [{ path: 'email', message: 'Email already registered' }],
            });
        }

        const user = await AuthService.createUser({ email, username, password });

        // Send OTP
        await AuthService.sendOtp(email);

        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const data = {
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                isVerified: user.isVerified,
            },
        };

        return ApiResponse.success(
            res,
            data,
            201,
            'User registered successfully. Please verify OTP sent to your email.'
        );
    } catch (err: any) {
        return ApiResponse.error(res, 'Something went wrong', 500, {
            errors: [{ path: 'server', message: err.message }],
        });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    console.log('object inside verify OTP');
    const { email, otp } = req.body;
    try {
        const result = await AuthService.verifyOtp(email, otp);

        if (!result.success) {
            return ApiResponse.error(res, result.message, 400, {
                errors: [{ path: 'otp', message: result.message }],
            });
        }

        const token = generateToken({
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
        });

        return ApiResponse.success(res, { token }, 200, 'OTP verified successfully');
    } catch (err: any) {
        return ApiResponse.error(res, 'Error verifying OTP', 500, {
            errors: [{ path: 'server', message: err.message }],
        });
    }
};

export const resendOtp = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await AuthService.isEmailTaken(email);
        if (!user) {
            return ApiResponse.error(res, 'User not found', 404, {
                errors: [{ path: 'email', message: 'User does not exist' }],
            });
        }

        await AuthService.sendOtp(email);

        return ApiResponse.success(res, null, 200, 'OTP resent successfully');
    } catch (err: any) {
        return ApiResponse.error(res, 'Error resending OTP', 500, {
            errors: [{ path: 'server', message: err.message }],
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await AuthService.loginUser({ email, password });

        if (result.error) {
            return ApiResponse.error(res, result.message, result.statusCode, {
                errors: result.errors,
            });
        }

        if (!result.data?.isVerified) {
            return ApiResponse.error(res, 'Account not verified', 403, {
                errors: [{ path: 'otp', message: 'Please verify your account using OTP' }],
            });
        }

        const token = generateToken({
            id: result.data.id,
            email: result.data.email,
            role: result.data.role,
        });

        const data = {
            token,
            user: {
                id: result.data.id,
                email: result.data.email,
                username: result.data.username,
                role: result.data.role,
                isVerified: result.data.isVerified,
            },
        };

        return ApiResponse.success(res, data, 200, 'Login successful');
    } catch (err: any) {
        return ApiResponse.error(res, 'Internal server error', 500, {
            errors: [{ path: 'server', message: err.message }],
        });
    }
};
