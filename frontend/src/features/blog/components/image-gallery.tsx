"use client";

import { MotionDiv } from "@/lib/motion";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageGalleryProps = {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
};

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={`grid gap-4 my-8 ${gridCols[columns]}`}>
      {images.map((image, i) => (
        <MotionDiv
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]"
        >
          <div className="aspect-video bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 flex items-center justify-center">
            <span className="text-white/20 text-sm">{image.alt}</span>
          </div>
          {image.caption && (
            <p className="px-3 py-2 text-xs text-white/40 text-center">{image.caption}</p>
          )}
        </MotionDiv>
      ))}
    </div>
  );
}
