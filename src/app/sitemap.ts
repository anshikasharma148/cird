import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/research", priority: 0.9, changeFrequency: "weekly" },
  { path: "/patents", priority: 0.85, changeFrequency: "monthly" },
  { path: "/projects/ba01-pp-b", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/ba01-pp-c", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/ba03-pp-b", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/ba07-pp-a", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/ba07-pp-b", priority: 0.8, changeFrequency: "monthly" },
  { path: "/entities", priority: 0.85, changeFrequency: "monthly" },
  { path: "/entities/cdc", priority: 0.8, changeFrequency: "monthly" },
  { path: "/entities/mtl", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team", priority: 0.8, changeFrequency: "monthly" },
  { path: "/authorities", priority: 0.75, changeFrequency: "monthly" },
  { path: "/training", priority: 0.75, changeFrequency: "monthly" },
  { path: "/mou", priority: 0.75, changeFrequency: "yearly" },
  { path: "/aws", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ews", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
