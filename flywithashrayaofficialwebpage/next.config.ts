import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next", // optional, this is the default
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "www.holidify.com"],
  },
};

export default nextConfig;
