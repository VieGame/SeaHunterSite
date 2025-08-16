import { BlogDocument } from '@/types/blog/base';
import moment from 'moment';
import { getCldImageUrl } from 'next-cloudinary';

interface BlogCardProps {
    blog: BlogDocument;
}

export default function BlogCard({ blog }: BlogCardProps) {
    const imageUrl = blog.featuredImage.startsWith('http')
        ? blog.featuredImage
        : getCldImageUrl({ src: blog.featuredImage });
    const blogUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/blog/${blog.slug}`;
    return (
        <a
            href={blogUrl}
            className="bg-transparent"
        >
            {/* Article Image */}
            <div className="mb-3">
                <img
                    src={imageUrl}
                    alt={blog.title}
                    className="object-cover aspect-video rounded-2xl block"
                />
            </div>

            {/* Article Content */}
            <div className="space-y-2">
                <h3 className="text-title font-bold text-[#d7dde4] line-clamp-2">
                    {blog.title}
                </h3>
                <p className="text-body text-[#D1DCEB9E]">
                    {moment(blog.createdAt).format('MMM D, YYYY')}
                </p>
            </div>
        </a>
    );
}