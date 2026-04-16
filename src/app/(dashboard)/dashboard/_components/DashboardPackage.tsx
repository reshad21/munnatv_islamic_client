import React from "react";
import Image from "next/image";
import { Plane, MapPin, Clock, ArrowUpRight } from "lucide-react";

interface PackageImage {
  id: string;
  image: string;
  packageId: string;
  createdAt: string;
  updatedAt: string;
}

interface Package {
  id: string;
  title: string;
  packageImages: PackageImage[];
  travellPlace: string;
  country: string;
  duration: string;
  description: string;
  status: boolean;
  maxTravelers: string;
  minPax: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardPackageProps {
  packagesData: Package[];
}

const DashboardPackage: React.FC<DashboardPackageProps> = ({ packagesData }) => {
  // Filter only active packages and take first 3
  const activePackages = packagesData.filter(pkg => pkg.status).slice(0, 3);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg my-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Latest Packages</h2>
      {activePackages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">no data found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePackages.map((pkg, index) => (
            <PackageCard key={pkg.id} package={pkg} isFeatured={index === 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const PackageCard = ({ package: pkg, isFeatured }: { package: Package; isFeatured?: boolean }) => {
  // Get first image or use placeholder
  const imageUrl = pkg.packageImages && pkg.packageImages.length > 0 
    ? pkg.packageImages[0].image 
    : "/package-1.png";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
        <Image 
          src={imageUrl} 
          alt={pkg.title} 
          fill 
          className="object-cover" 
          unoptimized
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-800">{pkg.title}</h3>
          <span className="text-amber-500">💎</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Plane className="w-4 h-4 text-amber-500" />
            <span>{pkg.travellPlace}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{pkg.country}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>{pkg.duration}</span>
        </div>

        <div className="border-t border-dashed border-gray-300 pt-4">
          {isFeatured ? (
            <button className="w-full flex items-center justify-between px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors cursor-pointer">
              <span>বিস্তারিত পড়ুন</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          ) : (
            <button className="w-full flex items-center justify-between px-4 py-3 border-2 border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
              <span>বিস্তারিত পড়ুন</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPackage;