"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// src/service/auth.service.ts
const prisma_1 = require("../lib/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const senEmail_utils_1 = require("../utils/senEmail.utils");
const otp_utils_1 = require("../utils/otp.utils");
exports.AuthService = {
    isEmailTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.user.findUnique({ where: { email } });
        });
    },
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
            return prisma_1.prisma.user.create({
                data: {
                    email: data.email,
                    username: data.username,
                    password: hashedPassword,
                    role: 'USER',
                },
            });
        });
    },
    // Add to AuthService object
    sendOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
            if (!user)
                throw new Error('User not found');
            const code = (0, otp_utils_1.generateOtp)();
            const expires = (0, otp_utils_1.otpExpiryTime)();
            // Upsert OTP using userId (must be unique in schema)
            yield prisma_1.prisma.otpCode.upsert({
                where: { userId: user.id },
                update: { code, expires },
                create: {
                    code,
                    expires,
                    userId: user.id,
                },
            });
            yield (0, senEmail_utils_1.sendEmail)(email, `Your OTP is: ${code}`);
        });
    },
    verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.prisma.user.findUnique({ where: { email } });
            if (!users)
                return { success: false, message: 'User not found' };
            const record = yield prisma_1.prisma.otpCode.findUnique({ where: { userId: users.id } });
            if (!record || record.code !== otp || new Date() > record.expires) {
                return { success: false, message: 'Invalid or expired OTP' };
            }
            // Update user as verified
            const user = yield prisma_1.prisma.user.update({
                where: { email },
                data: { isVerified: true },
            });
            // Delete OTP after verification
            yield prisma_1.prisma.otpCode.delete({ where: { userId: user.id } });
            return { success: true, user };
        });
    },
    loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({ where: { email: data.email } });
            if (!user) {
                return {
                    error: true,
                    statusCode: 401,
                    message: 'User not found',
                    errors: [{ path: 'email', message: 'User with this email not found' }],
                };
            }
            const isMatch = yield bcryptjs_1.default.compare(data.password, user.password);
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
        });
    },
};
