import React from "react";
import img2 from "../../../../../public/icons/about-us.png";
import Image from "next/image";
import { getHeroSection } from "@/services/Hero-section";
const PackageHeader = async () => {
  const packageTitle = await getHeroSection([]);
  const dynamicTitle = packageTitle?.data?.[0]?.packageTitle;
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={img2}
            alt="package icon"
            width={24}
            height={24}
            unoptimized
          />
          <span className="text-lg md:text-xl font-medium text-gray-700">
            আপনার হজ্জ প্যাকেজ
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d3e] text-center leading-tight">
          {dynamicTitle ? (
            dynamicTitle
          ) : (
            <>নিখুঁত হজ এবং ওমরাহ প্যাকেজটি খুঁজে নিন</>
          )}
        </h2>
      </div>
    </div>
  );
};

export default PackageHeader;
