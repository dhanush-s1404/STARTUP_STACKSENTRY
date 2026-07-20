from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import CultureItem

router = APIRouter(prefix="/api/culture", tags=["Culture"])


@router.get("")
async def list_culture(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CultureItem)
        .where(CultureItem.is_active == True)
        .order_by(CultureItem.sort_order)
    )
    items = result.scalars().all()
    return [
        {
            "id": i.id,
            "title": i.title,
            "description": i.description,
            "image_url": i.image_url,
            "category": i.category,
        }
        for i in items
    ]
