from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import LifeAtStackSentry


class LifeAtStackSentryCreate(BaseModel):
    section: str
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    items: Optional[str] = None
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class LifeAtStackSentryUpdate(BaseModel):
    section: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    items: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/life-at-stacksentry", tags=["Life At StackSentry"])


def _life_dict(l: LifeAtStackSentry) -> dict:
    return {
        "id": l.id,
        "section": l.section,
        "title": l.title,
        "description": l.description,
        "image_url": l.image_url,
        "items": l.items,
        "is_active": l.is_active,
        "order": l.order,
        "created_at": l.created_at.isoformat() if l.created_at else None,
        "updated_at": l.updated_at.isoformat() if l.updated_at else None,
    }


@router.get("")
async def list_life_at_stacksentry(
    section: str = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [LifeAtStackSentry.is_active == True, LifeAtStackSentry.deleted_at.is_(None)]
    if section:
        conditions.append(LifeAtStackSentry.section == section)

    count_result = await db.execute(
        select(func.count()).select_from(LifeAtStackSentry).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(LifeAtStackSentry)
        .where(and_(*conditions))
        .order_by(LifeAtStackSentry.order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_life_dict(item) for item in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.post("")
async def create_life_at_stacksentry(payload: LifeAtStackSentryCreate, db: AsyncSession = Depends(get_db)):
    item = LifeAtStackSentry(
        section=payload.section,
        title=payload.title,
        description=payload.description,
        image_url=payload.image_url,
        items=payload.items,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return _life_dict(item)


@router.put("/{item_id}")
async def update_life_at_stacksentry(item_id: str, payload: LifeAtStackSentryUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(LifeAtStackSentry).where(
            LifeAtStackSentry.id == item_id, LifeAtStackSentry.deleted_at.is_(None)
        )
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Life at StackSentry item not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)

    await db.commit()
    await db.refresh(item)
    return _life_dict(item)


@router.delete("/{item_id}")
async def delete_life_at_stacksentry(item_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(LifeAtStackSentry).where(
            LifeAtStackSentry.id == item_id, LifeAtStackSentry.deleted_at.is_(None)
        )
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Life at StackSentry item not found")

    item.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Life at StackSentry item deleted"}
