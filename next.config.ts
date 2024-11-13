import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Menonaktifkan error ESLint saat build
  },
  typescript: {
    ignoreBuildErrors: true, // Menonaktifkan error TypeScript saat build
  },
};

module.exports = {
  images: {
    domains: ["flagcdn.com"],
  },
};

export default nextConfig;
