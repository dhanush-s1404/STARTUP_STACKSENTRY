from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import Certification

router = APIRouter(prefix="/api/certifications", tags=["Certifications"])


@router.get("")
async def list_certifications(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Certification)
        .where(Certification.is_active == True)
        .order_by(Certification.sort_order)
    )
    certs = result.scalars().all()
    return [
        {
            "id": c.id,
            "name": c.name,
            "issuer": c.issuer,
            "date_obtained": c.date_obtained.isoformat() if c.date_obtained else None,
            "expiry_date": c.expiry_date.isoformat() if c.expiry_date else None,
            "description": c.description,
            "logo_url": c.logo_url,
        }
        for c in certs
    ]
