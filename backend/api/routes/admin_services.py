import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from database.config import get_db
from database.models import Service, ServiceCategory, ServiceComparison, AuditLog
from api.deps import get_current_admin

router = APIRouter(prefix="/api/admin/services", tags=["Admin Services"])


def _json_load(val):
    if not val:
        return []
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return []


@router.get("")
async def admin_list_services(
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    stmt = select(Service).order_by(Service.order)
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
            "status": s.status,
            "is_active": s.is_active,
            "order": s.order,
            "category_id": s.category_id,
            "created_at": s.created_at.isoformat() if s.created_at else None,
            "updated_at": s.updated_at.isoformat() if s.updated_at else None,
        }
        for s in services
    ]


@router.get("/{slug}")
async def admin_get_service(
    slug: str,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
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


@router.post("")
async def admin_create_service(
    data: dict,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    existing = await db.execute(select(Service).where(Service.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")

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
        created_by=admin.get("id"),
    )
    db.add(service)
    await db.refresh(service)

    log = AuditLog(
        table_name="services",
        record_id=service.id,
        action="CREATE",
        new_values=json.dumps({"slug": service.slug, "title": service.title}),
        changed_by=admin.get("id"),
    )
    db.add(log)
    await db.commit()

    return {"id": service.id, "slug": service.slug, "title": service.title}


@router.put("/{slug}")
async def admin_update_service(
    slug: str,
    data: dict,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    result = await db.execute(select(Service).where(Service.slug == slug))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    old_values = {
        "slug": service.slug,
        "title": service.title,
        "status": service.status,
        "is_active": service.is_active,
    }

    scalar_fields = [
        "slug", "title", "description", "short_description", "icon",
        "pricing_tier", "status", "seo_title", "seo_description",
        "seo_keywords", "category_id", "order", "is_active",
    ]
    for field in scalar_fields:
        if field in data:
            setattr(service, field, data[field])

    for json_field in ("features", "process", "faq", "technologies"):
        if json_field in data:
            setattr(service, json_field, json.dumps(data[json_field]))

    service.updated_by = admin.get("id")
    await db.refresh(service)

    log = AuditLog(
        table_name="services",
        record_id=service.id,
        action="UPDATE",
        old_values=json.dumps(old_values),
        new_values=json.dumps({"slug": service.slug, "title": service.title}),
        changed_by=admin.get("id"),
    )
    db.add(log)
    await db.commit()

    return {"id": service.id, "slug": service.slug, "title": service.title}


@router.delete("/{slug}")
async def admin_delete_service(
    slug: str,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    result = await db.execute(select(Service).where(Service.slug == slug))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    service.deleted_at = func.now()
    service.is_active = False
    service.updated_by = admin.get("id")

    log = AuditLog(
        table_name="services",
        record_id=service.id,
        action="DELETE",
        old_values=json.dumps({"slug": service.slug, "title": service.title}),
        changed_by=admin.get("id"),
    )
    db.add(log)
    await db.commit()

    return {"detail": "Service deleted"}


@router.get("/categories/list")
async def admin_list_categories(
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    result = await db.execute(
        select(ServiceCategory).where(ServiceCategory.is_active == True).order_by(ServiceCategory.order)
    )
    categories = result.scalars().all()
    return [
        {
            "id": c.id,
            "slug": c.slug,
            "name": c.name,
            "description": c.description,
            "icon": c.icon,
        }
        for c in categories
    ]


@router.post("/categories")
async def admin_create_category(
    data: dict,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    category = ServiceCategory(
        slug=data.get("slug"),
        name=data.get("name"),
        description=data.get("description"),
        icon=data.get("icon"),
        order=data.get("order", 0),
        created_by=admin.get("id"),
    )
    db.add(category)
    await db.commit()
    await db.refresh(category)
    return {"id": category.id, "slug": category.slug, "name": category.name}
