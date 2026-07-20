"use client";

import Link from "next/link";
import {
  Send, Calendar, Handshake, MessageSquare, LifeBuoy,
  ArrowRight, Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";

const CONTACT_OPTIONS = [
  {
    id: "project-inquiry",
    icon: Send,
    title: "Project Inquiry",
    description: "Submit a detailed project description and get personalized recommendations.",
    cta: "Start Inquiry",
    href: "/consultation/discover",
    badge: "Popular",
    badgeColor: "blue" as const,
  },
  {
    id: "consultation",
    icon: Calendar,
    title: "Consultation Request",
    description: "Schedule a one-on-one consultation with our senior technical team.",
    cta: "Book Now",
    href: "/consultation/meeting",
    badge: "Recommended",
    badgeColor: "green" as const,
  },
  {
    id: "partnership",
    icon: Handshake,
    title: "Business Partnership",
    description: "Explore partnership opportunities, reseller programs, and strategic alliances.",
    cta: "Partner With Us",
    href: "/contact",
    badge: undefined,
    badgeColor: undefined,
  },
  {
    id: "general",
    icon: MessageSquare,
    title: "General Contact",
    description: "Have a question or feedback? We'd love to hear from you.",
    cta: "Contact Us",
    href: "/contact",
    badge: undefined,
    badgeColor: undefined,
  },
  {
    id: "support",
    icon: LifeBuoy,
    title: "Support",
    description: "Need assistance with an existing project or platform? Our support team is here to help.",
    cta: "Get Support",
    href: "/contact",
    badge: undefined,
    badgeColor: undefined,
  },
];

export function ContactOptions() {
  return (
    <Section padding="lg">
      <Container>
        <FadeIn>
          <div className="mb-12 text-center">
            <Heading
              level="h2"
              description="Choose how you'd like to connect with us."
            >
              Get in Touch
            </Heading>
          </div>
        </FadeIn>

        <Stagger staggerChildren={0.1}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CONTACT_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <StaggerItem key={option.id}>
                  <Link href={option.href}>
                    <Card glass hover glow="blue" className="group relative h-full">
                      {option.badge && (
                        <div className="absolute right-4 top-4">
                          <Badge variant={option.badgeColor} size="sm">
                            <Sparkles className="mr-1 h-3 w-3" />
                            {option.badge}
                          </Badge>
                        </div>
                      )}
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
                        {option.title}
                      </h3>
                      <p className="mb-6 text-sm leading-relaxed text-white/50">
                        {option.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-blue-400">
                        {option.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
