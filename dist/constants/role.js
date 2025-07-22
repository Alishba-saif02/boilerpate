"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.hasRole = exports.isValidRole = exports.ROLES = void 0;
// ---------- src/constants/roles.ts ----------
exports.ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    MODERATOR: 'MODERATOR'
};
// ✅ Enhanced validation function
const isValidRole = (role) => {
    return Object.values(exports.ROLES).includes(role);
};
exports.isValidRole = isValidRole;
// ✅ Role checking utilities
const hasRole = (userRole, allowedRoles) => {
    return allowedRoles.includes(userRole);
};
exports.hasRole = hasRole;
const isAdmin = (role) => {
    return role === exports.ROLES.ADMIN;
};
exports.isAdmin = isAdmin;
