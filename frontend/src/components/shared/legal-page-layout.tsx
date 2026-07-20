"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { ArrowUp } from "lucide-react";

type TocItem = {
  id: string;
  label: string;
  children?: { id: string; label: string }[];
};

type LegalPageLayoutProps = {
  title: string;
  description: string;
  lastUpdated: string;
  tableOfContents: TocItem[];
  children: React.ReactNode;
};

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  tableOfContents,
  children,
}: LegalPageLayoutProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    tableOfContents.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container size="xl">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <nav className="mb-4 flex items-center gap-2 text-sm text-white/30" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white/60">Home</Link>
              <span>/</span>
              <span className="text-white/50">{title}</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
            <p className="mt-4 text-lg text-white/50">{description}</p>
            <p className="mt-2 text-sm text-white/30">Last updated: {lastUpdated}</p>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row">
            <aside className="shrink-0 lg:sticky lg:top-32 lg:h-fit lg:w-56" aria-label="Table of contents">
              <nav aria-label="Page sections">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">On This Page</h2>
                <ul className="space-y-1">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={cn(
                          "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                          activeId === item.id
                            ? "bg-white/[0.06] text-white"
                            : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]",
                        )}
                      >
                        {item.label}
                      </a>
                      {item.children && (
                        <ul className="ml-3 mt-0.5 space-y-0.5">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <a
                                href={`#${child.id}`}
                                className={cn(
                                  "block rounded-lg px-3 py-1 text-xs transition-colors",
                                  activeId === child.id
                                    ? "bg-white/[0.06] text-white"
                                    : "text-white/30 hover:text-white/60",
                                )}
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <article className="min-w-0 flex-1">
              <div className="legal-content space-y-10">
                {children}
              </div>

              <div className="mt-16 flex items-center justify-between border-t border-white/[0.06] pt-8">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
                >
                  <ArrowUp className="h-4 w-4" />
                  Back to top
                </button>
                <Link href="/contact" className="text-sm text-blue-400 transition-colors hover:text-blue-300">
                  Questions? Contact us
                </Link>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </main>
  );
}
