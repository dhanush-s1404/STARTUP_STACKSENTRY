"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import { AwardCard } from "./award-card";
import {
  FileCheck,
  Newspaper,
  Github,
  ExternalLink,
  Star,
} from "lucide-react";

type AwardCategory = "innovation" | "leadership" | "technical" | "community";

type AwardData = {
  title: string;
  description: string;
  issuer: string;
  category: AwardCategory;
  year: number;
};

const awards: AwardData[] = [
  {
    title: "Best Enterprise AI Platform 2025",
    description:
      "Recognized for pioneering AI-driven enterprise solutions that transform business operations at scale.",
    issuer: "TechCrunch Disrupt",
    category: "innovation",
    year: 2025,
  },
  {
    title: "Top Software Development Company",
    description:
      "Ranked among the leading software development firms globally for client satisfaction and delivery excellence.",
    issuer: "Clutch",
    category: "leadership",
    year: 2025,
  },
  {
    title: "Innovation in Healthcare Technology",
    description:
      "Awarded for developing AI-powered diagnostic tools that improve patient outcomes in clinical settings.",
    issuer: "HIMSS",
    category: "innovation",
    year: 2024,
  },
  {
    title: "Fastest Growing Tech Startup",
    description:
      "Recognized for exceptional revenue growth and market expansion in the competitive SaaS landscape.",
    issuer: "Deloitte Fast 500",
    category: "leadership",
    year: 2024,
  },
  {
    title: "Best Open Source Contribution",
    description:
      "Acknowledged for significant contributions to open source infrastructure tooling and developer experience.",
    issuer: "GitHub Stars",
    category: "community",
    year: 2025,
  },
  {
    title: "Excellence in Cloud Architecture",
    description:
      "Awarded for designing resilient, scalable cloud-native architectures on AWS infrastructure.",
    issuer: "AWS re:Invent",
    category: "technical",
    year: 2024,
  },
  {
    title: "Best UI/UX Design Award",
    description:
      "Recognized for outstanding interface design and seamless user experiences across enterprise applications.",
    issuer: "Awwwards",
    category: "technical",
    year: 2025,
  },
  {
    title: "Top AI Implementation Partner",
    description:
      "Named premier partner for deploying production-grade machine learning systems at enterprise scale.",
    issuer: "OpenAI",
    category: "innovation",
    year: 2025,
  },
  {
    title: "Best Remote Workplace",
    description:
      "Recognized as a top remote-first company fostering innovation, collaboration, and employee wellbeing.",
    issuer: "BuiltIn",
    category: "leadership",
    year: 2024,
  },
  {
    title: "Cybersecurity Excellence Award",
    description:
      "Awarded for implementing zero-trust security architectures and advanced threat detection systems.",
    issuer: "CyberDefense Magazine",
    category: "technical",
    year: 2024,
  },
  {
    title: "Green Software Innovation",
    description:
      "Recognized for developing carbon-aware computing solutions and sustainable software engineering practices.",
    issuer: "Green Software Foundation",
    category: "community",
    year: 2025,
  },
  {
    title: "Community Impact Award",
    description:
      "Honored for mentoring emerging developers and contributing to inclusive technology education programs.",
    issuer: "Tech for Good",
    category: "community",
    year: 2024,
  },
];

const certifications = [
  {
    title: "ISO 27001 Certified",
    issuer: "International Organization for Standardization",
    year: 2024,
  },
  {
    title: "SOC 2 Type II Compliant",
    issuer: "AICPA",
    year: 2024,
  },
  {
    title: "AWS Advanced Consulting Partner",
    issuer: "Amazon Web Services",
    year: 2025,
  },
  {
    title: "Google Cloud Partner",
    issuer: "Google Cloud",
    year: 2025,
  },
  {
    title: "Microsoft Gold Partner",
    issuer: "Microsoft",
    year: 2024,
  },
  {
    title: "CMMI Level 5 Appraised",
    issuer: "CMMI Institute",
    year: 2025,
  },
];

const pressMentions = [
  {
    title: "StackSentry Redefines Enterprise AI with Next-Gen Platform",
    publication: "Forbes Tech Council",
    date: "March 2025",
  },
  {
    title: "The Startup That's Making Enterprise AI Accessible",
    publication: "TechCrunch",
    date: "January 2025",
  },
  {
    title: "How StackSentry Is Building the Future of Cloud Architecture",
    publication: "The Verge",
    date: "November 2024",
  },
  {
    title: "Top 10 AI Companies to Watch in 2025",
    publication: "Wired",
    date: "December 2024",
  },
];

const openSourceProjects = [
  {
    name: "sentry-core",
    description: "High-performance monitoring SDK for distributed systems",
    stars: "2.4k",
  },
  {
    name: "config-pal",
    description: "Type-safe configuration management for cloud-native apps",
    stars: "1.8k",
  },
  {
    name: "trace-kit",
    description: "Distributed tracing library for microservice architectures",
    stars: "3.1k",
  },
  {
    name: "ai-toolkit",
    description: "Open-source utilities for building production ML pipelines",
    stars: "1.5k",
  },
];

const selectClass =
  "h-10 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25 appearance-none cursor-pointer";

const categories: { value: string; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "innovation", label: "Innovation" },
  { value: "leadership", label: "Leadership" },
  { value: "technical", label: "Technical" },
  { value: "community", label: "Community" },
];

const years = ["2025", "2024", "2023", "2022", "2021"];

export function AwardsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const filteredAwards = awards.filter((award) => {
    const categoryMatch =
      selectedCategory === "all" || award.category === selectedCategory;
    const yearMatch =
      selectedYear === "all" || award.year.toString() === selectedYear;
    return categoryMatch && yearMatch;
  });

  return (
    <Section padding="lg">
      <Container>
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading description="A collection of recognition from industry leaders and organizations">
            Our Awards
          </Heading>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={selectClass}
              aria-label="Filter awards by category"
            >
              {categories.map((cat) => (
                <option
                  key={cat.value}
                  value={cat.value}
                  className="bg-[hsl(240,5%,6%)]"
                >
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={selectClass}
              aria-label="Filter awards by year"
            >
              <option value="all" className="bg-[hsl(240,5%,6%)]">
                All Years
              </option>
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                  className="bg-[hsl(240,5%,6%)]"
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Stagger
          staggerChildren={0.1}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredAwards.map((award) => (
            <StaggerItem key={award.title}>
              <AwardCard
                title={award.title}
                description={award.description}
                issuer={award.issuer}
                category={award.category}
                year={award.year}
              />
            </StaggerItem>
          ))}
        </Stagger>

        {filteredAwards.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-white/40">
              No awards found for the selected filters.
            </p>
          </div>
        )}

        <div className="mt-24">
          <Heading description="Our commitment to security, quality, and industry standards">
            Certifications &amp; Compliance
          </Heading>
          <Stagger
            staggerChildren={0.08}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {certifications.map((cert) => (
              <StaggerItem key={cert.title}>
                <MotionDiv
                  whileHover={{ y: -2 }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]">
                    <FileCheck className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{cert.title}</h4>
                    <p className="mt-1 text-sm text-white/40">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                </MotionDiv>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-24">
          <Heading description="Featured in leading technology publications and media outlets">
            Press Mentions
          </Heading>
          <Stagger
            staggerChildren={0.08}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {pressMentions.map((press) => (
              <StaggerItem key={press.title}>
                <MotionDiv
                  whileHover={{ y: -2 }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]">
                    <Newspaper className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{press.title}</h4>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="blue" size="sm">
                        {press.publication}
                      </Badge>
                      <span className="text-xs text-white/30">{press.date}</span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-white/20 transition-colors group-hover:text-white/60" />
                </MotionDiv>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-24">
          <Heading description="Contributing to the developer community through open source projects">
            Open Source
          </Heading>
          <Stagger
            staggerChildren={0.08}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {openSourceProjects.map((project) => (
              <StaggerItem key={project.name}>
                <MotionDiv
                  whileHover={{ y: -2 }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]">
                    <Github className="h-5 w-5 text-white/60" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{project.name}</h4>
                    <p className="mt-1 text-sm text-white/40">
                      {project.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-white/40">
                      <Star className="h-3.5 w-3.5 text-amber-400" />
                      {project.stars}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-white/20 transition-colors group-hover:text-white/60" />
                </MotionDiv>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
