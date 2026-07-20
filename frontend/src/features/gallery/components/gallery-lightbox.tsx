"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";
import { cn } from "@/lib/cn";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  projectSlug: string;
  projectTitle: string;
  aspectRatio: "square" | "landscape" | "portrait";
};

type GalleryLightboxProps = {
  images: GalleryItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
};

export function GalleryLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
    }
  }, [isOpen, currentIndex]);

  const goNext = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "z" || e.key === "Z") toggleZoom();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goNext, goPrev, toggleZoom]);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

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

  const currentImage = images[currentIndex];
  const CATEGORY_GRADIENT: Record<string, string> = {
    "UI Design": "from-purple-600/10 to-pink-600/10",
    Dashboard: "from-cyan-600/10 to-blue-600/10",
    "Mobile App": "from-emerald-600/10 to-teal-600/10",
    Architecture: "from-orange-600/10 to-amber-600/10",
    "Data Viz": "from-rose-600/10 to-red-600/10",
    API: "from-indigo-600/10 to-violet-600/10",
  };

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
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        <button
          ref={closeButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          className="absolute right-20 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
        </button>

        <div
          className="flex max-h-[85vh] max-w-[85vw] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <MotionDiv
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex h-[60vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br",
                CATEGORY_GRADIENT[currentImage?.category] ?? "from-blue-600/10 to-purple-600/10",
                isZoomed && "cursor-zoom-out"
              )}
              onClick={toggleZoom}
            >
              {currentImage ? (
                <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl font-bold text-white/10">
                    {currentImage.title
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("") || `${currentIndex + 1}`}
                  </span>
                  <span className="text-sm font-medium text-white/30">
                    {currentImage.category}
                  </span>
                </div>
              ) : (
                <span className="text-5xl font-bold text-white/10">{currentIndex + 1}</span>
              )}
            </MotionDiv>
          </AnimatePresence>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm font-medium text-white/70">
              {currentIndex + 1} / {images.length}
            </span>
            {currentImage?.title && (
              <span className="text-sm text-white/50">{currentImage.title}</span>
            )}
          </div>

          {currentImage && (
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xs text-white/30">
                {currentImage.projectTitle}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex items-center gap-1 text-xs text-white/30 transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                aria-label="Download image"
              >
                <Download className="h-3 w-3" />
                Download
              </button>
            </div>
          )}
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
}
