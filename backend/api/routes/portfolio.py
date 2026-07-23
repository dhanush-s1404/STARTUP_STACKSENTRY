from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, case, literal_column, update
from database.config import get_db
from database.models import Project, ProjectCategory
from api.utils import escape_like

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio"])


def _project_dict(p: Project) -> dict:
    return {
        "id": p.id,
        "slug": p.slug,
        "title": p.title,
        "short_description": p.short_description,
        "description": p.description,
        "client_name": p.client_name,
        "client_type": p.client_type,
        "industry_slug": p.industry_slug,
        "category_slug": p.category_slug,
        "icon": p.icon,
        "thumbnail_url": p.thumbnail_url,
        "hero_image_url": p.hero_image_url,
        "technologies": p.technologies,
        "features": p.features,
        "business_problem": p.business_problem,
        "challenges": p.challenges,
        "solution_overview": p.solution_overview,
        "architecture": p.architecture,
        "database_design": p.database_design,
        "api_architecture": p.api_architecture,
        "development_timeline": p.development_timeline,
        "security_measures": p.security_measures,
        "scalability_features": p.scalability_features,
        "performance_metrics": p.performance_metrics,
        "testing_strategy": p.testing_strategy,
        "deployment_info": p.deployment_info,
        "monitoring": p.monitoring,
        "screenshots": p.screenshots,
        "videos": p.videos,
        "key_features": p.key_features,
        "business_outcomes": p.business_outcomes,
        "client_testimonial": p.client_testimonial,
        "future_improvements": p.future_improvements,
        "project_duration": p.project_duration,
        "team_size": p.team_size,
        "year": p.year,
        "status": p.status,
        "is_featured": p.is_featured,
        "is_published": p.is_published,
        "view_count": p.view_count,
        "sort_order": p.sort_order,
        "seo_title": p.seo_title,
        "seo_description": p.seo_description,
        "seo_keywords": p.seo_keywords,
        "created_at": p.created_at.isoformat() if p.created_at else None,
        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
    }


@router.get("/search")
async def search_projects(
    q: str = Query(..., min_length=2),
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    like_pattern = f"%{escape_like(q)}%"
    relevance = (
        case(
            (Project.title.ilike(like_pattern, escape="\\"), 10),
            (Project.short_description.ilike(like_pattern, escape="\\"), 7),
            (Project.technologies.ilike(like_pattern, escape="\\"), 5),
            (Project.industry_slug.ilike(like_pattern, escape="\\"), 3),
            else_=1,
        )
    ).label("relevance")

    base = (
        select(Project, relevance)
        .where(
            Project.is_published == True,
            Project.deleted_at.is_(None),
            (
                Project.title.ilike(like_pattern, escape="\\")
                | Project.short_description.ilike(like_pattern, escape="\\")
                | Project.technologies.ilike(like_pattern, escape="\\")
                | Project.industry_slug.ilike(like_pattern, escape="\\")
            ),
        )
        .order_by(literal_column("relevance").desc(), Project.sort_order)
    )

    count_q = select(func.count()).select_from(base.subquery())
    total = (await db.execute(count_q)).scalar()

    offset = (page - 1) * page_size
    result = await db.execute(base.offset(offset).limit(page_size))
    rows = result.all()

    return {
        "items": [_project_dict(row[0]) for row in rows],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size if total else 0,
        "query": q,
    }


@router.get("/by-slug/{slug}")
async def get_project_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project).where(Project.slug == slug, Project.deleted_at.is_(None))
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    await db.execute(
        update(Project)
        .where(Project.id == project.id)
        .values(view_count=Project.view_count + 1)
    )
    await db.commit()

    d = _project_dict(project)
    d["view_count"] = (project.view_count or 0) + 1
    d["images"] = [
        {
            "id": img.id,
            "url": img.url,
            "alt": img.alt,
            "caption": img.caption,
            "category": img.category,
            "sort_order": img.sort_order,
        }
        for img in (project.images or [])
        if img.is_active
    ]
    return d


@router.get("/featured")
async def get_featured_projects(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project)
        .where(Project.is_featured == True, Project.is_published == True, Project.deleted_at.is_(None))
        .order_by(Project.sort_order)
        .limit(10)
    )
    projects = result.scalars().all()
    return [_project_dict(p) for p in projects]


@router.get("/categories")
async def list_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ProjectCategory)
        .where(ProjectCategory.is_active == True, ProjectCategory.deleted_at.is_(None))
        .order_by(ProjectCategory.order)
    )
    cats = result.scalars().all()
    return [{"id": c.id, "slug": c.slug, "name": c.name, "description": c.description, "icon": c.icon} for c in cats]


@router.get("")
async def list_projects(
    category: str = Query(None),
    industry: str = Query(None),
    technology: str = Query(None),
    status: str = Query(None),
    search: str = Query(None),
    sort: str = Query("sort_order"),
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [
        Project.is_published == True,
        Project.deleted_at.is_(None),
    ]
    if category:
        conditions.append(Project.category_slug == category)
    if industry:
        conditions.append(Project.industry_slug == industry)
    if status:
        conditions.append(Project.status == status)
    if search:
        conditions.append(Project.title.ilike(f"%{escape_like(search)}%", escape="\\"))
    if technology:
        conditions.append(Project.technologies.ilike(f"%{escape_like(technology)}%", escape="\\"))

    count_result = await db.execute(
        select(func.count()).select_from(Project).where(and_(*conditions))
    )
    total = count_result.scalar()

    order = Project.sort_order
    if sort == "year":
        order = Project.year.desc()
    elif sort == "title":
        order = Project.title
    elif sort == "newest":
        order = Project.created_at.desc()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Project).where(and_(*conditions)).order_by(order).offset(offset).limit(page_size)
    )
    projects = result.scalars().all()

    return {
        "items": [_project_dict(p) for p in projects],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size if total else 0,
    }


@router.get("/{slug}")
async def get_project(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project).where(Project.slug == slug, Project.deleted_at.is_(None))
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    await db.execute(
        update(Project)
        .where(Project.id == project.id)
        .values(view_count=Project.view_count + 1)
    )
    await db.commit()

    d = _project_dict(project)
    d["view_count"] = (project.view_count or 0) + 1
    d["images"] = [
        {
            "id": img.id,
            "url": img.url,
            "alt": img.alt,
            "caption": img.caption,
            "category": img.category,
            "sort_order": img.sort_order,
        }
        for img in (project.images or [])
        if img.is_active
    ]
    return d
