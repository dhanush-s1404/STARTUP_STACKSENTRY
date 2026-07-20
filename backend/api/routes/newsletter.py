from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


class NewsletterSubscribe(BaseModel):
    email: EmailStr


@router.post("/subscribe")
async def subscribe_newsletter(data: NewsletterSubscribe):
    return {
        "status": "success",
        "message": "Successfully subscribed to newsletter",
    }


@router.post("/unsubscribe")
async def unsubscribe_newsletter(data: NewsletterSubscribe):
    return {
        "status": "success",
        "message": "Successfully unsubscribed from newsletter",
    }
