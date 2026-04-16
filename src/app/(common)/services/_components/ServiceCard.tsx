import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Service {
  id: string;
  image: string;
  title: string;
  shortDescription?: string;
  description?: string;
  createdAt: string;
  status: boolean;
}

interface ServiceCardProps {
  service: Service;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0 }) => {
  return (
    <div className="relative shadow-lg bg-white rounded-3xl px-4 py-3 flex flex-col items-center text-center max-w-xs mx-auto hover:shadow-2xl transition-all duration-300 group/card">
      {/* Badge */}
      <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#F7ECD3] to-[#E5D5A0] flex items-center justify-center text-[#0f3d3e] text-xs font-bold select-none shadow-sm">
        {String(index + 1).padStart(2, '0')}
      </span>
      
      {/* Icon/Image Container with Background */}
      <div className="mb-3 relative w-16 h-16 flex items-center justify-center">
        {/* Decorative background circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7ECD3]/30 to-[#E5D5A0]/20 rounded-full scale-110 group-hover/card:scale-115 transition-transform duration-300"></div>
        
        {/* Image */}
        <div className="relative w-full h-full z-10 rounded-full overflow-hidden">
          <Image 
            src={service.image} 
            alt={service.title} 
            fill
            className="object-cover drop-shadow-lg"
            unoptimized
          />
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-base font-bold text-[#0f3d3e] mb-2 leading-tight min-h-[28px] flex items-center justify-center">
        {service.title}
      </h3>
      
      {/* Description */}
      <p className="text-md text-[#4A4A4A] font-normal mb-3 leading-relaxed flex-grow line-clamp-2">
        {service.shortDescription || service.description || 'No description available'}
      </p>
      
      {/* Read More Link */}
      <Link 
        href={`/services/${service.id}`}
        className="w-full flex items-center justify-between bg-gradient-to-r from-[#C89A0C] to-[#D4A72C] hover:from-[#b08a0a] hover:to-[#C89A0C] text-sm font-semibold rounded-full px-3 py-1.5 transition-all duration-300 group shadow-md hover:shadow-xl no-underline"
      >
        <span className="text-white">Read More</span>
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
          <ArrowUpRight size={18} strokeWidth={2.5} className="text-white" />
        </span>
      </Link>
    </div>
  );
};

export default ServiceCard;