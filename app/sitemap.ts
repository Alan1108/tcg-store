import type { MetadataRoute } from "next";

import { seoConfig } from "@/lib/seo";

const routes = ["/", "/sealed", "/singles", "/inquiry"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${seoConfig.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
