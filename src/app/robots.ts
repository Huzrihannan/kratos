import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/design-system"],
    },
    sitemap: "https://krat-os.dev/sitemap.xml",
  };
}
