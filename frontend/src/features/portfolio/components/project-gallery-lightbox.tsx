"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = {
  url: string;
  caption: string;
};

type ProjectGalleryLightboxProps = {
  images: GalleryImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectGalleryLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ProjectGalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/90 backdrop-blur-md"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-16"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          className="flex max-h-[85vh] max-w-[85vw] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <MotionDiv
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex h-[60vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-600/10 to-purple-600/10"
            >
              {images[currentIndex] ? (
                <span className="text-5xl font-bold text-white/10">
                  {images[currentIndex].caption?.split(" ").slice(0, 2).map((w) => w[0]).join("") || `${currentIndex + 1}`}
                </span>
              ) : (
                <span className="text-5xl font-bold text-white/10">{currentIndex + 1}</span>
              )}
            </MotionDiv>
          </AnimatePresence>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm font-medium text-white/70">
              {currentIndex + 1} / {images.length}
            </span>
            {images[currentIndex]?.caption && (
              <span className="text-sm text-white/50">
                {images[currentIndex].caption}
              </span>
            )}
          </div>
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
}
