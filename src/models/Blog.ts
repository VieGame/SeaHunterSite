import { BlogDocument } from '@/types/blog/base';
import mongoose, { Model, Query, QueryWithHelpers, Schema } from 'mongoose';

// Query helpers interface
export interface BlogQueryHelpers {
    published(): Query<BlogDocument[], BlogDocument>;
    byCategory(categoryId: string): QueryWithHelpers<BlogDocument[], BlogDocument, BlogQueryHelpers>;
    byAuthor(authorId: string): QueryWithHelpers<BlogDocument[], BlogDocument, BlogQueryHelpers>;
    recent(days?: number): Query<BlogDocument[], BlogDocument>;
    byStatus(status: string): Query<BlogDocument[], BlogDocument>;
}

// Static methods interface  
export interface BlogModel extends Model<BlogDocument, BlogQueryHelpers> {
    findBySlug(slug: string): Promise<BlogDocument | null>;
    findByCategory(categoryId: string): Promise<BlogDocument[]>;
    findByAuthor(authorId: string): Promise<BlogDocument[]>;
    findPublished(): Promise<BlogDocument[]>;
    findWithPagination(page: number, limit: number): Promise<{ data: BlogDocument[]; total: number }>;
}

const blogSchema = new Schema<BlogDocument, BlogModel, unknown, BlogQueryHelpers>({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        index: true
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 500
    },
    content: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'BlogCategory',
        required: true,
        index: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogTag',
        index: true
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
        index: true
    },
    publishDate: {
        type: Date,
        index: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    readingTime: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0,
        index: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'blog_posts'
});

// Indexes for performance
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });
blogSchema.index({ status: 1, publishDate: -1 });
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ author: 1, status: 1 });
blogSchema.index({ tags: 1, status: 1 });
blogSchema.index({ slug: 1 }, { unique: true });

// Pre-save middleware to generate slug and calculate reading time
blogSchema.pre('save', function (next) {
    // Generate slug if not provided
    if (!this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    // Calculate reading time (average 200 words per minute)
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);

    // Set publish date if status is being changed to published
    if (this.isModified('status') && this.status === 'published' && !this.publishDate) {
        this.publishDate = new Date();
    }

    next();
});

blogSchema.methods.incrementViewCount = function () {
    this.viewCount += 1;
    return this.save();
};

// Query helpers
blogSchema.query.published = function (this: Query<BlogDocument[], BlogDocument>) {
    return this.where({
        status: 'published',
        publishDate: { $lte: new Date() }
    });
};

blogSchema.query.byCategory = function (this: Query<BlogDocument[], BlogDocument>, categoryId: string) {
    return this.where({ category: categoryId }) as QueryWithHelpers<BlogDocument[], BlogDocument, BlogQueryHelpers>;
};

blogSchema.query.byAuthor = function (this: Query<BlogDocument[], BlogDocument>, authorId: string) {
    return this.where({ author: authorId }) as QueryWithHelpers<BlogDocument[], BlogDocument, BlogQueryHelpers>;
};

blogSchema.query.recent = function (this: Query<BlogDocument[], BlogDocument>, days: number = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return this.where({ createdAt: { $gte: cutoff } });
};

blogSchema.query.byStatus = function (this: Query<BlogDocument[], BlogDocument>, status: string) {
    return this.where({ status });
};

// Static methods
blogSchema.statics.findByCategory = function (categoryId: string): Promise<BlogDocument[]> {
    return this.find()
        .byCategory(categoryId)
        .published()
        .sort({ publishDate: -1 });
};

blogSchema.statics.findByAuthor = function (authorId: string): Promise<BlogDocument[]> {
    return this.find()
        .byAuthor(authorId)
        .published()
        .sort({ publishDate: -1 });
};

blogSchema.statics.findPublished = function (): Promise<BlogDocument[]> {
    return this.find()
        .published()
        .sort({ publishDate: -1 });
};

blogSchema.statics.findBySlug = function (slug: string): Promise<BlogDocument | null> {
    return this.findOne({ slug });
};

blogSchema.statics.findWithPagination = async function (page: number, limit: number): Promise<{ data: BlogDocument[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        this.find().skip(skip).limit(limit),
        this.countDocuments()
    ]);
    return { data, total };
};

export const BlogModel = mongoose.models.Blog || mongoose.model<BlogDocument, BlogModel>('Blog', blogSchema);