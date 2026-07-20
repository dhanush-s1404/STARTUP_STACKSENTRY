import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { getBlogPostBySlug } from "@/data/blog";
import { getAuthorBySlug } from "@/data/authors";
import { ArticleDetail } from "@/features/blog/components/article-detail";
import { BlogBreadcrumb } from "@/features/blog/components/blog-breadcrumb";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { blogPosts } = await import("@/data/blog");
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const author = getAuthorBySlug(post.authorSlug);

  return {
    title: post.seoTitle || `${post.title} | StackSentry Blog`,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords || post.tags.join(", "),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [author?.name || "StackSentry Team"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthorBySlug(post.authorSlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: author?.name || "StackSentry Team",
    },
    publisher: {
      "@type": "Organization",
      name: "StackSentry Technologies",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Container className="pt-8 pb-4">
          <BlogBreadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
        </Container>
        <Container className="pb-24">
          <ArticleDetail post={post} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
