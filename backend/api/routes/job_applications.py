from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import JobApplication, User
from api.deps import get_current_admin


class ApplicationCreate(BaseModel):
    job_id: str
    full_name: str
    email: str
    phone: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None
    years_of_experience: Optional[int] = None
    skills: Optional[str] = None
    expected_salary: Optional[int] = None
    current_salary: Optional[int] = None
    notice_period: Optional[str] = None
    availability: Optional[str] = None
    education: Optional[str] = None
    certifications: Optional[str] = None
    projects: Optional[str] = None
    languages: Optional[str] = None
    agreement: Optional[bool] = False


class StatusUpdate(BaseModel):
    status: str


router = APIRouter(prefix="/api/job-applications", tags=["Job Applications"])


def _application_dict(a: JobApplication) -> dict:
    return {
        "id": a.id,
        "job_id": a.job_id,
        "full_name": a.full_name,
        "email": a.email,
        "phone": a.phone,
        "country": a.country,
        "city": a.city,
        "linkedin_url": a.linkedin_url,
        "github_url": a.github_url,
        "portfolio_url": a.portfolio_url,
        "resume_url": a.resume_url,
        "cover_letter": a.cover_letter,
        "years_of_experience": a.years_of_experience,
        "skills": a.skills,
        "expected_salary": a.expected_salary,
        "current_salary": a.current_salary,
        "notice_period": a.notice_period,
        "availability": a.availability,
        "education": a.education,
        "certifications": a.certifications,
        "projects": a.projects,
        "languages": a.languages,
        "agreement": a.agreement,
        "status": a.status,
        "created_at": a.created_at.isoformat() if a.created_at else None,
        "updated_at": a.updated_at.isoformat() if a.updated_at else None,
    }


@router.get("")
async def list_applications(
    job_id: str = Query(None),
    status: str = Query(None),
    search: str = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    conditions = [JobApplication.deleted_at.is_(None)]
    if job_id:
        conditions.append(JobApplication.job_id == job_id)
    if status:
        conditions.append(JobApplication.status == status)
    if search:
        conditions.append(
            JobApplication.full_name.ilike(f"%{search}%")
            | JobApplication.email.ilike(f"%{search}%")
        )

    count_result = await db.execute(
        select(func.count()).select_from(JobApplication).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(JobApplication)
        .where(and_(*conditions))
        .order_by(JobApplication.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_application_dict(a) for a in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.post("")
async def create_application(payload: ApplicationCreate, db: AsyncSession = Depends(get_db)):
    application = JobApplication(
        job_id=payload.job_id,
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        country=payload.country,
        city=payload.city,
        linkedin_url=payload.linkedin_url,
        github_url=payload.github_url,
        portfolio_url=payload.portfolio_url,
        resume_url=payload.resume_url,
        cover_letter=payload.cover_letter,
        years_of_experience=payload.years_of_experience,
        skills=payload.skills,
        expected_salary=payload.expected_salary,
        current_salary=payload.current_salary,
        notice_period=payload.notice_period,
        availability=payload.availability,
        education=payload.education,
        certifications=payload.certifications,
        projects=payload.projects,
        languages=payload.languages,
        agreement=payload.agreement,
    )
    db.add(application)
    await db.commit()
    await db.refresh(application)
    return _application_dict(application)


@router.put("/{application_id}/status")
async def update_application_status(
    application_id: str, payload: StatusUpdate, db: AsyncSession = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    result = await db.execute(
        select(JobApplication).where(
            JobApplication.id == application_id, JobApplication.deleted_at.is_(None)
        )
    )
    application = result.scalar_one_or_none()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    application.status = payload.status
    await db.commit()
    await db.refresh(application)
    return _application_dict(application)
