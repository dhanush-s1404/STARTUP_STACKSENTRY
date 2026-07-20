"use client";

import { cn } from "@/lib/cn";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/lib/motion";
import { Quote, Play, Star } from "lucide-react";

export type TestimonialCardProps = {
  clientName: string;
  clientRole: string;
  clientCompany: string;
  content: string;
  rating: number;
  industry: string;
  avatarInitials?: string;
  isFeatured?: boolean;
  videoUrl?: string;
};

const industryVariantMap: Record<string, "blue" | "purple" | "cyan" | "green" | "amber" | "default"> = {
  Healthcare: "cyan",
  Finance: "green",
  Education: "purple",
  Recruitment: "blue",
  Retail: "amber",
  Manufacturing: "default",
  Logistics: "blue",
  Hospitality: "amber",
  Government: "purple",
  "Real Estate": "green",
  Travel: "cyan",
};

const avatarColorMap: Record<string, string> = {
  Healthcare: "from-cyan-500 to-blue-600",
  Finance: "from-emerald-500 to-teal-600",
  Education: "from-purple-500 to-violet-600",
  Recruitment: "from-blue-500 to-indigo-600",
  Retail: "from-amber-500 to-orange-600",
  Manufacturing: "from-slate-500 to-zinc-600",
  Logistics: "from-blue-500 to-sky-600",
  Hospitality: "from-amber-500 to-yellow-600",
  Government: "from-purple-500 to-fuchsia-600",
  "Real Estate": "from-emerald-500 to-green-600",
  Travel: "from-cyan-500 to-teal-600",
};

export function TestimonialCard({
  clientName,
  clientRole,
  clientCompany,
  content,
  rating,
  industry,
  avatarInitials,
  isFeatured = false,
  videoUrl,
}: TestimonialCardProps) {
  const initials =
    avatarInitials ||
    clientName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const gradientClass = avatarColorMap[industry] || "from-blue-500 to-purple-600";
  const badgeVariant = industryVariantMap[industry] || "default";

  return (
    <MotionDiv
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Gradient border wrapper */}
      <div
        className={cn(
          "absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
          isFeatured && "from-amber-400/20 via-amber-500/10 to-amber-400/20 opacity-100",
        )}
      />

      {/* Glow effect */}
      <div
        className={cn(
          "absolute -inset-4 rounded-3xl opacity-0 blur-xl transition-opacity duration-500",
          "group-hover:opacity-100",
          isFeatured ? "bg-amber-500/10" : "bg-blue-500/10",
        )}
      />

      {/* Card content */}
      <div
        className={cn(
          "relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300",
          "group-hover:border-white/10 group-hover:bg-white/[0.05]",
          isFeatured && "border-amber-400/20 bg-amber-500/[0.03]",
        )}
      >
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute -top-3 right-4">
            <Badge variant="amber" size="sm">
              <Star className="mr-1 h-3 w-3" fill="currentColor" />
              Featured
            </Badge>
          </div>
        )}

        {/* Quote icon */}
        <div className="mb-4">
          <Quote
            className={cn(
              "h-8 w-8 transition-colors duration-300",
              isFeatured ? "text-amber-400/40" : "text-white/10",
              "group-hover:text-amber-400/60",
            )}
          />
        </div>

        {/* Content */}
        <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-white/60 italic md:text-base">
          &ldquo;{content}&rdquo;
        </blockquote>

        {/* Rating */}
        <div className="mb-4">
          <Rating value={rating} readonly size="sm" />
        </div>

        {/* Client info */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white",
              gradientClass,
            )}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white/90">{clientName}</p>
            <p className="truncate text-xs text-white/40">
              {clientRole}, {clientCompany}
            </p>
          </div>
          <Badge variant={badgeVariant} size="sm">
            {industry}
          </Badge>
        </div>

        {/* Video play button */}
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch video testimonial from ${clientName}`}
            className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 transition-all hover:border-amber-400/30 hover:bg-amber-500/10 hover:text-amber-400"
          >
            <Play className="h-3.5 w-3.5" fill="currentColor" />
            Watch Video Testimonial
          </a>
        )}
      </div>
    </MotionDiv>
  );
}
