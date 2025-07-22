// src/service/auth.service.ts
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { login, register } from '../types/auth';
import { sendEmail } from '../utils/senEmail.utils';
import { generateOtp, otpExpiryTime } from '../utils/otp.utils';

export const AuthService = {
    async isEmailTaken(email: string) {
        return prisma.user.findUnique({ where: { email } });
    },

    async createUser({ email, username, password }: { email: string; username: string; password: string; }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                isVerified: true
            }
        });
    },

    // Add to AuthService object
    async sendOtp(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('User not found');

        const code = generateOtp();
        const expires = otpExpiryTime();

        // Upsert OTP using userId (must be unique in schema)
        await prisma.otpCode.upsert({
            where: { userId: user.id },
            update: { code, expires },
            create: {
                code,
                expires,
                userId: user.id,
            },
        });

        await sendEmail(email, `Your OTP is: ${code}`);
    },

    async verifyOtp(email: string, otp: string) {
        const users = await prisma.user.findUnique({ where: { email } });
        if (!users) return { success: false, message: 'User not found' };

        const record = await prisma.otpCode.findUnique({ where: { userId: users.id } });

        if (!record || record.code !== otp || new Date() > record.expires) {
            return { success: false, message: 'Invalid or expired OTP' };
        }

        // Update user as verified
        const user = await prisma.user.update({
            where: { email },
            data: { isVerified: true },
        });

        // Delete OTP after verification
        await prisma.otpCode.delete({ where: { userId: user.id } });

        return { success: true, user };
    },


    async loginUser(data: login) {
        const user = await prisma.user.findUnique({ where: { email: data.email } });

        if (!user) {
            return {
                error: true,
                statusCode: 401,
                message: 'User not found',
                errors: [{ path: 'email', message: 'User with this email not found' }],
            };
        }

        const isMatch = await bcrypt.compare(data.password, user.password as string);
        if (!isMatch) {
            return {
                error: true,
                statusCode: 401,
                message: 'Invalid credentials',
                errors: [{ path: 'password', message: 'Incorrect password' }],
            };
        }

        return {
            error: false,
            statusCode: 401,
            data: {

                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
        };
    },

};
