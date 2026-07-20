from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import CompanyInfo

router = APIRouter(prefix="/api/company", tags=["Company"])


@router.get("/mission")
async def get_mission(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CompanyInfo).where(CompanyInfo.key == "mission"))
    info = result.scalar_one_or_none()
    if not info:
        return {"key": "mission", "value": None}
    return {"key": info.key, "value": info.value}


@router.get("/vision")
async def get_vision(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CompanyInfo).where(CompanyInfo.key == "vision"))
    info = result.scalar_one_or_none()
    if not info:
        return {"key": "vision", "value": None}
    return {"key": info.key, "value": info.value}


@router.get("/info")
async def get_company_info(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CompanyInfo))
    infos = result.scalars().all()
    return {i.key: i.value for i in infos}
