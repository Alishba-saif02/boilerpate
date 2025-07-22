// src/middleware/role.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const requireAdmin = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();
    };
};

export const authorizeRole = (role: 'USER' | 'ADMIN') => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            return res.status(403).json({
                error: true,
                message: 'Forbidden - Insufficient rights',
                errors: [
                    {
                        path: 'role',
                        message: `Only ${role}s are allowed to perform this action`
                    }
                ]
            });
        }
        next();
    };
};

export const isOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (req.user?.role === 'ADMIN' || req.user?.userId === id) {
        return next();
    }

    return res.status(403).json({
        error: true,
        message: 'Forbidden - Not allowed',
        errors: [
            {
                path: 'access',
                message: 'Only owner or admin can perform this action'
            }
        ]
    });
};
