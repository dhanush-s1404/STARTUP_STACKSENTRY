import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger } from "@/components/ui/stagger";
import { blogCategories, getBlogPostsByCategory } from "@/data/blog";
import { ArticleCard } from "@/features/blog/components/article-card";
import { BlogBreadcrumb } from "@/features/blog/components/blog-breadcrumb";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogCategories.map((cat) => ({ slug: cat.toLowerCase().replace(/\s+/g, "-") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.toLowerCase().replace(/\s+/g, "-") === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category} Articles | StackSentry Blog`,
    description: `Browse our collection of ${category} articles, insights, and best practices from StackSentry Technologies.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.toLowerCase().replace(/\s+/g, "-") === slug);

  if (!category) notFound();

  const posts = getBlogPostsByCategory(category);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Container className="pt-8">
          <BlogBreadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: category },
            ]}
          />
        </Container>
        <Section padding="lg">
          <Container>
            <Heading
              level="h1"
              gradient
              description={`Explore our ${posts.length} articles about ${category}`}
            >
              {category}
            </Heading>

            {posts.length === 0 ? (
              <div className="text-center py-20 text-white/40">
                <p>No articles found in this category yet.</p>
                <Link href="/blog" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
                  Browse all articles
                </Link>
              </div>
            ) : (
              <Stagger staggerChildren={0.08} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </Stagger>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
