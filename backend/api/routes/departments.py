from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import Department


class DepartmentCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    head_count: Optional[int] = 0
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    head_count: Optional[int] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/departments", tags=["Departments"])


def _department_dict(d: Department) -> dict:
    return {
        "id": d.id,
        "name": d.name,
        "slug": d.slug,
        "description": d.description,
        "icon": d.icon,
        "color": d.color,
        "head_count": d.head_count,
        "is_active": d.is_active,
        "order": d.order,
        "created_at": d.created_at.isoformat() if d.created_at else None,
        "updated_at": d.updated_at.isoformat() if d.updated_at else None,
    }


@router.get("")
async def list_departments(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [Department.is_active == True, Department.deleted_at.is_(None)]

    count_result = await db.execute(
        select(func.count()).select_from(Department).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Department)
        .where(and_(*conditions))
        .order_by(Department.order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_department_dict(d) for d in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/by-slug/{slug}")
async def get_department_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Department).where(
            Department.slug == slug, Department.deleted_at.is_(None)
        )
    )
    department = result.scalar_one_or_none()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    return _department_dict(department)


@router.post("")
async def create_department(payload: DepartmentCreate, db: AsyncSession = Depends(get_db)):
    department = Department(
        name=payload.name,
        slug=payload.slug,
        description=payload.description,
        icon=payload.icon,
        color=payload.color,
        head_count=payload.head_count,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(department)
    await db.commit()
    await db.refresh(department)
    return _department_dict(department)


@router.put("/{department_id}")
async def update_department(department_id: str, payload: DepartmentUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Department).where(
            Department.id == department_id, Department.deleted_at.is_(None)
        )
    )
    department = result.scalar_one_or_none()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(department, field, value)

    await db.commit()
    await db.refresh(department)
    return _department_dict(department)


@router.delete("/{department_id}")
async def delete_department(department_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Department).where(
            Department.id == department_id, Department.deleted_at.is_(None)
        )
    )
    department = result.scalar_one_or_none()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")

    department.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Department deleted"}
