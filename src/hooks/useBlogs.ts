import { ApiPaginatedResponse, ApiResponse } from '@/types/api';
import {
    GetBlogQuery,
    GetBlogsQuery,
} from '@/types/blog/api';
import { BlogClientSafe } from '@/types/blog/base';
import { useQuery, } from '@tanstack/react-query';

// Blog Hooks
export function useBlogs(params: GetBlogsQuery) {
    return useQuery({
        queryKey: ['blogs', params],
        queryFn: async (): Promise<ApiPaginatedResponse<BlogClientSafe>> => {
            const searchParams = new URLSearchParams();

            if (params.page) searchParams.set('page', params.page.toString());
            if (params.limit) searchParams.set('limit', params.limit.toString());
            if (params.sort) searchParams.set('sort', params.sort);
            if (params.category) searchParams.set('category', params.category);
            if (params.tag) searchParams.set('tag', params.tag);
            if (params.author) searchParams.set('author', params.author);
            if (params.search) searchParams.set('search', params.search);
            if (params.dateFrom) searchParams.set('dateFrom', params.dateFrom);
            if (params.dateTo) searchParams.set('dateTo', params.dateTo);
            if (params.featured) searchParams.set('featured', params.featured.toString());

            const response = await fetch(`/api/blog?${searchParams.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            return response.json();
        },
    });
}

export function useBlog(params: GetBlogQuery) {
    return useQuery({
        queryKey: ['blog', params.id || params.slug],
        queryFn: async (): Promise<ApiResponse<BlogClientSafe>> => {
            const endpoint = params.id ? `/api/blog/${params.id}` : `/api/blog/slug/${params.slug}`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }
            return response.json();
        },
        enabled: !!(params.id || params.slug),
    });
}