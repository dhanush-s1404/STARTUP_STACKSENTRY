"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { SearchInput } from "@/components/ui/search-input";
import { CountUp } from "@/components/ui/count-up";
import { MotionDiv } from "@/lib/motion";
import { TestimonialCard } from "./testimonial-card";
import type { TestimonialCardProps } from "./testimonial-card";
import { Grid3X3, List, Users, Star, ThumbsUp, Filter } from "lucide-react";

const allTestimonials: TestimonialCardProps[] = [
  {
    clientName: "Sarah Chen",
    clientRole: "VP Engineering",
    clientCompany: "TechCorp Global",
    content:
      "StackSentry transformed our patient management system with their AI-powered platform. What used to take our team hours now happens in real-time. Their deep understanding of healthcare compliance and their ability to deliver under tight deadlines was remarkable. We saw a 40% improvement in patient throughput within the first quarter.",
    rating: 5,
    industry: "Healthcare",
    isFeatured: true,
  },
  {
    clientName: "Michael Rodriguez",
    clientRole: "CTO",
    clientCompany: "FinanceHub",
    content:
      "The AI-powered compliance platform saved us millions in potential regulatory fines. StackSentry built a solution that not only meets every financial regulation but anticipates changes before they happen. Their team's expertise in both finance and technology is unmatched in the industry.",
    rating: 5,
    industry: "Finance",
    isFeatured: true,
  },
  {
    clientName: "Emily Watson",
    clientRole: "Director of Operations",
    clientCompany: "EduLearn",
    content:
      "Our School ERP handles 50,000 students seamlessly. From enrollment to graduation, every touchpoint is digitized and intelligent. StackSentry understood the unique challenges of education technology and delivered a platform that our staff and students love using daily.",
    rating: 5,
    industry: "Education",
  },
  {
    clientName: "James Park",
    clientRole: "Head of Recruitment",
    clientCompany: "TalentFlow",
    content:
      "Time-to-hire dropped by 60% with their AI screening solution. The system accurately identifies top candidates while eliminating unconscious bias. Our recruiters now focus on building relationships instead of sifting through hundreds of resumes. It's completely changed how we operate.",
    rating: 5,
    industry: "Recruitment",
  },
  {
    clientName: "Priya Sharma",
    clientRole: "COO",
    clientCompany: "RetailMax",
    content:
      "The e-commerce platform scales to handle Black Friday traffic without breaking a sweat. Last year we processed 3x the previous year's volume with zero downtime. StackSentry's engineering is truly enterprise-grade, and their ongoing support has been exceptional.",
    rating: 4,
    industry: "Retail",
  },
  {
    clientName: "David Kim",
    clientRole: "CIO",
    clientCompany: "ManufacturingPro",
    content:
      "ERP implementation across 8 factories was flawless. The unified system gave us real-time visibility into production, inventory, and supply chain across all locations. We've reduced waste by 25% and improved delivery times by 30%. StackSentry delivered on every promise.",
    rating: 5,
    industry: "Manufacturing",
  },
  {
    clientName: "Lisa Anderson",
    clientRole: "VP Product",
    clientCompany: "HealthFirst",
    content:
      "HIPAA compliance was built into every feature from day one. StackSentry doesn't treat compliance as an afterthought — it's woven into the architecture. Our platform now serves 200+ healthcare providers with confidence, knowing patient data is always protected.",
    rating: 5,
    industry: "Healthcare",
  },
  {
    clientName: "Robert Taylor",
    clientRole: "Engineering Lead",
    clientCompany: "LogiTrack",
    content:
      "Fleet management saves us $2M annually in fuel costs alone. The route optimization and predictive maintenance features have been game-changers. Our drivers are happier, our vehicles last longer, and our customers get faster deliveries. The ROI was clear within months.",
    rating: 5,
    industry: "Logistics",
  },
  {
    clientName: "Amanda Chen",
    clientRole: "CEO",
    clientCompany: "StayWell Hotels",
    content:
      "Revenue increased 15% through dynamic pricing powered by StackSentry's AI. The system analyzes demand patterns, competitor pricing, and seasonal trends to optimize our room rates in real-time. It's like having a revenue manager that never sleeps.",
    rating: 5,
    industry: "Hospitality",
    isFeatured: true,
  },
  {
    clientName: "Marcus Johnson",
    clientRole: "VP Technology",
    clientCompany: "GovServe",
    content:
      "Citizen services processing time reduced by 70%. StackSentry built a platform that handles the complexity of government workflows while keeping the user experience simple and intuitive. Their understanding of public sector requirements was impressive from the start.",
    rating: 4,
    industry: "Government",
  },
  {
    clientName: "Rachel Green",
    clientRole: "Director",
    clientCompany: "HomeVista",
    content:
      "Property listings went from days to hours with their automated data enrichment pipeline. The AI matches properties to buyer preferences with uncanny accuracy. Our agents close deals faster, and our clients find their dream homes sooner. The platform is simply brilliant.",
    rating: 5,
    industry: "Real Estate",
  },
  {
    clientName: "Kevin Brown",
    clientRole: "CTO",
    clientCompany: "TravelEase",
    content:
      "Booking errors reduced by 40% with the new platform. StackSentry rebuilt our entire booking engine with intelligent validation and real-time availability checks. Customer satisfaction scores jumped from 3.8 to 4.7 stars. The investment paid for itself in under six months.",
    rating: 5,
    industry: "Travel",
  },
];

const industries = [
  "All",
  ...Array.from(new Set(allTestimonials.map((t) => t.industry))).sort(),
];

const ratingFilters = [
  { label: "All Ratings", value: "all" },
  { label: "5 Stars", value: "5" },
  { label: "4+ Stars", value: "4+" },
];

export function TestimonialsGrid() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedRating, setSelectedRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return allTestimonials.filter((t) => {
      const matchesIndustry = selectedIndustry === "All" || t.industry === selectedIndustry;
      const matchesRating =
        selectedRating === "all" ||
        (selectedRating === "5" && t.rating === 5) ||
        (selectedRating === "4+" && t.rating >= 4);
      const matchesSearch =
        !searchQuery ||
        t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.clientCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesIndustry && matchesRating && matchesSearch;
    });
  }, [selectedIndustry, selectedRating, searchQuery]);

  const stats = [
    { label: "Happy Clients", value: 100, suffix: "+" },
    { label: "Average Rating", value: 4.9, suffix: "/5" },
    { label: "Would Recommend", value: 98, suffix: "%" },
  ];

  return (
    <Section padding="lg">
      <Container>
        {/* Stats section */}
        <FadeIn>
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-white md:text-4xl">
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="mt-2 text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Section header */}
        <FadeIn>
          <Heading
            description="Real feedback from organizations across industries"
            className="mb-8 text-center"
          >
            What Our Clients Say
          </Heading>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="mb-8 space-y-4">
            {/* Search + view toggle */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SearchInput
                placeholder="Search testimonials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all",
                    "border-white/10 bg-white/5 text-white/60 hover:bg-white/10",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                    showFilters && "border-amber-400/30 bg-amber-500/10 text-amber-400",
                  )}
                  aria-expanded={showFilters}
                  aria-label="Toggle filters"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>

                <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md transition-all",
                      viewMode === "grid"
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white/60",
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md transition-all",
                      viewMode === "list"
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white/60",
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter panels */}
            {showFilters && (
              <MotionDiv
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:flex-row">
                  {/* Industry filter */}
                  <div className="flex-1">
                    <label className="mb-2 block text-xs font-medium text-white/40">Industry</label>
                    <div className="flex flex-wrap gap-2">
                      {industries.map((industry) => (
                        <button
                          key={industry}
                          onClick={() => setSelectedIndustry(industry)}
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium transition-all",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                            selectedIndustry === industry
                              ? "bg-amber-400/20 text-amber-400 border border-amber-400/30"
                              : "border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70",
                          )}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating filter */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/40">Rating</label>
                    <div className="flex flex-wrap gap-2">
                      {ratingFilters.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setSelectedRating(filter.value)}
                          className={cn(
                            "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                            selectedRating === filter.value
                              ? "bg-amber-400/20 text-amber-400 border border-amber-400/30"
                              : "border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70",
                          )}
                        >
                          {filter.value !== "all" && <Star className="h-3 w-3" fill="currentColor" />}
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionDiv>
            )}

            {/* Active filter pills */}
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Users className="h-3.5 w-3.5" />
              <span>
                Showing <span className="text-white/70">{filtered.length}</span> of{" "}
                <span className="text-white/70">{allTestimonials.length}</span> testimonials
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Testimonials grid */}
        {filtered.length > 0 ? (
          <Stagger staggerChildren={0.08} className="mb-8">
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 max-w-3xl mx-auto",
              )}
            >
              {filtered.map((testimonial) => (
                <StaggerItem key={testimonial.clientName}>
                  <TestimonialCard {...testimonial} />
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        ) : (
          <FadeIn>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] py-16 text-center">
              <ThumbsUp className="mx-auto h-12 w-12 text-white/10" />
              <p className="mt-4 text-white/40">
                No testimonials match your current filters.
              </p>
              <button
                onClick={() => {
                  setSelectedIndustry("All");
                  setSelectedRating("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </FadeIn>
        )}
      </Container>
    </Section>
  );
}
