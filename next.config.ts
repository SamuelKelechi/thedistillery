import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "thedistillery.ng", // ✅ allow your image host
    ],
  },
};

export default nextConfig;
