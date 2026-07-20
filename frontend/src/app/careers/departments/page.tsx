import type { Metadata } from "next";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { DepartmentsGrid } from "@/features/careers/components";

export const metadata: Metadata = {
  title: "Departments | StackSentry Technologies",
  description:
    "Explore the teams and departments at StackSentry Technologies. Find the right team for your skills and career goals.",
  openGraph: {
    title: "Departments | StackSentry Technologies",
    description:
      "Explore the teams and departments at StackSentry Technologies. Find the right team for your skills and career goals.",
    url: `${siteConfig.url}/careers/departments`,
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
    title: "Departments | StackSentry Technologies",
    description:
      "Explore the teams and departments at StackSentry Technologies. Find the right team for your skills and career goals.",
    images: [siteConfig.ogImage],
  },
};

export default function DepartmentsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          {
            name: "Departments",
            url: `${siteConfig.url}/careers/departments`,
          },
        ])}
      />
      <DepartmentsGrid />
    </main>
  );
}
