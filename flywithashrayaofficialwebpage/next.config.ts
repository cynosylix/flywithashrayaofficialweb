import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
     unoptimized: true,
  domains: ['images.unsplash.com', 'www.holidify.com']
  },
};

export default nextConfig;
