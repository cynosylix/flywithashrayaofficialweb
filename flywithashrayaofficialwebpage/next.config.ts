import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next", // default, safe to keep

  images: {
    unoptimized: true, // required for Netlify without Next Image plugin

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.holidify.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
