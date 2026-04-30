/* eslint-disable @next/next/no-img-element */
"use client";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteVideoDialog from "./DeleteVideoDialog";
import { getYouTubeThumbnail } from "@/utils/youtube-utils";
import { updateVideoGalleryStatus } from "@/services/video-gallery";

interface VideoGallery {
  id: string;
  title: string;
  videoUrl: string;
  status: boolean;
  createdAt: string;
}

const VideoGalleryTable = ({
  videoGalleriesData = [],
}: {
  videoGalleriesData: VideoGallery[];
}) => {
  const [videoGalleries, setVideoGalleries] =
    useState<VideoGallery[]>(videoGalleriesData);

  useEffect(() => {
    setVideoGalleries(videoGalleriesData);
  }, [videoGalleriesData]);

  const handleStatusChange = async (videoGallery: VideoGallery) => {
    const res = await updateVideoGalleryStatus(
      videoGallery.id,
      !videoGallery.status
    );
    if (res.statusCode === 200) {
      showSuccessToast(
        `Video gallery ${
          !videoGallery.status ? "activated" : "deactivated"
        } successfully`
      );
      setVideoGalleries((prev) =>
        prev.map((s) =>
          s.id === videoGallery.id ? { ...s, status: !videoGallery.status } : s
        )
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
                Thumbnail
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Title
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Video URL
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Created At
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
            {videoGalleries.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              videoGalleries.map((videoGallery, idx) => (
                <tr
                  key={videoGallery.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50"
                >
                  <td className="py-4 px-6 text-gray-600">{idx + 1}</td>
                  <td className="py-4 px-6">
                    <img
                      src={getYouTubeThumbnail(videoGallery.videoUrl, "default")}
                      alt={videoGallery.title}
                      className="w-20 h-14 object-cover rounded shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=90&width=120";
                      }}
                    />
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {videoGallery.title}
                  </td>
                  <td className="py-4 px-6 text-gray-600 max-w-xs">
                    <a
                      href={videoGallery.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline line-clamp-1 break-all"
                    >
                      {videoGallery.videoUrl}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(videoGallery.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleStatusChange(videoGallery)}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                        videoGallery.status ? "bg-[#0f3d3e]" : "bg-gray-300"
                      }`}
                      aria-pressed={videoGallery.status}
                      aria-label={videoGallery.status ? "Active" : "Inactive"}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          videoGallery.status ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/video-gallery/edit/${videoGallery.id}`}
                        className="w-8 h-8 flex items-center justify-center border border-[#0f3d3e] text-[#0f3d3e] rounded hover:bg-[#0f3d3e] hover:text-white transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteVideoDialog id={videoGallery.id} />
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

export default VideoGalleryTable;