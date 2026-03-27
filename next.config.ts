import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.10"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.foodimagedb.com",
      },
    ],
  },
};

export default nextConfig;
