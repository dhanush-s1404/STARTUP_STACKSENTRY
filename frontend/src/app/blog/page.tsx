import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { BlogHero } from "@/features/blog/components/blog-hero";
import { BlogGrid } from "@/features/blog/components/blog-grid";
import { CTASection } from "@/components/sections/cta-section-new";
import { BlogBreadcrumb } from "@/features/blog/components/blog-breadcrumb";

export const metadata: Metadata = {
  title: "Blog | StackSentry Technologies",
  description:
    "Expert perspectives on technology, innovation, and business transformation. Insights on AI, cloud, security, and development.",
  openGraph: {
    title: "Blog | StackSentry Technologies",
    description: "Expert perspectives on technology, innovation, and business transformation.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Container className="pt-8">
          <BlogBreadcrumb items={[{ label: "Blog" }]} />
        </Container>
        <BlogHero />
        <BlogGrid />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
