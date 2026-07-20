"use client";

import { Mail, Phone, Clock, MapPin, Globe, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv } from "@/lib/motion";
import { companyInfo, offices } from "@/data/contact";

const infoCards = [
  { icon: Mail, label: "Email", value: companyInfo.email, sublabel: "General inquiries", href: `mailto:${companyInfo.email}` },
  { icon: Phone, label: "Phone", value: companyInfo.phone, sublabel: "Mon-Fri, 9am-6pm", href: `tel:${companyInfo.phone.replace(/\s/g, "")}` },
  { icon: Clock, label: "Business Hours", value: companyInfo.businessHours, sublabel: companyInfo.responseTime },
  { icon: MessageCircle, label: "Response Time", value: "Within 24 hours", sublabel: "On business days" },
  { icon: Globe, label: "Remote Services", value: "Global Delivery", sublabel: "All time zones supported" },
  { icon: MapPin, label: "Global Presence", value: `${offices.length} Offices`, sublabel: offices.map((o) => o.city).join(" · ") },
];

export function CompanyInfoSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {infoCards.map((info, index) => (
        <ScrollReveal key={info.label} delay={index * 0.05}>
          <MotionDiv
            whileHover={{ y: -2 }}
            className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <info.icon className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              {info.label}
            </p>
            {info.href ? (
              <a
                href={info.href}
                className="mt-1 block text-base font-semibold text-white transition-colors hover:text-blue-400"
              >
                {info.value}
              </a>
            ) : (
              <p className="mt-1 text-base font-semibold text-white">{info.value}</p>
            )}
            <p className="mt-1 text-xs text-white/40">{info.sublabel}</p>
          </MotionDiv>
        </ScrollReveal>
      ))}
    </div>
  );
}
