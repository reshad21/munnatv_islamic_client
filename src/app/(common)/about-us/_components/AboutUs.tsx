import Image from "next/image";
import img2 from "../../../../../public/icons/about-us.png";
import img3 from "../../../../../public/icons/about-us-1.png";
import img4 from "../../../../../public/icons/about-us-2.png";
import { getAboutus } from "@/services/About-us";
import Link from "next/link";

const AboutUs = async () => {
  const aboutusResponse = await getAboutus([]);
  const aboutUsData = aboutusResponse?.data;

  if (!aboutUsData) {
    return (
      <div className="col-span-full py-4 text-center text-gray-500">
        No Data found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 py-12 px-4 md:px-0">
      {/* Left: 2x2 grid of images */}
      <div className="w-full">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Left column - 2 images, top larger than bottom */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top left - larger image */}
            <div className="rounded-2xl overflow-hidden aspect-[3/4] relative">
              <Image
                src={aboutUsData.aboutUsImages[0].image}
                alt="about-1"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Bottom left - smaller image */}
            <div className="rounded-2xl overflow-hidden aspect-[3/2] relative">
              <Image
                src={aboutUsData.aboutUsImages[1].image}
                alt="about-2"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Right column - 2 images, top smaller than bottom */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top right - smaller image */}
            <div className="rounded-2xl overflow-hidden aspect-[3/2] relative">
              <Image
                src={aboutUsData.aboutUsImages[2].image}
                alt="about-3"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {/* Bottom right - larger image (Kaaba) */}
            <div className="rounded-2xl overflow-hidden aspect-[3/4] relative">
              <Image
                src={aboutUsData.aboutUsImages[3].image}
                alt="about-4"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col gap-6">
        {/* Section label */}
        <div className="flex items-center gap-2 text-yellow-600 font-semibold text-lg">
          <Image src={img2} alt="icon" width={24} height={24} unoptimized/>
          <span>আমাদের সম্পর্কে</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#184C43] leading-tight">
          {aboutUsData?.title}
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg">
          {aboutUsData?.description}
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Feature Cards Column */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            {/* Feature Card 1 */}
            <div className="flex items-start gap-4 bg-[#F8F8F8] rounded-xl p-5 shadow-sm">
              <Image src={img2} alt="icon" width={40} height={40} unoptimized/>
              <div>
                <h3 className="font-bold text-lg text-[#184C43]">
                  {aboutUsData.featureTitle1}
                </h3>
                <p className="text-gray-600 text-sm">
                  {aboutUsData.featureShortDesc1}
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="flex items-start gap-4 bg-[#F8F8F8] rounded-xl p-5 shadow-sm">
              <Image src={img3} alt="icon" width={40} height={40} unoptimized/>
              <div>
                <h3 className="font-bold text-lg text-[#184C43]">
                  {aboutUsData.featureTitle2}
                </h3>
                <p className="text-gray-600 text-sm">
                  {aboutUsData.featureShortDesc2}
                </p>
              </div>
            </div>
          </div>

          {/* Goal Card - Assuming this should use featureTitle3 and featureShortDesc3 */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-4 bg-[#F8F8F8] rounded-xl p-3 shadow-sm h-full justify-between items-center text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-yellow-600">
                <Image src={img4} alt="icon" width={40} height={40} unoptimized/>
              </span>
              <div>
                <h3 className="font-bold text-lg text-[#184C43]">
                  {aboutUsData.featureTitle3 || aboutUsData.featureTitle2}
                </h3>
                <p className="text-gray-600 text-sm">
                  {aboutUsData.featureShortDesc3 ||
                    aboutUsData.featureShortDesc2}
                </p>
              </div>

              <Link
                href="/services"
                className="px-6 py-2 bg-yellow-600 text-white rounded-full font-semibold text-center hover:bg-yellow-700 transition"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
