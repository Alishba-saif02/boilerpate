// src/types/apiResponse.d.ts
export interface ApiResponse<T = any> {
    message: string;
    status: number;
    success: boolean;
    data: T | null;
}
