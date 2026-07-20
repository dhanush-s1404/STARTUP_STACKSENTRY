"use client";

import Link from "next/link";
import { Clock, Calendar, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import type { BlogPost } from "@/data/blog";
import { authors } from "@/data/authors";
import { categoryColors } from "./blog-grid";

type ArticleCardProps = {
  post: BlogPost;
};

export function ArticleCard({ post }: ArticleCardProps) {
  const author = authors.find((a) => a.slug === post.authorSlug);

  return (
    <StaggerItem>
      <MotionDiv
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full"
      >
        <Link href={`/blog/${post.slug}`} className="block h-full">
          <Card glass hover glow="blue" className="group flex h-full flex-col">
            {post.featuredImage && (
              <div className="relative -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-2xl">
                <div className="aspect-[2/1] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white/10">{post.category[0]}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <Badge variant={categoryColors[post.category] || "default"} size="sm">
                {post.category}
              </Badge>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-white leading-snug transition-colors group-hover:text-blue-300">
              {post.title}
            </h3>

            <p className="mb-4 flex-1 text-sm text-white/40 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-md bg-white/[0.03] px-2 py-0.5 text-xs text-white/30 border border-white/[0.06]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-white/30 mt-auto pt-4 border-t border-white/[0.06]">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {author?.name || "StackSentry Team"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
            </div>
          </Card>
        </Link>
      </MotionDiv>
    </StaggerItem>
  );
}
