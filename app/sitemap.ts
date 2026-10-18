import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }];
}
