"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import { cn } from "@/lib/cn";

type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
};

const posts: BlogPost[] = [
  {
    slug: "building-enterprise-ai-agents",
    title: "Building Enterprise AI Agents with LangChain",
    category: "AI",
    excerpt: "A deep dive into constructing production-ready AI agents using LangChain framework with real-world enterprise use cases.",
    author: "Sarah Chen",
    date: "Jan 15, 2026",
    readTime: "12 min read",
  },
  {
    slug: "microservices-vs-monolith",
    title: "Microservices vs Monolith: A Decision Guide",
    category: "Development",
    excerpt: "Understanding when to choose microservices architecture over monolithic design, with practical decision frameworks.",
    author: "James Mitchell",
    date: "Jan 10, 2026",
    readTime: "8 min read",
  },
  {
    slug: "securing-cloud-infrastructure-aws",
    title: "Securing Your Cloud Infrastructure on AWS",
    category: "Cloud",
    excerpt: "Best practices for hardening AWS environments, from IAM policies to network security and monitoring.",
    author: "Alex Rivera",
    date: "Jan 5, 2026",
    readTime: "10 min read",
  },
  {
    slug: "future-of-recruitment-ai",
    title: "The Future of Recruitment: AI-Powered Hiring",
    category: "Recruitment",
    excerpt: "How artificial intelligence is transforming talent acquisition and what it means for tech companies.",
    author: "Emily Park",
    date: "Dec 28, 2025",
    readTime: "6 min read",
  },
  {
    slug: "python-best-practices-enterprise",
    title: "Python Best Practices for Enterprise Projects",
    category: "Python",
    excerpt: "Battle-tested patterns and conventions for building maintainable Python applications at scale.",
    author: "David Kim",
    date: "Dec 20, 2025",
    readTime: "15 min read",
  },
  {
    slug: "zero-trust-security-architecture",
    title: "Zero Trust Security Architecture Guide",
    category: "Security",
    excerpt: "Implementing a zero trust model across your organization from network to application layer.",
    author: "Lisa Wang",
    date: "Dec 15, 2025",
    readTime: "11 min read",
  },
];

const categories = ["All", "AI", "Python", "Cloud", "Security", "Development", "Recruitment"];

const categoryColors: Record<string, "blue" | "purple" | "cyan" | "green" | "amber" | "default"> = {
  AI: "purple",
  Python: "blue",
  Cloud: "cyan",
  Security: "green",
  Development: "default",
  Recruitment: "amber",
};

export function BlogPreview() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <Section id="blog-preview" padding="lg">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6 mb-12">
          <Heading
            level="h2"
            align="left"
            description="Expert perspectives on technology, innovation, and business transformation"
          >
            Latest Insights
          </Heading>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 shrink-0"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/70 border border-white/[0.06]",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <Stagger staggerChildren={0.06} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <StaggerItem key={post.slug}>
              <MotionDiv
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <Card glass hover glow="blue" className="group flex h-full flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant={categoryColors[post.category] || "default"} size="sm">
                        {post.category}
                      </Badge>
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-white leading-snug transition-colors group-hover:text-blue-300">
                      {post.title}
                    </h3>

                    <p className="mb-6 flex-1 text-sm text-white/40 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </Card>
                </Link>
              </MotionDiv>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 text-center">
          <Button variant="secondary" size="lg">
            Load More
          </Button>
        </div>
      </Container>
    </Section>
  );
}
