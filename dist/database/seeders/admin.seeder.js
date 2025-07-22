"use strict";
// src/database/seeders/admin-seeder.ts
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
exports.seedAdmin = seedAdmin;
exports.removeAdmin = removeAdmin;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const role_1 = require("../../constants/role");
const prisma = new client_1.PrismaClient();
function seedAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('🌱 Starting admin seeder...');
            // Check if admin already exists
            const existingAdmin = yield prisma.user.findFirst({
                where: { role: role_1.ROLES.ADMIN }
            });
            if (existingAdmin) {
                console.log('✅ Admin user already exists, skipping...');
                return;
            }
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12);
            // Create admin user
            const adminUser = yield prisma.user.create({
                data: {
                    email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
                    password: hashedPassword,
                    username: process.env.ADMIN_NAME || 'System Administrator',
                    role: role_1.ROLES.ADMIN,
                    isVerified: true, // Admin should be pre-verified
                },
            });
            console.log('✅ Admin user created successfully:');
            console.log(`   Email: ${adminUser.email}`);
            console.log(`   Name: ${adminUser.username}`);
            console.log(`   Role: ${adminUser.role}`);
            console.log(`   ID: ${adminUser.id}`);
        }
        catch (error) {
            console.error('❌ Error creating admin user:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
seedAdmin();
function removeAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('🗑️  Removing admin users...');
            const result = yield prisma.user.deleteMany({
                where: { role: role_1.ROLES.ADMIN }
            });
            console.log(`✅ Removed ${result.count} admin user(s)`);
        }
        catch (error) {
            console.error('❌ Error removing admin users:', error);
            throw error;
        }
    });
}
