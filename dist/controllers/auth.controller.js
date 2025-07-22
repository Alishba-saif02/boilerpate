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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.resendOtp = exports.verifyOtp = exports.register = void 0;
const auth_service_1 = require("../service/auth.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const generateToken_utils_1 = require("../utils/generateToken.utils");
// export const register = async (req: Request, res: Response) => {
//     const { email, username, password } = req.body;
//     try {
//         const existingUser = await AuthService.isEmailTaken(email);
//         if (existingUser) {
//             return ApiResponse.error(res, 'Email already exists', 400, {
//                 errors: [{ path: 'email', message: 'Email already registered' }],
//             });
//         }
//         const user = await AuthService.createUser({ email, username, password });
//         const data= {
//             data:{
//             id: user.id,
//             email: user.email,
//             username: user.username,
//             role: user.role,
//             isVerified: user.isVerified
//             }}
//         return ApiResponse.success(res, data, 201, 'User registered successfully');
//     } catch (err: any) {
//         return ApiResponse.error(res, 'Something went wrong', 500, {
//             errors: [{ path: 'server', message: err.message }],
//         });
//     }
// };
// export const login = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     try {
//         const result = await AuthService.loginUser({ email, password });
//         if (result.error) {
//             return ApiResponse.error(res, result.message, result.statusCode, {
//                 errors: result.errors,
//             });
//         }
// //response 
//         return ApiResponse.success(res, result.data, 200, 'Login successful');
//     } catch (err: any) {
//         return ApiResponse.error(res, 'Internal server error', 500, {
//             errors: [{ path: 'server', message: err.message }],
//         });
//     }
// };
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        const existingUser = yield auth_service_1.AuthService.isEmailTaken(email);
        if (existingUser) {
            return ApiResponse_1.ApiResponse.error(res, 'Email already exists', 400, {
                errors: [{ path: 'email', message: 'Email already registered' }],
            });
        }
        const user = yield auth_service_1.AuthService.createUser({ email, username, password });
        // Send OTP
        yield auth_service_1.AuthService.sendOtp(email);
        return ApiResponse_1.ApiResponse.success(res, null, 201, 'User registered. Please verify OTP sent to your email.');
    }
    catch (err) {
        return ApiResponse_1.ApiResponse.error(res, 'Something went wrong', 500, {
            errors: [{ path: 'server', message: err.message }],
        });
    }
});
exports.register = register;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const result = yield auth_service_1.AuthService.verifyOtp(email, otp);
        if (!result.success) {
            return ApiResponse_1.ApiResponse.error(res, result.message, 400, {
                errors: [{ path: 'otp', message: result.message }],
            });
        }
        const token = (0, generateToken_utils_1.generateToken)({
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
        });
        return ApiResponse_1.ApiResponse.success(res, { token }, 200, 'OTP verified successfully');
    }
    catch (err) {
        return ApiResponse_1.ApiResponse.error(res, 'Error verifying OTP', 500, {
            errors: [{ path: 'server', message: err.message }],
        });
    }
});
exports.verifyOtp = verifyOtp;
const resendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield auth_service_1.AuthService.isEmailTaken(email);
        if (!user) {
            return ApiResponse_1.ApiResponse.error(res, 'User not found', 404, {
                errors: [{ path: 'email', message: 'User does not exist' }],
            });
        }
        yield auth_service_1.AuthService.sendOtp(email);
        return ApiResponse_1.ApiResponse.success(res, null, 200, 'OTP resent successfully');
    }
    catch (err) {
        return ApiResponse_1.ApiResponse.error(res, 'Error resending OTP', 500, {
            errors: [{ path: 'server', message: err.message }],
        });
    }
});
exports.resendOtp = resendOtp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield auth_service_1.AuthService.loginUser({ email, password });
        if (result.error) {
            return ApiResponse_1.ApiResponse.error(res, result.message, result.statusCode, {
                errors: result.errors,
            });
        }
        if (!result.data) {
            return ApiResponse_1.ApiResponse.error(res, 'Account not verified', 403, {
                errors: [{ path: 'otp', message: 'Please verify your account using OTP' }],
            });
        }
        const token = (0, generateToken_utils_1.generateToken)(result.data);
        return ApiResponse_1.ApiResponse.success(res, { token, user: result.data }, 200, 'Login successful');
    }
    catch (err) {
        return ApiResponse_1.ApiResponse.error(res, 'Internal server error', 500, {
            errors: [{ path: 'server', message: err.message }],
        });
    }
});
exports.login = login;
