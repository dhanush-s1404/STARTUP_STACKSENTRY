"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_ITEMS } from "@/constants";
import { useUIStore } from "@/stores";
import { useScrollPosition, useMediaQuery, useLockedBody } from "@/hooks";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  Brain,
  Cloud,
  BarChart3,
  Shield,
  LayoutDashboard,
  Puzzle,
  Code2,
  GitCommit,
  BookOpen,
  Newspaper,
  Briefcase,
  Users,
  Info,
  Radio,
  Mail,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Cloud,
  BarChart3,
  Shield,
  LayoutDashboard,
  Puzzle,
  Code2,
  GitCommit,
  BookOpen,
  Newspaper,
  Briefcase,
  Users,
  Info,
  Radio,
  Mail,
};

const menuVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.98,
    transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Navbar() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScrollPosition();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);

  const isScrolled = scrollY > 50;

  useLockedBody(mobileOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDesktop && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isDesktop, mobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchOpen]);

  const handleMegaEnter = useCallback((href: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(href);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-white/[0.06] bg-black/60 backdrop-blur-xl shadow-lg shadow-black/10"
          : "bg-transparent",
      )}
    >
      <Container size="xl">
        <nav className="flex h-16 items-center justify-between" role="navigation" aria-label="Main navigation">
          <Link
            href="/"
            className="relative flex items-center gap-2.5 text-lg font-bold text-white"
            aria-label="StackSentry Technologies - Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="hidden sm:inline">StackSentry</span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleMegaEnter(item.href)}
                onMouseLeave={handleMegaLeave}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    activeMega === item.href
                      ? "text-white"
                      : "text-white/60 hover:text-white/90",
                  )}
                  aria-expanded={activeMega === item.href}
                  aria-haspopup={item.children ? "true" : undefined}
                >
                  {item.title}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        activeMega === item.href && "rotate-180",
                      )}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeMega === item.href && item.children && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onMouseEnter={() => handleMegaEnter(item.href)}
                      onMouseLeave={handleMegaLeave}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                    >
                      <div className="grid w-[600px] grid-cols-[1fr_220px] gap-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(222,40%,11%)]/95 shadow-2xl backdrop-blur-xl">
                        <div className="p-2">
                          {item.children.map((child) => {
                            const Icon = child.icon ? iconMap[child.icon] : null;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                              >
                                {Icon && (
                                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/50 group-hover:bg-blue-500/10 group-hover:text-blue-400">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white/90 group-hover:text-white">
                                      {child.title}
                                    </span>
                                    {child.badge && (
                                      <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">
                                        {child.badge}
                                      </span>
                                    )}
                                  </div>
                                  {child.description && (
                                    <p className="text-xs text-white/40 group-hover:text-white/60">
                                      {child.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {item.featured && (
                          <div className="border-l border-white/[0.06] p-4">
                            <div className="rounded-xl bg-gradient-to-b from-blue-500/5 to-purple-500/5 p-4">
                              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
                                Featured
                              </p>
                              <h4 className="mb-1 text-sm font-semibold text-white">
                                {item.featured.title}
                              </h4>
                              <p className="mb-3 text-xs leading-relaxed text-white/50">
                                {item.featured.description}
                              </p>
                              <Link
                                href={item.featured.href}
                                className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
                              >
                                Learn more
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Search (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
            </button>
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-black/95 backdrop-blur-2xl lg:hidden"
          >
            <Container size="xl" className="py-6">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.href ? null : item.href,
                            )
                          }
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/[0.04] hover:text-white"
                          aria-expanded={mobileExpanded === item.href}
                        >
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-white/40 transition-transform duration-200",
                              mobileExpanded === item.href && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.href && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 mt-1 space-y-0.5 border-l border-white/[0.06] pl-3">
                                {item.children.map((child) => {
                                  const Icon = child.icon ? iconMap[child.icon] : null;
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                                    >
                                      {Icon && (
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/40">
                                          <Icon className="h-3.5 w-3.5" />
                                        </div>
                                      )}
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm text-white/70 transition-colors group-hover:text-white">
                                            {child.title}
                                          </span>
                                          {child.badge && (
                                            <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">
                                              {child.badge}
                                            </span>
                                          )}
                                        </div>
                                        {child.description && (
                                          <p className="text-xs text-white/40">
                                            {child.description}
                                          </p>
                                        )}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex w-full items-center rounded-xl px-4 py-3 text-base font-medium text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                      >
                        {item.title}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.06] pt-6">
                <Button variant="ghost" size="lg" className="w-full justify-center">
                  Log In
                </Button>
                <Button variant="primary" size="lg" className="w-full justify-center">
                  Get Started
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
