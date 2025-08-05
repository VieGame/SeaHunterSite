import { z } from 'zod';

// Base Blog Schema
export const blogBaseSchema = z.object({
    _id: z.string(),
    title: z.string()
        .min(0, 'Title is required')
        .trim(),
    excerpt: z.string()
        .min(0, 'Excerpt must be at least 10 characters')
        .trim(),
    content: z.string()
        .min(0, 'Content must be at least 50 characters'),
    featuredImage: z.string().url('Featured image must be a valid URL'),
    category: z.union([z.string(), z.object({}).loose()]),
    tags: z.union([
        z.array(z.string()),
        z.array(z.object({}).loose())
    ]),
    status: z.string(),
    publishDate: z.string().datetime().optional(),
    author: z.union([z.string(), z.object({}).loose()]),
    slug: z.string()
        .min(0, 'Slug is required')
        .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    readingTime: z.number().min(0),
    viewCount: z.number().min(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});


// CLIENT-SAFE RESPONSE SCHEMAS
export const blogClientSafeSchema = z.object({
    _id: z.union([z.string(), z.object({}).loose()]).transform((val) => (typeof val === 'string' ? val : val.toString())),
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
    featuredImage: z.string(),
    category: z.union([z.string(), z.object({}).loose()]),
    tags: z.union([
        z.array(z.string()),
        z.array(z.object({}).loose())
    ]),
    status: z.string(),
    publishDate: z.union([z.string(), z.date()]).transform((val) => (new Date(val)).toISOString()).optional(),
    author: z.union([z.string(), z.object({}).loose()]),
    slug: z.string(),
    readingTime: z.number(),
    viewCount: z.number(),
    categoryName: z.string().optional(),
    categorySlug: z.string().optional(),
    tagDetails: z.array(z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string()
    })).optional(),
    authorName: z.string().optional(),
    createdAt: z.union([z.string(), z.date()]).transform((val) => (new Date(val)).toISOString()),
    updatedAt: z.union([z.string(), z.date()]).transform((val) => (new Date(val)).toISOString())
});

// Filter Schemas
export const blogFiltersSchema = z.object({
    page: z.string()
        .regex(/^\d+$/, 'Page must be a number')
        .nullable()
        .transform(Number)
        .refine(n => n > 0, 'Page must be greater than 0')
        .default(1),
    limit: z.string()
        .regex(/^\d+$/, 'Limit must be a number')
        .transform(Number)
        .refine(n => n > 0 && n <= 50, 'Limit must be between 1 and 50').default(10),
    category: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID')
        .nullable(),
    tag: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid tag ID')
        .nullable(),
    author: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid author ID')
        .nullable(),
    status: z.enum(['draft', 'published', 'archived'])
        .nullable(),
    search: z.string()
        .max(100, 'Search query must not exceed 100 characters')
        .trim()
        .nullable(),
    dateFrom: z.iso
        .datetime()
        .nullable(),
    dateTo: z.iso
        .datetime()
        .nullable(),
    sortBy: z.enum(['publishDate', 'title', 'viewCount', 'createdAt'])
        .default('publishDate'),
    sortOrder: z.enum(['asc', 'desc'])
        .default('desc')
});