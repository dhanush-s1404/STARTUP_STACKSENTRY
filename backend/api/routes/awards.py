from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import Award


class AwardCreate(BaseModel):
    title: str
    description: Optional[str] = None
    issuer: Optional[str] = None
    category: Optional[str] = None
    year: Optional[int] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None


class AwardUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    issuer: Optional[str] = None
    category: Optional[str] = None
    year: Optional[int] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None

router = APIRouter(prefix="/api/awards", tags=["Awards"])


def _award_dict(a: Award) -> dict:
    return {
        "id": a.id,
        "title": a.title,
        "description": a.description,
        "issuer": a.issuer,
        "category": a.category,
        "year": a.year,
        "image_url": a.image_url,
        "link_url": a.link_url,
        "sort_order": a.sort_order,
        "created_at": a.created_at.isoformat() if a.created_at else None,
    }


@router.post("")
async def create_award(payload: AwardCreate, db: AsyncSession = Depends(get_db)):
    award = Award(
        title=payload.title,
        description=payload.description,
        issuer=payload.issuer,
        category=payload.category,
        year=payload.year,
        image_url=payload.image_url,
        link_url=payload.link_url,
    )
    db.add(award)
    await db.commit()
    await db.refresh(award)
    return _award_dict(award)


@router.put("/{award_id}")
async def update_award(award_id: str, payload: AwardUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Award).where(Award.id == award_id, Award.deleted_at.is_(None))
    )
    award = result.scalar_one_or_none()
    if not award:
        raise HTTPException(status_code=404, detail="Award not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(award, field, value)

    await db.commit()
    await db.refresh(award)
    return _award_dict(award)


@router.delete("/{award_id}")
async def delete_award(award_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Award).where(Award.id == award_id, Award.deleted_at.is_(None))
    )
    award = result.scalar_one_or_none()
    if not award:
        raise HTTPException(status_code=404, detail="Award not found")

    from datetime import datetime, timezone
    award.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Award deleted"}


@router.get("")
async def list_awards(
    category: str = Query(None),
    year: int = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [Award.is_active == True, Award.deleted_at.is_(None)]
    if category:
        conditions.append(Award.category == category)
    if year:
        conditions.append(Award.year == year)

    count_result = await db.execute(
        select(func.count()).select_from(Award).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Award)
        .where(and_(*conditions))
        .order_by(Award.sort_order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_award_dict(a) for a in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/{award_id}")
async def get_award(award_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Award).where(Award.id == award_id, Award.deleted_at.is_(None))
    )
    award = result.scalar_one_or_none()
    if not award:
        raise HTTPException(status_code=404, detail="Award not found")
    return _award_dict(award)
