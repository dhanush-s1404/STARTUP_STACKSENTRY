"use client";

import { useState, useCallback } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { GalleryLightbox } from "./gallery-lightbox";
import { Eye, ZoomIn } from "lucide-react";

type GalleryCategory =
  | "UI Design"
  | "Dashboard"
  | "Mobile App"
  | "Architecture"
  | "Data Viz"
  | "API";

type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  projectSlug: string;
  projectTitle: string;
  aspectRatio: "square" | "landscape" | "portrait";
};

const CATEGORIES: GalleryCategory[] = [
  "UI Design",
  "Dashboard",
  "Mobile App",
  "Architecture",
  "Data Viz",
  "API",
];

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "E-Commerce Checkout Flow",
    category: "UI Design",
    projectSlug: "ecommerce-platform",
    projectTitle: "E-Commerce Platform",
    aspectRatio: "landscape",
  },
  {
    id: "2",
    title: "Analytics Overview Panel",
    category: "Dashboard",
    projectSlug: "analytics-dashboard",
    projectTitle: "Analytics Dashboard",
    aspectRatio: "square",
  },
  {
    id: "3",
    title: "Mobile Onboarding Screens",
    category: "Mobile App",
    projectSlug: "fitness-tracker",
    projectTitle: "Fitness Tracker App",
    aspectRatio: "portrait",
  },
  {
    id: "4",
    title: "Microservices Topology",
    category: "Architecture",
    projectSlug: "cloud-platform",
    projectTitle: "Cloud Platform",
    aspectRatio: "landscape",
  },
  {
    id: "5",
    title: "Revenue Trend Charts",
    category: "Data Viz",
    projectSlug: "analytics-dashboard",
    projectTitle: "Analytics Dashboard",
    aspectRatio: "square",
  },
  {
    id: "6",
    title: "REST Endpoint Documentation",
    category: "API",
    projectSlug: "developer-portal",
    projectTitle: "Developer Portal",
    aspectRatio: "landscape",
  },
  {
    id: "7",
    title: "Dashboard Widget Library",
    category: "UI Design",
    projectSlug: "saas-dashboard",
    projectTitle: "SaaS Dashboard",
    aspectRatio: "square",
  },
  {
    id: "8",
    title: "Real-Time Monitoring View",
    category: "Dashboard",
    projectSlug: "monitoring-system",
    projectTitle: "Monitoring System",
    aspectRatio: "landscape",
  },
  {
    id: "9",
    title: "Social Feed Interface",
    category: "Mobile App",
    projectSlug: "social-platform",
    projectTitle: "Social Platform",
    aspectRatio: "portrait",
  },
  {
    id: "10",
    title: "Event-Driven Pipeline",
    category: "Architecture",
    projectSlug: "data-pipeline",
    projectTitle: "Data Pipeline",
    aspectRatio: "square",
  },
  {
    id: "11",
    title: "User Journey Sankey",
    category: "Data Viz",
    projectSlug: "user-analytics",
    projectTitle: "User Analytics",
    aspectRatio: "landscape",
  },
  {
    id: "12",
    title: "GraphQL Schema Explorer",
    category: "API",
    projectSlug: "developer-portal",
    projectTitle: "Developer Portal",
    aspectRatio: "portrait",
  },
  {
    id: "13",
    title: "Settings & Preferences",
    category: "UI Design",
    projectSlug: "saas-dashboard",
    projectTitle: "SaaS Dashboard",
    aspectRatio: "landscape",
  },
  {
    id: "14",
    title: "Team Collaboration Board",
    category: "Dashboard",
    projectSlug: "project-manager",
    projectTitle: "Project Manager",
    aspectRatio: "square",
  },
  {
    id: "15",
    title: "Chat Interface Design",
    category: "Mobile App",
    projectSlug: "messaging-app",
    projectTitle: "Messaging App",
    aspectRatio: "portrait",
  },
  {
    id: "16",
    title: "Server Cluster Overview",
    category: "Architecture",
    projectSlug: "cloud-platform",
    projectTitle: "Cloud Platform",
    aspectRatio: "landscape",
  },
  {
    id: "17",
    title: "Geospatial Heat Map",
    category: "Data Viz",
    projectSlug: "location-analytics",
    projectTitle: "Location Analytics",
    aspectRatio: "square",
  },
  {
    id: "18",
    title: "Webhook Configuration",
    category: "API",
    projectSlug: "integration-hub",
    projectTitle: "Integration Hub",
    aspectRatio: "landscape",
  },
  {
    id: "19",
    title: "Navigation Component Set",
    category: "UI Design",
    projectSlug: "design-system",
    projectTitle: "Design System",
    aspectRatio: "portrait",
  },
  {
    id: "20",
    title: "Kubernetes Pod Status",
    category: "Dashboard",
    projectSlug: "infrastructure-monitor",
    projectTitle: "Infrastructure Monitor",
    aspectRatio: "landscape",
  },
];

const ASPECT_MAP: Record<GalleryItem["aspectRatio"], string> = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
};

const CATEGORY_COLORS: Record<GalleryCategory, string> = {
  "UI Design": "from-purple-500/20 to-pink-500/20",
  Dashboard: "from-cyan-500/20 to-blue-500/20",
  "Mobile App": "from-emerald-500/20 to-teal-500/20",
  Architecture: "from-orange-500/20 to-amber-500/20",
  "Data Viz": "from-rose-500/20 to-red-500/20",
  API: "from-indigo-500/20 to-violet-500/20",
};

const CATEGORY_ACCENT: Record<GalleryCategory, string> = {
  "UI Design": "text-purple-400",
  Dashboard: "text-cyan-400",
  "Mobile App": "text-emerald-400",
  Architecture: "text-orange-400",
  "Data Viz": "text-rose-400",
  API: "text-indigo-400",
};

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "All">("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <Section padding="lg">
      <Container>
        <FadeIn delay={0.1}>
          <Heading
            description="Browse through our latest projects and creative solutions"
            align="center"
          >
            Our Work
          </Heading>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Filter gallery by category"
          >
            <button
              role="tab"
              aria-selected={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeCategory === "All"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/70"
              )}
            >
              All
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/70"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>

        <Stagger staggerChildren={0.05} className="mt-12">
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="tabpanel"
            aria-label="Gallery items"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <StaggerItem key={item.id}>
                  <MotionDiv
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => openLightbox(index)}
                      className={cn(
                        "group relative w-full overflow-hidden rounded-xl border border-white/[0.06] transition-all duration-300",
                        "hover:border-white/[0.12] hover:shadow-lg hover:shadow-purple-500/5",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                        ASPECT_MAP[item.aspectRatio]
                      )}
                      aria-label={`View ${item.title} from ${item.category}`}
                    >
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br",
                          CATEGORY_COLORS[item.category]
                        )}
                      />

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <span className={cn("text-sm font-medium", CATEGORY_ACCENT[item.category])}>
                          {item.category}
                        </span>
                        <span className="mt-2 text-lg font-semibold text-white/90">
                          {item.title}
                        </span>
                        <span className="mt-1 text-sm text-white/40">
                          {item.projectTitle}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                        <div className="flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
                            aria-hidden="true"
                          >
                            <Eye className="h-5 w-5" />
                          </div>
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
                            aria-hidden="true"
                          >
                            <ZoomIn className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2 py-0.5 text-xs text-white/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Click to expand
                      </div>
                    </button>
                  </MotionDiv>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </div>
        </Stagger>

        {filteredItems.length === 0 && (
          <FadeIn delay={0.1}>
            <div className="py-20 text-center text-white/40">
              No items found for this category.
            </div>
          </FadeIn>
        )}
      </Container>

      <GalleryLightbox
        images={filteredItems}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </Section>
  );
}
