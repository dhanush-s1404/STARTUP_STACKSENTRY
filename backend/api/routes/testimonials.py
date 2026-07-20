from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import ProjectTestimonial


class TestimonialCreate(BaseModel):
    project_id: Optional[str] = None
    client_name: str
    client_role: Optional[str] = None
    client_company: Optional[str] = None
    client_avatar_url: Optional[str] = None
    content: str
    rating: Optional[int] = None
    video_url: Optional[str] = None
    industry: Optional[str] = None
    is_featured: bool = False

router = APIRouter(prefix="/api/testimonials", tags=["Testimonials"])


def _t_dict(t: ProjectTestimonial) -> dict:
    return {
        "id": t.id,
        "project_id": t.project_id,
        "client_name": t.client_name,
        "client_role": t.client_role,
        "client_company": t.client_company,
        "client_avatar_url": t.client_avatar_url,
        "content": t.content,
        "rating": t.rating,
        "video_url": t.video_url,
        "industry": t.industry,
        "is_featured": t.is_featured,
        "sort_order": t.sort_order,
        "created_at": t.created_at.isoformat() if t.created_at else None,
    }


@router.post("")
async def create_testimonial(payload: TestimonialCreate, db: AsyncSession = Depends(get_db)):
    testimonial = ProjectTestimonial(
        project_id=payload.project_id,
        client_name=payload.client_name,
        client_role=payload.client_role,
        client_company=payload.client_company,
        client_avatar_url=payload.client_avatar_url,
        content=payload.content,
        rating=payload.rating,
        video_url=payload.video_url,
        industry=payload.industry,
        is_featured=payload.is_featured,
    )
    db.add(testimonial)
    await db.commit()
    await db.refresh(testimonial)
    return _t_dict(testimonial)


@router.get("/featured")
async def get_featured_testimonials(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ProjectTestimonial)
        .where(
            ProjectTestimonial.is_featured == True,
            ProjectTestimonial.is_active == True,
            ProjectTestimonial.deleted_at.is_(None),
        )
        .order_by(ProjectTestimonial.sort_order)
        .limit(10)
    )
    return [_t_dict(t) for t in result.scalars().all()]


@router.get("")
async def list_testimonials(
    industry: str = Query(None),
    project_id: str = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [
        ProjectTestimonial.is_active == True,
        ProjectTestimonial.deleted_at.is_(None),
    ]
    if industry:
        conditions.append(ProjectTestimonial.industry == industry)
    if project_id:
        conditions.append(ProjectTestimonial.project_id == project_id)

    count_result = await db.execute(
        select(func.count()).select_from(ProjectTestimonial).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(ProjectTestimonial)
        .where(and_(*conditions))
        .order_by(ProjectTestimonial.sort_order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_t_dict(t) for t in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }
