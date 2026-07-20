import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryDetailHero } from "@/features/industries/components/industry-detail-hero";
import { IndustryDetailContent } from "@/features/industries/components/industry-detail-content";
import {
  IndustryDigitalRoadmap,
  IndustryChallengeSolution,
  IndustrySuccessMetrics,
  IndustrySolutionShowcase,
  IndustryTechnologies,
} from "@/features/industries/components";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { getChallengesBySlugs } from "@/data/challenges";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${industry.title} Solutions | StackSentry Technologies`,
    description: industry.description,
    openGraph: {
      title: `${industry.title} Solutions | StackSentry Technologies`,
      description: industry.description,
      url: `${siteConfig.url}/industries/${industry.slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${industry.title} Solutions by StackSentry Technologies`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} Solutions | StackSentry Technologies`,
      description: industry.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const challenges = getChallengesBySlugs(industry.challengeSlugs);

  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Industries", url: `${siteConfig.url}/industries` },
          {
            name: industry.title,
            url: `${siteConfig.url}/industries/${industry.slug}`,
          },
        ])}
      />
      <IndustryDetailHero
        title={industry.title}
        description={industry.description}
        icon={industry.icon}
        longDescription={industry.longDescription}
      />
      <IndustryDetailContent industry={industry} />
      <IndustryDigitalRoadmap industry={industry} />
      <IndustryChallengeSolution industry={industry} challenges={challenges} />
      <IndustrySuccessMetrics industry={industry} />
      <IndustrySolutionShowcase
        industrySlug={industry.slug}
        industryTitle={industry.title}
        solutionSlugs={industry.solutionSlugs}
      />
      <IndustryTechnologies technologies={industry.technologies} />
      <CTASection />
    </main>
  );
}
