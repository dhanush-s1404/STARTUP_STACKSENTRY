import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from database.config import get_db
from database.models import Technology

router = APIRouter(prefix="/api/technologies", tags=["Technologies"])


@router.get("")
async def list_technologies(
    category: Optional[str] = Query(None, description="Filter by technology category"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Technology).where(Technology.is_active == True)
    if category:
        stmt = stmt.where(and_(Technology.category == category))
    stmt = stmt.order_by(Technology.order)
    result = await db.execute(stmt)
    technologies = result.scalars().all()
    return [
        {
            "id": t.id,
            "slug": t.slug,
            "name": t.name,
            "category": t.category,
            "description": t.description,
            "icon": t.icon_url,
            "icon_url": t.icon_url,
            "experience_level": t.experience_level,
            "use_cases": json.loads(t.use_cases) if t.use_cases else [],
        }
        for t in technologies
    ]


@router.get("/{slug}")
async def get_technology(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Technology).where(Technology.slug == slug))
    technology = result.scalar_one_or_none()
    if not technology:
        raise HTTPException(status_code=404, detail="Technology not found")
    return {
        "id": technology.id,
        "slug": technology.slug,
        "name": technology.name,
        "category": technology.category,
        "description": technology.description,
        "icon": technology.icon_url,
        "icon_url": technology.icon_url,
        "experience_level": technology.experience_level,
        "use_cases": json.loads(technology.use_cases) if technology.use_cases else [],
    }
