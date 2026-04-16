"use client";

import { updateGalleryStatus } from "@/services/gallery";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteGalleryDialog from "./DeleteGalleryDialog";

interface GalleryItem {
  id: string;
  image: string;
  createdAt: string;
  status: boolean;
}

const GalleryTable = ({ galleryData = [] }: { galleryData?: GalleryItem[] }) => {

  const handleStatusChange = async (item: GalleryItem) => {
    const res = await updateGalleryStatus(item?.id, !item?.status);
    if (res.statusCode === 200) {
      showSuccessToast(
        `Gallery ${!item.status ? "activated" : "deactivated"} successfully`
      );
    } else {
      showErrorToast(res.message || "Something went wrong");
    }
  };


  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">SN</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Image</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Created At</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {galleryData && galleryData.length > 0 ? (
              galleryData?.map((item, idx) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6 text-gray-600">{idx + 1}</td>
                  <td className="py-4 px-6">
                    <div className="w-14 h-14 rounded-lg overflow-hidden relative">
                      <Image src={item.image} alt="Gallery" fill className="object-cover" unoptimized/>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.createdAt}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleStatusChange(item)}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${item.status ? "bg-[#0f3d3e]" : "bg-gray-300"}`}
                      aria-pressed={item.status}
                      aria-label={item.status ? "Active" : "Inactive"}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.status ? "right-1" : "left-1"}`} />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/gallery/edit/${item.id}`}
                        className="w-8 h-8 flex items-center justify-center border border-[#0f3d3e] text-[#0f3d3e] rounded hover:bg-[#0f3d3e] hover:text-white transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteGalleryDialog id={item.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 px-6 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GalleryTable;
