import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema, generateJobSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { JobDetailHero, JobDetailContent } from "@/features/careers/components";
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

  const title = `${job.title} | Careers | ${siteConfig.name}`;
  const description = job.shortDescription;
  const url = `${siteConfig.url}/careers/jobs/${job.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: job.title,
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

export default async function JobDetailPage({
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
          { name: job.title, url: `${siteConfig.url}/careers/jobs/${job.slug}` },
        ])}
      />
      <StructuredData
        data={generateJobSchema({
          title: job.title,
          description: job.description,
          slug: job.slug,
          department: job.departmentSlug,
          location: job.locationSlug,
          employmentType: job.employmentType,
          datePosted: job.postedAt,
          validThrough: job.applicationDeadline,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          salaryCurrency: job.salaryCurrency,
        })}
      />
      <JobDetailHero
        title={job.title}
        slug={job.slug}
        departmentSlug={job.departmentSlug}
        locationSlug={job.locationSlug}
        employmentType={job.employmentType}
        experienceLevel={job.experienceLevel}
        workModel={job.workModel}
        salaryMin={job.salaryMin}
        salaryMax={job.salaryMax}
        salaryCurrency={job.salaryCurrency}
        postedAt={job.postedAt}
        applicationDeadline={job.applicationDeadline}
        jobId={job.id}
      />
      <JobDetailContent job={job} />
    </main>
  );
}
