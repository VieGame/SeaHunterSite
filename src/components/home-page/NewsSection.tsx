import { BlogService } from '@/data/blog';
import BlogCard from '../BlogCard';
import { BlogDocument } from '@/types/blog/base';

export default async function NewsSection() {
    let blogs: BlogDocument[] = [];

    try {
        // Fetch blogs using server-side rendering
        const blogsData = await BlogService.getBlogs({
            limit: 3,
            sort: 'publishDate:desc',
            featured: true,
            page: 1
        });

        // Use BlogDocument directly from the service
        blogs = blogsData.data;

    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        // blogs remains empty array, will show "no articles" message
    }

    return (
        <section id='news' className="pt-[84px] pb-[82px]">
            <div className="container mx-auto px-4 max-w-[1344px]">
                <div className='flex flex-col border-t pt-[18px] border-t-[#21262D] gap-[18px]'>
                    <h2 className="text-h4 leading-tight mb-3 font-bold text-white">
                        News & Updates
                    </h2>
                    {/* Articles Grid */}
                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id.toString()} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="font-svn-gilroy text-body text-white mb-6">
                                No news articles available at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
