"use client";
import { updatePackageStatus } from "@/services/package";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeletePackageDialog from "./DeletePackageDialog";
import { PackageApi } from "@/types/package.interface";

const PackageTable = ({ packages }: { packages: PackageApi[] }) => {

  const handleStatusChange = async (pkg: PackageApi) => {
    const res = await updatePackageStatus(pkg.id, !pkg.status);
    if (res.statusCode === 200) {
      showSuccessToast(
        `Package ${!pkg.status ? "activated" : "deactivated"} successfully`
      );
    } else {
      showErrorToast(res.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">SN</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Image</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Title</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Country</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Duration</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Max Travelers</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Created At</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {packages.length > 0 ? packages.map((pkg, idx) => (
                <tr key={pkg.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6 text-gray-600 whitespace-nowrap">{idx + 1}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="w-14 h-14 rounded-lg overflow-hidden relative">
                      {pkg.packageImages && pkg.packageImages.length > 0 ? (
                        <Image
                          src={pkg.packageImages[0].image}
                          alt={pkg.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{pkg.title}</td>
                  <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{pkg.country}</td>
                  <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{pkg.duration}</td>
                  <td className="py-4 px-6 text-gray-700 whitespace-nowrap">{pkg.maxTravelers}</td>
                  <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                    {new Date(pkg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusChange(pkg)}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${pkg.status ? "bg-[#0f3d3e]" : "bg-gray-300"}`}
                      aria-pressed={pkg.status}
                      aria-label={pkg.status ? "Active" : "Inactive"}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pkg.status ? "right-1" : "left-1"}`} />
                    </button>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/packages/edit/${pkg.id}`}
                        className="w-8 h-8 flex items-center justify-center border border-[#0f3d3e] text-[#0f3d3e] rounded hover:bg-[#0f3d3e] hover:text-white transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeletePackageDialog id={pkg.id} />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PackageTable;