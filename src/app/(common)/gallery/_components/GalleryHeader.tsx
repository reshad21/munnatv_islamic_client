
import React from "react";

import img2 from "../../../../../public/icons/about-us.png";
import Image from "next/image";
const GalleryHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4 mb-8">
      {/* Icon and label */}
      <div className="flex items-center gap-2 mb-2">
        <Image src={img2} alt="gallery icon" width={24} height={24} unoptimized/>
        <span className="text-lg font-medium text-gray-700" style={{ fontFamily: 'Noto Sans Bengali, sans-serif' }}>গ্যালারি</span>
      </div>
      {/* Main heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d3e] text-center leading-tight">
        পবিত্র মসজিদ থেকে মনোরম দৃশ্য
      </h2>
    </div>
  );
};

export default GalleryHeader;
