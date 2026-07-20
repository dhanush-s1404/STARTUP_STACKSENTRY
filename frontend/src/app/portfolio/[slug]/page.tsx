import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProjectDetailHero,
  ProjectDetailOverview,
  ProjectDetailArchitecture,
  ProjectDetailGallery,
  ProjectDetailMetrics,
  ProjectDetailTimeline,
  ProjectDetailRelated,
} from "@/features/portfolio/components";
import { CTASection } from "@/components/sections/cta-section-new";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import {
  PROJECTS,
  getProjectBySlug,
  getRelatedProjects,
} from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = `${project.title} | ${siteConfig.name}`;
  const description = project.shortDescription;
  const url = `${siteConfig.url}/portfolio/${project.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(slug, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    shortDescription: p.shortDescription,
    technologies: p.technologies,
    industry: p.industry,
  }));

  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Portfolio", url: `${siteConfig.url}/portfolio` },
          {
            name: project.title,
            url: `${siteConfig.url}/portfolio/${project.slug}`,
          },
        ])}
      />

      <ProjectDetailHero
        title={project.title}
        shortDescription={project.shortDescription}
        technologies={project.technologies}
        industry={project.industry}
        clientType={project.clientType}
        status={project.status}
        projectDuration={project.projectDuration}
        teamSize={project.teamSize}
        year={project.year}
        isFeatured={project.isFeatured}
      />

      <ProjectDetailOverview
        businessProblem={project.businessProblem}
        solutionOverview={project.solutionOverview}
        keyFeatures={project.keyFeatures}
        clientTestimonial={project.clientTestimonial}
      />

      <ProjectDetailArchitecture
        architecture={project.architecture}
        databaseDesign={project.databaseDesign}
        apiArchitecture={project.apiArchitecture}
        securityMeasures={project.securityMeasures}
        scalabilityFeatures={project.scalabilityFeatures}
      />

      <ProjectDetailGallery
        screenshots={project.screenshots}
        videos={project.videos}
      />

      <ProjectDetailMetrics
        performanceMetrics={project.performanceMetrics}
        testingStrategy={project.testingStrategy}
        deploymentInfo={project.deploymentInfo}
        monitoring={project.monitoring}
      />

      <ProjectDetailTimeline
        developmentTimeline={project.developmentTimeline}
      />

      <ProjectDetailRelated projects={relatedProjects} />

      <CTASection />
    </main>
  );
}
