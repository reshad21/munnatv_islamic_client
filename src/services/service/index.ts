"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TQuery } from "@/types/query.types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";


export const createService = async (data: FieldValues) => {
  const response = await apiRequest("services", {
	method: "POST",
	body: JSON.stringify(data),
	authRequired: true,
  });
  ["/", "/dashboard/services"].forEach((path) => {
	revalidatePath(path);
  });
  return await response;
};



export const getServices = async (query: TQuery[]) => {
	const params = new URLSearchParams();
	if (query.length > 1) {
		query.forEach((q) => {
			params.append(q.key, q.value);
		});
	}
	const response = await apiRequest(`services?${params.toString()}`, {
		method: "GET",
		authRequired: true,
	});
	return await response;
};

export const getServiceById = async (id: string) => {
	const response = await apiRequest(`services/${id}`, {
		method: "GET",
		authRequired: true,
	});
	return await response;
};


export const updateService = async (
  id: string,
  payload: FieldValues | FormData,
) => {
  const response = await apiRequest(`services/${id}`, {
    method: "PUT",
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
    authRequired: true,
  });

  ["/", "/dashboard/services"].forEach((path) => {
    revalidatePath(path);
  });

  return await response;
};

export const deleteService = async (id: string | undefined) => {
	const response = await apiRequest(`services/${id}`, {
		method: "DELETE",
		authRequired: true,
	});
	revalidatePath("/dashboard/services");
	return await response;
};

export const updateServiceStatus = async (id: string, status: boolean) => {
	const response = await apiRequest(`services/${id}/status`, {
		method: "PATCH",
		body: JSON.stringify({ status }),
		authRequired: true,
	});
	revalidatePath("/dashboard/services");
	return await response;
};
