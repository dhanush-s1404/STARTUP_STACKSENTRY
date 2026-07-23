from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, case, literal_column
from database.config import get_db
from database.models import Job


router = APIRouter(prefix="/api/jobs", tags=["Jobs"])


def _job_dict(j: Job) -> dict:
    return {
        "id": j.id,
        "title": j.title,
        "slug": j.slug,
        "description": j.description,
        "short_description": j.short_description,
        "department_id": j.department_id,
        "location_id": j.location_id,
        "employment_type": j.employment_type,
        "experience_level": j.experience_level,
        "work_model": j.work_model,
        "salary_min": j.salary_min,
        "salary_max": j.salary_max,
        "salary_currency": j.salary_currency,
        "is_active": j.is_active,
        "is_featured": j.is_featured,
        "posted_at": j.posted_at.isoformat() if j.posted_at else None,
        "application_deadline": j.application_deadline.isoformat() if j.application_deadline else None,
        "responsibilities": j.responsibilities,
        "requirements": j.requirements,
        "preferred_skills": j.preferred_skills,
        "benefits": j.benefits,
        "technology_stack": j.technology_stack,
        "interview_process": j.interview_process,
        "team_info": j.team_info,
        "seo_title": j.seo_title,
        "seo_description": j.seo_description,
        "seo_keywords": j.seo_keywords,
        "view_count": j.view_count,
        "order": j.order,
        "created_at": j.created_at.isoformat() if j.created_at else None,
        "updated_at": j.updated_at.isoformat() if j.updated_at else None,
    }


@router.get("/search")
async def search_jobs(
    q: str = Query(..., min_length=2),
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    like_pattern = f"%{q}%"
    relevance = (
        case(
            (Job.title.ilike(like_pattern), 10),
            (Job.description.ilike(like_pattern), 7),
            (Job.preferred_skills.ilike(like_pattern), 5),
            else_=1,
        )
    ).label("relevance")

    base = (
        select(Job, relevance)
        .where(
            Job.is_active == True,
            Job.deleted_at.is_(None),
            (
                Job.title.ilike(like_pattern)
                | Job.description.ilike(like_pattern)
                | Job.preferred_skills.ilike(like_pattern)
            ),
        )
        .order_by(literal_column("relevance").desc(), Job.order)
    )

    count_q = select(func.count()).select_from(base.subquery())
    total = (await db.execute(count_q)).scalar()

    offset = (page - 1) * page_size
    result = await db.execute(base.offset(offset).limit(page_size))
    rows = result.all()

    return {
        "items": [_job_dict(row[0]) for row in rows],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size if total else 0,
        "query": q,
    }


@router.get("/featured")
async def get_featured_jobs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Job)
        .where(Job.is_featured == True, Job.is_active == True, Job.deleted_at.is_(None))
        .order_by(Job.order)
        .limit(10)
    )
    jobs = result.scalars().all()
    return [_job_dict(j) for j in jobs]


@router.get("/by-slug/{slug}")
async def get_job_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Job).where(Job.slug == slug, Job.deleted_at.is_(None))
    )
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job.view_count = (job.view_count or 0) + 1
    await db.commit()
    await db.refresh(job)

    return _job_dict(job)


@router.get("")
async def list_jobs(
    department: str = Query(None),
    location: str = Query(None),
    employment_type: str = Query(None),
    experience_level: str = Query(None),
    work_model: str = Query(None),
    salary_min: int = Query(None),
    salary_max: int = Query(None),
    search: str = Query(None),
    featured: bool = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [Job.is_active == True, Job.deleted_at.is_(None)]
    if department:
        conditions.append(Job.department_id == department)
    if location:
        conditions.append(Job.location_id == location)
    if employment_type:
        conditions.append(Job.employment_type == employment_type)
    if experience_level:
        conditions.append(Job.experience_level == experience_level)
    if work_model:
        conditions.append(Job.work_model == work_model)
    if salary_min is not None:
        conditions.append(Job.salary_max >= salary_min)
    if salary_max is not None:
        conditions.append(Job.salary_min <= salary_max)
    if featured is not None:
        conditions.append(Job.is_featured == featured)
    if search:
        conditions.append(Job.title.ilike(f"%{search}%"))

    count_result = await db.execute(
        select(func.count()).select_from(Job).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Job)
        .where(and_(*conditions))
        .order_by(Job.order)
        .offset(offset)
        .limit(page_size)
    )
    jobs = result.scalars().all()
    return {
        "items": [_job_dict(j) for j in jobs],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }



