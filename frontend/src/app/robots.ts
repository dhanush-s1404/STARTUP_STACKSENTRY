import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function generateMetadata() {
  return { title: "robots.txt" };
}

export async function GET() {
  const content = `# StackSentry Technologies
# https://stacksentry.com

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${siteConfig.url}/sitemap.xml

# Crawling-delay for polite bots
User-agent: Bingbot
Crawl-delay: 10

User-agent: Yandex
Crawl-delay: 10
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate",
    },
  });
}
