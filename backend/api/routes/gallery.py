from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import ProjectImage, Project


class ImageCreate(BaseModel):
    project_id: str
    url: str
    alt: Optional[str] = None
    caption: Optional[str] = None
    category: Optional[str] = None
    sort_order: int = 0

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])


@router.post("")
async def add_image(payload: ImageCreate, db: AsyncSession = Depends(get_db)):
    project_result = await db.execute(
        select(Project).where(Project.id == payload.project_id, Project.deleted_at.is_(None))
    )
    if not project_result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Project not found")

    image = ProjectImage(
        project_id=payload.project_id,
        url=payload.url,
        alt=payload.alt,
        caption=payload.caption,
        category=payload.category,
        sort_order=payload.sort_order,
    )
    db.add(image)
    await db.commit()
    await db.refresh(image)
    return {
        "id": image.id,
        "project_id": image.project_id,
        "url": image.url,
        "alt": image.alt,
        "caption": image.caption,
        "category": image.category,
        "sort_order": image.sort_order,
    }


@router.delete("/{image_id}")
async def delete_image(image_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ProjectImage).where(ProjectImage.id == image_id)
    )
    image = result.scalar_one_or_none()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    await db.delete(image)
    await db.commit()
    return {"detail": "Image deleted"}


@router.get("/{project_id}")
async def get_project_images(project_id: str, db: AsyncSession = Depends(get_db)):
    project_result = await db.execute(
        select(Project).where(Project.id == project_id, Project.deleted_at.is_(None))
    )
    if not project_result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Project not found")

    result = await db.execute(
        select(ProjectImage)
        .where(ProjectImage.project_id == project_id, ProjectImage.is_active == True)
        .order_by(ProjectImage.sort_order)
    )
    images = result.scalars().all()
    return [
        {
            "id": img.id,
            "url": img.url,
            "alt": img.alt,
            "caption": img.caption,
            "category": img.category,
            "sort_order": img.sort_order,
        }
        for img in images
    ]
