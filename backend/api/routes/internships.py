from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import Internship


class InternshipCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    department_id: Optional[str] = None
    duration: Optional[str] = None
    requirements: Optional[str] = None
    mentorship_details: Optional[str] = None
    certificate_provided: Optional[bool] = True
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class InternshipUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    department_id: Optional[str] = None
    duration: Optional[str] = None
    requirements: Optional[str] = None
    mentorship_details: Optional[str] = None
    certificate_provided: Optional[bool] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/internships", tags=["Internships"])


def _internship_dict(i: Internship) -> dict:
    return {
        "id": i.id,
        "title": i.title,
        "slug": i.slug,
        "description": i.description,
        "department_id": i.department_id,
        "duration": i.duration,
        "requirements": i.requirements,
        "mentorship_details": i.mentorship_details,
        "certificate_provided": i.certificate_provided,
        "is_active": i.is_active,
        "order": i.order,
        "created_at": i.created_at.isoformat() if i.created_at else None,
        "updated_at": i.updated_at.isoformat() if i.updated_at else None,
    }


@router.get("")
async def list_internships(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [Internship.is_active == True, Internship.deleted_at.is_(None)]

    count_result = await db.execute(
        select(func.count()).select_from(Internship).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Internship)
        .where(and_(*conditions))
        .order_by(Internship.order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_internship_dict(i) for i in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/by-slug/{slug}")
async def get_internship_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Internship).where(
            Internship.slug == slug, Internship.deleted_at.is_(None)
        )
    )
    internship = result.scalar_one_or_none()
    if not internship:
        raise HTTPException(status_code=404, detail="Internship not found")
    return _internship_dict(internship)


@router.post("")
async def create_internship(payload: InternshipCreate, db: AsyncSession = Depends(get_db)):
    internship = Internship(
        title=payload.title,
        slug=payload.slug,
        description=payload.description,
        department_id=payload.department_id,
        duration=payload.duration,
        requirements=payload.requirements,
        mentorship_details=payload.mentorship_details,
        certificate_provided=payload.certificate_provided,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(internship)
    await db.commit()
    await db.refresh(internship)
    return _internship_dict(internship)


@router.put("/{internship_id}")
async def update_internship(internship_id: str, payload: InternshipUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Internship).where(
            Internship.id == internship_id, Internship.deleted_at.is_(None)
        )
    )
    internship = result.scalar_one_or_none()
    if not internship:
        raise HTTPException(status_code=404, detail="Internship not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(internship, field, value)

    await db.commit()
    await db.refresh(internship)
    return _internship_dict(internship)


@router.delete("/{internship_id}")
async def delete_internship(internship_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Internship).where(
            Internship.id == internship_id, Internship.deleted_at.is_(None)
        )
    )
    internship = result.scalar_one_or_none()
    if not internship:
        raise HTTPException(status_code=404, detail="Internship not found")

    internship.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Internship deleted"}
