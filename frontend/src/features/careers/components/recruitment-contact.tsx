"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { RECRUITMENT_CONTACTS, type RecruitmentContactData } from "@/data/careers";
import {
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
  Twitter,
  ExternalLink,
  Calendar,
  MapPin,
  Building2,
  GraduationCap,
  Globe,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
  Twitter,
  ExternalLink,
  Building2,
  GraduationCap,
};

const typeConfig: Record<
  RecruitmentContactData["type"],
  { label: string; color: "blue" | "green" | "purple" | "cyan" }
> = {
  email: { label: "Email", color: "blue" },
  phone: { label: "Phone", color: "green" },
  chat: { label: "Live Chat", color: "purple" },
  social: { label: "Social", color: "cyan" },
};

const OFFICES = [
  { city: "San Francisco", country: "USA", timezone: "PST (UTC-8)" },
  { city: "New York", country: "USA", timezone: "EST (UTC-5)" },
  { city: "London", country: "UK", timezone: "GMT (UTC+0)" },
  { city: "Berlin", country: "Germany", timezone: "CET (UTC+1)" },
  { city: "Singapore", country: "Singapore", timezone: "SGT (UTC+8)" },
  { city: "Dubai", country: "UAE", timezone: "GST (UTC+4)" },
  { city: "Bangalore", country: "India", timezone: "IST (UTC+5:30)" },
];

function ContactCard({ contact }: { contact: RecruitmentContactData }) {
  const Icon = iconMap[contact.icon] || Mail;
  const config = typeConfig[contact.type];

  const cardContent = (
    <Card className="group h-full" hover glow="blue">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-blue-400 transition-colors group-hover:bg-blue-500/10">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant={config.color} size="sm">
            {config.label}
          </Badge>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-white">{contact.label}</h3>
          <p className="text-sm text-white/50">{contact.value}</p>
        </div>
      </div>
    </Card>
  );

  if (contact.url) {
    return (
      <a
        href={contact.url}
        target={contact.type === "social" ? "_blank" : undefined}
        rel={contact.type === "social" ? "noopener noreferrer" : undefined}
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export function RecruitmentContact() {
  return (
    <Section padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading
            description="Have questions about a role or our hiring process? Reach out — we're here to help."
          >
            Contact Our Recruitment Team
          </Heading>
        </FadeIn>

        {/* Contact cards grid */}
        <Stagger staggerChildren={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECRUITMENT_CONTACTS.map((contact) => (
            <StaggerItem key={contact.id}>
              <ContactCard contact={contact} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Schedule a call CTA */}
        <FadeIn direction="up" delay={0.2} className="mt-12">
          <Card className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-blue-500/20">
              <Calendar className="h-7 w-7 text-blue-400" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-white">Schedule a Call</h3>
              <p className="text-sm text-white/50">
                Want to discuss career opportunities directly? Book a 30-minute call with one of
                our recruiters at a time that suits you.
              </p>
            </div>
            <Button variant="primary" icon={<Calendar className="h-4 w-4" />}>
              Book a Meeting
            </Button>
          </Card>
        </FadeIn>

        {/* Office locations mini-map */}
        <FadeIn direction="up" delay={0.3} className="mt-12">
          <Card>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-cyan-400">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Our Global Offices</h3>
                  <p className="text-xs text-white/40">
                    Visit us in person or connect remotely
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {OFFICES.map((office) => (
                  <div
                    key={office.city}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.01] p-3"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-white">{office.city}</p>
                      <p className="text-xs text-white/40">
                        {office.country} · {office.timezone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ASCII map representation */}
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01] p-4">
                <pre className="overflow-x-auto text-center text-[10px] leading-relaxed text-white/20 sm:text-xs">
{`                           ·  San Francisco
                 · New York                              ·  London
                         · Berlin
                                 · Bangalore
                                                     · Singapore
                       · Dubai`}
                </pre>
              </div>
            </div>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  );
}
