import { PackageApi } from '@/types/package.interface';
import { ArrowRight, Clock, MapPin, Plane } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import diamond from "../../../../../public/diamon-icon.png"

export default function PackageCard(item: PackageApi) {
    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={item.packageImages && item.packageImages.length > 0 ? item.packageImages[0].image : ''}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 whitespace-nowrap">
                    {item.title}
                    <span className="text-amber-500">
                        <Image src={diamond} alt="Diamond" className="w-5 h-5" unoptimized/>
                    </span>
                </h2>

                {/* Details */}
                <div className="space-y-3 mb-6">
                    {/* Flight Info */}
                    <div className="flex items-center gap-3 text-gray-700">
                        <Plane className="w-5 h-5 text-amber-600" />
                        <span className="text-base">{item.travellPlace}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-5 h-5 text-amber-600" />
                        <span className="text-base">{item.country}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="w-5 h-5 text-amber-600" />
                        <span className="text-base">{item.duration}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

                {/* Details Link */}
                <Link
                    href={`/hajj-packages/${item.id}`}
                    className="w-full bg-white border-2 border-amber-600 text-amber-700 font-semibold py-3 px-6 rounded-full hover:bg-amber-50 transition-colors duration-300 flex items-center justify-between group"
                >
                    <span>বিস্তারিত পড়ুন</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    );
}

