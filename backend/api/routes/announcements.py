from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter(prefix="/api/announcements", tags=["Announcements"])


class AnnouncementResponse(BaseModel):
    id: str
    message: str
    type: str
    href: Optional[str] = None
    link_text: Optional[str] = None
    is_dismissible: bool
    priority: int


@router.get("/active")
async def get_active_announcements():
    return {
        "status": "success",
        "data": [
            {
                "id": "welcome",
                "message": "Welcome to StackSentry Technologies — Building Intelligent Software for Tomorrow",
                "type": "info",
                "href": "/company/about",
                "link_text": "Learn More",
                "is_dismissible": True,
                "priority": 1,
            }
        ],
    }
