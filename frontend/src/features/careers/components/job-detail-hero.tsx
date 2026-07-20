"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JobBookmarkButton } from "./job-bookmark-button";
import {
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Briefcase,
  Share2,
  Building2,
} from "lucide-react";

type JobDetailHeroProps = {
  title: string;
  slug: string;
  departmentSlug: string;
  employmentType: string;
  experienceLevel: string;
  workModel: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  locationSlug: string;
  postedAt: string;
  applicationDeadline: string;
  jobId: string;
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

const departmentNames: Record<string, string> = {
  engineering: "Engineering",
  "ai-ml": "AI & Machine Learning",
  product: "Product",
  design: "Design",
  devops: "DevOps & Infrastructure",
  "cyber-security": "Cyber Security",
  data: "Data Engineering",
  marketing: "Marketing",
};

const experienceLevelLabels: Record<string, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior",
  lead: "Lead",
  executive: "Executive",
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

const locationNames: Record<string, string> = {
  "san-francisco": "San Francisco, CA",
  "new-york": "New York, NY",
  london: "London, UK",
  berlin: "Berlin, Germany",
  singapore: "Singapore",
  dubai: "Dubai, UAE",
  bangalore: "Bangalore, India",
  remote: "Remote Global",
};

function formatSalary(min: number, max: number, currency: string): string {
  const format = (n: number) => {
    if (n >= 1000) return `${Math.round(n / 1000)}K`;
    return n.toString();
  };
  return `${currency} ${format(min)} - ${format(max)}`;
}

export function JobDetailHero({
  title,
  slug,
  departmentSlug,
  employmentType,
  experienceLevel,
  workModel,
  salaryMin,
  salaryMax,
  salaryCurrency,
  locationSlug,
  postedAt,
  applicationDeadline,
  jobId,
}: JobDetailHeroProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${title} at StackSentry`,
        url: `/careers/jobs/${slug}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/careers/jobs/${slug}`);
    }
  };

  return (
    <Section padding="lg">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]" />
          <div className="absolute -right-32 top-1/4 h-72 w-72 rounded-full bg-blue-500/8 blur-[120px]" />
          <div className="absolute -left-32 top-1/2 h-60 w-60 rounded-full bg-purple-500/8 blur-[100px]" />
        </div>

        <Container>
          <div className="relative z-10 py-12 md:py-16">
            <FadeIn>
              <Breadcrumb
                items={[
                  { label: "Careers", href: "/careers" },
                  { label: "Jobs", href: "/careers/jobs" },
                  { label: title },
                ]}
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <Badge variant={departmentColors[departmentSlug] || "blue"} size="md">
                  {departmentNames[departmentSlug] || departmentSlug}
                </Badge>
                <Badge variant="outline" size="md">
                  {employmentTypeLabels[employmentType]}
                </Badge>
                <Badge variant="default" size="md">
                  {experienceLevelLabels[experienceLevel]}
                </Badge>
                <Badge variant="default" size="md">
                  {workModelLabels[workModel]}
                </Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/50">
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-400/70" />
                  {departmentNames[departmentSlug]}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-400/70" />
                  {locationNames[locationSlug] || locationSlug}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-400/70" />
                  {formatSalary(salaryMin, salaryMax, salaryCurrency)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400/70" />
                  Posted {new Date(postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-cyan-400/70" />
                  Deadline{" "}
                  {new Date(applicationDeadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={`/careers/jobs/${slug}/apply`}>
                  <Button
                    size="lg"
                    icon={<Briefcase className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    Apply Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Save Job
                </Button>
                <JobBookmarkButton jobId={jobId} />
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>
    </Section>
  );
}
