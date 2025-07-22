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
exports.sendEmail = void 0;
// src/utils/email.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // true for port 465, false for others
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = (email, message) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: `"YourApp Name" <${process.env.EMAIL_USER}>`, // sender address
        to: email,
        subject: 'Your OTP Code',
        text: message,
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}: ${info.messageId}`);
    }
    catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
});
exports.sendEmail = sendEmail;
