import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from database.config import get_db
from database.models import (
    EngineeringPrinciple, SecurityTopic, KnowledgeArticle,
    PerformanceTopic, ArchitectureLayer,
)

router = APIRouter(prefix="/api/engineering", tags=["Engineering"])


def _json_load(val):
    if not val:
        return []
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return []


# ===================================================================
# Engineering Principles
# ===================================================================

@router.get("/principles")
async def list_principles(
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(EngineeringPrinciple).where(EngineeringPrinciple.is_active == True)
    if category:
        stmt = stmt.where(EngineeringPrinciple.category == category)
    stmt = stmt.order_by(EngineeringPrinciple.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": p.id, "slug": p.slug, "title": p.title, "description": p.description,
            "category": p.category, "icon": p.icon,
            "business_value": p.business_value,
            "use_cases": _json_load(p.use_cases),
            "related_practices": _json_load(p.related_practices),
            "order": p.order,
        }
        for p in items
    ]


@router.get("/principles/{slug}")
async def get_principle(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(EngineeringPrinciple).where(
            EngineeringPrinciple.slug == slug,
            EngineeringPrinciple.is_active == True,
        )
    )
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Engineering principle not found")
    return {
        "id": p.id, "slug": p.slug, "title": p.title, "description": p.description,
        "category": p.category, "icon": p.icon,
        "business_value": p.business_value,
        "use_cases": _json_load(p.use_cases),
        "related_practices": _json_load(p.related_practices),
        "order": p.order,
        "created_at": p.created_at.isoformat() if p.created_at else None,
        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
    }


# ===================================================================
# Security Topics
# ===================================================================

@router.get("/security-topics")
async def list_security_topics(
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(SecurityTopic).where(SecurityTopic.is_active == True)
    if category:
        stmt = stmt.where(SecurityTopic.category == category)
    stmt = stmt.order_by(SecurityTopic.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
            "category": t.category, "icon": t.icon,
            "details": t.details,
            "best_practices": _json_load(t.best_practices),
            "order": t.order,
        }
        for t in items
    ]


@router.get("/security-topics/{slug}")
async def get_security_topic(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(SecurityTopic).where(
            SecurityTopic.slug == slug,
            SecurityTopic.is_active == True,
        )
    )
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="Security topic not found")
    return {
        "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
        "category": t.category, "icon": t.icon,
        "details": t.details,
        "best_practices": _json_load(t.best_practices),
        "order": t.order,
        "created_at": t.created_at.isoformat() if t.created_at else None,
        "updated_at": t.updated_at.isoformat() if t.updated_at else None,
    }


# ===================================================================
# Architecture Layers
# ===================================================================

@router.get("/architecture-layers")
async def list_architecture_layers(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(ArchitectureLayer)
        .where(ArchitectureLayer.is_active == True)
        .order_by(ArchitectureLayer.layer_order)
    )
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
            "layer_order": l.layer_order,
        }
        for l in items
    ]


@router.get("/architecture-layers/{slug}")
async def get_architecture_layer(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ArchitectureLayer).where(
            ArchitectureLayer.slug == slug,
            ArchitectureLayer.is_active == True,
        )
    )
    l = result.scalar_one_or_none()
    if not l:
        raise HTTPException(status_code=404, detail="Architecture layer not found")
    return {
        "id": l.id, "slug": l.slug, "title": l.title,
        "description": l.description,
        "responsibilities": _json_load(l.responsibilities),
        "security_considerations": _json_load(l.security_considerations),
        "scalability_approach": l.scalability_approach,
        "performance": l.performance,
        "technologies": _json_load(l.technologies),
        "icon": l.icon,
        "layer_order": l.layer_order,
        "created_at": l.created_at.isoformat() if l.created_at else None,
        "updated_at": l.updated_at.isoformat() if l.updated_at else None,
    }


# ===================================================================
# Knowledge Articles
# ===================================================================

@router.get("/knowledge-articles")
async def list_knowledge_articles(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    tag: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(KnowledgeArticle).where(KnowledgeArticle.is_active == True)
    if category:
        stmt = stmt.where(KnowledgeArticle.category == category)
    if search:
        stmt = stmt.where(
            or_(
                KnowledgeArticle.title.ilike(f"%{search}%"),
                KnowledgeArticle.excerpt.ilike(f"%{search}%"),
            )
        )
    if tag:
        stmt = stmt.where(KnowledgeArticle.tags.ilike(f"%{tag}%"))
    stmt = stmt.order_by(KnowledgeArticle.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": a.id, "slug": a.slug, "title": a.title, "excerpt": a.excerpt,
            "category": a.category,
            "tags": _json_load(a.tags),
            "read_time": a.read_time, "author": a.author,
            "image_url": a.image_url, "order": a.order,
        }
        for a in items
    ]


@router.get("/knowledge-articles/{slug}")
async def get_knowledge_article(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(KnowledgeArticle).where(
            KnowledgeArticle.slug == slug,
            KnowledgeArticle.is_active == True,
        )
    )
    a = result.scalar_one_or_none()
    if not a:
        raise HTTPException(status_code=404, detail="Knowledge article not found")
    return {
        "id": a.id, "slug": a.slug, "title": a.title, "excerpt": a.excerpt,
        "content": a.content,
        "category": a.category,
        "tags": _json_load(a.tags),
        "read_time": a.read_time, "author": a.author,
        "image_url": a.image_url, "order": a.order,
        "created_at": a.created_at.isoformat() if a.created_at else None,
        "updated_at": a.updated_at.isoformat() if a.updated_at else None,
    }


# ===================================================================
# Performance Topics
# ===================================================================

@router.get("/performance-topics")
async def list_performance_topics(
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(PerformanceTopic).where(PerformanceTopic.is_active == True)
    if category:
        stmt = stmt.where(PerformanceTopic.category == category)
    stmt = stmt.order_by(PerformanceTopic.order)
    result = await db.execute(stmt)
    items = result.scalars().all()
    return [
        {
            "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
            "category": t.category, "icon": t.icon,
            "impact": t.impact,
            "best_practices": _json_load(t.best_practices),
            "tools": _json_load(t.tools),
            "order": t.order,
        }
        for t in items
    ]


@router.get("/performance-topics/{slug}")
async def get_performance_topic(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(PerformanceTopic).where(
            PerformanceTopic.slug == slug,
            PerformanceTopic.is_active == True,
        )
    )
    t = result.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="Performance topic not found")
    return {
        "id": t.id, "slug": t.slug, "title": t.title, "description": t.description,
        "category": t.category, "icon": t.icon,
        "impact": t.impact,
        "best_practices": _json_load(t.best_practices),
        "tools": _json_load(t.tools),
        "order": t.order,
        "created_at": t.created_at.isoformat() if t.created_at else None,
        "updated_at": t.updated_at.isoformat() if t.updated_at else None,
    }
