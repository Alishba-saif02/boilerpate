// ---------- src/constants/roles.ts ----------
export const ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    MODERATOR: 'MODERATOR'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// ✅ Enhanced validation function
export const isValidRole = (role: string): role is Role => {
    return Object.values(ROLES).includes(role as Role);
};

// ✅ Role checking utilities
export const hasRole = (userRole: Role, allowedRoles: Role[]) => {
    return allowedRoles.includes(userRole);
};

export const isAdmin = (role: Role): boolean => {
    return role === ROLES.ADMIN;
};