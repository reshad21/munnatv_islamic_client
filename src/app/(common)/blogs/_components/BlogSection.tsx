import React from 'react';
import BlogCard from './BlogCard';

interface Blog {
    id: string;
    image: string;
    title: string;
    description: string;
    status: boolean;
    author: string;
    createdAt: string;
    subtitle: string;
}

const BlogSection = ({ blogs = [] }: { blogs: Blog[] }) => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-500">
                    No blogs found
                </div>
            ) : (
                blogs.map((blog) => (
                    <BlogCard key={blog.id} {...blog} />
                ))
            )}
        </div>
    );
};

export default BlogSection;