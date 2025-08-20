import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next", // optional, this is the default
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "www.holidify.com"],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },

};

export default nextConfig;
