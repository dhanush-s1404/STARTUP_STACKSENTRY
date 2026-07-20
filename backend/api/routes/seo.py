from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import SEOSetting

router = APIRouter(prefix="/api/seo", tags=["SEO"])


@router.get("/{page_path:path}")
async def get_seo_settings(page_path: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(SEOSetting).where(SEOSetting.page_path == f"/{page_path}")
    )
    seo = result.scalar_one_or_none()
    if not seo:
        raise HTTPException(status_code=404, detail="SEO settings not found for this page")
    return {
        "id": seo.id,
        "page_path": seo.page_path,
        "title": seo.title,
        "description": seo.description,
        "keywords": seo.keywords,
        "og_title": seo.og_title,
        "og_description": seo.og_description,
        "og_image_url": seo.og_image_url,
        "canonical_url": seo.canonical_url,
    }
