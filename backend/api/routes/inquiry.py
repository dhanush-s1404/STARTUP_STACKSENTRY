from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import ProjectInquiry, User
from api.deps import get_current_admin

router = APIRouter(prefix="/api/inquiry", tags=["Inquiry"])


class InquiryCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    industry: Optional[str] = None
    project_type: Optional[str] = None
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    requirements: Optional[str] = None
    preferred_contact: Optional[str] = None
    attachments: Optional[str] = None


def _inquiry_dict(i: ProjectInquiry) -> dict:
    return {
        "id": i.id,
        "name": i.name,
        "email": i.email,
        "company": i.company,
        "phone": i.phone,
        "industry": i.industry,
        "project_type": i.project_type,
        "budget_range": i.budget_range,
        "timeline": i.timeline,
        "requirements": i.requirements,
        "preferred_contact": i.preferred_contact,
        "attachments": i.attachments,
        "status": i.status,
        "notes": i.notes,
        "created_at": i.created_at.isoformat() if i.created_at else None,
        "updated_at": i.updated_at.isoformat() if i.updated_at else None,
    }


@router.post("")
async def create_inquiry(payload: InquiryCreate, db: AsyncSession = Depends(get_db)):
    inquiry = ProjectInquiry(
        name=payload.name,
        email=payload.email,
        company=payload.company,
        phone=payload.phone,
        industry=payload.industry,
        project_type=payload.project_type,
        budget_range=payload.budget_range,
        timeline=payload.timeline,
        requirements=payload.requirements,
        preferred_contact=payload.preferred_contact,
        attachments=payload.attachments,
    )
    db.add(inquiry)
    await db.commit()
    await db.refresh(inquiry)
    return _inquiry_dict(inquiry)


@router.get("")
async def list_inquiries(
    status: str = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    conditions = [ProjectInquiry.deleted_at.is_(None)]
    if status:
        conditions.append(ProjectInquiry.status == status)

    count_result = await db.execute(
        select(func.count()).select_from(ProjectInquiry).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(ProjectInquiry)
        .where(and_(*conditions))
        .order_by(ProjectInquiry.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_inquiry_dict(i) for i in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.put("/{inquiry_id}/status")
async def update_inquiry_status(
    inquiry_id: str,
    status: str = Query(...),
    notes: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    valid_statuses = {"new", "contacted", "qualified", "proposal", "closed"}
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(sorted(valid_statuses))}")

    result = await db.execute(
        select(ProjectInquiry).where(
            ProjectInquiry.id == inquiry_id, ProjectInquiry.deleted_at.is_(None)
        )
    )
    inquiry = result.scalar_one_or_none()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    inquiry.status = status
    if notes is not None:
        inquiry.notes = notes
    await db.commit()
    await db.refresh(inquiry)
    return _inquiry_dict(inquiry)


@router.get("/stats")
async def get_inquiry_stats(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    result = await db.execute(
        select(
            ProjectInquiry.status,
            func.count(ProjectInquiry.id),
        )
        .where(ProjectInquiry.deleted_at.is_(None))
        .group_by(ProjectInquiry.status)
    )
    rows = result.all()
    counts = {row[0]: row[1] for row in rows}

    total_result = await db.execute(
        select(func.count(ProjectInquiry.id)).where(ProjectInquiry.deleted_at.is_(None))
    )
    total = total_result.scalar()

    return {
        "total": total,
        "by_status": counts,
    }


@router.get("/{inquiry_id}")
async def get_inquiry(
    inquiry_id: str, db: AsyncSession = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    result = await db.execute(
        select(ProjectInquiry).where(
            ProjectInquiry.id == inquiry_id, ProjectInquiry.deleted_at.is_(None)
        )
    )
    inquiry = result.scalar_one_or_none()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return _inquiry_dict(inquiry)
