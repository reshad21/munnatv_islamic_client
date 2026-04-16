import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Youtube } from 'lucide-react';
import footerImage from '../../../public/footerimage.png';
import sitelogo from '../../../public/hilful_fujul.png';
import { getContactUs } from '@/services/contactus';

// SVG Icons as separate components for better readability
const LocationIcon = () => (
  <svg width="32" height="32" fill="#FFC107" viewBox="0 0 24 24">
    <path d="M21 10.5a8.38 8.38 0 0 1-.9 3.8c-.2.4-.4.8-.7 1.2-.2.3-.5.6-.7.9-.2.2-.4.4-.6.6-.2.2-.4.3-.6.5-.2.1-.4.3-.6.4-.2.1-.4.2-.6.3-.2.1-.4.1-.6.2-.2 0-.4.1-.6.1-.2 0-.4 0-.6-.1-.2 0-.4-.1-.6-.2-.2-.1-.4-.2-.6-.3-.2-.1-.4-.3-.6-.4-.2-.2-.4-.3-.6-.5-.2-.2-.4-.4-.6-.6-.2-.3-.5-.6-.7-.9-.3-.4-.5-.8-.7-1.2A8.38 8.38 0 0 1 3 10.5C3 6.36 6.36 3 10.5 3S18 6.36 18 10.5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="28" height="28" fill="#FFC107" viewBox="0 0 24 24">
    <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Contact section component
const ContactSection = ({ phoneNumber }: { phoneNumber: string }) => (
  <div className="flex-1 flex flex-col gap-6 min-w-[250px]">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <LocationIcon />
        <span className="font-semibold text-lg">আবারও তথ্যের জন্য যোগাযোগ করুন</span>
      </div>
      <div className="flex items-center gap-2 text-yellow-400 text-2xl font-bold mb-2">
        <PhoneIcon />
        <span>{phoneNumber}</span>
      </div>
    </div>
    <hr className="border-yellow-600 my-4 opacity-60" />
  </div>
);

// Logo and description component
const LogoSection = ({ image, description }: { image: string; description: string }) => (
  <div className="flex flex-col items-center gap-2">
    <Image 
      src={image || sitelogo} 
      alt="Logo" 
      width={80} 
      height={80} 
      className="rounded-full bg-white p-1" 
      unoptimized
    />
    <p className="text-center text-gray-200 text-sm mt-2">{description}</p>
  </div>
);

// Info links component
const InfoLinks = () => (
  <div>
    <h4 className="font-bold mb-2">Information</h4>
    <ul className="space-y-1 text-gray-200">
      <li>হোম</li>
      <li>আমাদের সম্পর্কে</li>
      <li>সেবা</li>
      <li>যোগাযোগ</li>
      <li>আমাদের ব্লগ</li>
      <li>গ্যালারি</li>
    </ul>
  </div>
);

// Services links component
const ServicesLinks = () => (
  <div>
    <h4 className="font-bold mb-2">Our Services</h4>
    <ul className="space-y-1 text-gray-200">
      <li>ব্যবস্থা প্রস্তুতকারক</li>
      <li>থাকার ব্যবস্থা</li>
      <li>ফ্লাইট বুকিং</li>
      <li>নিরাপত্তা সেবা</li>
    </ul>
  </div>
);

// Location info component
const LocationInfo = ({ location, email }: { location: string; email: string }) => (
  <div>
    <h4 className="font-bold mb-2">Location</h4>
    <p className="text-gray-200">{location}</p>
    <a 
      href={`mailto:${email}`} 
      className="text-white underline font-bold block mt-2"
    >
      {email}
    </a>
  </div>
);

// Social media links component
const SocialLinks = ({ 
  facebookUrl, 
  instagramUrl, 
  youtubeUrl 
}: { 
  facebookUrl?: string; 
  instagramUrl?: string; 
  youtubeUrl?: string; 
}) => (
  <div className="flex-1 flex flex-col items-center md:items-end gap-6 min-w-[200px]">
    <div>
      <span className="font-semibold mb-2 block">Follow On Us</span>
      <div className="flex items-center gap-2 md:gap-3">
        <a
          href={facebookUrl || '#'}
          className="w-8 h-8 flex items-center justify-center border border-white rounded bg-transparent hover:bg-white/10 transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF className="text-white text-base" />
        </a>
        <a
          href={instagramUrl || '#'}
          className="w-8 h-8 flex items-center justify-center border border-white rounded bg-transparent hover:bg-white/10 transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="text-white text-base" />
        </a>
        <a
          href={youtubeUrl || '#'}
          className="w-8 h-8 flex items-center justify-center border border-white rounded bg-transparent hover:bg-white/10 transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <Youtube className="text-white text-base" />
        </a>
      </div>
    </div>
  </div>
);

// Main Footer component
const Footer = async () => {
  const topberResponse = await getContactUs([]);
  const topberList = topberResponse?.data?.data || topberResponse?.data || [];
  const topberData = Array.isArray(topberList) ? topberList[0] : topberList;

  if (!topberData) return null;

  const currentYear = new Date().getFullYear();
  const description = 'আপনার পবিত্র হজ্ব ও ওমরাহ তীর্থযাত্রার পরিকল্পনা এবং বুকিংয়ের জন্য আপনার বিশ্বস্ত অংশীদার, প্রার্থনায় আপনাকে স্বাগতম।';

  return (
    <footer 
      className="relative bg-black/80 text-white pt-10 pb-4" 
      style={{ 
        backgroundImage: `url(${footerImage.src})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-[1]" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-8">
        {/* Left section: Contact & Logo */}
        <div className="flex-1 min-w-[250px]">
          <ContactSection phoneNumber={topberData.companyNumber} />
          <LogoSection image={topberData.image} description={description} />
        </div>

        {/* Center section: Info & Services */}
        <div className=" flex flex-col md:flex-row gap-8 justify-center items-center md:items-start">
          <InfoLinks />
          <ServicesLinks />
          <LocationInfo 
            location={topberData.companyLocation} 
            email={topberData.companyEmail} 
          />
        </div>

        {/* Right section: Social */}
        <SocialLinks
          facebookUrl={topberData.facebookUrl}
          instagramUrl={topberData.instagramUrl}
          youtubeUrl={topberData.youtubeUrl}
        />
      </div>

      {/* Copyright section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-8">
        <hr className="border-yellow-600 opacity-60 mb-2" />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <span>© {currentYear} {topberData.title}. All Rights Reserved.</span>
          <span>
            Designed and Developed by{' '}
            <a 
              href="https://mntechdigital.com" 
              className="text-red-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MNTECH DIGITAL
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;