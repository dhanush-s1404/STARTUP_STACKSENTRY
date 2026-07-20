import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TechDetailHero } from "@/features/technology/components/tech-detail-hero";
import { TechDetailContent } from "@/features/technology/components/tech-detail-content";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { TECHNOLOGIES, getTechnologyBySlug } from "@/data/technologies";

export function generateStaticParams() {
  return TECHNOLOGIES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tech = getTechnologyBySlug(slug);

  if (!tech) {
    return { title: "Technology Not Found" };
  }

  return {
    title: `${tech.name} Expertise | StackSentry Technologies`,
    description: tech.description,
  };
}

export default async function TechnologyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tech = getTechnologyBySlug(slug);

  if (!tech) {
    notFound();
  }

  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Technology", url: `${siteConfig.url}/technology` },
          { name: tech.name, url: `${siteConfig.url}/technology/${tech.slug}` },
        ])}
      />
      <TechDetailHero
        name={tech.name}
        description={tech.description}
        longDescription={tech.longDescription}
        experience={tech.experience}
        category={tech.category}
      />
      <TechDetailContent technology={tech} />
      <CTASection />
    </main>
  );
}
