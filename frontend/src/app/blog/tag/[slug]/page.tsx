import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger } from "@/components/ui/stagger";
import { getBlogPostsByTag, blogPosts } from "@/data/blog";
import { ArticleCard } from "@/features/blog/components/article-card";
import { BlogBreadcrumb } from "@/features/blog/components/blog-breadcrumb";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const tags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));
  return tags.map((tag) => ({ slug: tag.toLowerCase().replace(/\s+/g, "-") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tagName = slug.replace(/-/g, " ");
  return {
    title: `#${tagName} Articles | StackSentry Blog`,
    description: `Browse our collection of articles tagged with #${tagName}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tagName = slug.replace(/-/g, " ");
  const posts = getBlogPostsByTag(tagName);

  if (posts.length === 0) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Container className="pt-8">
          <BlogBreadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: `#${tagName}` },
            ]}
          />
        </Container>
        <Section padding="lg">
          <Container>
            <Heading
              level="h1"
              gradient
              description={`${posts.length} articles tagged with #${tagName}`}
            >
              #{tagName}
            </Heading>

            <Stagger staggerChildren={0.08} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </Stagger>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
