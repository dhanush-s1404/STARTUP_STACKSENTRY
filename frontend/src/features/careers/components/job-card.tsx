"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/lib/motion";
import { MapPin, DollarSign, Clock, Calendar, Share2 } from "lucide-react";
import { JobBookmarkButton } from "./job-bookmark-button";
import type { JobData } from "@/data/careers";

type JobCardProps = {
  job: JobData;
  className?: string;
};

const departmentColors: Record<string, "blue" | "purple" | "cyan" | "green" | "amber" | "outline"> = {
  engineering: "blue",
  "ai-ml": "purple",
  product: "amber",
  design: "outline",
  devops: "cyan",
  "cyber-security": "green",
  data: "purple",
  marketing: "amber",
};

const employmentTypeLabels: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const workModelLabels: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "Onsite",
};

function formatSalary(min: number, max: number, currency: string): string {
  const format = (n: number) => {
    if (n >= 1000) return `${Math.round(n / 1000)}K`;
    return n.toString();
  };
  return `${currency} ${format(min)} - ${format(max)}`;
}

function formatPostedDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function handleShare(e: React.MouseEvent, job: JobData) {
  e.preventDefault();
  e.stopPropagation();
  if (navigator.share) {
    navigator.share({
      title: `${job.title} at StackSentry`,
      text: job.shortDescription,
      url: `/careers/jobs/${job.slug}`,
    });
  } else {
    navigator.clipboard.writeText(`${window.location.origin}/careers/jobs/${job.slug}`);
  }
}

export function JobCard({ job, className }: JobCardProps) {
  const deptColor = departmentColors[job.departmentSlug] || "blue";

  return (
    <MotionDiv whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/careers/jobs/${job.slug}`} className="group block">
        <Card
          hover
          glow="blue"
          padding="lg"
          className={cn("relative h-full transition-all duration-300", className)}
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(168,85,247,0.05))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />

          <div className="absolute right-4 top-4 flex items-center gap-1">
            <JobBookmarkButton jobId={job.id} />
            <button
              onClick={(e) => handleShare(e, job)}
              aria-label="Share job"
              className="rounded-lg p-2 text-white/40 transition-all duration-200 hover:bg-white/[0.05] hover:text-white/80"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant={deptColor} size="sm">
              {job.departmentSlug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Badge>
            <Badge variant="outline" size="sm">
              {employmentTypeLabels[job.employmentType]}
            </Badge>
            <Badge variant="default" size="sm">
              {workModelLabels[job.workModel]}
            </Badge>
          </div>

          <h3 className="mb-2 pr-16 text-lg font-semibold text-white transition-colors group-hover:text-blue-400">
            {job.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/50">
            {job.shortDescription}
          </p>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {job.locationSlug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Posted {formatPostedDate(job.postedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Deadline {new Date(job.applicationDeadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </MotionDiv>
  );
}
