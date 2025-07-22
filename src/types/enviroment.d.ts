// src/types/environment.d.ts
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            PORT?: string;
            DATABASE_URL: string;
            JWT_SECRET: string;
            JWT_EXPIRES_IN?: string;
            JWT_REFRESH_SECRET?: string;
            JWT_REFRESH_EXPIRES_IN?: string;
            JWT_ISSUER?: string;
            BCRYPT_SALT_ROUNDS?: string;
        }
    }
}

export { };