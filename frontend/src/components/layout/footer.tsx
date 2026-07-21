"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FOOTER_SECTIONS } from "@/constants";
import { siteConfig } from "@/config/site";
import { api } from "@/services/api";
import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Loader2,
  MapPin,
  ArrowUp,
} from "lucide-react";

const socialIconMap: Record<string, React.ElementType> = {
  Twitter,
  Github,
  Linkedin,
  Youtube,
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus("loading");
    try {
      await api.post("/contact/newsletter", { email });
      setNewsletterStatus("success");
      setEmail("");
    } catch {
      setNewsletterStatus("error");
    }
    setTimeout(() => setNewsletterStatus("idle"), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-black/40" role="contentinfo">
      <Container size="xl" className="py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2" aria-label="StackSentry Technologies">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-lg font-bold text-white">StackSentry</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/40">
              {siteConfig.description}
            </p>

            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.contact.phone}
              </a>
              <p className="flex items-center gap-2 text-sm text-white/40">
                <MapPin className="h-4 w-4 shrink-0" />
                {siteConfig.company.address.city}, {siteConfig.company.address.state}
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="max-w-sm">
              <label htmlFor="newsletter-email" className="mb-2 block text-xs font-medium text-white/40">
                Subscribe to our newsletter
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-10 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-10 pr-10 text-sm text-white placeholder:text-white/20 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  disabled={newsletterStatus === "loading" || newsletterStatus === "success"}
                  required
                />
                <button
                  type="submit"
                  disabled={!email || newsletterStatus === "loading" || newsletterStatus === "success"}
                  className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 transition-colors hover:bg-blue-500/30 disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {newsletterStatus === "loading" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : newsletterStatus === "success" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              {newsletterStatus === "success" && (
                <p className="mt-1.5 text-xs text-emerald-400">Thanks for subscribing!</p>
              )}
              {newsletterStatus === "error" && (
                <p className="mt-1.5 text-xs text-red-400">Something went wrong. Try again.</p>
              )}
            </form>

            <div className="flex items-center gap-3">
              {siteConfig.social.map((s) => {
                const Icon = socialIconMap[s.icon] || Github;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                    aria-label={s.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold text-white/80">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <span className="hidden text-white/10 sm:inline">&middot;</span>
            <p className="text-xs text-white/20">v{siteConfig.version}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-4">
              <Link href="/privacy" className="text-xs text-white/30 transition-colors hover:text-white/60">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-white/30 transition-colors hover:text-white/60">
                Terms &amp; Conditions
              </Link>
              <Link href="/cookies" className="text-xs text-white/30 transition-colors hover:text-white/60">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-xs text-white/30 transition-colors hover:text-white/60">
                Accessibility
              </Link>
              <Link href="/sitemap" className="text-xs text-white/30 transition-colors hover:text-white/60">
                Sitemap
              </Link>
            </div>
            <span className="hidden text-white/10 sm:inline">|</span>
            <ThemeToggle variant="button" size="sm" />
            <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/30 transition-all hover:bg-white/5 hover:text-white/60"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
