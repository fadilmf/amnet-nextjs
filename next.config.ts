import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Menonaktifkan error ESLint saat build
  },
  typescript: {
    ignoreBuildErrors: true, // Menonaktifkan error TypeScript saat build
  },
};

export default nextConfig;
