import { getPackages } from "@/services/package";
import HomepageHero from "./_components/HomepageHero";
import AboutUs from "./about-us/_components/AboutUs";
import PackageHeader from "./hajj-packages/_components/PackageHeader";
import PackageSection from "./hajj-packages/_components/PackageSection";
import { TQuery } from "@/types/query.types";
import FivePillarOfIslam from "./about-us/_components/FIvePillarOfIslam";
import ServiceHeader from "./services/_components/ServiceHeader";
import HomeService from "./_components/HomeService";
import TestimonialSlider from "./_components/Reviews/TestimonialSlider";
import { getReviews } from "@/services/review";
import BlogHeader from "./blogs/_components/BlogHeader";
import BlogSection from "./blogs/_components/BlogSection";
import { getBlogs } from "@/services/blog";

export const dynamic = "force-dynamic";

const Home = async (props: {
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
  const packages = await getPackages(query);
  const reviewResponse = await getReviews([]);
  const reviews = reviewResponse?.data?.data || [];
  const blogResponse = await getBlogs([]);
  const blogsData = (blogResponse?.data?.data || []).slice(0, 3);
  return (
    <div>
      <HomepageHero />
      <AboutUs />
      <ServiceHeader />
      <HomeService searchParams={props.searchParams} />
      <PackageHeader />
      <PackageSection packages={packages?.data?.data} />
      <FivePillarOfIslam />
      <TestimonialSlider reviews={reviews} />
      <BlogHeader />
      <BlogSection blogs={blogsData} />
    </div>
  );
};

export default Home;
