import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from database.config import get_db
from database.models import Solution

router = APIRouter(prefix="/api/solutions", tags=["Solutions"])


@router.get("")
async def list_solutions(
    search: Optional[str] = Query(None, description="Search by title or description"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Solution).where(Solution.is_active == True)
    if search:
        stmt = stmt.where(
            or_(
                Solution.title.ilike(f"%{search}%"),
                Solution.description.ilike(f"%{search}%"),
            )
        )
    stmt = stmt.order_by(Solution.order)
    result = await db.execute(stmt)
    solutions = result.scalars().all()
    return [
        {
            "id": s.id,
            "slug": s.slug,
            "title": s.title,
            "description": s.description,
            "short_description": s.short_description,
            "icon": s.icon,
            "features": json.loads(s.key_features) if s.key_features else [],
        }
        for s in solutions
    ]


@router.get("/{slug}")
async def get_solution(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Solution).where(Solution.slug == slug))
    solution = result.scalar_one_or_none()
    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")
    return {
        "id": solution.id,
        "slug": solution.slug,
        "title": solution.title,
        "description": solution.description,
        "short_description": solution.short_description,
        "icon": solution.icon,
        "business_problems": json.loads(solution.business_problems) if solution.business_problems else [],
        "key_features": json.loads(solution.key_features) if solution.key_features else [],
        "business_benefits": json.loads(solution.business_benefits) if solution.business_benefits else [],
        "technologies": json.loads(solution.technologies) if solution.technologies else [],
        "pricing_tier": solution.pricing_tier,
        "status": solution.status,
        "seo_title": solution.seo_title,
        "seo_description": solution.seo_description,
    }
