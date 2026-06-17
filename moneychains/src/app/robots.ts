import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moneychains.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the authenticated app and admin out of the index.
      disallow: ["/app", "/admin"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
