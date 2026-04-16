/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQuery } from "@/types/query.types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createPackages = async (data: FieldValues) => {
  const response = await apiRequest("packages", {
    method: "POST",
    body: JSON.stringify(data),
    authRequired: true,
  });

  ["/", "/dashboard/packages"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};



export const getPackages = async (query: TQuery[]) => {
  const params = new URLSearchParams();

  if (query.length > 1) {
    query.forEach((q) => {
      params.append(q.key, q.value);
    });
  }

  const response = await apiRequest(`packages?${params.toString()}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};

export const getPackagesById = async (id: string) => {
  const response = await apiRequest(`packages/${id}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};

export const updatePackages = async (id: string, payload: any) => {
  const response = await apiRequest(`packages/${id}`, {
    method: "PUT",
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
    authRequired: true,
  });

  ["/", "/dashboard/packages"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};


export const deletePackages = async (id: string | undefined) => {
  const response = await apiRequest(`packages/${id}`, {
    method: "DELETE",
    authRequired: true,
  });

  revalidatePath("/dashboard/packages");

  return await response;
};

export const updatePackageStatus = async (id: string, status: boolean) => {
  const response = await apiRequest(`packages/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    authRequired: true,
  });

  revalidatePath("/dashboard/packages");

  return await response;
};


export const addPackageImage = async (data: FormData) => {
  const response = await apiRequest("packages/image", {
    method: "POST",
    body: data as FormData,
    authRequired: true,
  });

  revalidatePath("/dashboard/packages");

  return await response;
};

export const deletePackageImage = async (imageId: string) => {
  const response = await apiRequest(`packages/image/${imageId}`, {
    method: "DELETE",
    authRequired: true,
  });

  revalidatePath("/dashboard/packages");

  return await response;
};

