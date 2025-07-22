export const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
};

export const otpExpiryTime = (): Date => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10); // 10 minutes expiry
    return now;
};
