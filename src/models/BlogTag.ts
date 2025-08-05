import mongoose, { Schema, Query, Model } from 'mongoose';
import { BlogTagDocument, BlogTagClientSafe } from '@/types/blog/base';


// Query helpers interface
export interface BlogTagQueryHelpers {
    byName(name: string): Query<BlogTagDocument | null, BlogTagDocument>;
    withPosts(): Query<BlogTagDocument[], BlogTagDocument>;
    bySlug(slug: string): Query<BlogTagDocument | null, BlogTagDocument>;
    popular(): Query<BlogTagDocument[], BlogTagDocument>;
}

// Static methods interface  
export interface BlogTagModel extends Model<BlogTagDocument, BlogTagQueryHelpers> {
    findBySlug(slug: string): Promise<BlogTagDocument | null>;
    findPopular(limit?: number): Promise<BlogTagDocument[]>;
    searchTags(searchTerm: string): Promise<BlogTagDocument[]>;
    findWithPagination(page: number, limit: number, filters?: object): Promise<{ data: BlogTagDocument[]; total: number }>;
}

const blogTagSchema = new Schema<BlogTagDocument, BlogTagModel, unknown, BlogTagQueryHelpers>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        index: true,
        unique: true
    },
    description: {
        type: String,
        maxlength: 250
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
    collection: 'blog_tags'
});

// Indexes for performance
blogTagSchema.index({ name: 1 }, { unique: true });
blogTagSchema.index({ slug: 1 }, { unique: true });
blogTagSchema.index({ postCount: -1 });

// Pre-save middleware to generate slug as fallback
blogTagSchema.pre('save', function (next) {
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
blogTagSchema.methods.toClientSafe = function (): BlogTagClientSafe {
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

blogTagSchema.methods.incrementPostCount = function () {
    this.postCount += 1;
    return this.save();
};

blogTagSchema.methods.decrementPostCount = function () {
    if (this.postCount > 0) {
        this.postCount -= 1;
    }
    return this.save();
};

// Static methods
blogTagSchema.statics.findBySlug = function (slug: string): Promise<BlogTagDocument | null> {
    return this.findOne({ slug });
};

blogTagSchema.statics.findPopular = function (limit: number = 20): Promise<BlogTagDocument[]> {
    return this.find({ postCount: { $gt: 0 } })
        .sort({ postCount: -1 })
        .limit(limit);
};

blogTagSchema.statics.searchTags = function (searchTerm: string): Promise<BlogTagDocument[]> {
    return this.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } }
        ]
    }).limit(20);
};

blogTagSchema.statics.findWithPagination = async function (page: number, limit: number, filters: object = {}): Promise<{ data: BlogTagDocument[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
        this.find(filters).skip(skip).limit(limit),
        this.countDocuments(filters)
    ]);
    return { data, total };
};

// Model export
export const BlogTagModel = mongoose.models.BlogTag ||
    mongoose.model<BlogTagDocument, BlogTagModel>('BlogTag', blogTagSchema);

export default BlogTagModel;
