"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import type { BlogPost } from "@/data/blog";
import { authors } from "@/data/authors";

type FeaturedArticleCardProps = {
  post: BlogPost;
};

export function FeaturedArticleCard({ post }: FeaturedArticleCardProps) {
  const author = authors.find((a) => a.slug === post.authorSlug);

  return (
    <FadeIn direction="up">
      <Link href={`/blog/${post.slug}`} className="block group">
        <Card
          glass
          hover
          glow="blue"
          padding="xl"
          className="relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-all duration-700" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/5 blur-[80px] group-hover:bg-purple-500/10 transition-all duration-700" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="purple" size="md">
                Featured
              </Badge>
              <Badge variant={post.category === "Artificial Intelligence" ? "blue" : "default"} size="sm">
                {post.category}
              </Badge>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors">
              {post.title}
            </h2>

            <p className="text-white/40 text-sm md:text-base mb-6 max-w-2xl leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/30 mb-6">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {author?.name || "StackSentry Team"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/[0.03] px-2.5 py-1 text-xs text-white/40 border border-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Button variant="primary" size="sm" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
              Read Article
            </Button>
          </div>
        </Card>
      </Link>
    </FadeIn>
  );
}
