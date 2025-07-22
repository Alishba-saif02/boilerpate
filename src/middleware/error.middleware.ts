import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { ApiResponse } from '../utils/ApiResponse';

// Define custom error interface to extend Error with http-errors properties
interface HttpError extends Error {
    status?: number;
    statusCode?: number;
    expose?: boolean;
}

// Define Zod error interface
interface ValidationError extends Error {
    name: 'ZodError';
    errors: any[];
}

// Define Prisma error interface
interface PrismaError extends Error {
    name: 'PrismaClientKnownRequestError';
    code?: string;
}

export const errorHandler = (
    err: HttpError | ValidationError | PrismaError | Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Handle HTTP errors (from http-errors package)
    if (createError.isHttpError(err)) {
        ApiResponse.error(
            res,
            err.message,
            err.status || err.statusCode || 500,
            err.expose ? err : null
        );
        return;
    }

    // Handle Zod validation errors
    if (err.name === 'ZodError') {
        const zodError = err as ValidationError;
        ApiResponse.validationError(
            res,
            'Validation failed',
            zodError.errors
        );
        return;
    }

    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        ApiResponse.error(
            res,
            'Database operation failed',
            400,
            process.env.NODE_ENV === 'development' ? err : null
        );
        return;
    }

    // Default error
    ApiResponse.serverError(
        res,
        process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    );
};