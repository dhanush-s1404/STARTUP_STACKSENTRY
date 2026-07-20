"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, TrendingUp, Tag, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stagger } from "@/components/ui/stagger";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";
import { blogPosts, getPopularPosts, blogCategoriesWithCount } from "@/data/blog";
import { ArticleCard } from "./article-card";
import { FeaturedArticleCard } from "./featured-article-card";
import { NewsletterCard } from "./newsletter-card";
import { searchBlogPosts } from "@/data/blog";

export const categoryColors: Record<string, "blue" | "purple" | "cyan" | "green" | "amber" | "default"> = {
  "Artificial Intelligence": "purple",
  Python: "blue",
  FastAPI: "green",
  "Next.js": "cyan",
  React: "blue",
  "Cloud Computing": "cyan",
  "Cyber Security": "green",
  DevOps: "amber",
  "Software Architecture": "default",
  "UI/UX": "purple",
  "Business Automation": "amber",
  "Case Studies": "blue",
  "Company News": "default",
  "Technology Trends": "purple",
};

const allCategories = ["All", ...blogCategoriesWithCount.map((c) => c.name)];

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery
    ? searchBlogPosts(searchQuery)
    : activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featured = blogPosts.filter((p) => p.isFeatured);
  const popular = getPopularPosts(5);

  return (
    <Section id="blog-grid" padding="lg">
      <Container>
        {featured.length > 0 && (
          <FadeIn direction="up">
            <h2 className="text-lg font-semibold text-white/60 mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Featured Article
            </h2>
            <div className="mb-16">
              <FeaturedArticleCard post={featured[0]} />
            </div>
          </FadeIn>
        )}

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white/60 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                {searchQuery ? `Search results for "${searchQuery}"` : "Latest Articles"}
              </h2>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Clear search
                </button>
              )}
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                    activeCategory === cat && !searchQuery
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/70 border border-white/[0.06]",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No articles found in this category.</p>
              </div>
            ) : (
              <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filtered.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </Stagger>
            )}
          </div>

          <aside className="w-full shrink-0 space-y-8 lg:w-80">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Popular Posts
              </h3>
              <div className="space-y-4">
                {popular.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card key={post.slug} glass hover padding="md">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={categoryColors[post.category] || "default"}
                          size="sm"
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <h4 className="mb-2 text-sm font-medium text-white leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="flex items-center gap-1.5 text-xs text-white/30">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                <Tag className="h-5 w-5 text-purple-400" />
                Categories
              </h3>
              <div className="space-y-2">
                {blogCategoriesWithCount.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-all duration-200",
                      activeCategory === cat.name && !searchQuery
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-white/40 hover:bg-white/[0.03] hover:text-white/60",
                    )}
                  >
                    <span>{cat.name}</span>
                    <Badge variant="default" size="sm">
                      {cat.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            <NewsletterCard />
          </aside>
        </div>
      </Container>
    </Section>
  );
}
