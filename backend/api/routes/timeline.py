from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import CompanyTimeline

router = APIRouter(prefix="/api/timeline", tags=["Timeline"])


@router.get("")
async def list_timeline(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CompanyTimeline)
        .where(CompanyTimeline.is_active == True)
        .order_by(
            CompanyTimeline.year,
            CompanyTimeline.month,
            CompanyTimeline.sort_order,
        )
    )

    events = result.scalars().all()

    return [
        {
            "id": e.id,
            "year": e.year,
            "month": e.month,
            "title": e.title,
            "description": e.description,
        }
        for e in events
    ]