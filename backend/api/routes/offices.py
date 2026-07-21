from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import Office

router = APIRouter(prefix="/api/offices", tags=["Offices"])


@router.get("")
async def list_offices(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Office)
        .where(Office.is_active == True)
        .order_by(Office.order)
    )
    offices = result.scalars().all()
    return [
        {
            "id": o.id,
            "city": o.city,
            "country": o.country,
            "address": o.address,
            "is_hq": o.is_hq,
            "latitude": o.latitude,
            "longitude": o.longitude,
        }
        for o in offices
    ]
