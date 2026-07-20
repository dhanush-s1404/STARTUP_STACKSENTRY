"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectFilters, type FilterState } from "./project-filters";
import { ProjectCard } from "./project-card";

type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  industry: string;
  category: string;
  clientType: string;
  status: string;
  projectDuration: string;
  isFeatured: boolean;
  year: number;
  teamSize: number;
};

const projects: Project[] = [
  {
    slug: "recruitment-management-system",
    title: "Recruitment Management System",
    shortDescription: "End-to-end hiring platform with AI-powered candidate matching, automated screening, and collaborative interview workflows",
    industry: "Recruitment",
    category: "Enterprise",
    technologies: ["React", "Node.js", "PostgreSQL", "AI/ML"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "6 months",
    isFeatured: true,
    year: 2025,
    teamSize: 8,
  },
  {
    slug: "ai-resume-screening",
    title: "AI Resume Screening Platform",
    shortDescription: "Machine learning platform that analyzes 10,000+ resumes daily with 95% accuracy using NLP and computer vision",
    industry: "Recruitment",
    category: "AI/ML",
    technologies: ["Python", "FastAPI", "TensorFlow", "OpenAI"],
    clientType: "Startup",
    status: "completed",
    projectDuration: "4 months",
    isFeatured: true,
    year: 2025,
    teamSize: 5,
  },
  {
    slug: "hospital-management-system",
    title: "Hospital Management System",
    shortDescription: "Comprehensive hospital operations platform managing patient records, appointments, billing, and pharmacy",
    industry: "Healthcare",
    category: "Enterprise",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "8 months",
    isFeatured: true,
    year: 2024,
    teamSize: 12,
  },
  {
    slug: "school-erp",
    title: "School ERP Platform",
    shortDescription: "Complete education management system with student information, academics, communication, and financial modules",
    industry: "Education",
    category: "Enterprise",
    technologies: ["React", "Django", "PostgreSQL", "Docker"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "7 months",
    isFeatured: false,
    year: 2024,
    teamSize: 10,
  },
  {
    slug: "crm-platform",
    title: "Enterprise CRM Platform",
    shortDescription: "Custom CRM with sales pipeline, marketing automation, customer support, and real-time analytics dashboards",
    industry: "Finance",
    category: "Enterprise",
    technologies: ["Vue.js", "NestJS", "MongoDB", "Redis"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "5 months",
    isFeatured: true,
    year: 2025,
    teamSize: 7,
  },
  {
    slug: "inventory-management",
    title: "Inventory Management System",
    shortDescription: "Real-time inventory tracking with demand forecasting, automated reorder alerts, and multi-warehouse support",
    industry: "Retail",
    category: "E-Commerce",
    technologies: ["React", "FastAPI", "PostgreSQL", "Redis"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "4 months",
    isFeatured: false,
    year: 2024,
    teamSize: 6,
  },
  {
    slug: "business-analytics-dashboard",
    title: "Business Analytics Dashboard",
    shortDescription: "Executive dashboard with real-time KPIs, predictive analytics, custom reports, and automated data pipelines",
    industry: "Finance",
    category: "Cloud",
    technologies: ["Next.js", "Python", "ElasticSearch", "AWS"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "3 months",
    isFeatured: true,
    year: 2025,
    teamSize: 5,
  },
  {
    slug: "enterprise-hrms",
    title: "Enterprise HRMS",
    shortDescription: "Human resource management system with payroll, attendance, performance reviews, and employee self-service portal",
    industry: "Recruitment",
    category: "Enterprise",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "6 months",
    isFeatured: false,
    year: 2024,
    teamSize: 9,
  },
  {
    slug: "fleet-management",
    title: "Fleet Management Platform",
    shortDescription: "GPS tracking, route optimization, maintenance scheduling, and driver management for logistics fleets",
    industry: "Logistics",
    category: "Cloud",
    technologies: ["React Native", "Node.js", "PostgreSQL", "AWS"],
    clientType: "Enterprise",
    status: "in_progress",
    projectDuration: "5 months",
    isFeatured: false,
    year: 2026,
    teamSize: 7,
  },
  {
    slug: "healthcare-platform",
    title: "Telemedicine Platform",
    shortDescription: "HIPAA-compliant telehealth platform with video consultations, prescription management, and patient portal",
    industry: "Healthcare",
    category: "Mobile App",
    technologies: ["React Native", "FastAPI", "PostgreSQL", "WebRTC"],
    clientType: "Startup",
    status: "completed",
    projectDuration: "5 months",
    isFeatured: true,
    year: 2025,
    teamSize: 8,
  },
  {
    slug: "learning-management-system",
    title: "Learning Management System",
    shortDescription: "Modern LMS with course creation, live classes, assessments, progress tracking, and certificate generation",
    industry: "Education",
    category: "Web Development",
    technologies: ["Next.js", "NestJS", "MongoDB", "Redis"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "6 months",
    isFeatured: false,
    year: 2024,
    teamSize: 8,
  },
  {
    slug: "ecommerce-platform",
    title: "Multi-Vendor E-Commerce Platform",
    shortDescription: "Scalable marketplace with vendor management, inventory sync, payment processing, and AI product recommendations",
    industry: "Retail",
    category: "E-Commerce",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "7 months",
    isFeatured: true,
    year: 2025,
    teamSize: 11,
  },
  {
    slug: "ai-chatbot-platform",
    title: "AI Chatbot Platform",
    shortDescription: "Enterprise conversational AI with multi-language support, sentiment analysis, and seamless human handoff",
    industry: "Finance",
    category: "AI/ML",
    technologies: ["Python", "OpenAI", "LangChain", "FastAPI"],
    clientType: "Startup",
    status: "completed",
    projectDuration: "3 months",
    isFeatured: true,
    year: 2025,
    teamSize: 4,
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation Engine",
    shortDescription: "Visual workflow builder with 200+ integrations, conditional logic, scheduling, and enterprise approval chains",
    industry: "Manufacturing",
    category: "Cloud",
    technologies: ["React", "Node.js", "RabbitMQ", "Redis"],
    clientType: "Enterprise",
    status: "completed",
    projectDuration: "5 months",
    isFeatured: false,
    year: 2024,
    teamSize: 7,
  },
  {
    slug: "customer-support-system",
    title: "Customer Support System",
    shortDescription: "Omnichannel help desk with ticket management, knowledge base, SLA tracking, and AI-powered routing",
    industry: "Finance",
    category: "Enterprise",
    technologies: ["Vue.js", "NestJS", "PostgreSQL", "ElasticSearch"],
    clientType: "Enterprise",
    status: "maintenance",
    projectDuration: "4 months",
    isFeatured: false,
    year: 2024,
    teamSize: 6,
  },
];

const ITEMS_PER_PAGE = 9;

export function ProjectsGrid() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "All",
    industry: "All",
    technology: "",
    status: "All",
    sort: "Newest",
    view: "grid",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.industry !== "All") {
      result = result.filter((p) => p.industry === filters.industry);
    }

    if (filters.status !== "All") {
      const statusMap: Record<string, string> = {
        Completed: "completed",
        "In Progress": "in_progress",
        Maintenance: "maintenance",
      };
      result = result.filter((p) => p.status === statusMap[filters.status]);
    }

    switch (filters.sort) {
      case "Newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "Oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "Featured":
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case "A-Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Most Viewed":
        result.sort((a, b) => b.teamSize - a.teamSize);
        break;
    }

    return result;
  }, [filters]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <Section id="projects-grid" padding="lg">
      <Container>
        <div id="projects-grid-anchor" className="scroll-mt-24" />
        <ProjectFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="mt-8">
          {paginatedProjects.length === 0 ? (
            <EmptyState
              variant="search"
              title="No projects found"
              description="Try adjusting your filters or search terms to find what you're looking for."
            />
          ) : (
            <Stagger
              staggerChildren={0.08}
              className={
                filters.view === "grid"
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-6"
              }
            >
              {paginatedProjects.map((project) => (
                <StaggerItem key={project.slug}>
                  <ProjectCard
                    slug={project.slug}
                    title={project.title}
                    shortDescription={project.shortDescription}
                    technologies={project.technologies}
                    industry={project.industry}
                    clientType={project.clientType}
                    status={project.status}
                    projectDuration={project.projectDuration}
                    isFeatured={project.isFeatured}
                    viewMode={filters.view}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
