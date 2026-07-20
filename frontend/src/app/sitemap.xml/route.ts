import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export async function GET() {
  const urls = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/services", priority: "0.9", changefreq: "weekly" },
    { path: "/solutions", priority: "0.9", changefreq: "weekly" },
    { path: "/industries", priority: "0.9", changefreq: "weekly" },
    { path: "/portfolio", priority: "0.9", changefreq: "weekly" },
    { path: "/case-studies", priority: "0.8", changefreq: "weekly" },
    { path: "/blog", priority: "0.9", changefreq: "daily" },
    { path: "/technology", priority: "0.8", changefreq: "weekly" },
    { path: "/engineering", priority: "0.7", changefreq: "weekly" },
    { path: "/testimonials", priority: "0.7", changefreq: "monthly" },
    { path: "/company/about", priority: "0.8", changefreq: "monthly" },
    { path: "/careers", priority: "0.8", changefreq: "weekly" },
    { path: "/careers/jobs", priority: "0.8", changefreq: "daily" },
    { path: "/contact", priority: "0.8", changefreq: "monthly" },
    { path: "/consultation", priority: "0.8", changefreq: "monthly" },
    { path: "/privacy", priority: "0.3", changefreq: "yearly" },
    { path: "/terms", priority: "0.3", changefreq: "yearly" },
    { path: "/cookies", priority: "0.3", changefreq: "yearly" },
    { path: "/accessibility", priority: "0.3", changefreq: "yearly" },
    { path: "/sitemap", priority: "0.5", changefreq: "monthly" },
  ];

  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${siteConfig.url}${url.path}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate",
    },
  });
}
