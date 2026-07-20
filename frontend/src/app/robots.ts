import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        crawlDelay: 10,
      },
      {
        userAgent: "Yandex",
        crawlDelay: 10,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
