import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_EXPORT === "true" ? "export" : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: process.env.NEXT_EXPORT === "true",
    formats: ["image/avif", "image/webp"],
  },
};

if (process.env.NEXT_EXPORT !== "true") {
  nextConfig.headers = async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ];
}

export default nextConfig;
