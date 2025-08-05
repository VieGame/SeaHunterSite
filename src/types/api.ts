export interface ApiError {
    success: boolean;
    error: string;
    code?: string;
    details?: unknown;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiPaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    message?: string;
}

// General Pagination Parameters
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string; // e.g., 'createdAt:desc'
}