import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from database.config import get_db
from database.models import (
    BusinessChallenge, ROITemplate, ConsultationRequest,
    ArchitectureModel, WorldCoverage, BusinessMetric, AuditLog,
)
from api.deps import get_current_admin

router = APIRouter(prefix="/api/admin/enterprise", tags=["Admin Enterprise"])


def _json_load(val):
    if not val:
        return []
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return []


def _log(db, table, record_id, action, old=None, new=None, admin_id="admin"):
    db.add(AuditLog(
        table_name=table,
        record_id=str(record_id),
        action=action,
        old_values=json.dumps(old) if old else None,
        new_values=json.dumps(new) if new else None,
        changed_by=admin_id,
    ))


# ===================================================================
# Business Challenges
# ===================================================================

@router.get("/challenges")
async def admin_list_challenges(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(BusinessChallenge).order_by(BusinessChallenge.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": c.id, "slug": c.slug, "title": c.title, "description": c.description,
            "category": c.category, "impact": c.impact,
            "symptoms": _json_load(c.symptoms), "root_cause": c.root_cause,
            "recommended_solutions": _json_load(c.recommended_solutions),
            "relevant_industries": _json_load(c.relevant_industries),
            "metrics": _json_load(c.metrics),
            "order": c.order, "is_active": c.is_active,
            "created_at": c.created_at.isoformat() if c.created_at else None,
            "updated_at": c.updated_at.isoformat() if c.updated_at else None,
        }
        for c in items
    ]


@router.get("/challenges/{slug}")
async def admin_get_challenge(slug: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(BusinessChallenge).where(BusinessChallenge.slug == slug))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="BusinessChallenge not found")
    return {
        "id": c.id, "slug": c.slug, "title": c.title, "description": c.description,
        "category": c.category, "impact": c.impact,
        "symptoms": _json_load(c.symptoms), "root_cause": c.root_cause,
        "recommended_solutions": _json_load(c.recommended_solutions),
        "relevant_industries": _json_load(c.relevant_industries),
        "metrics": _json_load(c.metrics),
        "order": c.order, "is_active": c.is_active,
        "created_at": c.created_at.isoformat() if c.created_at else None,
        "updated_at": c.updated_at.isoformat() if c.updated_at else None,
    }


@router.post("/challenges")
async def admin_create_challenge(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(BusinessChallenge).where(BusinessChallenge.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    c = BusinessChallenge(
        slug=data["slug"], title=data["title"], description=data.get("description"),
        category=data.get("category"), impact=data.get("impact"),
        symptoms=json.dumps(data.get("symptoms", [])),
        root_cause=data.get("root_cause"),
        recommended_solutions=json.dumps(data.get("recommended_solutions", [])),
        relevant_industries=json.dumps(data.get("relevant_industries", [])),
        metrics=json.dumps(data.get("metrics", [])),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(c)
    await db.refresh(c)
    _log(db, "business_challenges", c.id, "CREATE", new={"slug": c.slug, "title": c.title})
    await db.commit()
    return {"id": c.id, "slug": c.slug, "title": c.title}


@router.put("/challenges/{slug}")
async def admin_update_challenge(slug: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(BusinessChallenge).where(BusinessChallenge.slug == slug))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="BusinessChallenge not found")
    old = {"slug": c.slug, "title": c.title, "is_active": c.is_active}
    for field in ("slug", "title", "description", "category", "impact", "root_cause", "order", "is_active"):
        if field in data:
            setattr(c, field, data[field])
    for jf in ("symptoms", "recommended_solutions", "relevant_industries", "metrics"):
        if jf in data:
            setattr(c, jf, json.dumps(data[jf]))
    c.updated_by = str(admin.id)
    _log(db, "business_challenges", c.id, "UPDATE", old=old, new={"slug": c.slug, "title": c.title})
    await db.commit()
    return {"id": c.id, "slug": c.slug, "title": c.title}


@router.delete("/challenges/{slug}")
async def admin_delete_challenge(slug: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(BusinessChallenge).where(BusinessChallenge.slug == slug))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="BusinessChallenge not found")
    c.deleted_at = func.now()
    c.is_active = False
    c.updated_by = str(admin.id)
    _log(db, "business_challenges", c.id, "DELETE", old={"slug": c.slug, "title": c.title})
    await db.commit()
    return {"detail": "BusinessChallenge deleted"}


# ===================================================================
# ROI Templates
# ===================================================================

@router.get("/roi-templates")
async def admin_list_roi_templates(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(ROITemplate).order_by(ROITemplate.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
            "industry": t.industry, "solution_slug": t.solution_slug,
            "inputs": _json_load(t.inputs), "formulas": _json_load(t.formulas),
            "default_values": _json_load(t.default_values),
            "output_metrics": _json_load(t.output_metrics),
            "order": t.order, "is_active": t.is_active,
            "created_at": t.created_at.isoformat() if t.created_at else None,
            "updated_at": t.updated_at.isoformat() if t.updated_at else None,
        }
        for t in items
    ]


@router.get("/roi-templates/{slug}")
async def admin_get_roi_template(slug: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ROITemplate).where(ROITemplate.slug == slug))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="ROITemplate not found")
    return {
        "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
        "industry": t.industry, "solution_slug": t.solution_slug,
        "inputs": _json_load(t.inputs), "formulas": _json_load(t.formulas),
        "default_values": _json_load(t.default_values),
        "output_metrics": _json_load(t.output_metrics),
        "order": t.order, "is_active": t.is_active,
        "created_at": t.created_at.isoformat() if t.created_at else None,
        "updated_at": t.updated_at.isoformat() if t.updated_at else None,
    }


@router.post("/roi-templates")
async def admin_create_roi_template(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(ROITemplate).where(ROITemplate.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    t = ROITemplate(
        slug=data["slug"], title=data["title"], description=data.get("description"),
        industry=data.get("industry"), solution_slug=data.get("solution_slug"),
        inputs=json.dumps(data.get("inputs", [])),
        formulas=json.dumps(data.get("formulas", {})),
        default_values=json.dumps(data.get("default_values", {})),
        output_metrics=json.dumps(data.get("output_metrics", [])),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(t)
    await db.commit()
    await db.refresh(t)
    _log(db, "roi_templates", t.id, "CREATE", new={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"id": t.id, "slug": t.slug, "title": t.title}


@router.put("/roi-templates/{slug}")
async def admin_update_roi_template(slug: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ROITemplate).where(ROITemplate.slug == slug))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="ROITemplate not found")
    old = {"slug": t.slug, "title": t.title, "is_active": t.is_active}
    for field in ("slug", "title", "description", "industry", "solution_slug", "order", "is_active"):
        if field in data:
            setattr(t, field, data[field])
    for jf in ("inputs", "formulas", "default_values", "output_metrics"):
        if jf in data:
            setattr(t, jf, json.dumps(data[jf]))
    t.updated_by = str(admin.id)
    await db.commit()
    _log(db, "roi_templates", t.id, "UPDATE", old=old, new={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"id": t.id, "slug": t.slug, "title": t.title}


@router.delete("/roi-templates/{slug}")
async def admin_delete_roi_template(slug: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ROITemplate).where(ROITemplate.slug == slug))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="ROITemplate not found")
    t.deleted_at = func.now()
    t.is_active = False
    t.updated_by = str(admin.id)
    await db.commit()
    _log(db, "roi_templates", t.id, "DELETE", old={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"detail": "ROITemplate deleted"}


# ===================================================================
# Consultation Requests (list / detail / update - no CRUD create/delete)
# ===================================================================

@router.get("/consultations")
async def admin_list_consultations(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(ConsultationRequest).order_by(ConsultationRequest.created_at.desc())
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": c.id, "company_name": c.company_name, "contact_name": c.contact_name,
            "email": c.email, "phone": c.phone, "industry": c.industry,
            "company_size": c.company_size, "project_goals": c.project_goals,
            "challenges": c.challenges, "budget_range": c.budget_range,
            "timeline": c.timeline, "meeting_preference": c.meeting_preference,
            "additional_info": c.additional_info, "status": c.status,
            "notes": c.notes, "assigned_to": c.assigned_to,
            "created_at": c.created_at.isoformat() if c.created_at else None,
            "updated_at": c.updated_at.isoformat() if c.updated_at else None,
        }
        for c in items
    ]


@router.get("/consultations/{record_id}")
async def admin_get_consultation(record_id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ConsultationRequest).where(ConsultationRequest.id == record_id))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="ConsultationRequest not found")
    return {
        "id": c.id, "company_name": c.company_name, "contact_name": c.contact_name,
        "email": c.email, "phone": c.phone, "industry": c.industry,
        "company_size": c.company_size, "project_goals": c.project_goals,
        "challenges": c.challenges, "budget_range": c.budget_range,
        "timeline": c.timeline, "meeting_preference": c.meeting_preference,
        "additional_info": c.additional_info, "status": c.status,
        "notes": c.notes, "assigned_to": c.assigned_to,
        "created_at": c.created_at.isoformat() if c.created_at else None,
        "updated_at": c.updated_at.isoformat() if c.updated_at else None,
    }


@router.put("/consultations/{record_id}")
async def admin_update_consultation(record_id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ConsultationRequest).where(ConsultationRequest.id == record_id))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="ConsultationRequest not found")
    old = {"status": c.status, "assigned_to": c.assigned_to, "notes": c.notes}
    for field in ("status", "notes", "assigned_to"):
        if field in data:
            setattr(c, field, data[field])
    await db.commit()
    _log(db, "consultation_requests", c.id, "UPDATE", old=old, new={"status": c.status, "assigned_to": c.assigned_to})
    await db.commit()
    return {"id": c.id, "status": c.status, "assigned_to": c.assigned_to}


@router.delete("/consultations/{record_id}")
async def admin_delete_consultation(record_id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ConsultationRequest).where(ConsultationRequest.id == record_id))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="ConsultationRequest not found")
    c.deleted_at = func.now()
    c.status = "archived"
    await db.commit()
    _log(db, "consultation_requests", c.id, "DELETE", old={"id": c.id, "company_name": c.company_name})
    await db.commit()
    return {"detail": "ConsultationRequest archived"}


# ===================================================================
# Architecture Models
# ===================================================================

@router.get("/architecture")
async def admin_list_architecture(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(ArchitectureModel).order_by(ArchitectureModel.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": m.id, "slug": m.slug, "title": m.title, "description": m.description,
            "solution_slug": m.solution_slug,
            "layers": _json_load(m.layers), "technologies": _json_load(m.technologies),
            "diagram_data": _json_load(m.diagram_data),
            "order": m.order, "is_active": m.is_active,
            "created_at": m.created_at.isoformat() if m.created_at else None,
            "updated_at": m.updated_at.isoformat() if m.updated_at else None,
        }
        for m in items
    ]


@router.get("/architecture/{slug}")
async def admin_get_architecture(slug: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ArchitectureModel).where(ArchitectureModel.slug == slug))
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="ArchitectureModel not found")
    return {
        "id": m.id, "slug": m.slug, "title": m.title, "description": m.description,
        "solution_slug": m.solution_slug,
        "layers": _json_load(m.layers), "technologies": _json_load(m.technologies),
        "diagram_data": _json_load(m.diagram_data),
        "order": m.order, "is_active": m.is_active,
        "created_at": m.created_at.isoformat() if m.created_at else None,
        "updated_at": m.updated_at.isoformat() if m.updated_at else None,
    }


@router.post("/architecture")
async def admin_create_architecture(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(ArchitectureModel).where(ArchitectureModel.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    m = ArchitectureModel(
        slug=data["slug"], title=data["title"], description=data.get("description"),
        solution_slug=data.get("solution_slug"),
        layers=json.dumps(data.get("layers", [])),
        technologies=json.dumps(data.get("technologies", [])),
        diagram_data=json.dumps(data.get("diagram_data", {})),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(m)
    await db.commit()
    await db.refresh(m)
    _log(db, "architecture_models", m.id, "CREATE", new={"slug": m.slug, "title": m.title})
    await db.commit()
    return {"id": m.id, "slug": m.slug, "title": m.title}


@router.put("/architecture/{slug}")
async def admin_update_architecture(slug: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ArchitectureModel).where(ArchitectureModel.slug == slug))
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="ArchitectureModel not found")
    old = {"slug": m.slug, "title": m.title, "is_active": m.is_active}
    for field in ("slug", "title", "description", "solution_slug", "order", "is_active"):
        if field in data:
            setattr(m, field, data[field])
    for jf in ("layers", "technologies", "diagram_data"):
        if jf in data:
            setattr(m, jf, json.dumps(data[jf]))
    m.updated_by = str(admin.id)
    await db.commit()
    _log(db, "architecture_models", m.id, "UPDATE", old=old, new={"slug": m.slug, "title": m.title})
    await db.commit()
    return {"id": m.id, "slug": m.slug, "title": m.title}


@router.delete("/architecture/{slug}")
async def admin_delete_architecture(slug: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ArchitectureModel).where(ArchitectureModel.slug == slug))
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="ArchitectureModel not found")
    m.deleted_at = func.now()
    m.is_active = False
    m.updated_by = str(admin.id)
    await db.commit()
    _log(db, "architecture_models", m.id, "DELETE", old={"slug": m.slug, "title": m.title})
    await db.commit()
    return {"detail": "ArchitectureModel deleted"}


# ===================================================================
# World Coverage
# ===================================================================

@router.get("/coverage")
async def admin_list_coverage(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(WorldCoverage).order_by(WorldCoverage.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": c.id, "country": c.country, "code": c.code, "region": c.region,
            "status": c.status, "delivery_center": c.delivery_center,
            "timezone": c.timezone, "languages": c.languages,
            "cloud_regions": c.cloud_regions, "support_available": c.support_available,
            "order": c.order, "is_active": c.is_active,
            "created_at": c.created_at.isoformat() if c.created_at else None,
            "updated_at": c.updated_at.isoformat() if c.updated_at else None,
        }
        for c in items
    ]


@router.get("/coverage/{record_id}")
async def admin_get_coverage(record_id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(WorldCoverage).where(WorldCoverage.id == record_id))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="WorldCoverage not found")
    return {
        "id": c.id, "country": c.country, "code": c.code, "region": c.region,
        "status": c.status, "delivery_center": c.delivery_center,
        "timezone": c.timezone, "languages": c.languages,
        "cloud_regions": c.cloud_regions, "support_available": c.support_available,
        "order": c.order, "is_active": c.is_active,
        "created_at": c.created_at.isoformat() if c.created_at else None,
        "updated_at": c.updated_at.isoformat() if c.updated_at else None,
    }


@router.post("/coverage")
async def admin_create_coverage(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    c = WorldCoverage(
        country=data["country"], code=data.get("code"), region=data.get("region"),
        status=data.get("status", "active"), delivery_center=data.get("delivery_center", False),
        timezone=data.get("timezone"), languages=data.get("languages"),
        cloud_regions=data.get("cloud_regions"), support_available=data.get("support_available", True),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(c)
    await db.commit()
    await db.refresh(c)
    _log(db, "world_coverage", c.id, "CREATE", new={"country": c.country, "code": c.code})
    await db.commit()
    return {"id": c.id, "country": c.country}


@router.put("/coverage/{record_id}")
async def admin_update_coverage(record_id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(WorldCoverage).where(WorldCoverage.id == record_id))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="WorldCoverage not found")
    old = {"country": c.country, "status": c.status, "is_active": c.is_active}
    for field in ("country", "code", "region", "status", "delivery_center", "timezone", "languages", "cloud_regions", "support_available", "order", "is_active"):
        if field in data:
            setattr(c, field, data[field])
    c.updated_by = str(admin.id)
    await db.commit()
    _log(db, "world_coverage", c.id, "UPDATE", old=old, new={"country": c.country})
    await db.commit()
    return {"id": c.id, "country": c.country}


@router.delete("/coverage/{record_id}")
async def admin_delete_coverage(record_id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(WorldCoverage).where(WorldCoverage.id == record_id))
    c = result.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="WorldCoverage not found")
    c.deleted_at = func.now()
    c.is_active = False
    c.updated_by = str(admin.id)
    await db.commit()
    _log(db, "world_coverage", c.id, "DELETE", old={"country": c.country})
    await db.commit()
    return {"detail": "WorldCoverage deleted"}


# ===================================================================
# Business Metrics
# ===================================================================

@router.get("/metrics")
async def admin_list_metrics(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(BusinessMetric).order_by(BusinessMetric.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": m.id, "slug": m.slug, "label": m.label, "value": m.value,
            "suffix": m.suffix, "prefix": m.prefix, "description": m.description,
            "category": m.category, "icon": m.icon, "source": m.source,
            "order": m.order, "is_active": m.is_active,
            "created_at": m.created_at.isoformat() if m.created_at else None,
            "updated_at": m.updated_at.isoformat() if m.updated_at else None,
        }
        for m in items
    ]


@router.get("/metrics/{slug}")
async def admin_get_metric(slug: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(BusinessMetric).where(BusinessMetric.slug == slug))
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="BusinessMetric not found")
    return {
        "id": m.id, "slug": m.slug, "label": m.label, "value": m.value,
        "suffix": m.suffix, "prefix": m.prefix, "description": m.description,
        "category": m.category, "icon": m.icon, "source": m.source,
        "order": m.order, "is_active": m.is_active,
        "created_at": m.created_at.isoformat() if m.created_at else None,
        "updated_at": m.updated_at.isoformat() if m.updated_at else None,
    }


@router.post("/metrics")
async def admin_create_metric(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(BusinessMetric).where(BusinessMetric.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    m = BusinessMetric(
        slug=data["slug"], label=data["label"], value=data["value"],
        suffix=data.get("suffix"), prefix=data.get("prefix"),
        description=data.get("description"), category=data.get("category"),
        icon=data.get("icon"), source=data.get("source"),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(m)
    await db.commit()
    await db.refresh(m)
    _log(db, "business_metrics", m.id, "CREATE", new={"slug": m.slug, "label": m.label})
    await db.commit()
    return {"id": m.id, "slug": m.slug, "label": m.label}


@router.put("/metrics/{slug}")
async def admin_update_metric(slug: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(BusinessMetric).where(BusinessMetric.slug == slug))
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="BusinessMetric not found")
    old = {"slug": m.slug, "label": m.label, "is_active": m.is_active}
    for field in ("slug", "label", "value", "suffix", "prefix", "description", "category", "icon", "source", "order", "is_active"):
        if field in data:
            setattr(m, field, data[field])
    m.updated_by = str(admin.id)
    await db.commit()
    _log(db, "business_metrics", m.id, "UPDATE", old=old, new={"slug": m.slug, "label": m.label})
    await db.commit()
    return {"id": m.id, "slug": m.slug, "label": m.label}


@router.delete("/metrics/{slug}")
async def admin_delete_metric(slug: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(BusinessMetric).where(BusinessMetric.slug == slug))
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="BusinessMetric not found")
    m.deleted_at = func.now()
    m.is_active = False
    m.updated_by = str(admin.id)
    await db.commit()
    _log(db, "business_metrics", m.id, "DELETE", old={"slug": m.slug, "label": m.label})
    await db.commit()
    return {"detail": "BusinessMetric deleted"}
