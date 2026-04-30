/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Save, X, PlayCircle } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";
import { createVideoGallery } from "@/services/video-gallery";
import { getYouTubeThumbnail, getYouTubeVideoId } from "@/utils/youtube-utils";

interface VideoGalleryFormData {
    title: string;
    videoUrl: string;
    status: string;
}

export default function CreateVideoGalleryForm() {
  const router = useRouter();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState(false);

  const { control, handleSubmit, reset, watch } = useForm<VideoGalleryFormData>({
    defaultValues: {
      title: "",
      videoUrl: "",
      status: "active",
    },
  });

  const watchedVideoUrl = watch("videoUrl");

  useEffect(() => {
    const id = getYouTubeVideoId(watchedVideoUrl);
    setVideoId(id);
    setThumbnailError(false);
  }, [watchedVideoUrl]);

  const onSubmit = async (data: VideoGalleryFormData) => {
    const payload = {
      title: data.title,
      videoUrl: data.videoUrl,
      status: data.status,
    };
    
    const res = await createVideoGallery(payload);
    if (res.statusCode === 201) {
      showSuccessToast(res.message);
      reset();
      setVideoId(null);
      router.push("/dashboard/video-gallery");
    } else {
      showErrorToast(res.message || "Create failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
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
        
        {/* YouTube Thumbnail Preview */}
        {videoId && !thumbnailError && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0 group">
                <img
                  src={getYouTubeThumbnail(watchedVideoUrl, "mqdefault")}
                  alt="Video thumbnail"
                  className="w-48 h-36 object-cover rounded-lg shadow-sm"
                  onError={() => setThumbnailError(true)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 mb-1">Preview</p>
                <p className="text-xs text-gray-500 break-all">Video ID: {videoId}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0f3d3e] hover:underline mt-2 inline-block"
                >
                  Open on YouTube →
                </a>
              </div>
            </div>
          </div>
        )}

        {watchedVideoUrl && !videoId && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Invalid YouTube URL. Please enter a valid YouTube link.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 bg-[#0f3d3e] text-white px-6 py-2.5 rounded-full hover:bg-[#0a2e2f] transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
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