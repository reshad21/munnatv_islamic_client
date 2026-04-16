
import { getContactUs } from "@/services/contactus";
import { Youtube } from "lucide-react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";


const Topber = async () => {
  const topberResponse = await getContactUs([]);
  const topberList = topberResponse?.data?.data || topberResponse?.data || [];
  const topberData = Array.isArray(topberList) ? topberList[0] : topberList;
  
  // Fallback if no data
  if (!topberData) return null;

  return (
    <div className="w-full bg-brand">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-2 md:px-8 py-2 text-white text-xs md:text-sm">
        {/* Left: Contact Info */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1">
            <FaPhoneAlt className="inline-block" />
            <span className="font-semibold tracking-wide">{topberData.companyNumber}</span>
          </span>
          <span className="hidden md:inline-block">|</span>
          <span className="flex items-center gap-1">
            <FaEnvelope className="inline-block" />
            <span className="font-semibold tracking-wide">{topberData.companyEmail}</span>
          </span>
        </div>
        {/* Right: Social Icons */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={topberData.facebookUrl || "#"}
            className="w-8 h-8 flex items-center justify-center border border-white rounded bg-transparent hover:bg-white/10 transition-colors"
            target="_blank" rel="noopener noreferrer"
          >
            <FaFacebookF className="text-white text-base" />
          </a>
          <a
            href={topberData.instagramUrl || "#"}
            className="w-8 h-8 flex items-center justify-center border border-white rounded bg-transparent hover:bg-white/10 transition-colors"
            target="_blank" rel="noopener noreferrer"
          >
            <FaInstagram className="text-white text-base" />
          </a>
          <a
            href={topberData.youtubeUrl || "#"}
            className="w-8 h-8 flex items-center justify-center border border-white rounded bg-transparent hover:bg-white/10 transition-colors"
            target="_blank" rel="noopener noreferrer"
          >
            <Youtube className="text-white text-base" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topber;
