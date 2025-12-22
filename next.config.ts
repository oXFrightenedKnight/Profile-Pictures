import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ju1613e8j0.ufs.sh",
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
