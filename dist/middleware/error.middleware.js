"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ApiResponse_1 = require("../utils/ApiResponse");
const errorHandler = (err, req, res, next) => {
    // Handle HTTP errors (from http-errors package)
    if (http_errors_1.default.isHttpError(err)) {
        ApiResponse_1.ApiResponse.error(res, err.message, err.status || err.statusCode || 500, err.expose ? err : null);
        return;
    }
    // Handle Zod validation errors
    if (err.name === 'ZodError') {
        const zodError = err;
        ApiResponse_1.ApiResponse.validationError(res, 'Validation failed', zodError.errors);
        return;
    }
    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        ApiResponse_1.ApiResponse.error(res, 'Database operation failed', 400, process.env.NODE_ENV === 'development' ? err : null);
        return;
    }
    // Default error
    ApiResponse_1.ApiResponse.serverError(res, process.env.NODE_ENV === 'development' ? err.message : 'Internal server error');
};
exports.errorHandler = errorHandler;
