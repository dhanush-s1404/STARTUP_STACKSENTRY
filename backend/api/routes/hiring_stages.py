from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from database.config import get_db
from database.models import HiringStage


class HiringStageCreate(BaseModel):
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    estimated_duration: Optional[str] = None
    tips: Optional[str] = None
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class HiringStageUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    estimated_duration: Optional[str] = None
    tips: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/hiring-stages", tags=["Hiring Stages"])


def _stage_dict(s: HiringStage) -> dict:
    return {
        "id": s.id,
        "title": s.title,
        "description": s.description,
        "icon": s.icon,
        "estimated_duration": s.estimated_duration,
        "tips": s.tips,
        "is_active": s.is_active,
        "order": s.order,
        "created_at": s.created_at.isoformat() if s.created_at else None,
        "updated_at": s.updated_at.isoformat() if s.updated_at else None,
    }


@router.get("")
async def list_hiring_stages(db: AsyncSession = Depends(get_db)):
    conditions = [HiringStage.is_active == True, HiringStage.deleted_at.is_(None)]

    result = await db.execute(
        select(HiringStage)
        .where(and_(*conditions))
        .order_by(HiringStage.order)
    )
    stages = result.scalars().all()
    return [_stage_dict(s) for s in stages]


@router.post("")
async def create_hiring_stage(payload: HiringStageCreate, db: AsyncSession = Depends(get_db)):
    stage = HiringStage(
        title=payload.title,
        description=payload.description,
        icon=payload.icon,
        estimated_duration=payload.estimated_duration,
        tips=payload.tips,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(stage)
    await db.commit()
    await db.refresh(stage)
    return _stage_dict(stage)


@router.put("/{stage_id}")
async def update_hiring_stage(stage_id: str, payload: HiringStageUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(HiringStage).where(
            HiringStage.id == stage_id, HiringStage.deleted_at.is_(None)
        )
    )
    stage = result.scalar_one_or_none()
    if not stage:
        raise HTTPException(status_code=404, detail="Hiring stage not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(stage, field, value)

    await db.commit()
    await db.refresh(stage)
    return _stage_dict(stage)


@router.delete("/{stage_id}")
async def delete_hiring_stage(stage_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(HiringStage).where(
            HiringStage.id == stage_id, HiringStage.deleted_at.is_(None)
        )
    )
    stage = result.scalar_one_or_none()
    if not stage:
        raise HTTPException(status_code=404, detail="Hiring stage not found")

    stage.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Hiring stage deleted"}
