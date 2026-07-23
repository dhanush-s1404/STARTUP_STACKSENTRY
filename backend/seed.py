"""
StackSentry Technologies — Database Seed Script

Usage:
    cd backend
    python seed.py

Reads DATABASE_URL from .env (via pydantic-settings).
Skips any record whose slug/label already exists.
"""

import asyncio
import json
import sys
import os
from urllib.parse import unquote

sys.path.insert(0, os.path.dirname(__file__))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from database.config import Base, Settings
import database.models  # noqa: F401 — registers all model tables
import database.models_part9c  # noqa: F401 — registers part 9c model tables
from database.models import (
    User,
    ServiceCategory,
    Service,
    ProjectCategory,
    Project,
    BlogPost,
    TeamMember,
    CompanyStat,
)
from api.deps import hash_password


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

async def exists(db: AsyncSession, model, **filters) -> bool:
    stmt = select(model).where(*[getattr(model, k) == v for k, v in filters.items()])
    result = await db.execute(stmt)
    return result.scalar_one_or_none() is not None


async def get_or_skip(db: AsyncSession, model, desc: str, **filters) -> bool:
    """Return True if already exists (caller should skip)."""
    if await exists(db, model, **filters):
        print(f"  skip  {desc} (already exists)")
        return True
    return False


def j(*items) -> str:
    """Dump items into a JSON string stored in a Text column."""
    return json.dumps(list(items))


# ---------------------------------------------------------------------------
# Seed Data
# ---------------------------------------------------------------------------

SERVICE_CATEGORIES = [
    {
        "slug": "ai-ml",
        "name": "AI & Machine Learning",
        "description": "Intelligent solutions powered by artificial intelligence and machine learning algorithms.",
        "icon": "Brain",
        "order": 1,
    },
    {
        "slug": "software-development",
        "name": "Software Development",
        "description": "Custom software engineering from architecture to deployment.",
        "icon": "Code2",
        "order": 2,
    },
    {
        "slug": "cloud-devops",
        "name": "Cloud & DevOps",
        "description": "Cloud-native infrastructure, CI/CD pipelines, and scalable deployment strategies.",
        "icon": "Cloud",
        "order": 3,
    },
    {
        "slug": "cybersecurity",
        "name": "Cybersecurity",
        "description": "End-to-end security audits, penetration testing, and compliance solutions.",
        "icon": "Shield",
        "order": 4,
    },
    {
        "slug": "web-applications",
        "name": "Web Applications",
        "description": "Modern, responsive web applications built with cutting-edge frameworks.",
        "icon": "Globe",
        "order": 5,
    },
    {
        "slug": "mobile-applications",
        "name": "Mobile Applications",
        "description": "Native and cross-platform mobile apps for iOS and Android.",
        "icon": "Smartphone",
        "order": 6,
    },
]

SERVICES = [
    {
        "slug": "ai-intelligent-automation",
        "title": "AI & Intelligent Automation",
        "short_description": "Deploy machine learning models and intelligent automation pipelines that reduce manual overhead and accelerate decision-making.",
        "description": (
            "StackSentry's AI practice covers the full lifecycle — from data engineering "
            "and feature stores to model training, deployment, and monitoring. We build "
            "production-grade systems using PyTorch, TensorFlow, and LLM orchestration "
            "frameworks so your team can ship intelligent features with confidence."
        ),
        "icon": "Brain",
        "features": j(
            "Custom ML model development & training",
            "LLM integration and prompt engineering",
            "Computer vision and NLP pipelines",
            "MLOps & model monitoring",
            "Predictive analytics dashboards",
            "Data pipeline engineering",
        ),
        "technologies": j("Python", "PyTorch", "TensorFlow", "LangChain", "MLflow", "Kubeflow", "Airflow"),
        "pricing_tier": "premium",
        "category_slug": "ai-ml",
        "order": 1,
    },
    {
        "slug": "custom-software-engineering",
        "title": "Custom Software Engineering",
        "short_description": "Full-stack product engineering from discovery through launch — microservices, APIs, and domain-driven design.",
        "description": (
            "Our engineering teams build reliable, maintainable software using "
            "domain-driven design, event-driven architectures, and microservices. "
            "We specialize in high-throughput backend systems, real-time data "
            "processing, and complex workflow automation."
        ),
        "icon": "Code2",
        "features": j(
            "Microservices & event-driven architecture",
            "RESTful and GraphQL API design",
            "Domain-driven design (DDD)",
            "Event sourcing & CQRS",
            "Legacy system modernization",
            "Technical debt reduction",
        ),
        "technologies": j("Go", "Rust", "Node.js", "Python", "Java", "Kafka", "gRPC"),
        "pricing_tier": "standard",
        "category_slug": "software-development",
        "order": 2,
    },
    {
        "slug": "cloud-infrastructure",
        "title": "Cloud Infrastructure & DevOps",
        "short_description": "Design, migrate, and operate cloud-native infrastructure on AWS, GCP, or Azure with production-grade CI/CD.",
        "description": (
            "We help organisations move to — and thrive in — the cloud. From "
            "infrastructure-as-code and container orchestration to observability "
            "and cost optimisation, our DevOps engineers ensure your platform "
            "is resilient, secure, and cost-efficient."
        ),
        "icon": "Cloud",
        "features": j(
            "Cloud migration strategy & execution",
            "Kubernetes & container orchestration",
            "Infrastructure as Code (Terraform, Pulumi)",
            "CI/CD pipeline design",
            "Observability & SRE practices",
            "FinOps & cost optimisation",
        ),
        "technologies": j("AWS", "GCP", "Azure", "Kubernetes", "Terraform", "Docker", "GitHub Actions"),
        "pricing_tier": "standard",
        "category_slug": "cloud-devops",
        "order": 3,
    },
    {
        "slug": "cybersecurity-solutions",
        "title": "Cybersecurity Solutions",
        "short_description": "Proactive threat detection, security audits, and compliance automation to protect your critical assets.",
        "description": (
            "StackSentry's security practice combines offensive and defensive "
            "disciplines. We perform thorough penetration tests, build SOC "
            "pipelines, and automate compliance workflows so your organisation "
            "stays ahead of evolving threats."
        ),
        "icon": "Shield",
        "features": j(
            "Penetration testing & red teaming",
            "Security architecture review",
            "SOC & SIEM pipeline setup",
            "Compliance automation (SOC 2, ISO 27001)",
            "Vulnerability management",
            "Incident response planning",
        ),
        "technologies": j("Burp Suite", "Nmap", "Splunk", "Wazuh", "Vault", "OPA", "Snyk"),
        "pricing_tier": "premium",
        "category_slug": "cybersecurity",
        "order": 4,
    },
    {
        "slug": "web-application-development",
        "title": "Web Application Development",
        "short_description": "High-performance SPAs, PWAs, and server-rendered apps using React, Next.js, and modern frontend stacks.",
        "description": (
            "We craft fast, accessible, and visually polished web applications. "
            "Whether you need a marketing site, a SaaS dashboard, or a complex "
            "B2B portal, our frontend and full-stack teams deliver with speed "
            "and precision."
        ),
        "icon": "Globe",
        "features": j(
            "React / Next.js / Vue development",
            "Progressive Web Apps (PWA)",
            "Design system & component libraries",
            "Performance optimisation & Core Web Vitals",
            "Accessibility (WCAG 2.2 AA)",
            "Headless CMS integration",
        ),
        "technologies": j("React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Contentful", "Storybook"),
        "pricing_tier": "standard",
        "category_slug": "web-applications",
        "order": 5,
    },
    {
        "slug": "mobile-app-development",
        "title": "Mobile Application Development",
        "short_description": "Native iOS & Android apps and cross-platform solutions with React Native and Flutter.",
        "description": (
            "From consumer-facing apps to internal enterprise tools, we build "
            "mobile experiences that are fast, reliable, and delightful. Our "
            "teams use React Native and Flutter for cross-platform efficiency "
            "while maintaining native performance when needed."
        ),
        "icon": "Smartphone",
        "features": j(
            "React Native & Flutter development",
            "Native iOS (Swift) & Android (Kotlin)",
            "Offline-first architecture",
            "Push notifications & deep linking",
            "App Store & Play Store submission",
            "Mobile CI/CD & testing automation",
        ),
        "technologies": j("React Native", "Flutter", "Swift", "Kotlin", "Expo", "Fastlane", "Firebase"),
        "pricing_tier": "standard",
        "category_slug": "mobile-applications",
        "order": 6,
    },
]

PROJECT_CATEGORIES = [
    {
        "slug": "ai-data",
        "name": "AI & Data",
        "description": "Projects involving machine learning, data pipelines, and intelligent automation.",
        "icon": "Brain",
        "order": 1,
    },
    {
        "slug": "enterprise-platform",
        "name": "Enterprise Platform",
        "description": "Large-scale platforms, dashboards, and internal tools for enterprise clients.",
        "icon": "Building2",
        "order": 2,
    },
    {
        "slug": "mobile",
        "name": "Mobile",
        "description": "Native and cross-platform mobile applications.",
        "icon": "Smartphone",
        "order": 3,
    },
    {
        "slug": "web",
        "name": "Web",
        "description": "Modern web applications and SaaS products.",
        "icon": "Globe",
        "order": 4,
    },
]

PROJECTS = [
    {
        "slug": "predictive-maintenance-platform",
        "title": "Predictive Maintenance Platform",
        "short_description": "ML-driven platform that predicts equipment failures 72 hours in advance for a manufacturing client.",
        "description": (
            "We built an end-to-end predictive maintenance system for a leading "
            "manufacturing company. The platform ingests IoT sensor data in "
            "real-time, runs anomaly detection models, and triggers maintenance "
            "work orders before failures occur."
        ),
        "client_name": "Apex Manufacturing Co.",
        "client_type": "Enterprise",
        "industry_slug": "manufacturing",
        "category_slug": "ai-data",
        "technologies": j("Python", "PyTorch", "Apache Kafka", "TimescaleDB", "React", "Grafana"),
        "features": j(
            "Real-time sensor data ingestion",
            "Anomaly detection ML pipeline",
            "Predictive failure alerts (72h window)",
            "Automated work-order generation",
            "Executive analytics dashboard",
        ),
        "business_problem": "Unplanned equipment downtime costing $2M+ annually.",
        "solution_overview": "Deployed LSTM-based time-series models on streaming IoT data with a Grafana monitoring layer.",
        "project_duration": "6 months",
        "team_size": 8,
        "year": 2024,
        "status": "completed",
        "is_featured": True,
        "sort_order": 1,
    },
    {
        "slug": "fintech-payment-gateway",
        "title": "Fintech Payment Gateway",
        "short_description": "High-throughput payment processing platform handling 50K+ transactions per second.",
        "description": (
            "Designed and built a PCI-DSS-compliant payment gateway for a "
            "fintech startup. The system processes over 50,000 transactions "
            "per second with sub-50ms latency and 99.999% uptime."
        ),
        "client_name": "PayStream Financial",
        "client_type": "Startup",
        "industry_slug": "fintech",
        "category_slug": "enterprise-platform",
        "technologies": j("Go", "PostgreSQL", "Redis", "Kafka", "Kubernetes", "gRPC"),
        "features": j(
            "Multi-currency payment processing",
            "Idempotent transaction engine",
            "Real-time fraud detection",
            "PCI-DSS Level 1 compliance",
            "Merchant dashboard & reporting",
        ),
        "business_problem": "Legacy payment system unable to scale beyond 5K TPS.",
        "solution_overview": "Event-driven architecture in Go with Kafka for durability and Redis for sub-ms lookups.",
        "project_duration": "9 months",
        "team_size": 12,
        "year": 2024,
        "status": "completed",
        "is_featured": True,
        "sort_order": 2,
    },
    {
        "slug": "healthcare-telemedicine-app",
        "title": "Healthcare Telemedicine App",
        "short_description": "HIPAA-compliant telemedicine platform connecting patients with specialists across 12 time zones.",
        "description": (
            "Built a cross-platform telemedicine application featuring HD video "
            "consultations, secure messaging, e-prescriptions, and integrated "
            "electronic health records. The platform serves 200K+ active users."
        ),
        "client_name": "MedConnect Health",
        "client_type": "Enterprise",
        "industry_slug": "healthcare",
        "category_slug": "mobile",
        "technologies": j("React Native", "Node.js", "WebRTC", "PostgreSQL", "AWS", "Twilio"),
        "features": j(
            "HD video consultations",
            "Secure end-to-end messaging",
            "E-prescription integration",
            "EHR synchronization",
            "Multi-language support",
        ),
        "business_problem": "Rural patients lack access to specialist consultations.",
        "solution_overview": "Cross-platform mobile app with WebRTC video, HIPAA-compliant data handling, and offline-capable EHR sync.",
        "project_duration": "8 months",
        "team_size": 10,
        "year": 2023,
        "status": "completed",
        "is_featured": True,
        "sort_order": 3,
    },
    {
        "slug": "ecommerce-marketplace",
        "title": "AI-Powered E-Commerce Marketplace",
        "short_description": "Multi-vendor marketplace with AI-driven product recommendations and dynamic pricing.",
        "description": (
            "Developed a full-featured e-commerce marketplace for a retail "
            "conglomerate. The platform includes AI-powered recommendation "
            "engines, dynamic pricing, vendor management, and a real-time "
            "analytics dashboard."
        ),
        "client_name": "RetailNova Group",
        "client_type": "Enterprise",
        "industry_slug": "retail",
        "category_slug": "web",
        "technologies": j("Next.js", "TypeScript", "Python", "TensorFlow", "Stripe", "Algolia"),
        "features": j(
            "AI product recommendations",
            "Dynamic pricing engine",
            "Multi-vendor management",
            "Real-time inventory sync",
            "Advanced search with Algolia",
        ),
        "business_problem": "Flat conversion rates and poor personalisation on legacy platform.",
        "solution_overview": "Next.js storefront with TF Serving recommendation API and Stripe Connect for multi-vendor payouts.",
        "project_duration": "7 months",
        "team_size": 9,
        "year": 2024,
        "status": "completed",
        "is_featured": False,
        "sort_order": 4,
    },
]

BLOG_POSTS = [
    {
        "slug": "building-production-llm-applications",
        "title": "Building Production-Ready LLM Applications in 2024",
        "excerpt": "A practical guide to deploying large language models at scale — from prompt engineering to observability.",
        "content": (
            "Large language models have moved from research labs to production "
            "systems. In this article, we share patterns we've refined while "
            "building LLM-powered features for enterprise clients: prompt "
            "management, evaluation frameworks, cost control, and runtime "
            "monitoring. We cover RAG architectures, fine-tuning strategies, "
            "and how to avoid common pitfalls like hallucination and context "
            "window overflow."
        ),
        "category": "AI & Machine Learning",
        "tags": j("LLM", "AI", "MLOps", "RAG", "Production"),
        "reading_time": 12,
        "status": "published",
        "is_featured": True,
        "view_count": 2840,
        "order": 1,
    },
    {
        "slug": "kubernetes-cost-optimisation",
        "title": "Kubernetes Cost Optimisation: Save 40% on Your Cloud Bill",
        "excerpt": "How we helped a SaaS client reduce monthly infrastructure spend from $180K to $108K without sacrificing reliability.",
        "content": (
            "Cloud costs spiral quickly when Kubernetes clusters are "
            "misconfigured. We audited a client's 200-pod deployment and "
            "identified $72K in monthly waste from over-provisioned requests, "
            "idle namespaces, and missing spot instance strategies. This "
            "article walks through the tools, techniques, and governance "
            "changes that delivered a 40% reduction in 60 days."
        ),
        "category": "Cloud & DevOps",
        "tags": j("Kubernetes", "Cloud", "FinOps", "AWS", "DevOps"),
        "reading_time": 9,
        "status": "published",
        "is_featured": True,
        "view_count": 1920,
        "order": 2,
    },
    {
        "slug": "zero-trust-architecture-guide",
        "title": "Implementing Zero Trust Architecture: A Step-by-Step Guide",
        "excerpt": "Move beyond perimeter security with a practical zero-trust rollout plan for mid-size organisations.",
        "content": (
            "Perimeter-based security is no longer sufficient for modern, "
            "distributed teams. This guide covers the foundational principles "
            "of zero trust — never trust, always verify — and provides a "
            "phased implementation roadmap. We discuss identity-aware proxies, "
            "micro-segmentation, continuous verification, and how to "
            "integrate zero trust with existing CI/CD pipelines."
        ),
        "category": "Cybersecurity",
        "tags": j("Security", "Zero Trust", "Compliance", "Infrastructure"),
        "reading_time": 15,
        "status": "published",
        "is_featured": False,
        "view_count": 1340,
        "order": 3,
    },
    {
        "slug": "nextjs-performance-deep-dive",
        "title": "Next.js Performance Deep Dive: From 5s to Sub-1s Load Times",
        "excerpt": "Real-world optimisation techniques that cut our client's Largest Contentful Paint by 80%.",
        "content": (
            "Core Web Vitals directly impact SEO ranking and user retention. "
            "We recently helped a SaaS client improve their LCP from 5.2s to "
            "0.9s. This article details every technique used: streaming SSR, "
            "image optimisation, font subsetting, route-level code splitting, "
            "and edge caching strategies."
        ),
        "category": "Web Development",
        "tags": j("Next.js", "Performance", "Frontend", "Core Web Vitals"),
        "reading_time": 11,
        "status": "published",
        "is_featured": True,
        "view_count": 3100,
        "order": 4,
    },
]

TEAM_MEMBERS = [
    {
        "name": "Arjun Mehta",
        "slug": "arjun-mehta",
        "role": "Chief Executive Officer",
        "department": "Leadership",
        "bio": "Former AWS Principal Engineer with 15+ years building distributed systems. Founded StackSentry to make enterprise-grade security and AI accessible to every organisation.",
        "email": "arjun@stacksentry.com",
        "order": 1,
        "is_leadership": True,
    },
    {
        "name": "Priya Ramanathan",
        "slug": "priya-ramanathan",
        "role": "Chief Technology Officer",
        "department": "Leadership",
        "bio": "PhD in Machine Learning from Stanford. Led ML infrastructure at Stripe before joining StackSentry to drive the AI and platform engineering vision.",
        "email": "priya@stacksentry.com",
        "order": 2,
        "is_leadership": True,
    },
    {
        "name": "Vikram Singh",
        "slug": "vikram-singh",
        "role": "VP of Engineering",
        "department": "Engineering",
        "bio": "Scaled engineering teams at Shopify and Atlassian. Passionate about developer experience, CI/CD excellence, and building high-performance remote teams.",
        "email": "vikram@stacksentry.com",
        "order": 3,
        "is_leadership": True,
    },
    {
        "name": "Neha Kapoor",
        "slug": "neha-kapoor",
        "role": "Head of AI & Data",
        "department": "AI",
        "bio": "Former Google Brain researcher specialising in NLP and recommendation systems. Leads the AI practice at StackSentry, shipping production ML for Fortune 500 clients.",
        "email": "neha@stacksentry.com",
        "order": 4,
        "is_leadership": True,
    },
    {
        "name": "Rahul Desai",
        "slug": "rahul-desai",
        "role": "Head of Cybersecurity",
        "department": "Security",
        "bio": "CISSP, OSCP certified with a decade of experience in offensive security. Previously led the red team at a Big Four consulting firm.",
        "email": "rahul@stacksentry.com",
        "order": 5,
        "is_leadership": True,
    },
    {
        "name": "Ananya Iyer",
        "slug": "ananya-iyer",
        "role": "Lead Frontend Engineer",
        "department": "Engineering",
        "bio": "React and Next.js expert who has built design systems used by millions. Speaker at ReactConf and contributor to open-source frontend tooling.",
        "email": "ananya@stacksentry.com",
        "order": 6,
        "is_leadership": False,
    },
]

COMPANY_STATS = [
    {
        "label": "Projects Delivered",
        "value": "150",
        "suffix": "+",
        "icon": "FolderCheck",
        "description": "Successfully delivered projects across 12 industries.",
        "category": "impact",
        "order": 1,
    },
    {
        "label": "Client Retention",
        "value": "96",
        "suffix": "%",
        "icon": "Heart",
        "description": "Clients who continue to partner with us year over year.",
        "category": "trust",
        "order": 2,
    },
    {
        "label": "Team Members",
        "value": "85",
        "suffix": "+",
        "icon": "Users",
        "description": "Engineers, designers, and consultants across 6 countries.",
        "category": "team",
        "order": 3,
    },
    {
        "label": "Uptime SLA",
        "value": "99.99",
        "suffix": "%",
        "icon": "Activity",
        "description": "Average platform uptime across all managed services.",
        "category": "reliability",
        "order": 4,
    },
    {
        "label": "Countries Served",
        "value": "18",
        "suffix": "",
        "icon": "Globe",
        "description": "Active clients across North America, Europe, and Asia-Pacific.",
        "category": "reach",
        "order": 5,
    },
    {
        "label": "Open Source Contributions",
        "value": "40",
        "suffix": "+",
        "icon": "GitBranch",
        "description": "Open-source projects and libraries maintained by our team.",
        "category": "community",
        "order": 6,
    },
]


# ---------------------------------------------------------------------------
# Seed Runner
# ---------------------------------------------------------------------------

async def seed_category(db: AsyncSession, model, items: list[dict], label: str):
    inserted = 0
    for item in items:
        if await get_or_skip(db, model, f"{label}: {item['slug']}", slug=item["slug"]):
            continue
        db.add(model(**item))
        inserted += 1
    await db.flush()
    return inserted


async def seed_model(db: AsyncSession, model, items: list[dict], label: str):
    inserted = 0
    for item in items:
        key = item.get("slug") or item.get("label", "?")
        if await get_or_skip(db, model, f"{label}: {key}", slug=key):
            continue
        db.add(model(**item))
        inserted += 1
    await db.flush()
    return inserted


async def run_seed():
    settings = Settings()

    # asyncpg's internal URL parser chokes on '*' in password.
    # Parse components manually and pass via connect_args.
    from urllib.parse import urlparse
    raw = settings.DATABASE_URL
    if "%2A" in raw:
        raw = raw.replace("%2A", "*")
    parsed = urlparse(raw)

    _engine = create_async_engine(
        "postgresql+asyncpg://",
        echo=False,
        pool_pre_ping=True,
        pool_size=5,
        connect_args={
            "host": parsed.hostname,
            "port": parsed.port or 5432,
            "user": parsed.username,
            "password": parsed.password,
            "database": parsed.path.lstrip("/"),
            "ssl": "require",
        },
    )
    _session = async_sessionmaker(_engine, class_=AsyncSession, expire_on_commit=False)

    print("Creating tables (if not exists) ...")
    async with _engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with _session() as db:
        total = 0

        print("\nSeeding Admin User ...")
        admin_email = "admin@stacksentry.com"
        existing_admin = await db.execute(select(User).where(User.email == admin_email))
        if existing_admin.scalar_one_or_none() is None:
            db.add(User(
                name="Administrator",
                email=admin_email,
                hashed_password=hash_password("Admin@12345"),
                is_active=True,
                is_superuser=True,
            ))
            total += 1
            print("  +   Admin user created (admin@stacksentry.com / Admin@12345)")
        else:
            print("  skip  Admin user (already exists)")

        print("\nSeeding ServiceCategories ...")
        total += await seed_category(db, ServiceCategory, SERVICE_CATEGORIES, "ServiceCategory")

        # Link category FKs to services
        cat_map = {}
        for sc in SERVICE_CATEGORIES:
            result = await db.execute(
                select(ServiceCategory).where(ServiceCategory.slug == sc["slug"])
            )
            row = result.scalar_one_or_none()
            if row:
                cat_map[sc["slug"]] = row.id

        print("\nSeeding Services ...")
        for svc in SERVICES:
            cat_slug = svc.pop("category_slug", None)
            if await get_or_skip(db, Service, f"Service: {svc['slug']}", slug=svc["slug"]):
                continue
            svc["category_id"] = cat_map.get(cat_slug)
            db.add(Service(**svc))
            total += 1
        await db.flush()

        print("\nSeeding ProjectCategories ...")
        total += await seed_category(db, ProjectCategory, PROJECT_CATEGORIES, "ProjectCategory")

        print("\nSeeding Projects ...")
        total += await seed_model(db, Project, PROJECTS, "Project")

        print("\nSeeding TeamMembers ...")
        for member in TEAM_MEMBERS:
            if await get_or_skip(db, TeamMember, f"TeamMember: {member['slug']}", slug=member["slug"]):
                continue
            db.add(TeamMember(**member))
            total += 1
        await db.flush()

        print("\nSeeding BlogPosts ...")
        for post in BLOG_POSTS:
            if await get_or_skip(db, BlogPost, f"BlogPost: {post['slug']}", slug=post["slug"]):
                continue
            db.add(BlogPost(**post))
            total += 1
        await db.flush()

        print("\nSeeding CompanyStats ...")
        for stat in COMPANY_STATS:
            if await get_or_skip(db, CompanyStat, f"CompanyStat: {stat['label']}", label=stat["label"]):
                continue
            db.add(CompanyStat(**stat))
            total += 1
        await db.flush()

        await db.commit()

    print(f"\nDatabase seeded successfully ({total} new records inserted).")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    asyncio.run(run_seed())
