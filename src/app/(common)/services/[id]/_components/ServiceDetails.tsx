import React from 'react';
import Image from 'next/image';
import HtmlConverter from '@/utils/htmlConverter';
import Link from 'next/link';

interface Service {
  id: string;
  image: string;
  title: string;
  shortDescription?: string;
  description?: string;
  createdAt: string;
  status: boolean;
}

interface ServiceDetailsPageProps {
  service: Service;
}

const ServiceDetails: React.FC<ServiceDetailsPageProps> = ({ service }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-2xl shadow-lg my-10">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#0f3d3e] mb-6 border-b-2 border-gray-200 pb-4">
        {service.title}
      </h1>

      {/* Featured Image */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-lg">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Short Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0f3d3e] mb-4">সংক্ষিপ্ত বিবরণ</h2>
        <p className="text-lg text-[#4A4A4A] leading-relaxed">
          <HtmlConverter html={service.shortDescription || ""} />
        </p>
      </div>



      {/* Full Description */}
      <div className="mb-8">
        <p className="text-lg text-[#4A4A4A] leading-relaxed whitespace-pre-line">
          <HtmlConverter html={service.description || ""} />
        </p>
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-gradient-to-r from-[#F7ECD3] to-[#FFF8E1] rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-[#0f3d3e] mb-4">
          আরও তথ্যের জন্য যোগাযোগ করুন
        </h3>
        <p className="text-lg text-[#4A4A4A] mb-6">
          আমাদের বিশেষজ্ঞ টিম আপনাকে সাহায্য করতে প্রস্তুত
        </p>
        <Link href="/contact-us" className="bg-gradient-to-r from-[#C89A0C] to-[#D4A72C] hover:from-[#b08a0a] hover:to-[#C89A0C] text-white text-xl font-semibold rounded-full px-10 py-4 transition-all duration-300 shadow-md cursor-pointer">
          যোগাযোগ করুন
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetails;