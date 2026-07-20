import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { GalleryHero } from "@/features/gallery/components/gallery-hero";
import { GalleryGrid } from "@/features/gallery/components/gallery-grid";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Project Gallery | StackSentry Technologies",
  description: "Explore our portfolio through interactive visual experiences.",
};

export default function GalleryPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Gallery", url: `${siteConfig.url}/gallery` },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />
      <GalleryHero />
      <GalleryGrid />
      <CTASection />
    </main>
  );
}
