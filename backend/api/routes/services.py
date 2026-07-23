import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from database.config import get_db
from database.models import Service, ServiceCategory
from api.utils import escape_like

router = APIRouter(prefix="/api/services", tags=["Services"])


def _json_load(val):
    if not val:
        return []
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return []


@router.get("")
async def list_services(
    category: Optional[str] = Query(None, description="Filter by category slug"),
    search: Optional[str] = Query(None, description="Search by title or description"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Service).where(Service.is_active == True, Service.deleted_at.is_(None))
    if category:
        stmt = stmt.join(ServiceCategory).where(ServiceCategory.slug == category)
    if search:
        stmt = stmt.where(
            or_(
                Service.title.ilike(f"%{escape_like(search)}%", escape="\\"),
                Service.description.ilike(f"%{escape_like(search)}%", escape="\\"),
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
            "features": _json_load(s.features),
            "category_id": s.category_id,
        }
        for s in services
    ]


@router.get("/{slug}")
async def get_service(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.slug == slug, Service.deleted_at.is_(None)))
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
        "features": _json_load(service.features),
        "process": _json_load(service.process),
        "faq": _json_load(service.faq),
        "technologies": _json_load(service.technologies),
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
