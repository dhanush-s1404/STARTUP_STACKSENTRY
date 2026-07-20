import type { Metadata } from "next";
import { MeetingRequestForm } from "@/features/consultation/components/meeting-request-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StructuredData } from "@/components/shared/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule a one-on-one consultation with StackSentry's technical team to discuss your project requirements.",
};

export default function MeetingPage() {
  return (
    <main className="flex-1 pt-16">
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Consultation", url: `${siteConfig.url}/consultation` },
          { name: "Book a Meeting", url: `${siteConfig.url}/consultation/meeting` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Consultation", href: "/consultation" },
          { label: "Book a Meeting" },
        ]}
      />
      <MeetingRequestForm />
    </main>
  );
}
