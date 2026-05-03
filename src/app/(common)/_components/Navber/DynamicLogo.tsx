import { getContactUs } from "@/services/contactus";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import siteLogo from "../../../../../public/hilful_fujul.png";

const DynamicLogo = async () => {
  const topberResponse = await getContactUs([]);
  const topberList = topberResponse?.data?.data || topberResponse?.data || [];
  const topberData = Array.isArray(topberList) ? topberList[0] : topberList;
  
  if (!topberData) return null;
  
  const imageUrl = topberData?.image || siteLogo.src; // Use .src for static imports

  return (
    <div className="flex items-center gap-2">
      <Link href="/">
        <div className="w-12 h-12 rounded-full border-2 border-[#0E595C] overflow-hidden relative">
          <Image
            src={imageUrl}
            alt="Logo"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </Link>
    </div>
  );
};

export default DynamicLogo;