import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {  ChevronRight } from 'lucide-react';
import kabaimage from "../../../../public/BG (2).png";
import mosque from "../../../../public/icons/about-us.png"

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <section className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={kabaimage}
        alt="Kaaba background"
        fill
        className="object-cover opacity-60"
        priority
        unoptimized
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
        {/* Title */}
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center drop-shadow-2xl">
          {title}
        </h1>
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm md:text-base" aria-label="Breadcrumb">
          <Link 
            href="/" 
            className="text-yellow-400 flex items-center gap-1.5 hover:text-yellow-300 transition-colors duration-200"
          >
            {/* <Home size={18} /> */}
            <Image src={mosque} alt="Home" width={12} height={12} unoptimized/>
            <span>Home</span>
          </Link>
          
          <ChevronRight size={18} className="text-white/70" />
          
          <span className="text-white font-medium">{subtitle}</span>
        </nav>
      </div>
    </section>
  );
};

export default HeroSection;