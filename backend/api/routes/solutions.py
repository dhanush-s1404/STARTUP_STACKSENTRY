import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from database.config import get_db
from database.models import Solution
from api.utils import escape_like

router = APIRouter(prefix="/api/solutions", tags=["Solutions"])


def _json_load(val):
    if not val:
        return []
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return []


@router.get("")
async def list_solutions(
    search: Optional[str] = Query(None, description="Search by title or description"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Solution).where(Solution.is_active == True, Solution.deleted_at.is_(None))
    if search:
        stmt = stmt.where(
            or_(
                Solution.title.ilike(f"%{escape_like(search)}%", escape="\\"),
                Solution.description.ilike(f"%{escape_like(search)}%", escape="\\"),
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
            "features": _json_load(s.key_features),
        }
        for s in solutions
    ]


@router.get("/{slug}")
async def get_solution(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Solution).where(Solution.slug == slug, Solution.deleted_at.is_(None)))
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
        "business_problems": _json_load(solution.business_problems),
        "key_features": _json_load(solution.key_features),
        "business_benefits": _json_load(solution.business_benefits),
        "technologies": _json_load(solution.technologies),
        "pricing_tier": solution.pricing_tier,
        "status": solution.status,
        "seo_title": solution.seo_title,
        "seo_description": solution.seo_description,
    }
