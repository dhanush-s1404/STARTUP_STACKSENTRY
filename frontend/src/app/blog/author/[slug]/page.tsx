import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger } from "@/components/ui/stagger";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { authors, getAuthorBySlug } from "@/data/authors";
import { blogPosts } from "@/data/blog";
import { ArticleCard } from "@/features/blog/components/article-card";
import { BlogBreadcrumb } from "@/features/blog/components/blog-breadcrumb";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };
  return {
    title: `${author.name} - Author | StackSentry Blog`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = blogPosts.filter((p) => p.authorSlug === slug);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Container className="pt-8 pb-4">
          <BlogBreadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: `Author: ${author.name}` },
            ]}
          />
        </Container>
        <Section padding="lg">
          <Container>
            <Card glass padding="xl" className="mb-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar
                  src={author.avatar}
                  alt={author.name}
                  name={author.name}
                  size="xl"
                  className="h-24 w-24"
                />
                <div>
                  <Heading
                    level="h1"
                    gradient
                    className="text-center md:text-left"
                  >
                    {author.name}
                  </Heading>
                  <p className="text-blue-400 text-sm mt-1 text-center md:text-left">{author.role}</p>
                  <p className="text-white/40 text-sm mt-4 max-w-2xl leading-relaxed">
                    {author.bio}
                  </p>
                  <p className="text-white/30 text-sm mt-4">
                    {posts.length} {posts.length === 1 ? "article" : "articles"} published
                  </p>
                </div>
              </div>
            </Card>

            <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
