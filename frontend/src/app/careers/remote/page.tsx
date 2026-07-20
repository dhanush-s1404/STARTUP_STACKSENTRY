import type { Metadata } from "next";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { RemoteJobsHero, RemoteJobsContent } from "@/features/careers/components";

export const metadata: Metadata = {
  title: "Remote Jobs | StackSentry Technologies",
  description:
    "Work from anywhere with StackSentry Technologies. Explore remote job opportunities across engineering, design, and more.",
  openGraph: {
    title: "Remote Jobs | StackSentry Technologies",
    description:
      "Work from anywhere with StackSentry Technologies. Explore remote job opportunities across engineering, design, and more.",
    url: `${siteConfig.url}/careers/remote`,
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
    title: "Remote Jobs | StackSentry Technologies",
    description:
      "Work from anywhere with StackSentry Technologies. Explore remote job opportunities across engineering, design, and more.",
    images: [siteConfig.ogImage],
  },
};

export default function RemoteJobsPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          {
            name: "Remote Jobs",
            url: `${siteConfig.url}/careers/remote`,
          },
        ])}
      />
      <RemoteJobsHero />
      <RemoteJobsContent />
    </main>
  );
}
