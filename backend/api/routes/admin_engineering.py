import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from database.config import get_db
from database.models import (
    EngineeringPrinciple, SecurityTopic, KnowledgeArticle,
    PerformanceTopic, ArchitectureLayer, AuditLog,
)
from api.deps import get_current_admin

router = APIRouter(prefix="/api/admin/engineering", tags=["Admin Engineering"])


def _json_load(val):
    if not val:
        return []
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return []


def _log(db, table, record_id, action, old=None, new=None, admin_id="admin"):
    db.add(AuditLog(
        table_name=table,
        record_id=str(record_id),
        action=action,
        old_values=json.dumps(old) if old else None,
        new_values=json.dumps(new) if new else None,
        changed_by=admin_id,
    ))


# ===================================================================
# Engineering Principles
# ===================================================================

@router.get("/principles")
async def admin_list_principles(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(EngineeringPrinciple).where(
        EngineeringPrinciple.deleted_at.is_(None)
    ).order_by(EngineeringPrinciple.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": p.id, "slug": p.slug, "title": p.title, "description": p.description,
            "category": p.category, "icon": p.icon,
            "business_value": p.business_value,
            "use_cases": _json_load(p.use_cases),
            "related_practices": _json_load(p.related_practices),
            "order": p.order, "is_active": p.is_active,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "updated_at": p.updated_at.isoformat() if p.updated_at else None,
        }
        for p in items
    ]


@router.post("/principles")
async def admin_create_principle(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(EngineeringPrinciple).where(EngineeringPrinciple.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    p = EngineeringPrinciple(
        slug=data["slug"], title=data["title"], description=data.get("description", ""),
        category=data.get("category"), icon=data.get("icon"),
        business_value=data.get("business_value"),
        use_cases=json.dumps(data.get("use_cases", [])),
        related_practices=json.dumps(data.get("related_practices", [])),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(p)
    await db.refresh(p)
    _log(db, "engineering_principles", p.id, "CREATE", new={"slug": p.slug, "title": p.title})
    await db.commit()
    return {"id": p.id, "slug": p.slug, "title": p.title}


@router.get("/principles/{id}")
async def admin_get_principle(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(EngineeringPrinciple).where(EngineeringPrinciple.id == id))
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="EngineeringPrinciple not found")
    return {
        "id": p.id, "slug": p.slug, "title": p.title, "description": p.description,
        "category": p.category, "icon": p.icon,
        "business_value": p.business_value,
        "use_cases": _json_load(p.use_cases),
        "related_practices": _json_load(p.related_practices),
        "order": p.order, "is_active": p.is_active,
        "created_at": p.created_at.isoformat() if p.created_at else None,
        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
    }


@router.put("/principles/{id}")
async def admin_update_principle(id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(EngineeringPrinciple).where(EngineeringPrinciple.id == id))
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="EngineeringPrinciple not found")
    old = {"slug": p.slug, "title": p.title, "is_active": p.is_active}
    for field in ("slug", "title", "description", "category", "icon", "business_value", "order", "is_active"):
        if field in data:
            setattr(p, field, data[field])
    for jf in ("use_cases", "related_practices"):
        if jf in data:
            setattr(p, jf, json.dumps(data[jf]))
    p.updated_by = str(admin.id)
    _log(db, "engineering_principles", p.id, "UPDATE", old=old, new={"slug": p.slug, "title": p.title})
    await db.commit()
    return {"id": p.id, "slug": p.slug, "title": p.title}


@router.delete("/principles/{id}")
async def admin_delete_principle(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(EngineeringPrinciple).where(EngineeringPrinciple.id == id))
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="EngineeringPrinciple not found")
    p.deleted_at = func.now()
    p.is_active = False
    p.updated_by = str(admin.id)
    _log(db, "engineering_principles", p.id, "DELETE", old={"slug": p.slug, "title": p.title})
    await db.commit()
    return {"detail": "EngineeringPrinciple deleted"}


# ===================================================================
# Security Topics
# ===================================================================

@router.get("/security-topics")
async def admin_list_security_topics(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(SecurityTopic).where(
        SecurityTopic.deleted_at.is_(None)
    ).order_by(SecurityTopic.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
            "category": t.category, "icon": t.icon,
            "details": t.details,
            "best_practices": _json_load(t.best_practices),
            "order": t.order, "is_active": t.is_active,
            "created_at": t.created_at.isoformat() if t.created_at else None,
            "updated_at": t.updated_at.isoformat() if t.updated_at else None,
        }
        for t in items
    ]


@router.post("/security-topics")
async def admin_create_security_topic(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(SecurityTopic).where(SecurityTopic.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    t = SecurityTopic(
        slug=data["slug"], title=data["title"], description=data.get("description", ""),
        category=data.get("category"), icon=data.get("icon"),
        details=data.get("details"),
        best_practices=json.dumps(data.get("best_practices", [])),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(t)
    await db.refresh(t)
    _log(db, "security_topics", t.id, "CREATE", new={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"id": t.id, "slug": t.slug, "title": t.title}


@router.get("/security-topics/{id}")
async def admin_get_security_topic(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(SecurityTopic).where(SecurityTopic.id == id))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="SecurityTopic not found")
    return {
        "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
        "category": t.category, "icon": t.icon,
        "details": t.details,
        "best_practices": _json_load(t.best_practices),
        "order": t.order, "is_active": t.is_active,
        "created_at": t.created_at.isoformat() if t.created_at else None,
        "updated_at": t.updated_at.isoformat() if t.updated_at else None,
    }


@router.put("/security-topics/{id}")
async def admin_update_security_topic(id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(SecurityTopic).where(SecurityTopic.id == id))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="SecurityTopic not found")
    old = {"slug": t.slug, "title": t.title, "is_active": t.is_active}
    for field in ("slug", "title", "description", "category", "icon", "details", "order", "is_active"):
        if field in data:
            setattr(t, field, data[field])
    for jf in ("best_practices",):
        if jf in data:
            setattr(t, jf, json.dumps(data[jf]))
    t.updated_by = str(admin.id)
    _log(db, "security_topics", t.id, "UPDATE", old=old, new={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"id": t.id, "slug": t.slug, "title": t.title}


@router.delete("/security-topics/{id}")
async def admin_delete_security_topic(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(SecurityTopic).where(SecurityTopic.id == id))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="SecurityTopic not found")
    t.deleted_at = func.now()
    t.is_active = False
    t.updated_by = str(admin.id)
    _log(db, "security_topics", t.id, "DELETE", old={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"detail": "SecurityTopic deleted"}


# ===================================================================
# Knowledge Articles
# ===================================================================

@router.get("/knowledge-articles")
async def admin_list_knowledge_articles(
    search: str = None,
    category: str = None,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin),
):
    stmt = select(KnowledgeArticle).where(KnowledgeArticle.deleted_at.is_(None))
    if category:
        stmt = stmt.where(KnowledgeArticle.category == category)
    if search:
        stmt = stmt.where(
            or_(
                KnowledgeArticle.title.ilike(f"%{search}%"),
                KnowledgeArticle.excerpt.ilike(f"%{search}%"),
            )
        )
    stmt = stmt.order_by(KnowledgeArticle.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": a.id, "slug": a.slug, "title": a.title, "excerpt": a.excerpt,
            "content": a.content,
            "category": a.category,
            "tags": _json_load(a.tags),
            "read_time": a.read_time, "author": a.author,
            "image_url": a.image_url, "order": a.order, "is_active": a.is_active,
            "created_at": a.created_at.isoformat() if a.created_at else None,
            "updated_at": a.updated_at.isoformat() if a.updated_at else None,
        }
        for a in items
    ]


@router.post("/knowledge-articles")
async def admin_create_knowledge_article(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(KnowledgeArticle).where(KnowledgeArticle.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    a = KnowledgeArticle(
        slug=data["slug"], title=data["title"], excerpt=data.get("excerpt"),
        content=data.get("content"),
        category=data.get("category"),
        tags=json.dumps(data.get("tags", [])),
        read_time=data.get("read_time"), author=data.get("author"),
        image_url=data.get("image_url"),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(a)
    await db.refresh(a)
    _log(db, "knowledge_articles", a.id, "CREATE", new={"slug": a.slug, "title": a.title})
    await db.commit()
    return {"id": a.id, "slug": a.slug, "title": a.title}


@router.get("/knowledge-articles/{id}")
async def admin_get_knowledge_article(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(KnowledgeArticle).where(KnowledgeArticle.id == id))
    a = result.scalar_one_or_none()
    if not a:
        raise HTTPException(status_code=404, detail="KnowledgeArticle not found")
    return {
        "id": a.id, "slug": a.slug, "title": a.title, "excerpt": a.excerpt,
        "content": a.content,
        "category": a.category,
        "tags": _json_load(a.tags),
        "read_time": a.read_time, "author": a.author,
        "image_url": a.image_url, "order": a.order, "is_active": a.is_active,
        "created_at": a.created_at.isoformat() if a.created_at else None,
        "updated_at": a.updated_at.isoformat() if a.updated_at else None,
    }


@router.put("/knowledge-articles/{id}")
async def admin_update_knowledge_article(id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(KnowledgeArticle).where(KnowledgeArticle.id == id))
    a = result.scalar_one_or_none()
    if not a:
        raise HTTPException(status_code=404, detail="KnowledgeArticle not found")
    old = {"slug": a.slug, "title": a.title, "is_active": a.is_active}
    for field in ("slug", "title", "excerpt", "content", "category", "read_time", "author", "image_url", "order", "is_active"):
        if field in data:
            setattr(a, field, data[field])
    for jf in ("tags",):
        if jf in data:
            setattr(a, jf, json.dumps(data[jf]))
    a.updated_by = str(admin.id)
    _log(db, "knowledge_articles", a.id, "UPDATE", old=old, new={"slug": a.slug, "title": a.title})
    await db.commit()
    return {"id": a.id, "slug": a.slug, "title": a.title}


@router.delete("/knowledge-articles/{id}")
async def admin_delete_knowledge_article(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(KnowledgeArticle).where(KnowledgeArticle.id == id))
    a = result.scalar_one_or_none()
    if not a:
        raise HTTPException(status_code=404, detail="KnowledgeArticle not found")
    a.deleted_at = func.now()
    a.is_active = False
    a.updated_by = str(admin.id)
    _log(db, "knowledge_articles", a.id, "DELETE", old={"slug": a.slug, "title": a.title})
    await db.commit()
    return {"detail": "KnowledgeArticle deleted"}


# ===================================================================
# Performance Topics
# ===================================================================

@router.get("/performance-topics")
async def admin_list_performance_topics(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(PerformanceTopic).where(
        PerformanceTopic.deleted_at.is_(None)
    ).order_by(PerformanceTopic.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
            "category": t.category, "icon": t.icon,
            "impact": t.impact,
            "best_practices": _json_load(t.best_practices),
            "tools": _json_load(t.tools),
            "order": t.order, "is_active": t.is_active,
            "created_at": t.created_at.isoformat() if t.created_at else None,
            "updated_at": t.updated_at.isoformat() if t.updated_at else None,
        }
        for t in items
    ]


@router.post("/performance-topics")
async def admin_create_performance_topic(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(PerformanceTopic).where(PerformanceTopic.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    t = PerformanceTopic(
        slug=data["slug"], title=data["title"], description=data.get("description", ""),
        category=data.get("category"), icon=data.get("icon"),
        impact=data.get("impact"),
        best_practices=json.dumps(data.get("best_practices", [])),
        tools=json.dumps(data.get("tools", [])),
        order=data.get("order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(t)
    await db.refresh(t)
    _log(db, "performance_topics", t.id, "CREATE", new={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"id": t.id, "slug": t.slug, "title": t.title}


@router.get("/performance-topics/{id}")
async def admin_get_performance_topic(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(PerformanceTopic).where(PerformanceTopic.id == id))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="PerformanceTopic not found")
    return {
        "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
        "category": t.category, "icon": t.icon,
        "impact": t.impact,
        "best_practices": _json_load(t.best_practices),
        "tools": _json_load(t.tools),
        "order": t.order, "is_active": t.is_active,
        "created_at": t.created_at.isoformat() if t.created_at else None,
        "updated_at": t.updated_at.isoformat() if t.updated_at else None,
    }


@router.put("/performance-topics/{id}")
async def admin_update_performance_topic(id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(PerformanceTopic).where(PerformanceTopic.id == id))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="PerformanceTopic not found")
    old = {"slug": t.slug, "title": t.title, "is_active": t.is_active}
    for field in ("slug", "title", "description", "category", "icon", "impact", "order", "is_active"):
        if field in data:
            setattr(t, field, data[field])
    for jf in ("best_practices", "tools"):
        if jf in data:
            setattr(t, jf, json.dumps(data[jf]))
    t.updated_by = str(admin.id)
    _log(db, "performance_topics", t.id, "UPDATE", old=old, new={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"id": t.id, "slug": t.slug, "title": t.title}


@router.delete("/performance-topics/{id}")
async def admin_delete_performance_topic(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(PerformanceTopic).where(PerformanceTopic.id == id))
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="PerformanceTopic not found")
    t.deleted_at = func.now()
    t.is_active = False
    t.updated_by = str(admin.id)
    _log(db, "performance_topics", t.id, "DELETE", old={"slug": t.slug, "title": t.title})
    await db.commit()
    return {"detail": "PerformanceTopic deleted"}


# ===================================================================
# Architecture Layers
# ===================================================================

@router.get("/architecture-layers")
async def admin_list_architecture_layers(db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    stmt = select(ArchitectureLayer).where(
        ArchitectureLayer.deleted_at.is_(None)
    ).order_by(ArchitectureLayer.layer_order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": l.id, "slug": l.slug, "title": l.title,
            "description": l.description,
            "responsibilities": _json_load(l.responsibilities),
            "security_considerations": _json_load(l.security_considerations),
            "scalability_approach": l.scalability_approach,
            "performance": l.performance,
            "technologies": _json_load(l.technologies),
            "icon": l.icon,
            "layer_order": l.layer_order, "is_active": l.is_active,
            "created_at": l.created_at.isoformat() if l.created_at else None,
            "updated_at": l.updated_at.isoformat() if l.updated_at else None,
        }
        for l in items
    ]


@router.post("/architecture-layers")
async def admin_create_architecture_layer(data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    existing = await db.execute(select(ArchitectureLayer).where(ArchitectureLayer.slug == data.get("slug")))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")
    l = ArchitectureLayer(
        slug=data["slug"], title=data["title"], description=data.get("description"),
        responsibilities=json.dumps(data.get("responsibilities", [])),
        security_considerations=json.dumps(data.get("security_considerations", [])),
        scalability_approach=data.get("scalability_approach"),
        performance=data.get("performance"),
        technologies=json.dumps(data.get("technologies", [])),
        icon=data.get("icon"),
        layer_order=data.get("layer_order", 0), is_active=data.get("is_active", True),
        created_by=str(admin.id),
    )
    db.add(l)
    await db.refresh(l)
    _log(db, "architecture_layers", l.id, "CREATE", new={"slug": l.slug, "title": l.title})
    await db.commit()
    return {"id": l.id, "slug": l.slug, "title": l.title}


@router.get("/architecture-layers/{id}")
async def admin_get_architecture_layer(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ArchitectureLayer).where(ArchitectureLayer.id == id))
    l = result.scalar_one_or_none()
    if not l:
        raise HTTPException(status_code=404, detail="ArchitectureLayer not found")
    return {
        "id": l.id, "slug": l.slug, "title": l.title,
        "description": l.description,
        "responsibilities": _json_load(l.responsibilities),
        "security_considerations": _json_load(l.security_considerations),
        "scalability_approach": l.scalability_approach,
        "performance": l.performance,
        "technologies": _json_load(l.technologies),
        "icon": l.icon,
        "layer_order": l.layer_order, "is_active": l.is_active,
        "created_at": l.created_at.isoformat() if l.created_at else None,
        "updated_at": l.updated_at.isoformat() if l.updated_at else None,
    }


@router.put("/architecture-layers/{id}")
async def admin_update_architecture_layer(id: str, data: dict, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ArchitectureLayer).where(ArchitectureLayer.id == id))
    l = result.scalar_one_or_none()
    if not l:
        raise HTTPException(status_code=404, detail="ArchitectureLayer not found")
    old = {"slug": l.slug, "title": l.title, "is_active": l.is_active}
    for field in ("slug", "title", "description", "scalability_approach", "performance", "icon", "layer_order", "is_active"):
        if field in data:
            setattr(l, field, data[field])
    for jf in ("responsibilities", "security_considerations", "technologies"):
        if jf in data:
            setattr(l, jf, json.dumps(data[jf]))
    l.updated_by = str(admin.id)
    _log(db, "architecture_layers", l.id, "UPDATE", old=old, new={"slug": l.slug, "title": l.title})
    await db.commit()
    return {"id": l.id, "slug": l.slug, "title": l.title}


@router.delete("/architecture-layers/{id}")
async def admin_delete_architecture_layer(id: str, db: AsyncSession = Depends(get_db), admin=Depends(get_current_admin)):
    result = await db.execute(select(ArchitectureLayer).where(ArchitectureLayer.id == id))
    l = result.scalar_one_or_none()
    if not l:
        raise HTTPException(status_code=404, detail="ArchitectureLayer not found")
    l.deleted_at = func.now()
    l.is_active = False
    l.updated_by = str(admin.id)
    _log(db, "architecture_layers", l.id, "DELETE", old={"slug": l.slug, "title": l.title})
    await db.commit()
    return {"detail": "ArchitectureLayer deleted"}
