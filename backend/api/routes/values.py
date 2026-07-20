from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import CompanyValue

router = APIRouter(prefix="/api/values", tags=["Values"])


@router.get("")
async def list_values(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CompanyValue)
        .where(CompanyValue.is_active == True)
        .order_by(CompanyValue.sort_order)
    )
    values = result.scalars().all()
    return [
        {
            "id": v.id,
            "title": v.title,
            "description": v.description,
            "icon": v.icon,
        }
        for v in values
    ]
