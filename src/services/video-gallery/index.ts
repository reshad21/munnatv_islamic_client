/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQuery } from "@/types/query.types";
import { revalidatePath } from "next/cache";

export const createVideoGallery = async (payload: Record<string, any>) => {
  const response = await apiRequest("video-gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    authRequired: true,
  });
  revalidatePath("/dashboard/video-gallery");
  return await response;
};

export const getVideoGalleries = async (query: TQuery[]) => {
  const params = new URLSearchParams();
  if (query.length > 1) {
    query.forEach((q) => {
      params.append(q.key, q.value);
    });
  }
  const response = await apiRequest(`video-gallery?${params.toString()}`, {
    method: "GET",
    authRequired: true,
  });
  return await response;
};

export const getVideoGalleryById = async (id: string) => {
  const response = await apiRequest(`video-gallery/${id}`, {
    method: "GET",
    authRequired: true,
  });
  return await response;
};

export const updateVideoGallery = async (id: string, payload: Record<string, any>) => {
  const response = await apiRequest(`video-gallery/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    authRequired: true,
  });
  revalidatePath("/dashboard/video-gallery");
  return await response;
};

export const deleteVideoGallery = async (id: string | undefined) => {
  const response = await apiRequest(`video-gallery/${id}`, {
    method: "DELETE",
    authRequired: true,
  });
  revalidatePath("/dashboard/video-gallery");
  return await response;
};

export const updateVideoGalleryStatus = async (id: string, status: boolean) => {
  const response = await apiRequest(`video-gallery/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    authRequired: true,
  });
  revalidatePath("/dashboard/video-gallery");
  return await response;
};
