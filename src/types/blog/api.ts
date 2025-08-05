
import { PaginationParams } from '@/types/api';


export interface BlogFilters {
    category?: string | null;
    tag?: string | null;
    author?: string | null;
    search?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
    featured?: boolean | null;
}

// Query Types (for React Query hooks)
export interface GetBlogsQuery extends PaginationParams, BlogFilters { }
export interface GetBlogQuery {
    id?: string;
    slug?: string;
    includeStats?: boolean;
}