from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import (
    health, contact, newsletter, auth,
    services, solutions, industries, technologies, team,
    timeline, stats, values, company, blog,
    certifications, offices, culture, seo,
    portfolio, case_studies, testimonials, awards,
    client_success, inquiry, gallery,
    admin_services, enterprise_solutions, admin_enterprise,
    consultation, admin_consultation,
    engineering, admin_engineering,
)
from api.routes import (
    departments, locations, jobs, job_applications,
    career_benefits, internships, graduate_programs,
    hiring_stages, career_faqs, recruitment_contacts,
    life_at_stacksentry, recruitment_process,
)
from api.routes import announcements, footer, legal, sitemap

app = FastAPI(
    title="StackSentry Technologies API",
    description="Enterprise AI-powered software platform API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(contact.router)
app.include_router(newsletter.router)
app.include_router(auth.router)
app.include_router(services.router)
app.include_router(solutions.router)
app.include_router(industries.router)
app.include_router(technologies.router)
app.include_router(team.router)
app.include_router(timeline.router)
app.include_router(stats.router)
app.include_router(values.router)
app.include_router(company.router)
app.include_router(blog.router)
app.include_router(certifications.router)
app.include_router(offices.router)
app.include_router(culture.router)
app.include_router(seo.router)
app.include_router(portfolio.router)
app.include_router(case_studies.router)
app.include_router(testimonials.router)
app.include_router(awards.router)
app.include_router(client_success.router)
app.include_router(inquiry.router)
app.include_router(gallery.router)

# Admin routes
app.include_router(admin_services.router)
app.include_router(admin_enterprise.router)
app.include_router(admin_consultation.router)

# Consultation public routes
app.include_router(consultation.router)

# Enterprise public routes
app.include_router(enterprise_solutions.router)

# Career routes
app.include_router(departments.router)
app.include_router(locations.router)
app.include_router(jobs.router)
app.include_router(job_applications.router)
app.include_router(career_benefits.router)
app.include_router(internships.router)
app.include_router(graduate_programs.router)
app.include_router(hiring_stages.router)
app.include_router(career_faqs.router)
app.include_router(recruitment_contacts.router)
app.include_router(life_at_stacksentry.router)
app.include_router(recruitment_process.router)

# Engineering routes
app.include_router(engineering.router)
app.include_router(admin_engineering.router)

# Part 9C routes
app.include_router(announcements.router)
app.include_router(footer.router)
app.include_router(legal.router)
app.include_router(sitemap.router)
