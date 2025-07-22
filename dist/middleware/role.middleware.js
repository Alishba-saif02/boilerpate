"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwnerOrAdmin = exports.authorizeRole = exports.requireAdmin = void 0;
const requireAdmin = (requiredRole) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();
    };
};
exports.requireAdmin = requireAdmin;
const authorizeRole = (role) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
            return res.status(403).json({
                error: true,
                message: 'Forbidden - Insufficient rights',
                errors: [{ path: 'role', message: `Only ${role}s are allowed to perform this action` }]
            });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
const isOwnerOrAdmin = (req, res, next) => {
    var _a, _b;
    const { id } = req.params;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'ADMIN' || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id.toString()) === id.toString()) {
        return next();
    }
    return res.status(403).json({
        error: true,
        message: 'Forbidden - Not allowed',
        errors: [{ path: 'access', message: 'Only owner or admin can perform this action' }],
    });
};
exports.isOwnerOrAdmin = isOwnerOrAdmin;
