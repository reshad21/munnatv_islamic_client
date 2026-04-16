"use client";
import { GripVertical, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DeleteFIvePillarDialog from "./DeleteFIvePillarDialog";
import { updateFivePillarStatus } from "@/services/fivePillar";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";

interface Pillar {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
  status: boolean;
}

const FivePillarsTable = ({
  fivePillarsData,
}: {
  fivePillarsData: Pillar[];
}) => {
  const handleStatusChange = async (pillar: Pillar) => {
    const res = await updateFivePillarStatus(pillar.id, !pillar.status);
    if (res.statusCode === 200) {
      showSuccessToast(
        `Pillar ${!pillar.status ? "activated" : "deactivated"} successfully`
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
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                SN
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Image
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Title
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Description
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Reorder
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {fivePillarsData && fivePillarsData.length > 0 ? (
              fivePillarsData.map((pillar, idx) => (
                <tr
                  key={pillar.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50"
                >
                  <td className="py-4 px-6 text-gray-600">{idx + 1}</td>
                  <td className="py-4 px-6">
                    <div className="w-14 h-14 rounded-lg overflow-hidden relative">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{pillar.title}</td>
                  <td className="py-4 px-6 text-gray-600 max-w-xs">
                    <p className="line-clamp-2">{pillar.description}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>No. {String(pillar.order).padStart(2, "0")}</span>
                      <button className="cursor-grab hover:text-gray-800 transition-colors">
                        <GripVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleStatusChange(pillar)}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                        pillar.status ? "bg-[#0f3d3e]" : "bg-gray-300"
                      }`}
                      aria-pressed={pillar.status}
                      aria-label={pillar.status ? "Active" : "Inactive"}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          pillar.status ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/fivePillarsOfIslam/edit/${pillar.id}`}
                        className="w-8 h-8 flex items-center justify-center border border-[#0f3d3e] text-[#0f3d3e] rounded hover:bg-[#0f3d3e] hover:text-white transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteFIvePillarDialog id={pillar.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FivePillarsTable;
