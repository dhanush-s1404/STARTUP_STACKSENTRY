from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import Location


class LocationCreate(BaseModel):
    name: str
    slug: str
    city: Optional[str] = None
    country: Optional[str] = None
    region: Optional[str] = None
    address: Optional[str] = None
    is_remote: Optional[bool] = False
    timezone: Optional[str] = None
    office_size: Optional[str] = None
    country_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class LocationUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    region: Optional[str] = None
    address: Optional[str] = None
    is_remote: Optional[bool] = None
    timezone: Optional[str] = None
    office_size: Optional[str] = None
    country_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/locations", tags=["Locations"])


def _location_dict(loc: Location) -> dict:
    return {
        "id": loc.id,
        "name": loc.name,
        "slug": loc.slug,
        "city": loc.city,
        "country": loc.country,
        "region": loc.region,
        "address": loc.address,
        "is_remote": loc.is_remote,
        "timezone": loc.timezone,
        "office_size": loc.office_size,
        "country_code": loc.country_code,
        "latitude": loc.latitude,
        "longitude": loc.longitude,
        "is_active": loc.is_active,
        "order": loc.order,
        "created_at": loc.created_at.isoformat() if loc.created_at else None,
        "updated_at": loc.updated_at.isoformat() if loc.updated_at else None,
    }


@router.get("")
async def list_locations(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [Location.is_active == True, Location.deleted_at.is_(None)]

    count_result = await db.execute(
        select(func.count()).select_from(Location).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Location)
        .where(and_(*conditions))
        .order_by(Location.order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_location_dict(loc) for loc in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/by-slug/{slug}")
async def get_location_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Location).where(
            Location.slug == slug, Location.deleted_at.is_(None)
        )
    )
    location = result.scalar_one_or_none()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return _location_dict(location)


@router.post("")
async def create_location(payload: LocationCreate, db: AsyncSession = Depends(get_db)):
    location = Location(
        name=payload.name,
        slug=payload.slug,
        city=payload.city,
        country=payload.country,
        region=payload.region,
        address=payload.address,
        is_remote=payload.is_remote,
        timezone=payload.timezone,
        office_size=payload.office_size,
        country_code=payload.country_code,
        latitude=payload.latitude,
        longitude=payload.longitude,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(location)
    await db.commit()
    await db.refresh(location)
    return _location_dict(location)


@router.put("/{location_id}")
async def update_location(location_id: str, payload: LocationUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Location).where(
            Location.id == location_id, Location.deleted_at.is_(None)
        )
    )
    location = result.scalar_one_or_none()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(location, field, value)

    await db.commit()
    await db.refresh(location)
    return _location_dict(location)


@router.delete("/{location_id}")
async def delete_location(location_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Location).where(
            Location.id == location_id, Location.deleted_at.is_(None)
        )
    )
    location = result.scalar_one_or_none()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    location.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Location deleted"}
