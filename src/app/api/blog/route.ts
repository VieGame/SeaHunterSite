/**
 * @deprecated This file will be refactored to use BlogService from @/data/blog in v2.0
 * MIGRATE: Use BlogService DAL pattern with proper typing and validation
 * Current implementation maintained for compatibility
 */

import { BlogService } from '@/data/blog';
import connectDB from '@/lib/mongodb';
import { blogClientSafeSchema, blogFiltersSchema } from '@/lib/validation/blog';
import { ApiError, ApiPaginatedResponse } from '@/types/api';
import { BlogClientSafe } from '@/types/blog/base';
import { NextRequest, NextResponse } from 'next/server';

// GET - List blog posts with pagination and filters
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '10';
        const category = searchParams.get('category');
        const tag = searchParams.get('tag');
        const author = searchParams.get('author');
        const search = searchParams.get('search');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');
        const sortBy = searchParams.get('sortBy') || 'publishDate';
        const sortOrder = searchParams.get('sortOrder') || 'desc';

        const filterParams = blogFiltersSchema.safeParse({
            category,
            tag,
            author,
            search,
            dateFrom,
            dateTo,
            page,
            limit,
            sortBy: sortBy,
            sortOrder,
            featured: searchParams.get('featured') === 'true',
            status: 'published'
        });

        if (!filterParams.success) {
            const apiError: ApiError = {
                success: false,
                error: 'Invalid filter parameters',
                code: 'INVALID_FILTER_PARAMS',
            }
            return NextResponse.json(apiError, { status: 400 });
        }

        const paginatedPosts = await BlogService.getBlogs(filterParams.data);


        // Sanitize posts data
        const sanitizedPosts = paginatedPosts.data.map((post) => {
            const sanitizedPost = blogClientSafeSchema.safeParse(post);
            if (!sanitizedPost.success) {
                console.error('Blog post validation error:', sanitizedPost.error);
                throw new Error('Invalid blog post data');
            }
            return sanitizedPost.data;
        });

        const response: ApiPaginatedResponse<BlogClientSafe> = {
            success: true,
            data: sanitizedPosts,
            pagination: paginatedPosts.pagination,
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Blog posts fetch error:', error);
        const errorResponse: ApiError = {
            success: false,
            error: 'Failed to fetch blog posts',
            code: 'BLOG_FETCH_FAILED'
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}