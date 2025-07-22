// src/database/seeders/index.ts

import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin.seeder';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('🚀 Starting database seeding...');

        // Run all seeders
        await seedAdmin();

        console.log('✅ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Database seeding failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === 'fresh') {
    // Fresh seed: clear and reseed
    console.log('🔄 Running fresh seed...');
    main();
} else if (command === 'admin') {
    // Seed only admin
    console.log('👤 Seeding admin only...');
    seedAdmin().then(() => {
        console.log('✅ Admin seeding completed!');
        prisma.$disconnect();
    }).catch((error) => {
        console.error('❌ Admin seeding failed:', error);
        prisma.$disconnect();
        process.exit(1);
    });
} else {
    // Default: run all seeders
    main();
}

export { seedAdmin };