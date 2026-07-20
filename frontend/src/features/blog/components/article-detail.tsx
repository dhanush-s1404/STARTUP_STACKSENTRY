"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger } from "@/components/ui/stagger";
import { getAuthorBySlug } from "@/data/authors";
import { getRelatedPosts } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import { ReadingProgress } from "./reading-progress";
import { TableOfContents } from "./table-of-contents";
import { ShareSection } from "./share-section";
import { CTABanner } from "./cta-banner";
import { NewsletterCard } from "./newsletter-card";
import { CategoryBadge } from "./category-badge";
import { TagBadge } from "./tag-badge";
import { AuthorCard } from "./author-card";
import { ArticleCard } from "./article-card";
import { CodeBlock } from "./code-block";
import { QuoteBlock } from "./quote-block";

type ArticleDetailProps = {
  post: BlogPost;
};

function renderContent(content: string) {
  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines: string[] = [];
  const elements: React.ReactElement[] = [];
  let key = 0;

  const flushCode = () => {
    if (codeLines.length > 0) {
      elements.push(
        <CodeBlock
          key={key++}
          code={codeLines.join("\n")}
          language={codeLanguage}
          showLineNumbers
        />
      );
      codeLines = [];
      codeLanguage = "";
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
      } else {
        flushCode();
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith("## ")) {
      const id = line.slice(3).trim().toLowerCase().replace(/\s+/g, "-");
      elements.push(
        <h2
          key={key++}
          id={id}
          className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      const id = line.slice(4).trim().toLowerCase().replace(/\s+/g, "-");
      elements.push(
        <h3
          key={key++}
          id={id}
          className="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-24"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <QuoteBlock key={key++} text={line.slice(2)} />
      );
    } else if (line.startsWith("| ")) {
      if (line.includes("|---")) continue;
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.length > 0) {
        elements.push(
          <div key={key++} className="flex gap-4 py-1 text-sm">
            {cells.map((cell, i) => (
              <span key={i} className="text-white/70 flex-1">{cell}</span>
            ))}
          </div>
        );
      }
    } else if (line.startsWith("- ")) {
      const text = line.slice(2);
      const isCheckbox = text.startsWith("[x] ") || text.startsWith("[ ] ");
      if (isCheckbox) {
        const checked = text.startsWith("[x]");
        elements.push(
          <div key={key++} className="flex items-center gap-2 py-0.5 text-sm text-white/70">
            <span className={checked ? "text-green-400" : "text-white/20"}>
              {checked ? "✓" : "○"}
            </span>
            <span>{text.slice(4)}</span>
          </div>
        );
      } else {
        elements.push(
          <li key={key++} className="text-white/70 text-sm ml-6 list-disc py-0.5">
            {text}
          </li>
        );
      }
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={key++} className="text-white/70 text-sm ml-6 list-decimal py-0.5">
          {line.replace(/^\d+\. /, "")}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-white/70 leading-relaxed mb-4">
          {line}
        </p>
      );
    }
  }
  flushCode();

  return elements;
}

export function ArticleDetail({ post }: ArticleDetailProps) {
  const author = getAuthorBySlug(post.authorSlug);
  const relatedPosts = getRelatedPosts(post.slug);


  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ReadingProgress />

      <article className="relative">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <FadeIn direction="up">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <CategoryBadge category={post.category} size="md" />
              <span className="flex items-center gap-1.5 text-xs text-white/30">
                <Calendar className="h-3.5 w-3.5" />
                {publishedDate}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/30">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-white/40 mb-8 max-w-3xl leading-relaxed">
              {post.excerpt}
            </p>

            {author && (
              <div className="mb-10">
                <AuthorCard author={author} size="lg" />
              </div>
            )}

            {post.featuredImage && (
              <div className="relative mb-12 rounded-2xl overflow-hidden border border-white/[0.06]">
                <div className="aspect-[2/1] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 flex items-center justify-center">
                  <span className="text-white/10 text-lg">{post.title}</span>
                </div>
              </div>
            )}
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-8">
                <TableOfContents />

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Share</h3>
                  <ShareSection title={post.title} />
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0 max-w-3xl">
              <div className="prose prose-invert max-w-none">
                {renderContent(post.content)}
              </div>

              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                  <ShareSection title={post.title} />
                </div>
              </div>

              {author && (
                <div className="mt-8 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <AuthorCard author={author} size="lg" />
                  <p className="mt-3 text-sm text-white/40 leading-relaxed">{author.bio}</p>
                </div>
              )}

              <div className="mt-12 flex items-center justify-between">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All Articles
                </Link>
              </div>

              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
                  <Stagger staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.slice(0, 2).map((rp) => (
                      <ArticleCard key={rp.slug} post={rp} />
                    ))}
                  </Stagger>
                </div>
              )}

              <div className="mt-12">
                <CTABanner />
              </div>
            </div>

            <aside className="hidden xl:block w-72 shrink-0">
              <div className="sticky top-24 space-y-6">
                <NewsletterCard />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
