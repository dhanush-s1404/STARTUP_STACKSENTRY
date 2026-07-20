from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, case, literal_column
from database.config import get_db
from database.models import Job


class JobCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    department_id: Optional[str] = None
    location_id: Optional[str] = None
    employment_type: Optional[str] = None
    experience_level: Optional[str] = None
    work_model: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    salary_currency: Optional[str] = "USD"
    is_active: Optional[bool] = True
    is_featured: Optional[bool] = False
    posted_at: Optional[str] = None
    application_deadline: Optional[str] = None
    responsibilities: Optional[str] = None
    requirements: Optional[str] = None
    preferred_skills: Optional[str] = None
    benefits: Optional[str] = None
    technology_stack: Optional[str] = None
    interview_process: Optional[str] = None
    team_info: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None
    order: Optional[int] = 0


class JobUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    department_id: Optional[str] = None
    location_id: Optional[str] = None
    employment_type: Optional[str] = None
    experience_level: Optional[str] = None
    work_model: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    salary_currency: Optional[str] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None
    posted_at: Optional[str] = None
    application_deadline: Optional[str] = None
    responsibilities: Optional[str] = None
    requirements: Optional[str] = None
    preferred_skills: Optional[str] = None
    benefits: Optional[str] = None
    technology_stack: Optional[str] = None
    interview_process: Optional[str] = None
    team_info: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None
    order: Optional[int] = None


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


@router.post("")
async def create_job(payload: JobCreate, db: AsyncSession = Depends(get_db)):
    job = Job(
        title=payload.title,
        slug=payload.slug,
        description=payload.description,
        short_description=payload.short_description,
        department_id=payload.department_id,
        location_id=payload.location_id,
        employment_type=payload.employment_type,
        experience_level=payload.experience_level,
        work_model=payload.work_model,
        salary_min=payload.salary_min,
        salary_max=payload.salary_max,
        salary_currency=payload.salary_currency,
        is_active=payload.is_active,
        is_featured=payload.is_featured,
        posted_at=payload.posted_at,
        application_deadline=payload.application_deadline,
        responsibilities=payload.responsibilities,
        requirements=payload.requirements,
        preferred_skills=payload.preferred_skills,
        benefits=payload.benefits,
        technology_stack=payload.technology_stack,
        interview_process=payload.interview_process,
        team_info=payload.team_info,
        seo_title=payload.seo_title,
        seo_description=payload.seo_description,
        seo_keywords=payload.seo_keywords,
        order=payload.order,
    )
    db.add(job)
    await db.commit()
    await db.refresh(job)
    return _job_dict(job)


@router.put("/{job_id}")
async def update_job(job_id: str, payload: JobUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Job).where(Job.id == job_id, Job.deleted_at.is_(None))
    )
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(job, field, value)

    await db.commit()
    await db.refresh(job)
    return _job_dict(job)


@router.delete("/{job_id}")
async def delete_job(job_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Job).where(Job.id == job_id, Job.deleted_at.is_(None))
    )
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Job deleted"}
