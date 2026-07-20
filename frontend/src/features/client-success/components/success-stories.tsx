"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";

type BeforeAfterMetric = {
  label: string;
  before: string;
  after: string;
};

type SuccessStory = {
  title: string;
  description: string;
  industry: string;
  badgeVariant: "blue" | "purple" | "cyan" | "green" | "amber";
  metrics: [BeforeAfterMetric, BeforeAfterMetric, BeforeAfterMetric];
  quote: string;
  quoteAuthor: string;
  caseStudySlug: string;
};

const stories: SuccessStory[] = [
  {
    title: "Fortune 500 Recruitment Overhaul",
    description:
      "Redesigned the entire hiring pipeline for a Fortune 500 company, replacing fragmented spreadsheets and manual tracking with an end-to-end recruitment platform powered by intelligent automation.",
    industry: "Recruitment",
    badgeVariant: "blue",
    metrics: [
      { label: "Hiring Time", before: "90 days", after: "36 days" },
      { label: "Annual Savings", before: "$0", after: "$1.58M" },
      { label: "Candidate Quality", before: "62% match", after: "94% match" },
    ],
    quote:
      "They didn't just build software\u2014they fundamentally transformed how we attract and hire talent. The ROI was visible within the first quarter.",
    quoteAuthor: "VP of Talent Acquisition",
    caseStudySlug: "fortune-500-recruitment",
  },
  {
    title: "500-Bed Hospital Digitization",
    description:
      "Digitized patient records, scheduling, and billing workflows for a 500-bed hospital network, integrating legacy systems with a modern, HIPAA-compliant platform.",
    industry: "Healthcare",
    badgeVariant: "green",
    metrics: [
      { label: "Patient Processing", before: "12 min avg", after: "6.5 min avg" },
      { label: "Data Entry Errors", before: "1 in 20 records", after: "1 in 800 records" },
      { label: "Staff Onboarding", before: "3 weeks", after: "4 days" },
    ],
    quote:
      "Our nurses spend less time on paperwork and more time with patients. That\u2019s the kind of impact that matters.",
    quoteAuthor: "Chief Medical Officer",
    caseStudySlug: "500-bed-hospital-digitization",
  },
  {
    title: "E-Commerce Scale to 1M Users",
    description:
      "Architected a scalable e-commerce platform from a monolithic legacy system, enabling seamless growth from 100K to 1M concurrent users during peak traffic events.",
    industry: "Retail",
    badgeVariant: "amber",
    metrics: [
      { label: "Page Load Time", before: "4.2s", after: "1.2s" },
      { label: "Revenue Growth", before: "$2M ARR", after: "$6M ARR" },
      { label: "Cart Abandonment", before: "78%", after: "32%" },
    ],
    quote:
      "Black Friday used to terrify us. Now it\u2019s our biggest revenue day with zero downtime. StackSentry made that possible.",
    quoteAuthor: "CTO, E-Commerce Platform",
    caseStudySlug: "ecommerce-scale-1m-users",
  },
  {
    title: "Manufacturing ERP Deployment",
    description:
      "Deployed a unified ERP system across five manufacturing facilities, consolidating inventory, production planning, financial reporting, and supply chain management into a single source of truth.",
    industry: "Manufacturing",
    badgeVariant: "purple",
    metrics: [
      { label: "Financial Close", before: "14 days", after: "2.5 days" },
      { label: "Annual Savings", before: "$0", after: "$2M" },
      { label: "Inventory Accuracy", before: "72%", after: "99.2%" },
    ],
    quote:
      "We went from five disconnected systems to one platform that gives us real-time visibility across every facility. Game-changing.",
    quoteAuthor: "Director of Operations",
    caseStudySlug: "manufacturing-erp-deployment",
  },
  {
    title: "Fintech Compliance Automation",
    description:
      "Built an automated KYC/AML compliance engine for a fast-growing fintech, replacing manual review processes with real-time risk scoring and regulatory reporting.",
    industry: "Finance",
    badgeVariant: "cyan",
    metrics: [
      { label: "KYC Processing", before: "48 hours", after: "15 minutes" },
      { label: "Regulatory Findings", before: "12 per audit", after: "0" },
      { label: "Team Efficiency", before: "40 reviews/day", after: "800 reviews/day" },
    ],
    quote:
      "Regulatory compliance used to be our biggest bottleneck. Now it\u2019s our competitive advantage.",
    quoteAuthor: "Head of Compliance",
    caseStudySlug: "fintech-compliance-automation",
  },
  {
    title: "School ERP for 50K Students",
    description:
      "Developed a comprehensive school management ERP covering admissions, attendance, grading, fee management, and parent communication for a district serving 50,000 students.",
    industry: "Education",
    badgeVariant: "purple",
    metrics: [
      { label: "Admin Overhead", before: "40 staff hours/week", after: "16 staff hours/week" },
      { label: "Data Accuracy", before: "84%", after: "98.5%" },
      { label: "Parent Engagement", before: "35% portal usage", after: "89% portal usage" },
    ],
    quote:
      "The system paid for itself in six months. Teachers and parents both love how intuitive it is.",
    quoteAuthor: "District Superintendent",
    caseStudySlug: "school-erp-50k-students",
  },
];

export function SuccessStories() {
  return (
    <Section padding="lg" background="subtle">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="Real transformations delivered for real organizations. Every story is backed by measurable outcomes."
          >
            Success Stories
          </Heading>
        </FadeIn>

        <Stagger delay={0.1} staggerChildren={0.12} className="mt-16 space-y-8">
          {stories.map((story, index) => (
            <StaggerItem key={story.caseStudySlug}>
              <SuccessStoryCard story={story} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

function SuccessStoryCard({ story, index }: { story: SuccessStory; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <Card glass hover={false} padding="none" className="group overflow-hidden">
      {/* Gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(168,85,247,0.08), rgba(16,185,129,0.08))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      <div
        className={cn(
          "flex flex-col gap-0 lg:flex-row",
          isReversed && "lg:flex-row-reverse",
        )}
      >
        {/* Text content */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10">
          <div className="mb-4 flex items-center gap-3">
            <Badge variant={story.badgeVariant} size="md">
              {story.industry}
            </Badge>
          </div>

          <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
            {story.title}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-white/50 sm:text-base">
            {story.description}
          </p>

          {/* Quote */}
          <blockquote className="relative mb-6 border-l-2 border-white/10 pl-4">
            <Quote className="absolute -left-1 -top-1 h-4 w-4 text-white/20" />
            <p className="text-sm italic leading-relaxed text-white/60">
              &ldquo;{story.quote}&rdquo;
            </p>
            <cite className="mt-2 block text-xs font-medium text-white/40 not-italic">
              &mdash; {story.quoteAuthor}
            </cite>
          </blockquote>

          <Link
            href={`/case-studies/${story.caseStudySlug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Read Full Case Study
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>

        {/* Before/After metrics */}
        <div
          className={cn(
            "flex flex-1 flex-col justify-center border-t border-white/[0.06] bg-white/[0.01] p-6 sm:p-8 lg:border-t-0",
            isReversed ? "lg:border-r" : "lg:border-l",
          )}
        >
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
            Before &amp; After
          </h4>
          <div className="space-y-4">
            {story.metrics.map((metric) => (
              <MetricComparison key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function MetricComparison({ metric }: { metric: BeforeAfterMetric }) {
  return (
    <MotionDiv
      whileHover={{ x: 4 }}
      className="group/metric rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.04]"
    >
      <p className="mb-2 text-xs font-medium text-white/50">{metric.label}</p>
      <div className="flex items-baseline gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-white/30">Before</span>
          <p className="text-sm font-semibold text-white/40 line-through decoration-white/20">
            {metric.before}
          </p>
        </div>
        <span className="text-lg text-white/20">&rarr;</span>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-emerald-400/60">After</span>
          <p className="text-sm font-bold text-emerald-400">
            {metric.after}
          </p>
        </div>
      </div>
    </MotionDiv>
  );
}
