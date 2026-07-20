"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { ANNOUNCEMENTS } from "@/constants";
import { X, Info, Wrench, Megaphone, Sparkles } from "lucide-react";
import type { AnnouncementBanner } from "@/types";

const typeConfig: Record<AnnouncementBanner["type"], { icon: React.ElementType; styles: string }> = {
  info: { icon: Info, styles: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
  maintenance: { icon: Wrench, styles: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
  promotion: { icon: Sparkles, styles: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
  update: { icon: Megaphone, styles: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
};

const STORAGE_KEY = "stacksentry-announcement-dismissed";

export function AnnouncementBar() {
  const [activeAnnouncement, setActiveAnnouncement] = useState<AnnouncementBanner | null>(null);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const active = ANNOUNCEMENTS.filter((a) => a.active)
      .sort((a, b) => a.priority - b.priority)[0];
    if (active && dismissed !== active.id) {
      setActiveAnnouncement(active);
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    if (activeAnnouncement) {
      localStorage.setItem(STORAGE_KEY, activeAnnouncement.id);
    }
    setIsDismissed(true);
  };

  if (!activeAnnouncement || isDismissed) return null;

  const config = typeConfig[activeAnnouncement.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative border-b px-4 py-2.5 text-sm",
        config.styles,
      )}
      role="banner"
    >
      <Container size="xl" className="flex items-center justify-center gap-3">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="text-center">
          {activeAnnouncement.message}
          {activeAnnouncement.href && activeAnnouncement.linkText && (
            <Link
              href={activeAnnouncement.href}
              className="ml-2 font-medium underline decoration-current/30 underline-offset-2 hover:decoration-current/60"
            >
              {activeAnnouncement.linkText}
            </Link>
          )}
        </span>
        {activeAnnouncement.dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md transition-colors hover:bg-white/10"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </Container>
    </div>
  );
}
