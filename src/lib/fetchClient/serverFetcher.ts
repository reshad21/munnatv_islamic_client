// src/lib/fetchClient/serverFetcher.ts
"use server";

import { cookies } from "next/headers";

export const serverFetcher = async (
  endpoint: string,
  options: RequestInit & { authRequired?: boolean } = {}
) => {
  const headers: HeadersInit = {
    ...options.headers,
  };

  if (options.authRequired) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (token)
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const data = await response.json();
  return data;
};
