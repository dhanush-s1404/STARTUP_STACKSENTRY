"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import {
  Code2,
  Crown,
  Award,
  Plane,
  DollarSign,
  Users,
  Target,
  Quote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type LearningCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  stats: { label: string; value: string }[];
};

const categories: LearningCategory[] = [
  {
    title: "Technical Skills",
    description:
      "Stay ahead of the curve with deep-dive training on the latest technologies, frameworks, and engineering practices used across the industry.",
    icon: Code2,
    gradient: "from-cyan-500 to-blue-500",
    stats: [
      { label: "Internal workshops", value: "24/year" },
      { label: "Online courses", value: "500+" },
      { label: "Labs & sandboxes", value: "Included" },
    ],
  },
  {
    title: "Leadership",
    description:
      "Develop your leadership skills through structured programs, executive coaching, and management training designed for engineers and ICs at every level.",
    icon: Crown,
    gradient: "from-purple-500 to-pink-500",
    stats: [
      { label: "Leadership program", value: "12 weeks" },
      { label: "Executive coaching", value: "Quarterly" },
      { label: "Manager training", value: "Bi-annual" },
    ],
  },
  {
    title: "Certifications",
    description:
      "Get certified in the technologies and platforms you work with. We cover exam fees, provide study time, and celebrate new certifications.",
    icon: Award,
    gradient: "from-amber-500 to-orange-500",
    stats: [
      { label: "Exam fees covered", value: "100%" },
      { label: "Study time", value: "2 days" },
      { label: "Certifications earned", value: "150+" },
    ],
  },
  {
    title: "Conference Budget",
    description:
      "Attend industry conferences, workshops, and events around the world. Share your learnings with the team and build your professional network.",
    icon: Plane,
    gradient: "from-emerald-500 to-teal-500",
    stats: [
      { label: "Annual budget", value: "$3,000" },
      { label: "Conferences attended", value: "100+/yr" },
      { label: "Speaking opportunities", value: "Encouraged" },
    ],
  },
];

const learningBudgetItems = [
  { label: "Online Courses (Udemy, Coursera, Pluralsight)", allocated: 40, color: "cyan" as const },
  { label: "Conferences & Events", allocated: 30, color: "blue" as const },
  { label: "Books & Publications", allocated: 15, color: "purple" as const },
  { label: "Certifications & Exams", allocated: 15, color: "amber" as const },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Staff Frontend Engineer",
    quote:
      "The learning budget changed my career trajectory. I attended React Conf, completed advanced TypeScript courses, and earned my AWS certification — all fully supported by the company.",
    yearsAtCompany: 3,
  },
  {
    name: "Dr. Yuki Tanaka",
    role: "Head of AI/ML",
    quote:
      "I've grown from an IC to leading a team of 28 ML engineers. The mentorship program and leadership training gave me the tools to make that leap with confidence.",
    yearsAtCompany: 4,
  },
  {
    name: "Alex Turner",
    role: "Engineering Manager",
    quote:
      "The internal tech talks and paper reading groups keep me sharp. I learn something new every week from my colleagues. It's the best continuous learning environment I've been in.",
    yearsAtCompany: 2,
  },
];

const progressData = [
  { skill: "React & TypeScript", progress: 92 },
  { skill: "System Design", progress: 78 },
  { skill: "Cloud Architecture", progress: 85 },
  { skill: "Leadership & Management", progress: 70 },
  { skill: "AI/ML Fundamentals", progress: 65 },
];

export function LearningContent() {
  return (
    <>
      {/* Learning Categories */}
      <Section padding="lg" background="gradient">
        <Container>
          <FadeIn>
            <Heading
              level="h2"
              description="Structured programs to accelerate your professional development"
              className="mb-12"
            >
              Invest in Your Growth
            </Heading>
          </FadeIn>

          <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <StaggerItem key={category.title}>
                  <div
                    className={cn(
                      "group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8",
                      "backdrop-blur-sm transition-all duration-300",
                      "hover:bg-white/[0.04] hover:shadow-xl hover:-translate-y-0.5",
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-50",
                        category.gradient,
                      )}
                    />

                    <div className="relative z-10">
                      <div className="mb-5 flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                            category.gradient,
                          )}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {category.title}
                        </h3>
                      </div>

                      <p className="mb-6 text-sm leading-relaxed text-white/50">
                        {category.description}
                      </p>

                      <div className="grid grid-cols-3 gap-3">
                        {category.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 text-center"
                          >
                            <div className="text-sm font-bold text-white">
                              {stat.value}
                            </div>
                            <div className="mt-0.5 text-[10px] text-white/35">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Learning Budget Visualization */}
      <Section padding="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <div>
                <Heading
                  level="h3"
                  description="How the $3,000 annual learning budget can be allocated"
                  align="left"
                >
                  Learning Budget Breakdown
                </Heading>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">$3,000</div>
                    <div className="text-xs text-white/40">
                      Annual learning budget per employee
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {learningBudgetItems.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-white/60">{item.label}</span>
                        <span className="text-xs font-medium text-white/40">
                          {item.allocated}%
                        </span>
                      </div>
                      <ProgressBar
                        value={item.allocated}
                        color={item.color}
                        size="md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Progress Tracking Mockup */}
      <Section padding="lg" background="gradient">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <div>
                <Heading
                  level="h3"
                  description="Track your skill development across multiple dimensions"
                  align="left"
                >
                  Skill Growth Tracking
                </Heading>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">
                    Your Development Roadmap
                  </h4>
                </div>

                <div className="space-y-5">
                  {progressData.map((item) => (
                    <div key={item.skill}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-white/60">{item.skill}</span>
                        <span className="text-xs font-medium text-cyan-400">
                          {item.progress}%
                        </span>
                      </div>
                      <ProgressBar
                        value={item.progress}
                        color="cyan"
                        size="md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section padding="lg">
        <Container>
          <FadeIn>
            <Heading
              level="h2"
              description="Hear from team members about their learning journey"
              className="mb-12"
            >
              Learning Stories
            </Heading>
          </FadeIn>

          <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6",
                    "backdrop-blur-sm transition-all duration-300",
                    "hover:bg-white/[0.04] hover:shadow-xl hover:-translate-y-0.5",
                  )}
                >
                  <Quote className="mb-4 h-6 w-6 text-cyan-500/30" />

                  <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="border-t border-white/[0.06] pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-white/40">
                          {testimonial.role} · {testimonial.yearsAtCompany} years
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
