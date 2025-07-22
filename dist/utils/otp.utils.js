"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpExpiryTime = exports.generateOtp = void 0;
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
};
exports.generateOtp = generateOtp;
const otpExpiryTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10); // 10 minutes expiry
    return now;
};
exports.otpExpiryTime = otpExpiryTime;
