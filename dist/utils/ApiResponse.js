"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static serverError(res, arg1) {
        throw new Error('Method not implemented.');
    }
    static validationError(res, arg1, errors) {
        throw new Error('Method not implemented.');
    }
    static success(res, data = {}, statusCode = 200, message = 'Success') {
        return res.status(statusCode).json(Object.assign({ error: false, message }, data));
    }
    static error(res, message = 'Something went wrong', statusCode = 500, meta = {}) {
        return res.status(statusCode).json({
            error: true,
            message,
            errors: meta.errors || [],
        });
    }
}
exports.ApiResponse = ApiResponse;
