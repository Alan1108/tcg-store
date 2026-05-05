import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("http://localhost:9000/**"),
      new URL("https://medusajs.com/**"),
    ],
  },
};

export default nextConfig;
