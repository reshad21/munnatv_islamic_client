import React from "react";
import Image from "next/image";
import mosque from "../../../../../public/icons/about-us.png";
import fivepillarbg from "../../../../../public/fivepillarbg.png";
import { getFivePillars } from "@/services/fivePillar";

interface Pillar {
  id: string;
  order: string;
  title: string;
  description: string;
  image: string;
}

const FivePillarOfIslam = async () => {
  const fivePillarRes = await getFivePillars([]);
  const fivePillarData = fivePillarRes?.data?.data;

  if (!fivePillarData || fivePillarData.length === 0) {
    return (
      <div className="col-span-full py-4 text-center text-gray-500">
        No Data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image src={mosque} alt="mosque icon" width={40} height={40} unoptimized/>
          </div>
          <h2 className="text-amber-800 text-lg font-semibold">
            ইসলামের পাঁচটি স্তম্ভ
          </h2>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          ইসলামের মৌলিক পাঁচ স্তম্ভ
        </h1>

        <p className="text-gray-600 text-lg max-w-4xl">
          ইসলাম পাঁচটি স্তম্ভের উপর প্রতিষ্ঠিত। প্রতিটি মুসলিমকে এই পাঁচটি নীতির
          উপর দৃঢ়ভাবে বিশ্বাস রাখতে হবে। সকল মুসলিমকে এইসব সাথে প্রথম তিনটি
          নীতি যথাসম্ভব পালন করতে হবে, এবং শেষ দুটি নীতি যথাসম্ভব পালন করতে হবে।
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {fivePillarData.map((pillar: Pillar) => (
          <div key={pillar.id} className="relative min-h-[450px]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={fivepillarbg}
                alt="pillar background"
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="relative p-6 pt-8 flex flex-col items-center">
              {/* Number Badge */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">
                    {pillar.order}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-center text-gray-800 font-bold text-lg mb-6 min-h-[3rem] flex items-center justify-center px-2">
                {pillar.title}
              </h3>

              {/* Image */}
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full border-4 border-amber-600 overflow-hidden bg-white shadow-lg">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm text-center leading-relaxed px-2">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FivePillarOfIslam;
