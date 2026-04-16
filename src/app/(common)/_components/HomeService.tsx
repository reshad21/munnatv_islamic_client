
import { getServices } from '@/services/service';
import { TQuery } from '@/types/query.types';
import Image from 'next/image';
import Link from 'next/link';
import serviceImage from "../../../../public/All Service view.png";
import ServiceCard from '../services/_components/ServiceCard';

interface IService {
  id: string;
  image: string;
  title: string;
  shortDescription?: string;
  description?: string;
  createdAt: string;
  status: boolean;
}

interface HomeServiceProps {
  searchParams: Promise<{ search: string; page: string }>;
  centerHeight?: string; // e.g. 'calc(100vh - 32px)'
}

const HomeService = async (props: HomeServiceProps) => {

  const searchParams = await props.searchParams;
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page) || 1;
  const query: TQuery[] = [
    {
      key: "orderBy",
      value: JSON.stringify({
        createdAt: "desc",
      }),
    },
    {
      key: "searchTerm",
      value: search,
    },
    {
      key: "page",
      value: page.toString(),
    },
    {
      key: "limit",
      value: "10",
    },
  ];
  const servicesData = await getServices(query);
  // Prepare the first two and last two services
  const serviceList = servicesData?.data?.data?.slice(0, 4) || [];
  const leftServices = serviceList.slice(0, 2);
  const rightServices = serviceList.slice(2, 4);

  return (
    <div className="max-w-5xl mx-auto px-2 py-8 grid grid-cols-1 md:grid-cols-3 gap-2 items-center relative">
      {/* Left side: first two services, stacked vertically */}
      <div className="flex flex-col gap-2 z-10">
        {leftServices.map((service: IService, idx: number) => (
          <ServiceCard key={service.id} service={service} index={idx} />
        ))}
      </div>
      {/* Center static card */}
      <div className="flex flex-col items-center justify-center z-20 h-[600px]"> {/* Increased height */}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto relative h-full w-full">
          <div className="absolute inset-0 flex items-center justify-center h-full w-full">
            <div className="w-full h-full">
              {/* Replace with your static image or content */}
              <Image src={serviceImage} alt="All Service view" className="w-full h-full object-contain" unoptimized/>
            </div>
          </div>
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-10 flex flex-col justify-center items-center w-full">
            <Link href="/services" passHref>
              <button className="cursor-pointer w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-semibold rounded-full px-6 py-2 flex items-center justify-center gap-2 shadow-md hover:from-yellow-600 hover:to-yellow-500 transition-all">
                View All Service
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-white"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Right side: last two services, stacked vertically */}
      <div className="flex flex-col gap-2 z-10">
        {rightServices.map((service: IService, idx: number) => (
          <ServiceCard key={service.id} service={service} index={idx + 2} />
        ))}
      </div>
    </div>
  );
}

export default HomeService
