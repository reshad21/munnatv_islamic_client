import React from 'react';
import HeroSection from '../_components/HeroSection';
import BlogHeader from './_components/BlogHeader';
import BlogSection from './_components/BlogSection';
import { TQuery } from '@/types/query.types';
import { getBlogs } from '@/services/blog';

const BlogPage = async (props: {
    searchParams: Promise<{ search: string; page: string }>;
}) => {
    const searchParams = await props.searchParams;
    const search = searchParams.search || "";
    const page = parseInt(searchParams.page) || 1;
    const query: TQuery[] = [
        {
            key: "orderBy",
            value: JSON.stringify({
                createdAt: "desc",
            }),
        },
        {
            key: "searchTerm",
            value: search,
        },
        {
            key: "page",
            value: page.toString(),
        },
        {
            key: "limit",
            value: "10",
        },
    ];

    const blogsData = await getBlogs(query);

    return (
        <div>
            <HeroSection title="Blog" subtitle="Blog" />
            <BlogHeader />
            <BlogSection blogs={blogsData?.data?.data} />
        </div>
    );
};

export default BlogPage;