
import Image from "next/image";
import Link from "next/link";


type TblogItem = {
    id: string;
    image: string;
    title: string;
    description: string;
    status: boolean;
    author: string;
    subtitle: string;
    createdAt: string;
};

const BlogCard = (item: TblogItem) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-0 max-w-md mx-auto flex flex-col overflow-hidden border border-gray-100">
            {/* Blog Image */}
            <div className="p-4 pb-0">
                <Image
                    src={item.image} // Replace with your image path or prop
                    alt="Blog visual"
                    width={400}
                    height={220}
                    className="rounded-xl w-full h-56 object-cover"
                    unoptimized
                />
            </div>
            {/* Author and Date */}
            <div className="flex items-center gap-4 px-6 pt-4 pb-2 text-yellow-600 text-base font-medium">
                <span className="flex items-center gap-1">
                    <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    {item.author}
                </span>
                <span className="flex items-center gap-1">
                    <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z" />
                    </svg>
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </span>
            </div>
            {/* Title */}
            <h3 className="px-6 pt-2 text-xl font-bold text-[#0f3d3e] leading-snug">
                {item.title}
            </h3>
            {/* Excerpt */}
            <p className="px-6 pt-2 pb-4 text-gray-700 text-base">
                {item.subtitle}
            </p>
            {/* Read More Button */}
            <div className="px-6 pb-6">
                <Link
                    href={`/blogs/${item.id}`}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full px-8 py-3 transition w-fit"
                >
                    Read More
                    <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;