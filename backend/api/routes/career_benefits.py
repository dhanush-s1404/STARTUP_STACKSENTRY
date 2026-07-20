from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import CareerBenefit


class CareerBenefitCreate(BaseModel):
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    category: Optional[str] = None
    features: Optional[str] = None
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class CareerBenefitUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    category: Optional[str] = None
    features: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/career-benefits", tags=["Career Benefits"])


def _benefit_dict(b: CareerBenefit) -> dict:
    return {
        "id": b.id,
        "title": b.title,
        "description": b.description,
        "icon": b.icon,
        "category": b.category,
        "features": b.features,
        "is_active": b.is_active,
        "order": b.order,
        "created_at": b.created_at.isoformat() if b.created_at else None,
        "updated_at": b.updated_at.isoformat() if b.updated_at else None,
    }


@router.get("")
async def list_career_benefits(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [CareerBenefit.is_active == True, CareerBenefit.deleted_at.is_(None)]

    count_result = await db.execute(
        select(func.count()).select_from(CareerBenefit).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(CareerBenefit)
        .where(and_(*conditions))
        .order_by(CareerBenefit.order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_benefit_dict(b) for b in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.post("")
async def create_career_benefit(payload: CareerBenefitCreate, db: AsyncSession = Depends(get_db)):
    benefit = CareerBenefit(
        title=payload.title,
        description=payload.description,
        icon=payload.icon,
        category=payload.category,
        features=payload.features,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(benefit)
    await db.commit()
    await db.refresh(benefit)
    return _benefit_dict(benefit)


@router.put("/{benefit_id}")
async def update_career_benefit(benefit_id: str, payload: CareerBenefitUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CareerBenefit).where(
            CareerBenefit.id == benefit_id, CareerBenefit.deleted_at.is_(None)
        )
    )
    benefit = result.scalar_one_or_none()
    if not benefit:
        raise HTTPException(status_code=404, detail="Career benefit not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(benefit, field, value)

    await db.commit()
    await db.refresh(benefit)
    return _benefit_dict(benefit)


@router.delete("/{benefit_id}")
async def delete_career_benefit(benefit_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CareerBenefit).where(
            CareerBenefit.id == benefit_id, CareerBenefit.deleted_at.is_(None)
        )
    )
    benefit = result.scalar_one_or_none()
    if not benefit:
        raise HTTPException(status_code=404, detail="Career benefit not found")

    benefit.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Career benefit deleted"}
