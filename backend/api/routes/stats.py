from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import CompanyStat

router = APIRouter(prefix="/api/stats", tags=["Stats"])


@router.get("")
async def get_stats(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CompanyStat)
        .where(CompanyStat.is_active == True)
        .order_by(CompanyStat.sort_order)
    )
    stats = result.scalars().all()
    return [
        {
            "id": s.id,
            "label": s.label,
            "value": s.value,
            "description": s.description,
            "icon": s.icon,
        }
        for s in stats
    ]
