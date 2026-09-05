import type { MetadataRoute } from "next";

// Относительный URL валиден по спецификации sitemap (от корня сайта).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/austria", "/hungary"];
  return pages.map((url) => ({ url, lastModified: new Date("2026-09-05"), changeFrequency: "weekly", priority: url === "/" ? 1 : 0.8 }));
}
