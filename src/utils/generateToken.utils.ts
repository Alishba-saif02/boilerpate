import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateToken = (payload: { id: number, email: string, role: string }): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};
export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};
