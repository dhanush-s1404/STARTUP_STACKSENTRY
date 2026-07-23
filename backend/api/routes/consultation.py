import json
from fastapi import APIRouter, Depends, Query, Request
from pydantic import BaseModel
from typing import Optional, List, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from slowapi import Limiter
from slowapi.util import get_remote_address
from database.config import get_db
from database.models import (
    ProjectDiscovery, MeetingRequest, FAQ, BudgetRange,
    TechnologyRecommendation, AuditLog,
)
from api.utils import escape_like

router = APIRouter(prefix="/api/consultation", tags=["Consultation"])
limiter = Limiter(key_func=get_remote_address)


def _json_load(val):
    if not val:
        return []
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return []


def _log(db, table, record_id, action, old=None, new=None, admin_id="system"):
    db.add(AuditLog(
        table_name=table,
        record_id=str(record_id),
        action=action,
        old_values=json.dumps(old) if old else None,
        new_values=json.dumps(new) if new else None,
        changed_by=admin_id,
    ))


# ===================================================================
# Pydantic Schemas
# ===================================================================

class ProjectDiscoveryCreate(BaseModel):
    company: Optional[str] = None
    industry: Optional[str] = None
    team_size: Optional[str] = None
    country: Optional[str] = None
    website: Optional[str] = None
    project_type: Optional[str] = None
    business_goals: Optional[List[str]] = None
    desired_features: Optional[List[str]] = None
    preferred_technologies: Optional[Dict] = None
    project_timeline: Optional[str] = None
    budget_range: Optional[str] = None
    additional_requirements: Optional[str] = None
    contact_name: str
    contact_email: str
    contact_phone: Optional[str] = None


class MeetingRequestCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    timezone: Optional[str] = None
    meeting_type: Optional[str] = "video"
    notes: Optional[str] = None


# ===================================================================
# POST /api/consultation/project-discovery
# ===================================================================

@router.post("/project-discovery")
@limiter.limit("5/minute")
async def create_project_discovery(request: Request, payload: ProjectDiscoveryCreate, db: AsyncSession = Depends(get_db)):
    discovery = ProjectDiscovery(
        company=payload.company,
        industry=payload.industry,
        team_size=payload.team_size,
        country=payload.country,
        website=payload.website,
        project_type=payload.project_type,
        business_goals=json.dumps(payload.business_goals) if payload.business_goals else None,
        desired_features=json.dumps(payload.desired_features) if payload.desired_features else None,
        preferred_technologies=json.dumps(payload.preferred_technologies) if payload.preferred_technologies else None,
        project_timeline=payload.project_timeline,
        budget_range=payload.budget_range,
        additional_requirements=payload.additional_requirements,
        contact_name=payload.contact_name,
        contact_email=payload.contact_email,
        contact_phone=payload.contact_phone,
        status="submitted",
    )
    db.add(discovery)
    await db.flush()
    _log(db, "project_discoveries", discovery.id, "CREATE",
         new={"contact_name": discovery.contact_name, "contact_email": discovery.contact_email})
    await db.commit()
    await db.refresh(discovery)
    return {"id": discovery.id, "message": "Project discovery submitted successfully"}


# ===================================================================
# POST /api/consultation/meeting-request
# ===================================================================

@router.post("/meeting-request")
@limiter.limit("5/minute")
async def create_meeting_request(request: Request, payload: MeetingRequestCreate, db: AsyncSession = Depends(get_db)):
    meeting = MeetingRequest(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        company=payload.company,
        preferred_date=payload.preferred_date,
        preferred_time=payload.preferred_time,
        timezone=payload.timezone,
        meeting_type=payload.meeting_type,
        notes=payload.notes,
        status="pending",
    )
    db.add(meeting)
    await db.flush()
    _log(db, "meeting_requests", meeting.id, "CREATE",
         new={"name": meeting.name, "email": meeting.email})
    await db.commit()
    await db.refresh(meeting)
    return {"id": meeting.id, "message": "Meeting request submitted successfully"}


# ===================================================================
# GET /api/consultation/faqs
# ===================================================================

@router.get("/faqs")
async def list_faqs(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(FAQ).where(FAQ.is_active == True, FAQ.deleted_at.is_(None))
    if search:
        stmt = stmt.where(or_(
            FAQ.question.ilike(f"%{escape_like(search)}%", escape="\\"),
            FAQ.answer.ilike(f"%{escape_like(search)}%", escape="\\"),
        ))
    if category:
        stmt = stmt.where(FAQ.category == category)
    stmt = stmt.order_by(FAQ.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": f.id, "question": f.question, "answer": f.answer,
            "category": f.category, "tags": _json_load(f.tags),
            "order": f.order,
            "created_at": f.created_at.isoformat() if f.created_at else None,
            "updated_at": f.updated_at.isoformat() if f.updated_at else None,
        }
        for f in items
    ]


# ===================================================================
# GET /api/consultation/budget-ranges
# ===================================================================

@router.get("/budget-ranges")
async def list_budget_ranges(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(BudgetRange)
        .where(BudgetRange.is_active == True, BudgetRange.deleted_at.is_(None))
        .order_by(BudgetRange.display_order)
    )
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": b.id, "label": b.label, "min_amount": b.min_amount,
            "max_amount": b.max_amount, "display_order": b.display_order,
            "created_at": b.created_at.isoformat() if b.created_at else None,
            "updated_at": b.updated_at.isoformat() if b.updated_at else None,
        }
        for b in items
    ]


# ===================================================================
# GET /api/consultation/tech-recommendations
# ===================================================================

@router.get("/tech-recommendations")
async def list_tech_recommendations(
    project_type: str = Query(...),
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(TechnologyRecommendation).where(
        TechnologyRecommendation.project_type == project_type,
        TechnologyRecommendation.is_active == True,
        TechnologyRecommendation.deleted_at.is_(None),
    )
    if category:
        stmt = stmt.where(TechnologyRecommendation.category == category)
    stmt = stmt.order_by(TechnologyRecommendation.priority)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": t.id, "project_type": t.project_type, "category": t.category,
            "technology": t.technology, "priority": t.priority, "notes": t.notes,
            "created_at": t.created_at.isoformat() if t.created_at else None,
            "updated_at": t.updated_at.isoformat() if t.updated_at else None,
        }
        for t in items
    ]
