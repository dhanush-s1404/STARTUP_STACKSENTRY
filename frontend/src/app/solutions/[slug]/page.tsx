import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  SolutionDetailHero,
  SolutionDetailOverview,
  SolutionDetailArchitecture,
  SolutionDetailROI,
  SolutionDetailComparison,
  SolutionDetailTimeline,
} from "@/features/solutions/components";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { SOLUTIONS, getSolutionBySlug } from "@/data/solutions";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const solution = getSolutionBySlug(slug);
    if (!solution) return { title: "Solution Not Found" };
    return {
      title: solution.title,
      description: solution.description,
    };
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) return notFound();

  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateProductSchema({
          name: solution.title,
          description: solution.description,
          slug,
        })}
      />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Solutions", url: `${siteConfig.url}/solutions` },
          { name: solution.title, url: `${siteConfig.url}/solutions/${slug}` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.title },
        ]}
      />
      <SolutionDetailHero
        title={solution.title}
        description={solution.description}
        icon={solution.icon}
        features={solution.features}
      />
      <SolutionDetailOverview
        title={solution.title}
        description={solution.description}
        businessProblems={solution.businessProblems}
        keyFeatures={solution.keyFeatures}
        businessBenefits={solution.businessBenefits}
      />
      <SolutionDetailArchitecture
        architecture={solution.architecture}
        deploymentModels={solution.deploymentModels}
        integrationSupport={solution.integrationSupport}
      />
      <SolutionDetailROI solution={solution} />
      <SolutionDetailComparison solution={solution} />
      <SolutionDetailTimeline solution={solution} />
      <CTASection />
    </main>
  );
}
