import type { Metadata } from "next";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema, generateCareersPageSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import {
  CareersHero,
  FeaturedJobs,
  DepartmentsGrid,
  RecruitmentProcess,
  BenefitsGrid,
  CareersCta,
} from "@/features/careers/components";

export const metadata: Metadata = {
  title: "Careers | StackSentry Technologies",
  description:
    "Join StackSentry Technologies. Explore open positions, internship programs, and life at our company.",
  openGraph: {
    title: "Careers | StackSentry Technologies",
    description:
      "Join our team and help build the future of enterprise software. Explore roles, culture, and benefits.",
    url: `${siteConfig.url}/careers`,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | StackSentry Technologies",
    description:
      "Join our team and help build the future of enterprise software. Explore roles, culture, and benefits.",
    images: [siteConfig.ogImage],
  },
};

export default function CareersPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
        ])}
      />
      <StructuredData data={generateCareersPageSchema()} />
      <CareersHero />
      <FeaturedJobs />
      <DepartmentsGrid />
      <RecruitmentProcess />
      <BenefitsGrid />
      <CareersCta />
    </main>
  );
}
