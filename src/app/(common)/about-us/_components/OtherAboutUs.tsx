import Image from 'next/image';

import mosque from "../../../../../public/icons/about-us.png"
import groupImage from "../../../../../public/Group.png"
import lantern from "../../../../../public/BG image.png"
import kaba from "../../../../../public/Kaba Image.png"
import { getOtherAboutus } from '@/services/OtherAboutUs';

const OtherAboutUs = async() => {
    const otherAboutRes = await getOtherAboutus([]);
    const otherAboutData = otherAboutRes?.data;
    if (!otherAboutData) {
        return <div>No data available</div>;
    }
  return (
    <section className="relative w-full bg-[#6B6B6B] overflow-hidden font-[Tiro Bangla]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 min-h-[500px] lg:min-h-[610px]">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col justify-center gap-3 sm:gap-4 z-10 w-full lg:max-w-2xl">
          {/* Section label */}
          <div className="flex items-center gap-2 sm:gap-2.5 mb-1">
            <Image src={mosque} alt="mosque icon" width={20} height={20} className="opacity-90 sm:w-6 sm:h-6" unoptimized/>
            <span className="text-white text-sm sm:text-base font-medium tracking-wide">আমাদের যাত্রা</span>
          </div>
          {/* Heading */}
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-snug sm:leading-tight mb-2 sm:mb-3">
            {otherAboutData.title}
          </h1>
          {/* Subheading */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
            {otherAboutData.description}
          </p>
          {/* Stats */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 sm:gap-x-8 md:gap-x-12 sm:gap-y-6 mt-2 sm:mt-4">
            <div className="flex flex-col items-start">
              <span className="text-[#D4AF37] text-4xl sm:text-5xl md:text-6xl font-bold leading-none mb-1.5 sm:mb-2">{otherAboutData.experienceYears}+</span>
              <span className="text-white text-sm sm:text-base font-normal">বছরের অভিজ্ঞতা</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[#D4AF37] text-4xl sm:text-5xl md:text-6xl font-bold leading-none mb-1.5 sm:mb-2">{otherAboutData.servicesProvided}+</span>
              <span className="text-white text-sm sm:text-base font-normal">বিশ্বস্ত অংশীদার</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[#D4AF37] text-4xl sm:text-5xl md:text-6xl font-bold leading-none mb-1.5 sm:mb-2">{otherAboutData.trustedReviews}+</span>
              <span className="text-white text-sm sm:text-base font-normal max-w-[200px]">হজযাত্রীদের সেবা প্রদান করা হয়েছে</span>
            </div>
          </div>
        </div>

        {/* Right: Images */}
        <div className="flex-1 flex items-end justify-center lg:justify-end relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] mt-8 sm:mt-12 lg:mt-0 w-full">
          {/* Kaaba illustration - responsive positioning */}
          <div className="z-[15] absolute top-[45%] sm:top-[50%] left-[-5%] sm:left-[-7%] scale-75 sm:scale-90 lg:scale-100">
            <Image src={kaba} alt="Kaaba" width={110} height={110} className="drop-shadow-lg" unoptimized/>
          </div>
          {/* Two men images - responsive sizing */}
          <div className="flex gap-2 items-end relative z-[1]">
            <Image 
              src={otherAboutData.image} 
              alt="Men praying" 
              width={500} 
              height={450} 
              className="object-contain w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] h-auto"
              unoptimized 
            />
          </div>
          {/* Gold lantern SVG - responsive visibility and sizing */}
          <div className="absolute right-0 top-0 opacity-80 hidden md:block">
            <Image 
              src={lantern} 
              alt="Lantern" 
              width={140} 
              height={360} 
              className="object-contain w-[100px] md:w-[120px] lg:w-[140px] h-auto" 
              unoptimized
            />
          </div>
        </div>
      </div>
      {/* Top left mandala - responsive sizing */}
      <div className="absolute top-0 left-0 z-0 opacity-30">
        <Image 
          src={groupImage} 
          alt="Mandala" 
          width={280} 
          height={280} 
          className="object-contain w-[150px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-auto"
          unoptimized 
        />
      </div>
    </section>
  );
}

export default OtherAboutUs;