import Image from "next/image";
import img2 from "../../../../../public/icons/about-us.png";
// Header Component
const TestimonialHeader = () => (
  <div className="flex items-center justify-center mb-10 gap-2 text-white font-semibold text-lg">
          <Image src={img2} alt="icon" width={24} height={24} unoptimized/>
          <span>ভ্রমণকারীর প্রশংসাপত্র</span>
        </div>
);
export default TestimonialHeader;