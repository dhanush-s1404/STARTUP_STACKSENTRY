from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, case, literal_column
from database.config import get_db
from database.models import CaseStudy
from api.utils import escape_like

router = APIRouter(prefix="/api/case-studies", tags=["Case Studies"])


def _cs_dict(cs: CaseStudy) -> dict:
    return {
        "id": cs.id,
        "slug": cs.slug,
        "title": cs.title,
        "subtitle": cs.subtitle,
        "project_id": cs.project_id,
        "hero_image_url": cs.hero_image_url,
        "technologies_used": cs.technologies_used,
        "is_published": cs.is_published,
        "is_featured": cs.is_featured,
        "view_count": cs.view_count,
        "sort_order": cs.sort_order,
        "seo_title": cs.seo_title,
        "seo_description": cs.seo_description,
        "created_at": cs.created_at.isoformat() if cs.created_at else None,
        "updated_at": cs.updated_at.isoformat() if cs.updated_at else None,
    }


def _cs_detail(cs: CaseStudy) -> dict:
    d = _cs_dict(cs)
    d.update({
        "client_background": cs.client_background,
        "business_challenge": cs.business_challenge,
        "discovery_phase": cs.discovery_phase,
        "requirements": cs.requirements,
        "research": cs.research,
        "wireframes": cs.wireframes,
        "ui_design": cs.ui_design,
        "architecture": cs.architecture,
        "backend_design": cs.backend_design,
        "database_design": cs.database_design,
        "security_strategy": cs.security_strategy,
        "development_process": cs.development_process,
        "deployment": cs.deployment,
        "results": cs.results,
        "kpis": cs.kpis,
        "roi": cs.roi,
        "performance_improvements": cs.performance_improvements,
        "lessons_learned": cs.lessons_learned,
        "future_roadmap": cs.future_roadmap,
        "timeline_events": cs.timeline_events,
    })
    return d


@router.get("/search")
async def search_case_studies(
    q: str = Query(..., min_length=2),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    like_pattern = f"%{escape_like(q)}%"
    relevance = (
        case(
            (CaseStudy.title.ilike(like_pattern, escape="\\"), 10),
            (CaseStudy.subtitle.ilike(like_pattern, escape="\\"), 7),
            (CaseStudy.technologies_used.ilike(like_pattern, escape="\\"), 5),
            else_=1,
        )
    ).label("relevance")

    base = (
        select(CaseStudy, relevance)
        .where(
            CaseStudy.is_published == True,
            CaseStudy.deleted_at.is_(None),
            (
                CaseStudy.title.ilike(like_pattern, escape="\\")
                | CaseStudy.subtitle.ilike(like_pattern, escape="\\")
                | CaseStudy.technologies_used.ilike(like_pattern, escape="\\")
            ),
        )
        .order_by(literal_column("relevance").desc(), CaseStudy.sort_order)
    )

    count_q = select(func.count()).select_from(base.subquery())
    total = (await db.execute(count_q)).scalar()

    offset = (page - 1) * page_size
    result = await db.execute(base.offset(offset).limit(page_size))
    rows = result.all()

    return {
        "items": [_cs_dict(row[0]) for row in rows],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size if total else 0,
        "query": q,
    }


@router.get("/featured")
async def get_featured_case_studies(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CaseStudy)
        .where(CaseStudy.is_featured == True, CaseStudy.is_published == True, CaseStudy.deleted_at.is_(None))
        .order_by(CaseStudy.sort_order)
        .limit(10)
    )
    return [_cs_dict(cs) for cs in result.scalars().all()]


@router.get("")
async def list_case_studies(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [CaseStudy.is_published == True, CaseStudy.deleted_at.is_(None)]

    count_result = await db.execute(
        select(func.count()).select_from(CaseStudy).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(CaseStudy)
        .where(and_(*conditions))
        .order_by(CaseStudy.sort_order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_cs_dict(cs) for cs in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/{slug}")
async def get_case_study(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CaseStudy).where(CaseStudy.slug == slug, CaseStudy.deleted_at.is_(None))
    )
    cs = result.scalar_one_or_none()
    if not cs:
        raise HTTPException(status_code=404, detail="Case study not found")

    cs.view_count = (cs.view_count or 0) + 1
    await db.commit()

    return _cs_detail(cs)
