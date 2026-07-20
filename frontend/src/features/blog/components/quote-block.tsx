"use client";

import { Quote } from "lucide-react";
import { MotionDiv } from "@/lib/motion";

type QuoteBlockProps = {
  text: string;
  author?: string;
  role?: string;
};

export function QuoteBlock({ text, author, role }: QuoteBlockProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative my-8 pl-8 border-l-2 border-blue-500/50"
    >
      <Quote className="absolute -left-3 -top-2 h-8 w-8 text-blue-500/20" />
      <blockquote className="text-lg md:text-xl text-white/70 italic leading-relaxed">
        {text}
      </blockquote>
      {(author || role) && (
        <div className="mt-4">
          {author && <p className="text-sm font-semibold text-white">{author}</p>}
          {role && <p className="text-xs text-white/40">{role}</p>}
        </div>
      )}
    </MotionDiv>
  );
}
