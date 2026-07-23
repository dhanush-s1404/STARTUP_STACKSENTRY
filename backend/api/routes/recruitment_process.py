from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from database.config import get_db
from database.models import RecruitmentProcess


class RecruitmentProcessCreate(BaseModel):
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    step_number: Optional[int] = None
    estimated_duration: Optional[str] = None
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class RecruitmentProcessUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    step_number: Optional[int] = None
    estimated_duration: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/recruitment-process", tags=["Recruitment Process"])


def _process_dict(p: RecruitmentProcess) -> dict:
    return {
        "id": p.id,
        "title": p.title,
        "description": p.description,
        "icon": p.icon,
        "step_number": p.step_number,
        "estimated_duration": p.estimated_duration,
        "is_active": p.is_active,
        "order": p.order,
        "created_at": p.created_at.isoformat() if p.created_at else None,
        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
    }


@router.get("")
async def list_recruitment_process(db: AsyncSession = Depends(get_db)):
    conditions = [RecruitmentProcess.is_active == True, RecruitmentProcess.deleted_at.is_(None)]

    result = await db.execute(
        select(RecruitmentProcess)
        .where(and_(*conditions))
        .order_by(RecruitmentProcess.order)
    )
    steps = result.scalars().all()
    return [_process_dict(s) for s in steps]


@router.post("")
async def create_recruitment_process(payload: RecruitmentProcessCreate, db: AsyncSession = Depends(get_db)):
    process = RecruitmentProcess(
        title=payload.title,
        description=payload.description,
        icon=payload.icon,
        step_number=payload.step_number,
        estimated_duration=payload.estimated_duration,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(process)
    await db.commit()
    await db.refresh(process)
    return _process_dict(process)


@router.put("/{process_id}")
async def update_recruitment_process(process_id: str, payload: RecruitmentProcessUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(RecruitmentProcess).where(
            RecruitmentProcess.id == process_id, RecruitmentProcess.deleted_at.is_(None)
        )
    )
    process = result.scalar_one_or_none()
    if not process:
        raise HTTPException(status_code=404, detail="Recruitment process step not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(process, field, value)

    await db.commit()
    await db.refresh(process)
    return _process_dict(process)


@router.delete("/{process_id}")
async def delete_recruitment_process(process_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(RecruitmentProcess).where(
            RecruitmentProcess.id == process_id, RecruitmentProcess.deleted_at.is_(None)
        )
    )
    process = result.scalar_one_or_none()
    if not process:
        raise HTTPException(status_code=404, detail="Recruitment process step not found")

    process.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Recruitment process step deleted"}
