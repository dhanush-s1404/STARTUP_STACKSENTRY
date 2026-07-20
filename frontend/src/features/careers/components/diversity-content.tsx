"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/cn";
import {
  Users,
  Globe,
  Scale,
  Heart,
  Handshake,
  BookOpen,
  ShieldCheck,
  Megaphone,
} from "lucide-react";

const statistics = [
  {
    value: 50,
    suffix: "%",
    label: "Women in Leadership",
    icon: Users,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    value: 30,
    suffix: "+",
    label: "Nationalities Represented",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    value: 100,
    suffix: "%",
    label: "Pay Equity",
    icon: Scale,
    gradient: "from-emerald-500 to-teal-500",
  },
];

const initiatives = [
  {
    title: "Blind Resume Screening",
    description:
      "We remove identifying information from applications to reduce unconscious bias and ensure every candidate is evaluated on their skills and experience.",
    icon: ShieldCheck,
  },
  {
    title: "Employee Resource Groups",
    description:
      "Employee-led communities that provide support, networking, and allyship for underrepresented groups across the company.",
    icon: Heart,
  },
  {
    title: "Annual DEI Training",
    description:
      "Mandatory unconscious bias and inclusion training for all employees, with advanced workshops for managers and interview panels.",
    icon: BookOpen,
  },
  {
    title: "Inclusive Benefits",
    description:
      "Benefits designed to support all family structures, gender identities, and life stages including fertility assistance and gender-affirming care.",
    icon: Handshake,
  },
  {
    title: "Diverse Interview Panels",
    description:
      "All interview panels include diverse representation to ensure multiple perspectives in hiring decisions.",
    icon: Users,
  },
  {
    title: "Public DEI Reporting",
    description:
      "We publish annual diversity reports with transparent metrics and hold ourselves accountable to measurable improvement goals.",
    icon: Megaphone,
  },
];

const erGroups = [
  { name: "Women at StackSentry", members: "200+", focus: "Gender equity and women in tech" },
  { name: "Pride Alliance", members: "150+", focus: "LGBTQ+ support and advocacy" },
  { name: "Black Employee Network", members: "120+", focus: "Black excellence and community" },
  { name: "API Community", members: "180+", focus: "Asian and Pacific Islander heritage" },
  { name: "LatinX Connect", members: "100+", focus: "Hispanic and Latinx community" },
  { name: "Veterans Network", members: "80+", focus: "Military veteran support" },
];

export function DiversityContent() {
  return (
    <>
      {/* Statistics */}
      <Section padding="lg" background="gradient">
        <Container>
          <FadeIn>
            <Heading
              level="h2"
              description="Building a Diverse Future — measurable commitments, transparent progress"
              className="mb-12"
            >
              Our DEI Numbers
            </Heading>
          </FadeIn>

          <Stagger staggerChildren={0.1} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {statistics.map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.label}>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center",
                      "backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04]",
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br opacity-30 blur-2xl",
                        stat.gradient,
                      )}
                    />
                    <div className="relative z-10">
                      <div
                        className={cn(
                          "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br",
                          stat.gradient,
                        )}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-white md:text-5xl">
                        <CountUp to={stat.value} suffix={stat.suffix} duration={2} />
                      </div>
                      <div className="mt-2 text-sm text-white/50">{stat.label}</div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Initiatives */}
      <Section padding="lg">
        <Container>
          <FadeIn>
            <Heading
              level="h2"
              description="Concrete actions we take to build an inclusive workplace"
              className="mb-12"
            >
              Our DEI Initiatives
            </Heading>
          </FadeIn>

          <Stagger staggerChildren={0.06} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative) => {
              const Icon = initiative.icon;
              return (
                <StaggerItem key={initiative.title}>
                  <div
                    className={cn(
                      "group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6",
                      "backdrop-blur-sm transition-all duration-300",
                      "hover:bg-white/[0.04] hover:shadow-xl hover:-translate-y-0.5",
                    )}
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                      <Icon className="h-5 w-5 text-rose-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {initiative.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50">
                      {initiative.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Employee Resource Groups */}
      <Section padding="lg" background="gradient">
        <Container>
          <FadeIn>
            <Heading
              level="h2"
              description="Employee-led communities fostering belonging and support"
              className="mb-12"
            >
              Employee Resource Groups
            </Heading>
          </FadeIn>

          <Stagger staggerChildren={0.06} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {erGroups.map((group) => (
              <StaggerItem key={group.name}>
                <div
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5",
                    "backdrop-blur-sm transition-all duration-300",
                    "hover:bg-white/[0.04]",
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{group.name}</h4>
                    <p className="text-xs text-white/40">{group.focus}</p>
                    <span className="mt-1 inline-block text-xs font-medium text-purple-400">
                      {group.members} members
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Commitment Statement */}
      <Section padding="lg">
        <Container size="md">
          <FadeIn>
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center",
                "backdrop-blur-sm",
              )}
            >
              <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-rose-500/20 to-purple-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-500/20 to-amber-500/20 blur-3xl" />

              <div className="relative z-10">
                <Scale className="mx-auto mb-6 h-10 w-10 text-rose-400" />
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Our Commitment
                </h3>
                <p className="mx-auto max-w-xl text-white/50 leading-relaxed">
                  We believe diversity drives innovation. We are committed to
                  creating a workplace where every person feels valued, respected,
                  and empowered to do their best work. This isn&apos;t just a
                  program — it&apos;s who we are.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
