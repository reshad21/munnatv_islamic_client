import React from "react";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import mosque from "../../../../public/icons/about-us.png";
import heroBg from "../../../../public/Hero BG Image.png";
import { getHeroSection } from "@/services/Hero-section";
import { HeroSlider } from "./HeroSlider";
import Link from "next/link";

interface HomepageHeroProps {
  height?: string;
}

const HomepageHero = async ({ height = 'calc(100vh - 80px)' }: HomepageHeroProps) => {
  const heroDataResponse = await getHeroSection([]);
  const heroDataArr = Array.isArray(heroDataResponse?.data) ? heroDataResponse.data : [];
  const heroData = heroDataArr[0];

  if (!heroData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center">
          <p className="text-gray-600 text-lg">কোন তথ্য পাওয়া যায়নি</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
      style={{ height }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src={heroBg}
          alt="Hero background"
          fill
          className="object-cover opacity-40"
          priority
          unoptimized
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-12">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Icon with Text */}
            <div className="flex items-center gap-3 text-yellow-500">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image src={mosque} alt="mosque icon" width={32} height={32} unoptimized/>
              </div>
              <span className="text-lg font-medium">
                হজ্জ অ্যাজেন্সী স্বাগতম!
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight">
                {heroData.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
              {heroData.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <Link
                href="/hajj-packages"
                className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 text-sm md:text-base"
              >
                Explore Packages
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={heroData.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 border border-white/20 text-sm md:text-base"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-slate-900 fill-slate-900 ml-1" />
                </div>
                Play Video
              </a>
            </div>
          </div>

          {/* Right Content - Image Slider */}
          <div className="relative flex justify-center lg:justify-end w-full">
            <div className="relative w-full">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-48 h-48 md:w-72 md:h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-48 h-48 md:w-72 md:h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

              {/* Image Container */}
              <div className="relative z-10 w-full">
                <HeroSlider sliderItems={heroData.images} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
