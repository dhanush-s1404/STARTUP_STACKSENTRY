import json
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from database.config import get_db
from database.models import (
    Solution, Industry, BusinessChallenge, ROITemplate,
    ConsultationRequest as ConsultationRequestDB,
    ArchitectureModel, WorldCoverage, BusinessMetric,
)
from api.utils import escape_like

router = APIRouter(prefix="/api/enterprise", tags=["Enterprise Solutions"])


# ---------------------------------------------------------------------------
# Pydantic request / response schemas
# ---------------------------------------------------------------------------

class ROIRequest(BaseModel):
    company_size: str
    employees: int
    industry: str
    current_software: Optional[str] = ""
    pain_points: Optional[List[str]] = []
    monthly_workload: Optional[str] = ""
    automation_opportunities: Optional[List[str]] = []


class ConsultationRequest(BaseModel):
    company_name: str
    contact_name: str
    email: str
    phone: Optional[str] = ""
    industry: Optional[str] = ""
    company_size: Optional[str] = ""
    project_goals: Optional[str] = ""
    challenges: Optional[str] = ""
    budget_range: Optional[str] = ""
    timeline: Optional[str] = ""
    meeting_preference: Optional[str] = ""
    additional_info: Optional[str] = ""


class ComparisonRequest(BaseModel):
    solution_slugs: List[str]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _json_load(val):
    if not val:
        return []
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return []


# ---------------------------------------------------------------------------
# Solutions
# ---------------------------------------------------------------------------

@router.get("/solutions")
async def list_solutions(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Solution).where(Solution.is_active == True)
    if search:
        stmt = stmt.where(
            or_(
                Solution.title.ilike(f"%{escape_like(search)}%", escape="\\"),
                Solution.description.ilike(f"%{escape_like(search)}%", escape="\\"),
            )
        )
    if status:
        stmt = stmt.where(Solution.status == status)
    stmt = stmt.order_by(Solution.order)
    result = await db.execute(stmt)
    solutions = result.scalars().all()
    return [
        {
            "id": s.id,
            "slug": s.slug,
            "title": s.title,
            "description": s.description,
            "short_description": s.short_description,
            "icon": s.icon,
            "business_problems": _json_load(s.business_problems),
            "key_features": _json_load(s.key_features),
            "business_benefits": _json_load(s.business_benefits),
            "technologies": _json_load(s.technologies),
            "pricing_tier": s.pricing_tier,
            "status": s.status,
            "expected_roi": s.expected_roi,
            "deployment_models": _json_load(s.deployment_models),
            "integration_support": _json_load(s.integration_support),
            "seo_title": s.seo_title,
            "seo_description": s.seo_description,
            "seo_keywords": _json_load(s.seo_keywords),
        }
        for s in solutions
    ]


@router.get("/solutions/{slug}")
async def get_solution(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Solution).where(Solution.slug == slug))
    solution = result.scalar_one_or_none()
    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")
    return {
        "id": solution.id,
        "slug": solution.slug,
        "title": solution.title,
        "description": solution.description,
        "short_description": solution.short_description,
        "icon": solution.icon,
        "business_problems": _json_load(solution.business_problems),
        "key_features": _json_load(solution.key_features),
        "business_benefits": _json_load(solution.business_benefits),
        "expected_roi": solution.expected_roi,
        "architecture": _json_load(solution.architecture),
        "technologies": _json_load(solution.technologies),
        "screenshots": _json_load(solution.screenshots),
        "deployment_models": _json_load(solution.deployment_models),
        "integration_support": _json_load(solution.integration_support),
        "pricing_tier": solution.pricing_tier,
        "status": solution.status,
        "seo_title": solution.seo_title,
        "seo_description": solution.seo_description,
        "seo_keywords": _json_load(solution.seo_keywords),
        "order": solution.order,
        "created_at": solution.created_at.isoformat() if solution.created_at else None,
        "updated_at": solution.updated_at.isoformat() if solution.updated_at else None,
    }


@router.post("/solutions/compare")
async def compare_solutions(
    body: ComparisonRequest,
    db: AsyncSession = Depends(get_db),
):
    if not body.solution_slugs:
        raise HTTPException(status_code=400, detail="Provide at least one solution slug")
    stmt = select(Solution).where(
        Solution.slug.in_(body.solution_slugs),
        Solution.is_active == True,
    )
    result = await db.execute(stmt)
    solutions = result.scalars().all()
    if not solutions:
        raise HTTPException(status_code=404, detail="No matching solutions found")
    return [
        {
            "id": s.id,
            "slug": s.slug,
            "title": s.title,
            "description": s.description,
            "short_description": s.short_description,
            "key_features": _json_load(s.key_features),
            "business_benefits": _json_load(s.business_benefits),
            "technologies": _json_load(s.technologies),
            "expected_roi": s.expected_roi,
            "deployment_models": _json_load(s.deployment_models),
            "integration_support": _json_load(s.integration_support),
            "pricing_tier": s.pricing_tier,
            "architecture": _json_load(s.architecture),
        }
        for s in solutions
    ]


# ---------------------------------------------------------------------------
# Industries
# ---------------------------------------------------------------------------

@router.get("/industries")
async def list_industries(
    search: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Industry).where(Industry.is_active == True)
    if search:
        stmt = stmt.where(
            or_(
                Industry.title.ilike(f"%{escape_like(search)}%", escape="\\"),
                Industry.description.ilike(f"%{escape_like(search)}%", escape="\\"),
            )
        )
    stmt = stmt.order_by(Industry.order)
    result = await db.execute(stmt)
    industries = result.scalars().all()
    return [
        {
            "id": i.id,
            "slug": i.slug,
            "title": i.title,
            "description": i.description,
            "short_description": i.short_description,
            "icon": i.icon,
            "challenges": _json_load(i.challenges),
            "solutions": _json_load(i.solutions),
            "benefits": _json_load(i.benefits),
            "case_examples": _json_load(i.case_examples),
            "image_url": i.image_url,
            "seo_title": i.seo_title,
            "seo_description": i.seo_description,
        }
        for i in industries
    ]


@router.get("/industries/{slug}")
async def get_industry(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Industry).where(Industry.slug == slug))
    industry = result.scalar_one_or_none()
    if not industry:
        raise HTTPException(status_code=404, detail="Industry not found")
    return {
        "id": industry.id,
        "slug": industry.slug,
        "title": industry.title,
        "description": industry.description,
        "short_description": industry.short_description,
        "icon": industry.icon,
        "challenges": _json_load(industry.challenges),
        "solutions": _json_load(industry.solutions),
        "benefits": _json_load(industry.benefits),
        "case_examples": _json_load(industry.case_examples),
        "image_url": industry.image_url,
        "seo_title": industry.seo_title,
        "seo_description": industry.seo_description,
        "order": industry.order,
        "created_at": industry.created_at.isoformat() if industry.created_at else None,
        "updated_at": industry.updated_at.isoformat() if industry.updated_at else None,
    }


# ---------------------------------------------------------------------------
# Challenges
# ---------------------------------------------------------------------------

@router.get("/challenges")
async def list_challenges(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BusinessChallenge).where(BusinessChallenge.is_active == True)
    if search:
        stmt = stmt.where(
            or_(
                BusinessChallenge.title.ilike(f"%{escape_like(search)}%", escape="\\"),
                BusinessChallenge.description.ilike(f"%{escape_like(search)}%", escape="\\"),
            )
        )
    if category:
        stmt = stmt.where(BusinessChallenge.category == category)
    stmt = stmt.order_by(BusinessChallenge.order)
    result = await db.execute(stmt)
    challenges = result.scalars().all()
    return [
        {
            "id": c.id,
            "slug": c.slug,
            "title": c.title,
            "description": c.description,
            "category": c.category,
            "impact": c.impact,
            "symptoms": _json_load(c.symptoms),
            "root_cause": c.root_cause,
            "recommended_solutions": _json_load(c.recommended_solutions),
            "relevant_industries": _json_load(c.relevant_industries),
            "metrics": _json_load(c.metrics),
        }
        for c in challenges
    ]


@router.get("/challenges/{slug}")
async def get_challenge(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BusinessChallenge).where(BusinessChallenge.slug == slug))
    challenge = result.scalar_one_or_none()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return {
        "id": challenge.id,
        "slug": challenge.slug,
        "title": challenge.title,
        "description": challenge.description,
        "category": challenge.category,
        "impact": challenge.impact,
        "symptoms": _json_load(challenge.symptoms),
        "root_cause": challenge.root_cause,
        "recommended_solutions": _json_load(challenge.recommended_solutions),
        "relevant_industries": _json_load(challenge.relevant_industries),
        "metrics": _json_load(challenge.metrics),
        "order": challenge.order,
        "created_at": challenge.created_at.isoformat() if challenge.created_at else None,
        "updated_at": challenge.updated_at.isoformat() if challenge.updated_at else None,
    }


# ---------------------------------------------------------------------------
# ROI Calculator
# ---------------------------------------------------------------------------

@router.post("/roi/calculate")
async def calculate_roi(body: ROIRequest, db: AsyncSession = Depends(get_db)):
    size_multipliers = {
        "startup": 0.6,
        "small": 0.8,
        "medium": 1.0,
        "large": 1.3,
        "enterprise": 1.6,
    }
    multiplier = size_multipliers.get(body.company_size.lower(), 1.0)

    base_hours_per_employee_month = 12.0
    if body.monthly_workload:
        workload_map = {
            "low": 8,
            "medium": 12,
            "high": 18,
            "very_high": 24,
        }
        base_hours_per_employee_month = workload_map.get(body.monthly_workload.lower(), 12)

    total_monthly_hours = body.employees * base_hours_per_employee_month
    time_saved_pct = min(0.35, 0.15 + (len(body.pain_points) * 0.03))
    time_saved_hours = round(total_monthly_hours * time_saved_pct, 1)

    avg_hourly_rate = 75.0
    monthly_cost_saving = round(time_saved_hours * avg_hourly_rate, 2)
    annual_cost_saving = round(monthly_cost_saving * 12, 2)
    productivity_increase = round(time_saved_pct * 100, 1)

    stmt = select(Solution).where(Solution.is_active == True)
    result = await db.execute(stmt)
    all_solutions = result.scalars().all()

    pain_to_solution_map = {
        "manual_data_entry": "ai-automation-suite",
        "data_silos": "enterprise-integration-platform",
        "slow_processes": "process-optimization-engine",
        "poor_visibility": "business-intelligence-dashboard",
        "security_concerns": "security-compliance-framework",
        "scalability": "cloud-infrastructure-solution",
        "customer_experience": "customer-experience-platform",
        "compliance": "security-compliance-framework",
    }
    matched_slugs = set()
    for pain in body.pain_points:
        pain_key = pain.lower().replace(" ", "_")
        if pain_key in pain_to_solution_map:
            matched_slugs.add(pain_to_solution_map[pain_key])

    if not matched_slugs and all_solutions:
        matched_slugs = {s.slug for s in all_solutions[:3]}

    suggested = [s.slug for s in all_solutions if s.slug in matched_slugs]
    if not suggested:
        suggested = [s.slug for s in all_solutions[:3]]

    timeline_weeks = 8
    if body.employees > 500:
        timeline_weeks = 20
    elif body.employees > 100:
        timeline_weeks = 14
    elif body.employees > 20:
        timeline_weeks = 10

    return {
        "input": {
            "company_size": body.company_size,
            "employees": body.employees,
            "industry": body.industry,
            "current_software": body.current_software,
            "pain_points": body.pain_points,
            "monthly_workload": body.monthly_workload,
            "automation_opportunities": body.automation_opportunities,
        },
        "results": {
            "time_saved_hours_monthly": time_saved_hours,
            "time_saved_pct": productivity_increase,
            "cost_reduction_monthly": monthly_cost_saving,
            "cost_reduction_annual": annual_cost_saving,
            "productivity_increase_pct": productivity_increase,
            "suggested_solutions": suggested,
            "implementation_timeline_weeks": timeline_weeks,
            "roi_multiplier": multiplier,
            "estimated_annual_roi": round(annual_cost_saving * multiplier, 2),
        },
    }


@router.get("/roi/templates")
async def list_roi_templates(db: AsyncSession = Depends(get_db)):
    stmt = select(ROITemplate).where(ROITemplate.is_active == True).order_by(ROITemplate.order)
    result = await db.execute(stmt)
    templates = result.scalars().all()
    return [
        {
            "id": t.id,
            "slug": t.slug,
            "title": t.title,
            "description": t.description,
            "industry": t.industry,
            "solution_slug": t.solution_slug,
            "inputs": _json_load(t.inputs),
            "formulas": _json_load(t.formulas),
            "default_values": _json_load(t.default_values),
            "output_metrics": _json_load(t.output_metrics),
        }
        for t in templates
    ]


# ---------------------------------------------------------------------------
# Consultation
# ---------------------------------------------------------------------------

@router.post("/consultation")
async def submit_consultation(body: ConsultationRequest, db: AsyncSession = Depends(get_db)):
    req = ConsultationRequestDB(
        company_name=body.company_name,
        contact_name=body.contact_name,
        email=body.email,
        phone=body.phone,
        industry=body.industry,
        company_size=body.company_size,
        project_goals=body.project_goals,
        challenges=body.challenges,
        budget_range=body.budget_range,
        timeline=body.timeline,
        meeting_preference=body.meeting_preference,
        additional_info=body.additional_info,
        status="new",
    )
    db.add(req)
    await db.commit()
    await db.refresh(req)
    return {
        "id": req.id,
        "status": req.status,
        "message": "Consultation request submitted successfully. Our team will contact you within 24 hours.",
    }


# ---------------------------------------------------------------------------
# Architecture
# ---------------------------------------------------------------------------

@router.get("/architecture")
async def list_architecture(db: AsyncSession = Depends(get_db)):
    stmt = select(ArchitectureModel).where(ArchitectureModel.is_active == True).order_by(ArchitectureModel.order)
    result = await db.execute(stmt)
    models = result.scalars().all()
    return [
        {
            "id": m.id,
            "slug": m.slug,
            "title": m.title,
            "description": m.description,
            "solution_slug": m.solution_slug,
            "layers": _json_load(m.layers),
            "technologies": _json_load(m.technologies),
            "diagram_data": _json_load(m.diagram_data),
        }
        for m in models
    ]


@router.get("/architecture/{slug}")
async def get_architecture(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ArchitectureModel).where(ArchitectureModel.slug == slug))
    model = result.scalar_one_or_none()
    if not model:
        raise HTTPException(status_code=404, detail="Architecture model not found")
    return {
        "id": model.id,
        "slug": model.slug,
        "title": model.title,
        "description": model.description,
        "solution_slug": model.solution_slug,
        "layers": _json_load(model.layers),
        "technologies": _json_load(model.technologies),
        "diagram_data": _json_load(model.diagram_data),
        "order": model.order,
        "created_at": model.created_at.isoformat() if model.created_at else None,
        "updated_at": model.updated_at.isoformat() if model.updated_at else None,
    }


# ---------------------------------------------------------------------------
# World Coverage
# ---------------------------------------------------------------------------

@router.get("/coverage")
async def list_coverage(db: AsyncSession = Depends(get_db)):
    stmt = select(WorldCoverage).where(WorldCoverage.is_active == True).order_by(WorldCoverage.order)
    result = await db.execute(stmt)
    coverage = result.scalars().all()
    return [
        {
            "id": c.id,
            "country": c.country,
            "code": c.code,
            "region": c.region,
            "status": c.status,
            "delivery_center": c.delivery_center,
            "timezone": c.timezone,
            "languages": c.languages,
            "cloud_regions": c.cloud_regions,
            "support_available": c.support_available,
        }
        for c in coverage
    ]


# ---------------------------------------------------------------------------
# Business Metrics
# ---------------------------------------------------------------------------

@router.get("/metrics")
async def list_metrics(
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BusinessMetric).where(BusinessMetric.is_active == True)
    if category:
        stmt = stmt.where(BusinessMetric.category == category)
    stmt = stmt.order_by(BusinessMetric.order)
    result = await db.execute(stmt)
    metrics = result.scalars().all()
    return [
        {
            "id": m.id,
            "slug": m.slug,
            "label": m.label,
            "value": m.value,
            "suffix": m.suffix,
            "prefix": m.prefix,
            "description": m.description,
            "category": m.category,
            "icon": m.icon,
            "source": m.source,
        }
        for m in metrics
    ]
