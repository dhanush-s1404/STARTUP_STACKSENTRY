import json
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_, and_
from database.config import get_db
from database.models import (
    ProjectDiscovery, MeetingRequest, FAQ, BudgetRange,
    TechnologyRecommendation, AuditLog,
)

router = APIRouter(prefix="/api/admin/consultation", tags=["Admin Consultation"])


async def get_current_admin():
    return {"id": "admin", "name": "Administrator"}


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
# ProjectDiscovery — Admin CRUD
# ===================================================================

@router.get("/project-discoveries")
async def admin_list_project_discoveries(
    search: str = Query(None),
    status: str = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    conditions = [ProjectDiscovery.deleted_at.is_(None)]
    if search:
        conditions.append(or_(
            ProjectDiscovery.company.ilike(f"%{search}%"),
            ProjectDiscovery.contact_name.ilike(f"%{search}%"),
            ProjectDiscovery.contact_email.ilike(f"%{search}%"),
        ))
    if status:
        conditions.append(ProjectDiscovery.status == status)

    count_result = await db.execute(
        select(func.count()).select_from(ProjectDiscovery).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(ProjectDiscovery)
        .where(and_(*conditions))
        .order_by(ProjectDiscovery.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [
            {
                "id": d.id, "company": d.company, "industry": d.industry,
                "team_size": d.team_size, "country": d.country, "website": d.website,
                "project_type": d.project_type,
                "business_goals": _json_load(d.business_goals),
                "desired_features": _json_load(d.desired_features),
                "preferred_technologies": _json_load(d.preferred_technologies),
                "project_timeline": d.project_timeline, "budget_range": d.budget_range,
                "additional_requirements": d.additional_requirements,
                "contact_name": d.contact_name, "contact_email": d.contact_email,
                "contact_phone": d.contact_phone, "status": d.status,
                "admin_notes": d.admin_notes, "assigned_to": d.assigned_to,
                "created_at": d.created_at.isoformat() if d.created_at else None,
                "updated_at": d.updated_at.isoformat() if d.updated_at else None,
            }
            for d in items
        ],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/project-discoveries/{record_id}")
async def admin_get_project_discovery(
    record_id: str,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    result = await db.execute(select(ProjectDiscovery).where(ProjectDiscovery.id == record_id))
    d = result.scalar_one_or_none()
    if not d:
        raise HTTPException(status_code=404, detail="ProjectDiscovery not found")
    return {
        "id": d.id, "company": d.company, "industry": d.industry,
        "team_size": d.team_size, "country": d.country, "website": d.website,
        "project_type": d.project_type,
        "business_goals": _json_load(d.business_goals),
        "desired_features": _json_load(d.desired_features),
        "preferred_technologies": _json_load(d.preferred_technologies),
        "project_timeline": d.project_timeline, "budget_range": d.budget_range,
        "additional_requirements": d.additional_requirements,
        "contact_name": d.contact_name, "contact_email": d.contact_email,
        "contact_phone": d.contact_phone, "status": d.status,
        "admin_notes": d.admin_notes, "assigned_to": d.assigned_to,
        "created_at": d.created_at.isoformat() if d.created_at else None,
        "updated_at": d.updated_at.isoformat() if d.updated_at else None,
    }


@router.patch("/project-discoveries/{record_id}")
async def admin_update_project_discovery(
    record_id: str,
    data: dict,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    result = await db.execute(select(ProjectDiscovery).where(ProjectDiscovery.id == record_id))
    d = result.scalar_one_or_none()
    if not d:
        raise HTTPException(status_code=404, detail="ProjectDiscovery not found")
    old = {"status": d.status, "admin_notes": d.admin_notes, "assigned_to": d.assigned_to}
    for field in ("status", "admin_notes", "assigned_to"):
        if field in data:
            setattr(d, field, data[field])
    d.updated_at = func.now()
    await db.commit()
    _log(db, "project_discoveries", d.id, "UPDATE", old=old,
         new={"status": d.status, "admin_notes": d.admin_notes, "assigned_to": d.assigned_to})
    await db.commit()
    return {"id": d.id, "status": d.status, "admin_notes": d.admin_notes, "assigned_to": d.assigned_to}


# ===================================================================
# MeetingRequest — Admin CRUD
# ===================================================================

@router.get("/meeting-requests")
async def admin_list_meeting_requests(
    search: str = Query(None),
    status: str = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    conditions = [MeetingRequest.deleted_at.is_(None)]
    if search:
        conditions.append(or_(
            MeetingRequest.name.ilike(f"%{search}%"),
            MeetingRequest.email.ilike(f"%{search}%"),
            MeetingRequest.company.ilike(f"%{search}%"),
        ))
    if status:
        conditions.append(MeetingRequest.status == status)

    count_result = await db.execute(
        select(func.count()).select_from(MeetingRequest).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(MeetingRequest)
        .where(and_(*conditions))
        .order_by(MeetingRequest.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [
            {
                "id": m.id, "name": m.name, "email": m.email, "phone": m.phone,
                "company": m.company, "preferred_date": str(m.preferred_date) if m.preferred_date else None,
                "preferred_time": m.preferred_time, "timezone": m.timezone,
                "meeting_type": m.meeting_type, "notes": m.notes,
                "status": m.status, "admin_notes": m.admin_notes,
                "created_at": m.created_at.isoformat() if m.created_at else None,
                "updated_at": m.updated_at.isoformat() if m.updated_at else None,
            }
            for m in items
        ],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/meeting-requests/{record_id}")
async def admin_get_meeting_request(
    record_id: str,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    result = await db.execute(select(MeetingRequest).where(MeetingRequest.id == record_id))
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="MeetingRequest not found")
    return {
        "id": m.id, "name": m.name, "email": m.email, "phone": m.phone,
        "company": m.company, "preferred_date": str(m.preferred_date) if m.preferred_date else None,
        "preferred_time": m.preferred_time, "timezone": m.timezone,
        "meeting_type": m.meeting_type, "notes": m.notes,
        "status": m.status, "admin_notes": m.admin_notes,
        "created_at": m.created_at.isoformat() if m.created_at else None,
        "updated_at": m.updated_at.isoformat() if m.updated_at else None,
    }


@router.patch("/meeting-requests/{record_id}")
async def admin_update_meeting_request(
    record_id: str,
    data: dict,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    result = await db.execute(select(MeetingRequest).where(MeetingRequest.id == record_id))
    m = result.scalar_one_or_none()
    if not m:
        raise HTTPException(status_code=404, detail="MeetingRequest not found")
    old = {"status": m.status, "admin_notes": m.admin_notes}
    for field in ("status", "admin_notes"):
        if field in data:
            setattr(m, field, data[field])
    m.updated_at = func.now()
    await db.commit()
    _log(db, "meeting_requests", m.id, "UPDATE", old=old,
         new={"status": m.status, "admin_notes": m.admin_notes})
    await db.commit()
    return {"id": m.id, "status": m.status, "admin_notes": m.admin_notes}


# ===================================================================
# FAQ — Admin CRUD
# ===================================================================

@router.get("/faqs")
async def admin_list_faqs(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(FAQ).where(FAQ.deleted_at.is_(None)).order_by(FAQ.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": f.id, "question": f.question, "answer": f.answer,
            "category": f.category, "tags": _json_load(f.tags),
            "order": f.order, "is_active": f.is_active,
            "created_at": f.created_at.isoformat() if f.created_at else None,
            "updated_at": f.updated_at.isoformat() if f.updated_at else None,
        }
        for f in items
    ]


@router.post("/faqs")
async def admin_create_faq(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    faq = FAQ(
        question=data["question"],
        answer=data["answer"],
        category=data.get("category"),
        tags=json.dumps(data.get("tags", [])),
        order=data.get("order", 0),
        is_active=data.get("is_active", True),
        created_by=admin["id"],
    )
    db.add(faq)
    await db.commit()
    await db.refresh(faq)
    _log(db, "faqs", faq.id, "CREATE", new={"question": faq.question})
    await db.commit()
    return {"id": faq.id, "question": faq.question}


@router.get("/faqs/{record_id}")
async def admin_get_faq(record_id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(FAQ).where(FAQ.id == record_id))
    f = result.scalar_one_or_none()
    if not f:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {
        "id": f.id, "question": f.question, "answer": f.answer,
        "category": f.category, "tags": _json_load(f.tags),
        "order": f.order, "is_active": f.is_active,
        "created_at": f.created_at.isoformat() if f.created_at else None,
        "updated_at": f.updated_at.isoformat() if f.updated_at else None,
    }


@router.put("/faqs/{record_id}")
async def admin_update_faq(record_id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(FAQ).where(FAQ.id == record_id))
    f = result.scalar_one_or_none()
    if not f:
        raise HTTPException(status_code=404, detail="FAQ not found")
    old = {"question": f.question, "answer": f.answer, "is_active": f.is_active}
    for field in ("question", "answer", "category", "order", "is_active"):
        if field in data:
            setattr(f, field, data[field])
    if "tags" in data:
        f.tags = json.dumps(data["tags"])
    f.updated_by = admin["id"]
    await db.commit()
    _log(db, "faqs", f.id, "UPDATE", old=old, new={"question": f.question, "answer": f.answer})
    await db.commit()
    return {"id": f.id, "question": f.question}


@router.delete("/faqs/{record_id}")
async def admin_delete_faq(record_id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(FAQ).where(FAQ.id == record_id))
    f = result.scalar_one_or_none()
    if not f:
        raise HTTPException(status_code=404, detail="FAQ not found")
    f.deleted_at = func.now()
    f.is_active = False
    f.updated_by = admin["id"]
    await db.commit()
    _log(db, "faqs", f.id, "DELETE", old={"question": f.question})
    await db.commit()
    return {"detail": "FAQ deleted"}


# ===================================================================
# BudgetRange — Admin CRUD
# ===================================================================

@router.get("/budget-ranges")
async def admin_list_budget_ranges(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(BudgetRange).where(BudgetRange.deleted_at.is_(None)).order_by(BudgetRange.display_order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": b.id, "label": b.label, "min_amount": b.min_amount,
            "max_amount": b.max_amount, "display_order": b.display_order,
            "is_active": b.is_active,
            "created_at": b.created_at.isoformat() if b.created_at else None,
            "updated_at": b.updated_at.isoformat() if b.updated_at else None,
        }
        for b in items
    ]


@router.post("/budget-ranges")
async def admin_create_budget_range(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    br = BudgetRange(
        label=data["label"],
        min_amount=data.get("min_amount"),
        max_amount=data.get("max_amount"),
        display_order=data.get("display_order", 0),
        is_active=data.get("is_active", True),
        created_by=admin["id"],
    )
    db.add(br)
    await db.commit()
    await db.refresh(br)
    _log(db, "budget_ranges", br.id, "CREATE", new={"label": br.label})
    await db.commit()
    return {"id": br.id, "label": br.label}


@router.put("/budget-ranges/{record_id}")
async def admin_update_budget_range(record_id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(BudgetRange).where(BudgetRange.id == record_id))
    br = result.scalar_one_or_none()
    if not br:
        raise HTTPException(status_code=404, detail="BudgetRange not found")
    old = {"label": br.label, "is_active": br.is_active}
    for field in ("label", "min_amount", "max_amount", "display_order", "is_active"):
        if field in data:
            setattr(br, field, data[field])
    br.updated_by = admin["id"]
    await db.commit()
    _log(db, "budget_ranges", br.id, "UPDATE", old=old, new={"label": br.label})
    await db.commit()
    return {"id": br.id, "label": br.label}


@router.delete("/budget-ranges/{record_id}")
async def admin_delete_budget_range(record_id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(BudgetRange).where(BudgetRange.id == record_id))
    br = result.scalar_one_or_none()
    if not br:
        raise HTTPException(status_code=404, detail="BudgetRange not found")
    br.deleted_at = func.now()
    br.is_active = False
    br.updated_by = admin["id"]
    await db.commit()
    _log(db, "budget_ranges", br.id, "DELETE", old={"label": br.label})
    await db.commit()
    return {"detail": "BudgetRange deleted"}


# ===================================================================
# TechnologyRecommendation — Admin CRUD
# ===================================================================

@router.get("/tech-recommendations")
async def admin_list_tech_recommendations(
    project_type: str = Query(None),
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    stmt = select(TechnologyRecommendation).where(TechnologyRecommendation.deleted_at.is_(None))
    if project_type:
        stmt = stmt.where(TechnologyRecommendation.project_type == project_type)
    stmt = stmt.order_by(TechnologyRecommendation.priority)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": t.id, "project_type": t.project_type, "category": t.category,
            "technology": t.technology, "priority": t.priority, "notes": t.notes,
            "is_active": t.is_active,
            "created_at": t.created_at.isoformat() if t.created_at else None,
            "updated_at": t.updated_at.isoformat() if t.updated_at else None,
        }
        for t in items
    ]


@router.post("/tech-recommendations")
async def admin_create_tech_recommendation(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    tr = TechnologyRecommendation(
        project_type=data["project_type"],
        category=data["category"],
        technology=data["technology"],
        priority=data.get("priority", 0),
        notes=data.get("notes"),
        is_active=data.get("is_active", True),
        created_by=admin["id"],
    )
    db.add(tr)
    await db.commit()
    await db.refresh(tr)
    _log(db, "technology_recommendations", tr.id, "CREATE",
         new={"project_type": tr.project_type, "technology": tr.technology})
    await db.commit()
    return {"id": tr.id, "project_type": tr.project_type, "technology": tr.technology}


@router.put("/tech-recommendations/{record_id}")
async def admin_update_tech_recommendation(record_id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(TechnologyRecommendation).where(TechnologyRecommendation.id == record_id))
    tr = result.scalar_one_or_none()
    if not tr:
        raise HTTPException(status_code=404, detail="TechnologyRecommendation not found")
    old = {"project_type": tr.project_type, "technology": tr.technology, "is_active": tr.is_active}
    for field in ("project_type", "category", "technology", "priority", "notes", "is_active"):
        if field in data:
            setattr(tr, field, data[field])
    tr.updated_by = admin["id"]
    await db.commit()
    _log(db, "technology_recommendations", tr.id, "UPDATE", old=old,
         new={"project_type": tr.project_type, "technology": tr.technology})
    await db.commit()
    return {"id": tr.id, "project_type": tr.project_type, "technology": tr.technology}


@router.delete("/tech-recommendations/{record_id}")
async def admin_delete_tech_recommendation(record_id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(TechnologyRecommendation).where(TechnologyRecommendation.id == record_id))
    tr = result.scalar_one_or_none()
    if not tr:
        raise HTTPException(status_code=404, detail="TechnologyRecommendation not found")
    tr.deleted_at = func.now()
    tr.is_active = False
    tr.updated_by = admin["id"]
    await db.commit()
    _log(db, "technology_recommendations", tr.id, "DELETE",
         new={"project_type": tr.project_type, "technology": tr.technology})
    await db.commit()
    return {"detail": "TechnologyRecommendation deleted"}
