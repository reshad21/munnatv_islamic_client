import type { NextConfig } from "next";


// Next.js configuration file
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "194.31.53.237" },
      { protocol: "http", hostname: "62.72.12.193" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
      { protocol: "http", hostname: "barishaltimes.com", pathname: "/images/**" },
      { protocol: "https", hostname: "barishaltimes.com", pathname: "/images/**" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
