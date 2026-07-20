"use client";

import { CaseStudyCard } from "./case-study-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { FadeIn } from "@/components/ui/fade-in";

const caseStudies = [
  {
    slug: "ai-recruitment-transformation",
    title: "AI-Powered Recruitment Transformation",
    subtitle:
      "How we reduced hiring time by 60% for a Fortune 500 company",
    kpis: [
      { metric: "Hiring Time", improvement: "60% reduction" },
      { metric: "Candidate Quality", improvement: "40% increase" },
      { metric: "Cost per Hire", improvement: "35% savings" },
    ],
    technologiesUsed: ["React", "Python", "OpenAI", "PostgreSQL"],
    industry: "Recruitment",
    isFeatured: true,
  },
  {
    slug: "hospital-digital-transformation",
    title: "Hospital Digital Transformation",
    subtitle:
      "Digitizing patient management for a 500-bed hospital network",
    kpis: [
      { metric: "Patient Wait Time", improvement: "45% reduction" },
      { metric: "Paper Usage", improvement: "90% reduction" },
      { metric: "Staff Efficiency", improvement: "3x improvement" },
    ],
    technologiesUsed: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
    industry: "Healthcare",
    isFeatured: true,
  },
  {
    slug: "ecommerce-scale",
    title: "Scaling E-Commerce to 1M Users",
    subtitle:
      "Building infrastructure that handles Black Friday traffic spikes",
    kpis: [
      { metric: "Page Load", improvement: "2.1s average" },
      { metric: "Uptime", improvement: "99.99%" },
      { metric: "Revenue", improvement: "200% growth" },
    ],
    technologiesUsed: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    industry: "Retail",
    isFeatured: true,
  },
  {
    slug: "erp-implementation",
    title: "Enterprise ERP Implementation",
    subtitle:
      "Streamlining operations for a manufacturing conglomerate",
    kpis: [
      { metric: "Process Efficiency", improvement: "55% improvement" },
      { metric: "Cost Savings", improvement: "$2M annual" },
      { metric: "Data Accuracy", improvement: "99.5%" },
    ],
    technologiesUsed: ["React", "Django", "PostgreSQL", "Docker"],
    industry: "Manufacturing",
    isFeatured: false,
  },
  {
    slug: "fintech-compliance",
    title: "Fintech Compliance Platform",
    subtitle:
      "Automating regulatory compliance for a digital banking startup",
    kpis: [
      { metric: "Compliance Time", improvement: "80% faster" },
      { metric: "Audit Score", improvement: "98/100" },
      { metric: "Risk Events", improvement: "70% reduction" },
    ],
    technologiesUsed: ["Python", "FastAPI", "ElasticSearch", "Redis"],
    industry: "Finance",
    isFeatured: false,
  },
];

export function CaseStudiesGrid() {
  return (
    <Section padding="lg" background="subtle">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="Explore how we've helped organizations across industries achieve measurable results."
          >
            Our Work
          </Heading>
        </FadeIn>

        <Stagger delay={0.1} staggerChildren={0.1} className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {caseStudies.map((study) => (
              <StaggerItem key={study.slug}>
                <CaseStudyCard
                  slug={study.slug}
                  title={study.title}
                  subtitle={study.subtitle}
                  kpis={study.kpis}
                  technologiesUsed={study.technologiesUsed}
                  isFeatured={study.isFeatured}
                />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
