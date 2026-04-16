// src/lib/fetchClient/clientFetcher.ts

export const clientFetcher = async (
  endpoint: string,
  options: RequestInit & { authRequired?: boolean } = {}
) => {
  const headers: HeadersInit = {
    ...options.headers,
  };

  if (options.authRequired) {
    const token = getCookie("accessToken"); // use your cookie logic
    if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  return data;
};

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}
