from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import CareerFAQ


class CareerFAQCreate(BaseModel):
    question: str
    answer: Optional[str] = None
    category: Optional[str] = None
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class CareerFAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/career-faqs", tags=["Career FAQs"])


def _faq_dict(f: CareerFAQ) -> dict:
    return {
        "id": f.id,
        "question": f.question,
        "answer": f.answer,
        "category": f.category,
        "is_active": f.is_active,
        "order": f.order,
        "created_at": f.created_at.isoformat() if f.created_at else None,
        "updated_at": f.updated_at.isoformat() if f.updated_at else None,
    }


@router.get("")
async def list_career_faqs(
    category: str = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [CareerFAQ.is_active == True, CareerFAQ.deleted_at.is_(None)]
    if category:
        conditions.append(CareerFAQ.category == category)

    count_result = await db.execute(
        select(func.count()).select_from(CareerFAQ).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(CareerFAQ)
        .where(and_(*conditions))
        .order_by(CareerFAQ.order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_faq_dict(f) for f in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.post("")
async def create_career_faq(payload: CareerFAQCreate, db: AsyncSession = Depends(get_db)):
    faq = CareerFAQ(
        question=payload.question,
        answer=payload.answer,
        category=payload.category,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(faq)
    await db.commit()
    await db.refresh(faq)
    return _faq_dict(faq)


@router.put("/{faq_id}")
async def update_career_faq(faq_id: str, payload: CareerFAQUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CareerFAQ).where(
            CareerFAQ.id == faq_id, CareerFAQ.deleted_at.is_(None)
        )
    )
    faq = result.scalar_one_or_none()
    if not faq:
        raise HTTPException(status_code=404, detail="Career FAQ not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(faq, field, value)

    await db.commit()
    await db.refresh(faq)
    return _faq_dict(faq)


@router.delete("/{faq_id}")
async def delete_career_faq(faq_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CareerFAQ).where(
            CareerFAQ.id == faq_id, CareerFAQ.deleted_at.is_(None)
        )
    )
    faq = result.scalar_one_or_none()
    if not faq:
        raise HTTPException(status_code=404, detail="Career FAQ not found")

    faq.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Career FAQ deleted"}
