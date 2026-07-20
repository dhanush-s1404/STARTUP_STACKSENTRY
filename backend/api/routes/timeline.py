from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import TimelineEvent

router = APIRouter(prefix="/api/timeline", tags=["Timeline"])


@router.get("")
async def list_timeline(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(TimelineEvent)
        .where(TimelineEvent.is_active == True)
        .order_by(TimelineEvent.year, TimelineEvent.month, TimelineEvent.sort_order)
    )
    events = result.scalars().all()
    return [
        {
            "id": e.id,
            "year": e.year,
            "month": e.month,
            "title": e.title,
            "description": e.description,
            "event_type": e.event_type,
        }
        for e in events
    ]
