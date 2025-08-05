import mongoose, { Schema, Query, Model } from 'mongoose';
import { BlogCategoryDocument, BlogCategoryClientSafe } from '@/types/blog/base';

// Query helpers interface
export interface BlogCategoryQueryHelpers {
    byName(name: string): Query<BlogCategoryDocument | null, BlogCategoryDocument>;
    withPosts(): Query<BlogCategoryDocument[], BlogCategoryDocument>;
    bySlug(slug: string): Query<BlogCategoryDocument | null, BlogCategoryDocument>;
}

export interface BlogCategoryStaticMethods {
    findBySlug(slug: string): Promise<BlogCategoryDocument | null>;
    findPopular(limit?: number): Promise<BlogCategoryDocument[]>;
    findWithPagination(page: number, limit: number, filters?: object): Promise<{
        data: BlogCategoryDocument[]
        total: number
    }>;
}


// Static methods interface  
export interface BlogCategoryModel extends Model<BlogCategoryDocument, BlogCategoryQueryHelpers>, BlogCategoryStaticMethods {
    findBySlug(slug: string): Promise<BlogCategoryDocument | null>;
    findPopular(limit?: number): Promise<BlogCategoryDocument[]>;
    findWithPagination(page: number, limit: number, filters?: object): Promise<{ data: BlogCategoryDocument[]; total: number }>;
}

const blogCategorySchema = new Schema<BlogCategoryDocument, BlogCategoryModel, unknown, BlogCategoryQueryHelpers, unknown, BlogCategoryStaticMethods>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        index: true,
        unique: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    postCount: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'blog_categories'
});

// Indexes for performance
blogCategorySchema.index({ name: 1 }, { unique: true });
blogCategorySchema.index({ slug: 1 }, { unique: true });
blogCategorySchema.index({ postCount: -1 });

// Pre-save middleware to generate slug as fallback
blogCategorySchema.pre('save', function (next) {
    if (!this.slug || this.slug.trim() === '') {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    next();
});

// Instance methods
blogCategorySchema.methods.toClientSafe = function (): BlogCategoryClientSafe {
    return {
        id: this._id.toString(),
        name: this.name,
        description: this.description,
        slug: this.slug,
        postCount: this.postCount,
        createdAt: this.createdAt.toISOString(),
        updatedAt: this.updatedAt.toISOString()
    };
};

blogCategorySchema.methods.incrementPostCount = function () {
    this.postCount += 1;
    return this.save();
};

blogCategorySchema.methods.decrementPostCount = function () {
    if (this.postCount > 0) {
        this.postCount -= 1;
    }
    return this.save();
};

// Query helpers
blogCategorySchema.query.byName = function (this: Query<BlogCategoryDocument[], BlogCategoryDocument>, name: string) {
    return this.findOne({ name });
};

blogCategorySchema.query.withPosts = function (this: Query<BlogCategoryDocument[], BlogCategoryDocument>,) {
    return this.find({ postCount: { $gt: 0 } });
};

blogCategorySchema.query.bySlug = function (this: Query<BlogCategoryDocument[], BlogCategoryDocument>, slug: string) {
    return this.findOne({ slug });
};

// Static methods
blogCategorySchema.statics.findBySlug = function (this: Query<BlogCategoryDocument[], BlogCategoryDocument>, slug: string): Promise<BlogCategoryDocument | null> {
    return this.findOne({ slug });
};

blogCategorySchema.statics.findPopular = function (this: Query<BlogCategoryDocument[], BlogCategoryDocument>, limit: number = 10): Promise<BlogCategoryDocument[]> {
    return this.find({ postCount: { $gt: 0 } })
        .sort({ postCount: -1 })
        .limit(limit);
};

blogCategorySchema.statics.findWithPagination = async function (this: Query<BlogCategoryDocument[], BlogCategoryDocument>, page: number, limit: number, filters: object = {}): Promise<{ data: BlogCategoryDocument[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        this.find(filters).skip(skip).limit(limit),
        this.countDocuments(filters)
    ]);
    return { data, total };
};

// Model export
export const BlogCategoryModel = mongoose.models.BlogCategory ||
    mongoose.model<BlogCategoryDocument, BlogCategoryModel>('BlogCategory', blogCategorySchema);
