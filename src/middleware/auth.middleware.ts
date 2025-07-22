// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { hasRole } from '../constants/role';

type JwtPayload = {
    id: string;
    email: string;
    role: Role;
};

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: true,
            message: 'Token is required',
            errors: [{ path: 'token', message: 'Token is missing' }],
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.user = {
            userId: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: 'Invalid token',
            errors: [{ path: 'token', message: 'Access denied' }],
        });
    }
};

export const authorize = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. User not authenticated.',
            });
        }

        if (!hasRole(req.user.role, allowedRoles)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.',
                required: allowedRoles,
                current: req.user.role,
            });
        }

        next();
    };
};
