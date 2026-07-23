from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from database.config import get_db
from database.models import ClientSuccessMetric


class MetricCreate(BaseModel):
    label: str
    value: str
    suffix: Optional[str] = None
    prefix: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    icon: Optional[str] = None


class MetricUpdate(BaseModel):
    label: Optional[str] = None
    value: Optional[str] = None
    suffix: Optional[str] = None
    prefix: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    icon: Optional[str] = None

router = APIRouter(prefix="/api/client-success", tags=["Client Success"])


def _metric_dict(m: ClientSuccessMetric) -> dict:
    return {
        "id": m.id,
        "label": m.label,
        "value": m.value,
        "suffix": m.suffix,
        "prefix": m.prefix,
        "description": m.description,
        "category": m.category,
        "icon": m.icon,
        "sort_order": m.sort_order,
        "created_at": m.created_at.isoformat() if m.created_at else None,
    }


@router.post("")
async def create_metric(payload: MetricCreate, db: AsyncSession = Depends(get_db)):
    metric = ClientSuccessMetric(
        label=payload.label,
        value=payload.value,
        suffix=payload.suffix,
        prefix=payload.prefix,
        description=payload.description,
        category=payload.category,
        icon=payload.icon,
    )
    db.add(metric)
    await db.commit()
    await db.refresh(metric)
    return _metric_dict(metric)


@router.put("/{metric_id}")
async def update_metric(metric_id: str, payload: MetricUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ClientSuccessMetric).where(
            ClientSuccessMetric.id == metric_id, ClientSuccessMetric.deleted_at.is_(None)
        )
    )
    metric = result.scalar_one_or_none()
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(metric, field, value)

    await db.commit()
    await db.refresh(metric)
    return _metric_dict(metric)


@router.delete("/{metric_id}")
async def delete_metric(metric_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ClientSuccessMetric).where(
            ClientSuccessMetric.id == metric_id, ClientSuccessMetric.deleted_at.is_(None)
        )
    )
    metric = result.scalar_one_or_none()
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")

    from datetime import datetime, timezone
    metric.deleted_at = datetime.now(timezone.utc)
    await db.commit()
    return {"detail": "Metric deleted"}


@router.get("")
async def list_client_success_metrics(
    category: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    conditions = [
        ClientSuccessMetric.is_active == True,
        ClientSuccessMetric.deleted_at.is_(None),
    ]
    if category:
        conditions.append(ClientSuccessMetric.category == category)

    result = await db.execute(
        select(ClientSuccessMetric)
        .where(and_(*conditions))
        .order_by(ClientSuccessMetric.sort_order)
    )
    metrics = result.scalars().all()
    return [_metric_dict(m) for m in metrics]


@router.get("/{metric_id}")
async def get_client_success_metric(metric_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ClientSuccessMetric).where(
            ClientSuccessMetric.id == metric_id, ClientSuccessMetric.deleted_at.is_(None)
        )
    )
    metric = result.scalar_one_or_none()
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")
    return _metric_dict(metric)
