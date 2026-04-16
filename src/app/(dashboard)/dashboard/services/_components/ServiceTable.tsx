"use client";

import { updateServiceStatus } from "@/services/service";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteServiceDialog from "./DeleteServiceDialog";

interface Service {
  id: string;
  image: string;
  title: string;
  shortDescription?: string;
  description?: string;
  createdAt: string;
  status: boolean;
}


const ServiceTable = ({ servicesData = [] }: { servicesData: Service[] }) => {
  const [services, setServices] = useState<Service[]>(servicesData);

  useEffect(() => {
    setServices(servicesData);
  }, [servicesData]);

  const handleStatusChange = async (service: Service) => {
    const res = await updateServiceStatus(service.id, !service.status);
    if (res.statusCode === 200) {
      showSuccessToast(`Service ${!service.status ? "activated" : "deactivated"} successfully`);
      setServices((prev) => prev.map((s) => (s.id === service.id ? { ...s, status: !s.status } : s)));
    } else {
      showErrorToast(res.message || "Something went wrong");
    }
  };

  // Delete logic can be added here if you have a DeleteServiceDialog component

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">SN</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Image</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Title</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {services.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              services.map((service, idx) => (
                <tr key={service.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6 text-gray-600">{idx + 1}</td>
                  <td className="py-4 px-6">
                    <div className="w-14 h-14 rounded-lg overflow-hidden relative">
                      <Image src={service.image} alt={service.title} fill className="object-cover" unoptimized/>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{service.title}</td>
                    <td className="py-4 px-6 text-gray-600 max-w-xs">
                    <span className="line-clamp-2 break-words">
                      {service.description
                      ? service.description.replace(/<[^>]+>/g, "")
                      : ""}
                    </span>
                    </td>

                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleStatusChange(service)}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${service.status ? "bg-[#0f3d3e]" : "bg-gray-300"}`}
                      aria-pressed={service.status}
                      aria-label={service.status ? "Active" : "Inactive"}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${service.status ? "right-1" : "left-1"}`}
                      />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/services/edit/${service.id}`}
                        className="w-8 h-8 flex items-center justify-center border border-[#0f3d3e] text-[#0f3d3e] rounded hover:bg-[#0f3d3e] hover:text-white transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4"/>
                      </Link>
                      {/* Add DeleteServiceDialog or similar here if needed */}
                      <DeleteServiceDialog id={service.id}/>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ServiceTable;
