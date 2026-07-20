import type { Metadata } from "next";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ApplicationSuccess } from "@/features/careers/components";

export const metadata: Metadata = {
  title: "Application Submitted | StackSentry Technologies",
  description:
    "Your application has been submitted successfully. We will review it and get back to you soon.",
  openGraph: {
    title: "Application Submitted | StackSentry Technologies",
    description:
      "Your application has been submitted successfully. We will review it and get back to you soon.",
    url: `${siteConfig.url}/careers/apply/success`,
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
    title: "Application Submitted | StackSentry Technologies",
    description:
      "Your application has been submitted successfully. We will review it and get back to you soon.",
    images: [siteConfig.ogImage],
  },
};

export default function ApplicationSuccessPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Careers", url: `${siteConfig.url}/careers` },
          {
            name: "Application Submitted",
            url: `${siteConfig.url}/careers/apply/success`,
          },
        ])}
      />
      <ApplicationSuccess />
    </main>
  );
}
