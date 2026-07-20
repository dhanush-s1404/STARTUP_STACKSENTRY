"use client";

import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MotionDiv } from "@/lib/motion";
import { socialLinks } from "@/data/contact";

const iconMap: Record<string, string> = {
  Linkedin: "in",
  Github: "gh",
  Twitter: "𝕏",
  Instagram: "ig",
  Facebook: "fb",
};

export function SocialMediaSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {socialLinks.map((link) => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">
          <MotionDiv
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card
              glass
              hover
              glow="blue"
              padding="md"
              className="group flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-lg font-bold text-blue-400 group-hover:scale-110 transition-transform">
                {iconMap[link.icon] || link.icon[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {link.name}
                </p>
                <p className="text-xs text-white/40">{link.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-white/20 group-hover:text-blue-400 transition-colors" />
            </Card>
          </MotionDiv>
        </a>
      ))}
    </div>
  );
}
