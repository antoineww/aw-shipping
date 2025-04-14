import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Warning: This allows production builds to complete even if there are ESLint errors and TypeScript errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
