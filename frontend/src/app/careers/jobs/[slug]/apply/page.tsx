import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ApplicationHero, ApplicationForm } from "@/features/careers/components";
import { JOBS, getJobBySlug } from "@/data/careers";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: "Job Not Found" };
  }

  const title = `Apply for ${job.title} | StackSentry Technologies`;
  const description = `Apply now for the ${job.title} position at StackSentry Technologies.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/careers/jobs/${job.slug}/apply`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `Apply for ${job.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          { name: "Open Positions", url: `${siteConfig.url}/careers/jobs` },
          {
            name: job.title,
            url: `${siteConfig.url}/careers/jobs/${job.slug}`,
          },
          {
            name: "Apply",
            url: `${siteConfig.url}/careers/jobs/${job.slug}/apply`,
          },
        ])}
      />
      <ApplicationHero
        jobTitle={job.title}
        department={job.departmentSlug}
        location={job.locationSlug}
      />
      <ApplicationForm jobSlug={job.slug} jobTitle={job.title} />
    </main>
  );
}
