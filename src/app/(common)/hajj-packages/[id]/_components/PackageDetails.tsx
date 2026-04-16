/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Preview from "@/components/shared/Preview";
import { PackageApi } from "@/types/package.interface";
import vector1 from "../../../../../../public/icons/Vector (1).svg"
import vector2 from "../../../../../../public/icons/Vector.svg"
import vector3 from "../../../../../../public/icons/Frame.svg"
import vector4 from "../../../../../../public/icons/Frame (1).svg"
import timeline from "../../../../../../public/timeline.png"

interface PackageDetailsProps extends PackageApi {
  dynamicClassName?: string;
}

const PackageDetails = (props: PackageDetailsProps) => {
  const { dynamicClassName, ...packageData } = props;
  // DRY Info Cards
  const infoCards = [
    {
      icon: vector1,
      label: 'সময়কাল',
      value: packageData.duration,
      alt: 'duration',
    },
    {
      icon: vector2,
      label: <><span className="font-bold">Country</span><br/>{packageData.country}</>,
      value: '',
      alt: 'country',
    },
    {
      icon: vector3,
      label: <span className="font-bold">Maximum Traveller</span>,
      value: packageData.maxTravelers,
      alt: 'max traveller',
    },
    {
      icon: vector4,
      label: <span className="font-bold">Min Pack</span>,
      value: packageData.minPax,
      alt: 'min pack',
    },
  ];

  const InfoCard = ({icon, label, value, alt}: {icon: any, label: React.ReactNode, value: React.ReactNode, alt: string}) => (
    <div className="flex items-center gap-4 bg-gradient-to-tr from-[#23b2b2] to-[#144141] rounded-xl px-6 py-4 min-h-[70px] w-full">
      <span className="flex-shrink-0 flex items-center justify-center">
        <Image src={icon} alt={alt} width={32} height={32} style={{ minWidth: 32, minHeight: 32, maxWidth: 32, maxHeight: 32 }} unoptimized/>
      </span>
      <span className="flex flex-col justify-center w-full">
        <span className="block text-white font-semibold text-base leading-tight">{label}</span>
        {value !== '' && <span className="block text-white text-md font-medium whitespace-nowrap truncate mt-1">{value}</span>}
      </span>
    </div>
  );

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-md ${dynamicClassName ?? ''}`}>
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d3e] mb-4">{packageData.title}</h2>

      {/* Main Image */}
      <div className="rounded-xl overflow-hidden mb-4">
        <Image
          src={packageData.packageImages && packageData.packageImages.length > 0 ? packageData.packageImages[0].image : ''}
          alt="Main"
          width={900}
          height={400}
          className="w-full h-64 object-cover"
          unoptimized
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mb-6">
        {packageData.packageImages.map((img, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden border border-gray-200 w-24 h-16 relative">
            <Image src={img.image} alt={`thumb-${idx}`} fill className="object-cover" unoptimized/>
          </div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {infoCards.map((card, idx) => (
          <InfoCard key={idx} {...card} />
        ))}
      </div>

      {/* Timeline/Steps (illustrative icons) */}
      <div className="flex items-center justify-between my-8 px-2">
        <Image src={timeline} alt="timeline" width={600} height={100} className="w-full h-auto" unoptimized/>
      </div>

      {/* Description */}
      <div className="mb-6">
        <Preview content={packageData.description} />
      </div>
    </div>
  );
};

export default PackageDetails;