import type { MetadataRoute } from "next";
import { TEMPLATES } from "@/data/templates";
import { POSTS } from "@/data/blog";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moneychains.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/how-it-works",
    "/templates",
    "/pricing",
    "/about",
    "/blog",
    "/legal/terms",
    "/legal/privacy",
    "/login",
    "/signup",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const templates = TEMPLATES.map((t) => ({
    url: `${BASE}/templates/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const posts = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...templates, ...posts];
}
