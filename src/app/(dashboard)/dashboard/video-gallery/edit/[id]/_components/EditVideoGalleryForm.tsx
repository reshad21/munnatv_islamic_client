
"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { getVideoGalleryById, updateVideoGallery } from "@/services/video-gallery";

interface VideoGalleryFormData {
  title: string;
  videoUrl: string;
}

interface EditVideoGalleryFormProps {
  videoGalleryId: string;
}

export default function EditVideoGalleryForm({ videoGalleryId }: EditVideoGalleryFormProps) {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<VideoGalleryFormData>({
    defaultValues: {
      title: "",
      videoUrl: "",
    },
  });

  useEffect(() => {
    const fetchVideoGallery = async () => {
      const res = await getVideoGalleryById(videoGalleryId);
      if (res?.data) {
        reset({
          title: res.data.title || "",
          videoUrl: res.data.videoUrl || "",
        });
      }
    };
    fetchVideoGallery();
  }, [videoGalleryId, reset]);

  const onSubmit = async (data: VideoGalleryFormData) => {
    const payload = {
      title: data.title,
      videoUrl: data.videoUrl,
    };

    const res = await updateVideoGallery(videoGalleryId, payload);
    if (res.statusCode === 200) {
      showSuccessToast(res.message);
      reset();
      router.push("/dashboard/video-gallery");
    } else {
      showErrorToast(res.message || "Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Enter video title..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f3d3e]/20 focus:border-[#0f3d3e] transition-colors"
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Video URL <span className="text-red-500">*</span>
        </label>
        <Controller
          name="videoUrl"
          control={control}
          rules={{ required: "Video URL is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="url"
              placeholder="Enter video URL (e.g., https://youtube.com/...)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f3d3e]/20 focus:border-[#0f3d3e] transition-colors"
            />
          )}
        />
      </div>


      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-6 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Update</span>
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>
      </div>
    </form>
  );
}

