"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv } from "@/lib/motion";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Headphones,
  ExternalLink,
} from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@stacksentry.tech",
    sublabel: "General inquiries",
    href: "mailto:hello@stacksentry.tech",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    sublabel: "Mon-Fri, 9am-6pm EST",
    href: "tel:+15551234567",
  },
  {
    icon: Headphones,
    label: "Support",
    value: "support@stacksentry.tech",
    sublabel: "24/7 for enterprise clients",
    href: "mailto:support@stacksentry.tech",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    sublabel: "New York · London · Dubai",
    href: "#",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon — Fri: 9am — 6pm",
    sublabel: "All time zones supported",
    href: "#",
  },
  {
    icon: ExternalLink,
    label: "Social",
    value: "LinkedIn · GitHub · Twitter",
    sublabel: "Follow us for updates",
    href: "#",
  },
];

export function ContactSection() {
  return (
    <Section id="contact" padding="lg">
      <Container>
        <ScrollReveal>
          <Heading
            level="h2"
            gradient
            description="Get in touch with our team. We'd love to hear about your project."
          >
            Contact Us
          </Heading>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact, index) => (
            <ScrollReveal key={contact.label} delay={index * 0.05}>
              <MotionDiv
                whileHover={{ y: -2 }}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <contact.icon className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                  {contact.label}
                </p>
                <a
                  href={contact.href}
                  className="mt-1 block text-base font-semibold text-white transition-colors hover:text-blue-400"
                >
                  {contact.value}
                </a>
                <p className="mt-1 text-xs text-[hsl(var(--color-text-muted))]">
                  {contact.sublabel}
                </p>
              </MotionDiv>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
