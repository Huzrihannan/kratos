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

  nextConfig.redirects = async () => [
    {
      source: "/estimator",
      destination: "/start",
      permanent: true,
    },
    {
      source: "/portfolio",
      destination: "/work",
      permanent: true,
    },
    {
      source: "/case-studies",
      destination: "/work",
      permanent: true,
    },
    {
      source: "/case-studies/:slug*",
      destination: "/work/:slug*",
      permanent: true,
    },
  ];
}

export default nextConfig;
