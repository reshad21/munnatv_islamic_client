"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQuery } from "@/types/query.types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createBlogs = async (data: FieldValues) => {
  const response = await apiRequest("blogs", {
    method: "POST",
    body: JSON.stringify(data),
    authRequired: true,
  });

  ["/", "/dashboard/blogs"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};



export const getBlogs = async (query: TQuery[]) => {
  const params = new URLSearchParams();

  if (query.length > 1) {
    query.forEach((q) => {
      params.append(q.key, q.value);
    });
  }

  const response = await apiRequest(`blogs?${params.toString()}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};

export const getBlogsById = async (id: string) => {
  const response = await apiRequest(`blogs/${id}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};

export const updateBlogs = async (
  id: string,
  payload: FieldValues | FormData,
) => {
  const response = await apiRequest(`blogs/${id}`, {
    method: "PUT",
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
    authRequired: true,
  });

  revalidatePath("/dashboard/blogs");
  ["/", "/dashboard/blogs"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};


export const deleteBlogs = async (id: string | undefined) => {
  const response = await apiRequest(`blogs/${id}`, {
    method: "DELETE",
    authRequired: true,
  });

  revalidatePath("/dashboard/blogs");

  return await response;
};

export const updateBlogStatus = async (id: string, status: boolean) => {
  const response = await apiRequest(`blogs/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    authRequired: true,
  });

  revalidatePath("/dashboard/blogs");

  return await response;
};