import { UserDocument } from '@/models/User';
import mongoose, { Document } from 'mongoose';

// 1. Base Type - Pure data structure for client/API
export interface Blog {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: string | Partial<BlogCategoryDocument>;
    tags: string[] | Partial<BlogTagDocument>[];
    status: string; // e.g., 'draft', 'published', 'archived'
    publishDate?: string;
    author: string | Partial<UserDocument>;
    slug: string;
    readingTime: number;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

// 2. Document Type - MongoDB document with ObjectId
export interface BlogDocument extends Document, Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'publishDate' | 'category' | 'author' | 'tags'> {
    _id: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId | Partial<BlogCategoryDocument>;
    tags: mongoose.Types.ObjectId[] | Partial<BlogTagDocument>[];
    author: mongoose.Types.ObjectId | Partial<UserDocument>;
    publishDate?: Date;
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    toClientSafe(): BlogClientSafe;
    incrementViewCount(): Promise<BlogDocument>;
    toObject(): Record<string, unknown>;
}

// 3. Client-Safe Type (for responses, excludes sensitive fields)
export interface BlogClientSafe extends Omit<Blog, 'author'> {
    _id: string; // String version of _id for client
    categoryName?: string;
    categorySlug?: string;
    tagDetails?: Array<{
        id: string;
        name: string;
        slug: string;
    }>;
    authorName?: string;
}

// 4. Populated Document Type (when references are populated)
export interface BlogDocumentPopulated extends Omit<BlogDocument, 'category' | 'author' | 'tags'> {
    category: Partial<BlogCategoryDocument>;
    author: Partial<UserDocument>;
    tags: Partial<BlogTagDocument>[];
}

// Blog Category Types
export interface BlogCategory {
    _id: string;
    name: string;
    description?: string;
    slug: string;
    postCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface BlogCategoryDocument extends Document, Omit<BlogCategory, '_id' | 'createdAt' | 'updatedAt'> {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    toClientSafe(): BlogCategoryClientSafe;
    incrementPostCount(): Promise<BlogCategoryDocument>;
    decrementPostCount(): Promise<BlogCategoryDocument>;
    toObject(): Record<string, unknown>;
}

export interface BlogCategoryClientSafe extends Omit<BlogCategory, '_id'> {
    id: string; // String version of _id for client
}

// Blog Tag Types
export interface BlogTag {
    _id: string;
    name: string;
    description?: string;
    slug: string;
    postCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface BlogTagDocument extends Document, Omit<BlogTag, '_id' | 'createdAt' | 'updatedAt'> {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;

    // Instance methods
    toClientSafe(): BlogTagClientSafe;
    incrementPostCount(): Promise<BlogTagDocument>;
    decrementPostCount(): Promise<BlogTagDocument>;
    toObject(): Record<string, unknown>;
}

export interface BlogTagClientSafe extends Omit<BlogTag, '_id'> {
    id: string; // String version of _id for client
}