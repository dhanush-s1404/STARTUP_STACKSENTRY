from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import time
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)

from database.config import settings, create_tables
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

logger = logging.getLogger("stacksentry.api")

limiter = Limiter(key_func=get_remote_address, default_limits=["200/minute"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting StackSentry API — environment=%s", settings.ENVIRONMENT)
    try:
        await create_tables()
        logger.info("Database tables verified/created")
    except Exception as e:
        logger.error("Failed to create database tables: %s", e)
    yield
    logger.info("Shutting down StackSentry API")


app = FastAPI(
    title="StackSentry Technologies API",
    description="Enterprise AI-powered software platform API",
    version="1.0.0",
    docs_url="/api/docs" if not settings.is_production else None,
    redoc_url="/api/redoc" if not settings.is_production else None,
    openapi_url="/openapi.json" if not settings.is_production else None,
    lifespan=lifespan,
)
app.state.limiter = limiter

app.add_middleware(GZipMiddleware, minimum_size=500)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type", "X-Request-Id"],
    expose_headers=["X-Request-Id"],
)


@app.middleware("http")
async def add_request_timing(request: Request, call_next):
    start_time = time.time()
    request_id = request.headers.get("X-Request-Id", "")
    if request.method in ("POST", "PUT", "PATCH"):
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > 10 * 1024 * 1024:
            return JSONResponse(
                status_code=413,
                content={"status": "error", "message": "Request body too large (max 10MB)"},
            )
    response = await call_next(request)
    duration = time.time() - start_time
    response.headers["X-Response-Time"] = f"{duration:.4f}s"
    if request_id:
        response.headers["X-Request-Id"] = request_id
    if duration > 1.0:
        logger.warning(
            "Slow request: %s %s took %.2fs",
            request.method,
            request.url.path,
            duration,
        )
    return response


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    if isinstance(exc, RateLimitExceeded):
        return JSONResponse(
            status_code=429,
            content={"status": "error", "message": "Rate limit exceeded. Please try again later."},
        )
    logger.error(
        "Unhandled exception: %s %s — %s",
        request.method,
        request.url.path,
        str(exc),
        exc_info=True,
    )
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "Internal server error",
            "detail": "An unexpected error occurred" if settings.is_production else str(exc),
        },
    )

# ── Root & Ping ──────────────────────────────────────────────────────────────

@app.get("/", tags=["Root"])
async def root():
    return {
        "status": "ok",
        "message": "StackSentry Backend API is running 🚀",
        "version": app.version,
        "environment": settings.ENVIRONMENT,
        "docs": "/api/docs" if not settings.is_production else None,
        "health": "/api/health",
    }


@app.get("/ping", tags=["Root"])
async def ping():
    return {
        "status": "ok",
        "message": "pong"
    }


# ── Health ───────────────────────────────────────────────────────────────────
app.include_router(health.router)

# ── Public routes ────────────────────────────────────────────────────────────
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

# ── Admin routes ─────────────────────────────────────────────────────────────
app.include_router(admin_services.router)
app.include_router(admin_enterprise.router)
app.include_router(admin_consultation.router)

# ── Consultation routes ──────────────────────────────────────────────────────
app.include_router(consultation.router)
app.include_router(enterprise_solutions.router)

# ── Career routes ────────────────────────────────────────────────────────────
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

# ── Engineering routes ───────────────────────────────────────────────────────
app.include_router(engineering.router)
app.include_router(admin_engineering.router)

# ── Part 9C routes ──────────────────────────────────────────────────────────
app.include_router(announcements.router)
app.include_router(footer.router)
app.include_router(legal.router)
app.include_router(sitemap.router)
