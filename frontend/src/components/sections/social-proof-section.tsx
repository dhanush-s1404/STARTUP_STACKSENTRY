"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { Github, Twitter, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Github, href: siteConfig.links.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
];

export function SocialProofSection() {
  return (
    <Section padding="md">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-8">
            <p className="text-sm font-medium uppercase tracking-widest text-white/30">
              Trusted by industry leaders
            </p>
            <div className="flex items-center gap-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-white/30 transition-all hover:border-white/20 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
