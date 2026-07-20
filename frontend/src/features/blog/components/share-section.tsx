"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { cn } from "@/lib/cn";

type ShareSectionProps = {
  title: string;
  url?: string;
};

const shareLinks = [
  {
    name: "LinkedIn",
    icon: "in",
    getUrl: (url: string, title: string) =>
      `https://linkedin.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    color: "hover:bg-blue-700/20 hover:text-blue-400",
  },
  {
    name: "X",
    icon: "𝕏",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    color: "hover:bg-white/10 hover:text-white",
  },
  {
    name: "Facebook",
    icon: "f",
    getUrl: (url: string) =>
      `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: "hover:bg-blue-600/20 hover:text-blue-400",
  },
  {
    name: "Email",
    icon: "@",
    getUrl: (_url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(_url)}`,
    color: "hover:bg-green-600/20 hover:text-green-400",
  },
];

export function ShareSection({ title, url }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 text-sm text-white/40">
        <Share2 className="h-4 w-4" />
        Share
      </span>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.getUrl(shareUrl, title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs text-white/40 transition-all",
              link.color
            )}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 hover:bg-cyan-600/20 hover:text-cyan-400 transition-all"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Link2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
