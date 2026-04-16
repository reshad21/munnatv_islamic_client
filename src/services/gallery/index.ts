"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQuery } from "@/types/query.types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";


export const createGallery = async (data: FieldValues) => {
  const response = await apiRequest("gallery", {
    method: "POST",
    body: JSON.stringify(data),
    authRequired: true,
  });

  if (response.statusCode === 201) {
    revalidatePath("/dashboard/gallery");
  }

  return response;
};

export const getGallery = async (query: TQuery[]) => {
    const params = new URLSearchParams();
    if (query.length > 1) {
        query.forEach((q) => {
            params.append(q.key, q.value);
        });
    }
    const response = await apiRequest(`gallery?${params.toString()}`, {
        method: "GET",
        authRequired: true,
    });
    return await response;
};

export const getGalleryById = async (id: string) => {
    const response = await apiRequest(`gallery/${id}`, {
        method: "GET",
        authRequired: true,
    });
    return await response;
};

export const updateGallery = async (id: string, payload: FieldValues | FormData) => {
    const response = await apiRequest(`gallery/${id}`, {
        method: "PUT",
        body: payload instanceof FormData ? payload : JSON.stringify(payload),
        authRequired: true,
    });
    revalidatePath("/dashboard/gallery");
    return await response;
};

export const deleteGallery = async (id: string | undefined) => {
    const response = await apiRequest(`gallery/${id}`, {
        method: "DELETE",
        authRequired: true,
    });
    revalidatePath("/dashboard/gallery");
    return await response;
};

export const updateGalleryStatus = async (id: string, status: boolean) => {
    const response = await apiRequest(`gallery/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        authRequired: true,
    });
    revalidatePath("/dashboard/gallery");
    return await response;
};
