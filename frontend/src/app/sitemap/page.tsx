import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE_MAP_SECTIONS } from "@/constants";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sitemap",
  description: `Complete sitemap of all pages on the ${siteConfig.name} website.`,
  alternates: { canonical: `${siteConfig.url}/sitemap` },
};

export default function SitemapPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container size="xl">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <nav className="mb-4 flex items-center gap-2 text-sm text-white/30" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white/60">Home</Link>
              <span>/</span>
              <span className="text-white/50">Sitemap</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Sitemap</h1>
            <p className="mt-4 text-lg text-white/50">Find any page on our website quickly.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_MAP_SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="mb-4 text-lg font-semibold text-white">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/20 transition-colors group-hover:bg-blue-400" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
            <p className="text-sm text-white/40">
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact us</Link>
              {" "}and we&apos;ll help you out.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
