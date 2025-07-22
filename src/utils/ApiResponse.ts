// utils/ApiResponse.ts
import { Response } from 'express';

export class ApiResponse {
    static success(
        res: Response,
        data: any = null,
        statusCode: number = 200,
        message: string = 'Success'
    ) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static error(
        res: Response,
        message: string = 'Error',
        statusCode: number = 500,
        meta: any = {}
    ) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...meta,
        });
    }
}
