// import { getHeroSection } from "@/services/Hero-section";
import { getHeroSection } from "@/services/Hero-section";
import img2 from "../../../../../public/icons/about-us.png";
import Image from "next/image";
const ServiceHeader =  async () => {
  const serviceTitle = await getHeroSection([]);
  const dynamicTitle = serviceTitle?.data?.[0]?.serviceTitle;

  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-2">
      <div className="flex items-center gap-2 mb-2">
        <Image src={img2} alt="service icon" width={24} height={24} unoptimized/>
        <span className="text-xl text-[#0f3d3e] font-medium">আমাদের সেবাসমূহ</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d3e] text-center leading-tight">
        {dynamicTitle ? (
          dynamicTitle
        ) : (
          <>
            আমাদের বিস্তৃত হজ ও ওমরাহ পরিবেশবাগুলি<br />
            আবিষ্কার করুন
          </>
        )}
        
      </h2>
    </div>
  );
};

export default ServiceHeader;
