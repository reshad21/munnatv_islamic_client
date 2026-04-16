"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQuery } from "@/types/query.types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createContactUs = async (data: FieldValues) => {
  const response = await apiRequest("contactus", {
    method: "POST",
    body: JSON.stringify(data),
    authRequired: true,
  });

  ["/", "/dashboard/page-setting/contactus"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};


export const getContactUs = async (query: TQuery[]) => {
  const params = new URLSearchParams();

  if (query.length > 1) {
    query.forEach((q) => {
      params.append(q.key, q.value);
    });
  }

  const response = await apiRequest(`contactus?${params.toString()}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};

export const getContactUsById = async (id: string) => {
  const response = await apiRequest(`contactus/${id}`, {
    method: "GET",
    authRequired: true,
  });

  return await response;
};

export const updateContactUs = async (id: string,
  payload: FieldValues | FormData,
) => {
  const response = await apiRequest(`contactus/${id}`, {
    method: "PUT",
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
    authRequired: true,
  });

  revalidatePath("/dashboard/page-setting/contactus");
    ["/", "/about-us", "/dashboard/page-setting/contactus"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};


export const deleteContactUs = async (id: string | undefined) => {
  const response = await apiRequest(`contactus/${id}`, {
    method: "DELETE",
    authRequired: true,
  });

  revalidatePath("/dashboard/page-setting/contactus");

  return await response;
};
