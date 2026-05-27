import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/w40/**",
      },
      {
        protocol: "https",
        hostname: "cdn.uploadtourl.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
