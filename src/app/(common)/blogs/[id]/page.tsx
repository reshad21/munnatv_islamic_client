/* eslint-disable @typescript-eslint/no-explicit-any */



import { getBlogsById } from '@/services/blog';
import HeroSection from '../../_components/HeroSection';
import BlogDetails from './_components/BlogDetails';


interface PageProps {
  params?: Promise<{ id: string }>;
  searchParams?: Promise<any>;
}

const BlogDetailsPage = async ({ params }: PageProps) => {
  const awaitedParams = params ? await params : { id: "" };
  const { id } = awaitedParams;
    const blogDetails = await getBlogsById(id);
    const blogData = blogDetails?.data;
    return (
        <div>
            <HeroSection title="Blog Details" subtitle="Blog Details" />
            <BlogDetails key={blogDetails.id} {...blogData} />
        </div>
    );
};

export default BlogDetailsPage;