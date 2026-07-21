from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.config import get_db
from database.models import CompanyCulture

router = APIRouter(prefix="/api/culture", tags=["Culture"])


@router.get("")
async def list_culture(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CompanyCulture)
        .where(CompanyCulture.is_active == True)
        .order_by(CompanyCulture.order)
    )

    items = result.scalars().all()

    return [
        {
            "id": i.id,
            "slug": i.slug,
            "title": i.title,
            "description": i.description,
            "icon": i.icon,
            "highlights": i.highlights,
        }
        for i in items
    ]