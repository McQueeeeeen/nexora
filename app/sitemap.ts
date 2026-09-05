import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Относительный URL валиден по спецификации sitemap (от корня сайта).
import { posts } from "./blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/austria", "/hungary", "/faq", "/privacy", "/blog", ...posts.map((p) => `/blog/${p.slug}`)];
  return pages.map((url) => ({ url, lastModified: new Date("2026-09-05"), changeFrequency: "weekly", priority: url === "/" ? 1 : 0.8 }));
}
