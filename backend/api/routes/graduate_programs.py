from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import GraduateProgram


class GraduateProgramCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    duration: Optional[str] = None
    roadmap_items: Optional[str] = None
    requirements: Optional[str] = None
    benefits: Optional[str] = None
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class GraduateProgramUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    roadmap_items: Optional[str] = None
    requirements: Optional[str] = None
    benefits: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/graduate-programs", tags=["Graduate Programs"])


def _program_dict(p: GraduateProgram) -> dict:
    return {
        "id": p.id,
        "title": p.title,
        "slug": p.slug,
        "description": p.description,
        "duration": p.duration,
        "roadmap_items": p.roadmap_items,
        "requirements": p.requirements,
        "benefits": p.benefits,
        "is_active": p.is_active,
        "order": p.order,
        "created_at": p.created_at.isoformat() if p.created_at else None,
        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
    }


@router.get("")
async def list_graduate_programs(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [GraduateProgram.is_active == True, GraduateProgram.deleted_at.is_(None)]

    count_result = await db.execute(
        select(func.count()).select_from(GraduateProgram).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(GraduateProgram)
        .where(and_(*conditions))
        .order_by(GraduateProgram.order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_program_dict(p) for p in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/by-slug/{slug}")
async def get_graduate_program_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(GraduateProgram).where(
            GraduateProgram.slug == slug, GraduateProgram.deleted_at.is_(None)
        )
    )
    program = result.scalar_one_or_none()
    if not program:
        raise HTTPException(status_code=404, detail="Graduate program not found")
    return _program_dict(program)


@router.post("")
async def create_graduate_program(payload: GraduateProgramCreate, db: AsyncSession = Depends(get_db)):
    program = GraduateProgram(
        title=payload.title,
        slug=payload.slug,
        description=payload.description,
        duration=payload.duration,
        roadmap_items=payload.roadmap_items,
        requirements=payload.requirements,
        benefits=payload.benefits,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(program)
    await db.commit()
    await db.refresh(program)
    return _program_dict(program)


@router.put("/{program_id}")
async def update_graduate_program(program_id: str, payload: GraduateProgramUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(GraduateProgram).where(
            GraduateProgram.id == program_id, GraduateProgram.deleted_at.is_(None)
        )
    )
    program = result.scalar_one_or_none()
    if not program:
        raise HTTPException(status_code=404, detail="Graduate program not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(program, field, value)

    await db.commit()
    await db.refresh(program)
    return _program_dict(program)


@router.delete("/{program_id}")
async def delete_graduate_program(program_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(GraduateProgram).where(
            GraduateProgram.id == program_id, GraduateProgram.deleted_at.is_(None)
        )
    )
    program = result.scalar_one_or_none()
    if not program:
        raise HTTPException(status_code=404, detail="Graduate program not found")

    program.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Graduate program deleted"}
