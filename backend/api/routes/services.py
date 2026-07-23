import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, func
from database.config import get_db
from database.models import Service, ServiceCategory

router = APIRouter(prefix="/api/services", tags=["Services"])


@router.get("")
async def list_services(
    category: Optional[str] = Query(None, description="Filter by category slug"),
    search: Optional[str] = Query(None, description="Search by title or description"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Service).where(Service.is_active == True)
    if category:
        stmt = stmt.join(ServiceCategory).where(ServiceCategory.slug == category)
    if search:
        stmt = stmt.where(
            or_(
                Service.title.ilike(f"%{search}%"),
                Service.description.ilike(f"%{search}%"),
            )
        )
    stmt = stmt.order_by(Service.order)
    result = await db.execute(stmt)
    services = result.scalars().all()
    return [
        {
            "id": s.id,
            "slug": s.slug,
            "title": s.title,
            "description": s.description,
            "short_description": s.short_description,
            "icon": s.icon,
            "features": json.loads(s.features) if s.features else [],
            "category_id": s.category_id,
        }
        for s in services
    ]


@router.get("/{slug}")
async def get_service(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.slug == slug))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return {
        "id": service.id,
        "slug": service.slug,
        "title": service.title,
        "description": service.description,
        "short_description": service.short_description,
        "icon": service.icon,
        "features": json.loads(service.features) if service.features else [],
        "process": json.loads(service.process) if service.process else [],
        "faq": json.loads(service.faq) if service.faq else [],
        "technologies": json.loads(service.technologies) if service.technologies else [],
        "pricing_tier": service.pricing_tier,
        "status": service.status,
        "seo_title": service.seo_title,
        "seo_description": service.seo_description,
        "seo_keywords": service.seo_keywords,
        "category_id": service.category_id,
        "order": service.order,
        "is_active": service.is_active,
        "created_at": service.created_at.isoformat() if service.created_at else None,
        "updated_at": service.updated_at.isoformat() if service.updated_at else None,
    }
