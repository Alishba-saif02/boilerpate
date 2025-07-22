// src/utils/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // true for port 465, false for others
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (email: string, message: string) => {
    const mailOptions = {
        from: `"YourApp Name" <${process.env.EMAIL_USER}>`, // sender address
        to:email,
        subject: 'Your OTP Code',
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}: ${info.messageId}`);
    } catch (error: any) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
};
