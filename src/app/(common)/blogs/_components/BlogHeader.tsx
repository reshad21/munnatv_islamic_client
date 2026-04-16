import img2 from "../../../../../public/icons/about-us.png";
import Image from "next/image";
const BlogHeader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="flex items-center gap-2 mb-2">
                <Image src={img2} alt="blog icon" width={24} height={24} unoptimized/>
                <span className="text-lg md:text-xl font-medium text-gray-700">
                    সাংস্কৃতিক ব্লগ
                </span>
            </div>
            <h2 className="text-3xl md:text-3xl font-bold text-[#0f3d3e] text-center leading-tight">
                আপনার পবিত্র যাত্রার জন্য নির্দেশিকা, গল্প{" "}
                <br className="hidden md:block" /> এবং অনুপ্রেরণা
            </h2>
        </div>
    );
};

export default BlogHeader;