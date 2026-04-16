"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQuery } from "@/types/query.types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createHeroSection = async (data: FieldValues) => {
  const response = await apiRequest("hero-section", {
    method: "POST",
    body: JSON.stringify(data),
    authRequired: true,
  });

  ["/", "/dashboard/page-setting/hero-area"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};


export const getHeroSection = async (query: TQuery[]) => {
  const params = new URLSearchParams();

  if (query.length > 1) {
    query.forEach((q) => {
      params.append(q.key, q.value);
    });
  }

  const response = await apiRequest(`hero-section?${params.toString()}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};

export const getHeroSectionById = async (id: string) => {
  const response = await apiRequest(`hero-section/${id}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};

export const updateHeroSection = async (id: string,
  payload: FieldValues | FormData,
) => {
  const response = await apiRequest(`hero-section/${id}`, {
    method: "PUT",
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
    authRequired: true,
  });

  ["/", "/hero-area", "/dashboard/page-setting/hero-area"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};


