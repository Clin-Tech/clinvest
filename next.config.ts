import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "image.org.ng"], // 👈 allow Unsplash
  },
};

export default nextConfig;
