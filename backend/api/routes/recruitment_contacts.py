from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from database.config import get_db
from database.models import RecruitmentContact


class RecruitmentContactCreate(BaseModel):
    contact_type: str
    label: str
    value: str
    url: Optional[str] = None
    icon: Optional[str] = None
    is_active: Optional[bool] = True
    order: Optional[int] = 0


class RecruitmentContactUpdate(BaseModel):
    contact_type: Optional[str] = None
    label: Optional[str] = None
    value: Optional[str] = None
    url: Optional[str] = None
    icon: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


router = APIRouter(prefix="/api/recruitment-contacts", tags=["Recruitment Contacts"])


def _contact_dict(c: RecruitmentContact) -> dict:
    return {
        "id": c.id,
        "contact_type": c.contact_type,
        "label": c.label,
        "value": c.value,
        "url": c.url,
        "icon": c.icon,
        "is_active": c.is_active,
        "order": c.order,
        "created_at": c.created_at.isoformat() if c.created_at else None,
        "updated_at": c.updated_at.isoformat() if c.updated_at else None,
    }


@router.get("")
async def list_recruitment_contacts(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    conditions = [RecruitmentContact.is_active == True, RecruitmentContact.deleted_at.is_(None)]

    count_result = await db.execute(
        select(func.count()).select_from(RecruitmentContact).where(and_(*conditions))
    )
    total = count_result.scalar()

    offset = (page - 1) * page_size
    result = await db.execute(
        select(RecruitmentContact)
        .where(and_(*conditions))
        .order_by(RecruitmentContact.order)
        .offset(offset)
        .limit(page_size)
    )
    items = result.scalars().all()
    return {
        "items": [_contact_dict(c) for c in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.post("")
async def create_recruitment_contact(payload: RecruitmentContactCreate, db: AsyncSession = Depends(get_db)):
    contact = RecruitmentContact(
        contact_type=payload.contact_type,
        label=payload.label,
        value=payload.value,
        url=payload.url,
        icon=payload.icon,
        is_active=payload.is_active,
        order=payload.order,
    )
    db.add(contact)
    await db.commit()
    await db.refresh(contact)
    return _contact_dict(contact)


@router.put("/{contact_id}")
async def update_recruitment_contact(contact_id: str, payload: RecruitmentContactUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(RecruitmentContact).where(
            RecruitmentContact.id == contact_id, RecruitmentContact.deleted_at.is_(None)
        )
    )
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Recruitment contact not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(contact, field, value)

    await db.commit()
    await db.refresh(contact)
    return _contact_dict(contact)


@router.delete("/{contact_id}")
async def delete_recruitment_contact(contact_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(RecruitmentContact).where(
            RecruitmentContact.id == contact_id, RecruitmentContact.deleted_at.is_(None)
        )
    )
    contact = result.scalar_one_or_none()
    if not contact:
        raise HTTPException(status_code=404, detail="Recruitment contact not found")

    contact.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Recruitment contact deleted"}
