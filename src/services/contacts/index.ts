/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQuery } from "@/types/query.types";
import { revalidatePath } from "next/cache";

export const createContacts = async (payload: Record<string, any>) => {
  const response = await apiRequest("contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    authRequired: true,
  });
  ["/", "/dashboard/page-setting/contacts"].forEach((path) => {
    revalidatePath(path);
  });
  return await response;
};

export const getContacts = async (query: TQuery[]) => {
  const params = new URLSearchParams();
  if (query.length > 1) {
    query.forEach((q) => {
      params.append(q.key, q.value);
    });
  }
  const response = await apiRequest(`contacts?${params.toString()}`, {
    method: "GET",
    authRequired: true,
  });
  return await response;
};

export const getContactById = async (id: string) => {
  const response = await apiRequest(`contacts/${id}`, {
    method: "GET",
    authRequired: true,
  });
  return await response;
};

export const updateContact = async (id: string, payload: FormData) => {
  const response = await apiRequest(`contacts/${id}`, {
    method: "PUT",
    body: payload,
    authRequired: true,
  });
  ["/", "/dashboard/page-setting/contacts"].forEach((path) => {
    revalidatePath(path);
  });
  return await response;
};

export const deleteContact = async (id: string | undefined) => {
  const response = await apiRequest(`contacts/${id}`, {
    method: "DELETE",
    authRequired: true,
  });
  ["/", "/dashboard/page-setting/contacts"].forEach((path) => {
    revalidatePath(path);
  });
  return await response;
};

export const updateContactStatus = async (id: string, status: boolean) => {
  const response = await apiRequest(`contacts/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    authRequired: true,
  });
  revalidatePath("/dashboard/contacts");
  return await response;
};
