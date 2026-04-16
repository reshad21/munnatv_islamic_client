"use server";

import { apiRequest } from "@/lib/apiRequest";
import { TCustomJwtPayload } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loggedUser = async () => {
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;

  let decoded: TCustomJwtPayload | null = null;

  if (accessToken) {
    decoded = jwtDecode<TCustomJwtPayload>(accessToken);
  }

  return decoded;
};

export const register = async (data: FieldValues | FormData) => {
  const response = await apiRequest(`auth/register`, {
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
    authRequired: true,
  });

  [
    "/",
    "/dashboard/admin-user",
    "/dashboard/profile",
    "/dashboard/role",
  ].forEach((path) => {
    revalidatePath(path);
  });

  return response;
};

export const login = async (data: FieldValues) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    // Set cookies on successful login
    if (result.statusCode === 200 && result.data) {
      const cookieStore = await cookies();
      
      if (result.data.accessToken) {
        cookieStore.set("accessToken", result.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
      
      if (result.data.refreshToken) {
        cookieStore.set("refreshToken", result.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
    }

    return result;
  } catch (error) {
    return error;
  }
};

export const forgetPassword = async (data: FieldValues) => {
  const response = await apiRequest(`auth/forget`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
};

export const resetPassword = async (data: FieldValues, token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const logout = async () => {
  const cookie = await cookies();
  cookie.delete("accessToken");
  cookie.delete("refreshToken");
  
  [
    "/",
    "/dashboard",
    "/dashboard/admin-user",
    "/dashboard/profile",
    "/dashboard/role",
  ].forEach((path) => {
    revalidatePath(path);
  });
};

export const updateProfile = async (id: string, data: FieldValues | FormData) => {
  const response = await apiRequest(`auth/profile/${id}`, {
    method: "PUT",
    body: data instanceof FormData ? data : JSON.stringify(data),
    authRequired: true,
  });

  [
    "/",
    "/dashboard/profile",
    "/dashboard/update-profile"
  ].forEach((path) => {
    revalidatePath(path);
  });

  return response;
};
