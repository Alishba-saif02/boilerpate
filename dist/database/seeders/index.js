"use strict";
// src/database/seeders/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const client_1 = require("@prisma/client");
const admin_seeder_1 = require("./admin.seeder");
Object.defineProperty(exports, "seedAdmin", { enumerable: true, get: function () { return admin_seeder_1.seedAdmin; } });
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('🚀 Starting database seeding...');
            // Run all seeders
            yield (0, admin_seeder_1.seedAdmin)();
            console.log('✅ Database seeding completed successfully!');
        }
        catch (error) {
            console.error('❌ Database seeding failed:', error);
            process.exit(1);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];
if (command === 'fresh') {
    // Fresh seed: clear and reseed
    console.log('🔄 Running fresh seed...');
    main();
}
else if (command === 'admin') {
    // Seed only admin
    console.log('👤 Seeding admin only...');
    (0, admin_seeder_1.seedAdmin)().then(() => {
        console.log('✅ Admin seeding completed!');
        prisma.$disconnect();
    }).catch((error) => {
        console.error('❌ Admin seeding failed:', error);
        prisma.$disconnect();
        process.exit(1);
    });
}
else {
    // Default: run all seeders
    main();
}
