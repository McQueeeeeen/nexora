import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Относительный URL валиден по спецификации sitemap (от корня сайта).
import { posts } from "./blog/posts";

const BASE = "https://nexora-eight-opal.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/austria", "/hungary", "/faq", "/privacy", "/blog", ...posts.map((p) => `/blog/${p.slug}`)];
  return pages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date("2026-09-05"),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
