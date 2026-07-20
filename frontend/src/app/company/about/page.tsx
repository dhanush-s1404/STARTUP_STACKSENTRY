import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — our mission, vision, and the team building intelligent software for tomorrow.`,
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateOrganizationSchema()}
      />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/company/about` },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} className="px-4 sm:px-6 lg:px-8" />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            About {siteConfig.name}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            {siteConfig.description}
          </p>
        </div>
      </section>
    </main>
  );
}
