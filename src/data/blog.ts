import mongoose, { RootFilterQuery } from 'mongoose';
import connectDB from '@/lib/mongodb';
import { BlogDocument } from '@/types/blog/base';
import {
    BlogFilters
} from '@/types/blog/api';
import { PaginationParams } from '@/types/api';

// Import models (these will be created)
import { BlogModel } from '@/models/Blog';
import { BlogCategoryModel } from '@/models/BlogCategory';
import { BlogTagModel } from '@/models/BlogTag';
import UserModel from '@/models/User';

// DAL handles complex business logic, transactions, multiple models
// DAL returns Mongoose documents - API layer handles client-safe transformations
export class BlogService {

    static async getBlogById(id: string): Promise<BlogDocument | null> {
        await connectDB();

        const blog = await BlogModel.findById(id)
            .populate('category', 'name slug')
            .populate('tags', 'name slug')
            .populate('author', 'name avatar');

        return blog;
    }

    static async getBlogBySlug(slug: string): Promise<BlogDocument | null> {
        await connectDB();

        const blog = await BlogModel.findOne({ slug })
            .populate('category', 'name slug')
            .populate('tags', 'name slug')
            .populate('author', 'name avatar');

        return blog;
    }

    static async getBlogs(params: PaginationParams & BlogFilters) {
        await connectDB();

        const { page = 1, limit = 10, sort = 'publishDate:desc', category, tag, author, search, dateFrom, dateTo } = params;

        // Build query
        let query = BlogModel.find<BlogDocument>();

        query = query.where({ status: 'published' });


        if (category) {
            // Support both ObjectId and slug
            if (mongoose.Types.ObjectId.isValid(category)) {
                query = query.where({ category });
            } else {
                const categoryDoc = await BlogCategoryModel.findOne({ slug: category });
                if (categoryDoc) {
                    query = query.where({ category: categoryDoc._id });
                }
            }
        }

        if (tag) {
            // Support both ObjectId and slug
            if (mongoose.Types.ObjectId.isValid(tag)) {
                query = query.where({ tags: tag });
            } else {
                const tagDoc = await BlogTagModel.findOne({ slug: tag });
                if (tagDoc) {
                    query = query.where({ tags: tagDoc._id });
                }
            }
        }

        if (author) {
            query = query.where({ author });
        }

        if (search) {
            query = query.where({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { excerpt: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } }
                ]
            });
        }

        if (dateFrom || dateTo) {
            const dateFilter: RootFilterQuery<BlogDocument> = {};
            if (dateFrom) dateFilter.$gte = new Date(dateFrom);
            if (dateTo) dateFilter.$lte = new Date(dateTo);
            query = query.where({ publishDate: dateFilter });
        }

        // Apply sorting
        const [sortField, sortOrder] = sort.split(':');
        const sortObject: Record<string, mongoose.SortOrder> = {};
        sortObject[sortField] = sortOrder === 'desc' ? -1 : 1;
        query = query.sort(sortObject);

        // Apply pagination
        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            query.clone()
                .skip(skip)
                .limit(limit)
                .populate({ path: 'category', select: 'name slug', model: BlogCategoryModel })
                .populate({ path: 'tags', select: 'name slug', model: BlogTagModel })
                .populate({ path: 'author', select: 'name avatar', model: UserModel }),
            query.clone().countDocuments()
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: blogs,
            total,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    }

    static async incrementViewCount(id: string): Promise<BlogDocument | null> {
        await connectDB();

        const blog = await BlogModel.findByIdAndUpdate(
            id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );

        return blog;
    }
}
