"use client";

import { useState, useCallback, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Screenshot = { url: string; caption: string };
type Video = { url: string; title: string };

type ProjectDetailGalleryProps = {
  screenshots: Screenshot[];
  videos: Video[];
};

export function ProjectDetailGallery({
  screenshots,
  videos,
}: ProjectDetailGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const allItems = [
    ...screenshots.map((s) => ({ ...s, type: "image" as const })),
    ...videos.map((v) => ({ url: v.url, caption: v.title, type: "video" as const })),
  ];

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % allItems.length);
  }, [allItems.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
  }, [allItems.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goNext, goPrev]);

  if (allItems.length === 0) return null;

  return (
    <Section padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading level="h2" className="mb-8">
            Gallery
          </Heading>
        </FadeIn>

        <FadeIn direction="up">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {allItems.map((item, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className={cn(
                  "group relative flex h-40 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-blue-600/10 to-purple-600/10 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10",
                  index === 0 && "col-span-2 row-span-2 h-80 lg:h-full",
                )}
                aria-label={`View ${item.caption}`}
              >
                <span className="text-2xl font-bold text-white/10">
                  {item.caption?.split(" ").slice(0, 2).map((w) => w[0]).join("") || `${index + 1}`}
                </span>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                <div className="absolute bottom-2 left-2 right-2 truncate rounded-lg bg-black/50 px-3 py-1.5 text-xs text-white/70 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
                  {item.caption}
                </div>
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence>
          {lightboxOpen && (
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-16"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div
                className="flex max-h-[80vh] max-w-[80vw] flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <MotionDiv
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-96 w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-600/10 to-purple-600/10"
                >
                  <span className="text-4xl font-bold text-white/10">
                    {allItems[activeIndex]?.caption?.split(" ").slice(0, 2).map((w) => w[0]).join("") || `${activeIndex + 1}`}
                  </span>
                </MotionDiv>

                <div className="mt-4 flex items-center gap-4">
                  <span className="text-sm text-white/50">
                    {activeIndex + 1} / {allItems.length}
                  </span>
                  {allItems[activeIndex]?.caption && (
                    <span className="text-sm text-white/70">
                      {allItems[activeIndex].caption}
                    </span>
                  )}
                </div>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
