from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import Industry
from api.utils import escape_like

router = APIRouter(prefix="/api/industries", tags=["Industries"])


@router.get("")
async def list_industries(
    search: Optional[str] = Query(None, description="Search by name or description"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Industry).where(Industry.is_active == True)
    if search:
        stmt = stmt.where(
            Industry.title.ilike(f"%{escape_like(search)}%", escape="\\")
        )
    stmt = stmt.order_by(Industry.order)
    result = await db.execute(stmt)
    industries = result.scalars().all()
    return [
        {
            "id": i.id,
            "slug": i.slug,
            "name": i.title,
            "title": i.title,
            "description": i.description,
            "short_description": i.short_description,
            "icon": i.icon,
        }
        for i in industries
    ]


@router.get("/{slug}")
async def get_industry(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Industry).where(Industry.slug == slug))
    industry = result.scalar_one_or_none()
    if not industry:
        raise HTTPException(status_code=404, detail="Industry not found")
    return {
        "id": industry.id,
        "slug": industry.slug,
        "name": industry.title,
        "title": industry.title,
        "description": industry.description,
        "short_description": industry.short_description,
        "icon": industry.icon,
        "challenges": industry.challenges,
        "solutions": industry.solutions,
        "benefits": industry.benefits,
        "case_examples": industry.case_examples,
        "image_url": industry.image_url,
    }
