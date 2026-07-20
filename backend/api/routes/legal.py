from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/api/legal", tags=["Legal"])


class LegalPageResponse(BaseModel):
    slug: str
    title: str
    description: str
    last_updated: str


LEGAL_PAGES = [
    {
        "slug": "privacy",
        "title": "Privacy Policy",
        "description": "Learn how we collect, use, and protect your personal information.",
        "last_updated": "2026-01-01",
    },
    {
        "slug": "terms",
        "title": "Terms & Conditions",
        "description": "Read the terms governing your use of our services.",
        "last_updated": "2026-01-01",
    },
    {
        "slug": "cookies",
        "title": "Cookie Policy",
        "description": "Understand how we use cookies.",
        "last_updated": "2026-01-01",
    },
    {
        "slug": "accessibility",
        "title": "Accessibility Statement",
        "description": "Our commitment to digital accessibility.",
        "last_updated": "2026-01-01",
    },
]


@router.get("/pages")
async def get_legal_pages():
    return {"status": "success", "data": LEGAL_PAGES}


@router.get("/pages/{slug}")
async def get_legal_page(slug: str):
    page = next((p for p in LEGAL_PAGES if p["slug"] == slug), None)
    if not page:
        raise HTTPException(status_code=404, detail="Legal page not found")
    return {"status": "success", "data": page}
