export interface ApiResponse {
    error?: string;
    statusCode: number;
    message?: Array<{property: string; constraint: string}>
}