import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
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


@router.post("")
async def create_service(data: dict, db: AsyncSession = Depends(get_db)):
    service = Service(
        slug=data.get("slug"),
        title=data.get("title"),
        description=data.get("description"),
        short_description=data.get("short_description"),
        icon=data.get("icon"),
        features=json.dumps(data.get("features", [])),
        process=json.dumps(data.get("process", [])),
        faq=json.dumps(data.get("faq", [])),
        technologies=json.dumps(data.get("technologies", [])),
        pricing_tier=data.get("pricing_tier"),
        status=data.get("status", "active"),
        seo_title=data.get("seo_title"),
        seo_description=data.get("seo_description"),
        seo_keywords=data.get("seo_keywords"),
        category_id=data.get("category_id"),
        order=data.get("order", 0),
        is_active=data.get("is_active", True),
    )
    db.add(service)
    await db.commit()
    await db.refresh(service)
    return {"id": service.id, "slug": service.slug, "title": service.title}


@router.put("/{slug}")
async def update_service(slug: str, data: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.slug == slug))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    for field in ("slug", "title", "description", "short_description", "icon",
                  "pricing_tier", "status", "seo_title", "seo_description",
                  "seo_keywords", "category_id", "order", "is_active"):
        if field in data:
            setattr(service, field, data[field])
    for json_field in ("features", "process", "faq", "technologies"):
        if json_field in data:
            setattr(service, json_field, json.dumps(data[json_field]))
    await db.commit()
    await db.refresh(service)
    return {"id": service.id, "slug": service.slug, "title": service.title}


@router.delete("/{slug}")
async def delete_service(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.slug == slug))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    service.deleted_at = func.now()
    service.is_active = False
    await db.commit()
    return {"detail": "Service deleted"}
