"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { CheckCircle2, Mail, Calendar, MessageSquare, Send, ArrowRight } from "lucide-react";

type SuccessVariant = "contact" | "newsletter" | "consultation" | "message" | "default";

type SuccessStateProps = {
  variant?: SuccessVariant;
  title?: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
};

const variants: Record<SuccessVariant, { icon: React.ElementType; title: string; description: string; color: string }> = {
  contact: {
    icon: Mail,
    title: "Message Sent Successfully",
    description: "Thank you for reaching out. Our team will review your message and get back to you within 24 hours.",
    color: "text-blue-400",
  },
  newsletter: {
    icon: CheckCircle2,
    title: "You're Subscribed!",
    description: "Welcome to the StackSentry newsletter. You'll receive our latest insights and updates.",
    color: "text-emerald-400",
  },
  consultation: {
    icon: Calendar,
    title: "Consultation Requested",
    description: "We've received your consultation request. Our team will contact you to schedule a meeting.",
    color: "text-purple-400",
  },
  message: {
    icon: MessageSquare,
    title: "Message Delivered",
    description: "Your message has been sent successfully. We'll respond as soon as possible.",
    color: "text-cyan-400",
  },
  default: {
    icon: Send,
    title: "Success!",
    description: "Your request has been processed successfully.",
    color: "text-emerald-400",
  },
};

export function SuccessState({
  variant = "default",
  title,
  description,
  action,
  className,
}: SuccessStateProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className,
      )}
    >
      <div className="relative mb-6">
        <div className={cn("absolute inset-0 animate-glow-pulse-blue rounded-full blur-3xl opacity-20", config.color === "text-blue-400" ? "bg-blue-500" : config.color === "text-emerald-400" ? "bg-emerald-500" : config.color === "text-purple-400" ? "bg-purple-500" : config.color === "text-cyan-400" ? "bg-cyan-500" : "bg-emerald-500")} />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06]">
          <Icon className={cn("h-10 w-10", config.color)} />
        </div>
      </div>
      <h3 className="mb-3 text-2xl font-bold text-white">{title || config.title}</h3>
      <p className="mb-8 max-w-md text-base text-white/50">{description || config.description}</p>
      <div className="flex items-center gap-3">
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
          >
            {action.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
