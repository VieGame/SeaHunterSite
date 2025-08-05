'use client';
import { useBlogs } from '@/hooks/useBlogs';
import BlogCard from '../BlogCard';

export default function NewsSection() {
    const { data: blogsData, isLoading, error } = useBlogs({
        limit: 3,
        sort: '-createdAt',
        featured: true
    });

    if (isLoading) {
        return (
            <section id='news' className="py-16 lg:py-24 bg-dark relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        {/* Divider */}
                        <div className="h-0 relative mb-6">
                            <svg width="100%" height="1" viewBox="0 0 1536 1" className="w-full">
                                <line x1="0" y1="0.5" x2="1536" y2="0.5" stroke="#21262d" strokeWidth="1" />
                            </svg>
                        </div>
                        <h2 className="text-h3 md:text-h2 font-svn-gilroy font-bold text-white mb-6">
                            News & Updates
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden animate-pulse">
                                <div className="h-48 bg-white/10" />
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-white/10 rounded w-3/4" />
                                    <div className="h-3 bg-white/10 rounded w-1/2" />
                                    <div className="space-y-2">
                                        <div className="h-3 bg-white/10 rounded" />
                                        <div className="h-3 bg-white/10 rounded w-5/6" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id='news' className="pt-[84px] pb-[82px]">
                <div className="container border-t border-t-[#21262D] mx-auto px-4 max-w-[1344px]">
                    <div className='flex flex-col gap-[18px]'>
                        <h2 className="text-h4 font-bold text-white">
                            News & Updates
                        </h2>
                        <p className="text-body font-svn-gilroy text-w-300">
                            Unable to load news articles at this time. Please try again later.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const blogs = blogsData?.data || [];

    return (
        <section id='news' className="pt-[84px] pb-[82px]">
            <div className="container mx-auto px-4 max-w-[1344px]">
                <div className='flex flex-col border-t pt-[18px] border-t-[#21262D] gap-[18px]'>
                    <h2 className="text-h4 font-bold text-white">
                        News & Updates
                    </h2>
                    {/* Articles Grid */}
                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="font-svn-gilroy text-body text-w-300 mb-6">
                                No news articles available at the moment.
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-squada-one text-title px-8 py-3 rounded-lg transition-colors duration-200">
                                Check Back Later
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
