from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from database.config import get_db
from database.models import ContactMessage, FAQ as FAQModel

router = APIRouter(prefix="/api/contact", tags=["Contact"])


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=255)
    subject: str = Field(..., min_length=1, max_length=500)
    message: str = Field(..., min_length=1)
    phone: Optional[str] = Field(None, max_length=50)
    inquiry_type: Optional[str] = Field(None, max_length=100)
    preferred_contact: Optional[str] = Field(None, max_length=50)
    consent: bool = Field(True)


class ConsultationRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=255)
    phone: Optional[str] = Field(None, max_length=50)
    country: Optional[str] = Field(None, max_length=100)
    project_type: Optional[str] = Field(None, max_length=100)
    budget_range: Optional[str] = Field(None, max_length=100)
    preferred_date: Optional[str] = Field(None, max_length=50)
    preferred_time: Optional[str] = Field(None, max_length=50)
    timezone: Optional[str] = Field(None, max_length=100)
    meeting_type: Optional[str] = Field(None, max_length=50)
    project_goals: Optional[str] = Field(None)
    expected_timeline: Optional[str] = Field(None, max_length=100)
    preferred_contact_method: Optional[str] = Field(None, max_length=50)
    additional_notes: Optional[str] = Field(None)
    consent: bool = Field(True)


class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: Optional[str] = Field(None, max_length=255)


@router.post("")
async def submit_contact(body: ContactRequest, db: AsyncSession = Depends(get_db)):
    message = ContactMessage(
        name=body.name,
        email=body.email,
        company=body.company,
        subject=body.subject,
        message=body.message,
    )
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return {
        "status": "success",
        "message": "Thank you for your message. We will get back to you shortly.",
        "id": message.id,
    }


@router.post("/consultation")
async def submit_consultation(body: ConsultationRequest, db: AsyncSession = Depends(get_db)):
    from database.models import ConsultationRequest as ConsultationRequestModel

    cr = ConsultationRequestModel(
        contact_name=body.name,
        email=body.email,
        company_name=body.company or "",
        phone=body.phone,
        industry="",
        project_goals=body.project_goals,
        budget_range=body.budget_range,
        timeline=body.expected_timeline,
        meeting_preference=body.meeting_type,
        additional_info=body.additional_notes,
    )
    db.add(cr)
    await db.commit()
    await db.refresh(cr)
    return {
        "status": "success",
        "message": "Consultation request submitted successfully. We will contact you shortly.",
        "id": cr.id,
    }


@router.post("/newsletter")
async def subscribe_newsletter(body: NewsletterSubscribe, db: AsyncSession = Depends(get_db)):
    from database.models import NewsletterSubscriber

    existing = await db.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == body.email)
    )
    if existing.scalar_one_or_none():
        return {"status": "exists", "message": "Email already subscribed."}

    subscriber = NewsletterSubscriber(email=body.email)
    db.add(subscriber)
    await db.commit()
    await db.refresh(subscriber)
    return {
        "status": "success",
        "message": "Successfully subscribed to our newsletter.",
        "id": subscriber.id,
    }


@router.get("/faqs")
async def list_contact_faqs(
    category: str = Query(None),
    search: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(FAQModel).where(FAQModel.is_active == True)

    if category:
        query = query.where(FAQModel.category == category)
    if search:
        from sqlalchemy import or_
        query = query.where(
            or_(
                FAQModel.question.ilike(f"%{search}%"),
                FAQModel.answer.ilike(f"%{search}%"),
            )
        )

    query = query.order_by(FAQModel.order)
    result = await db.execute(query)
    faqs = result.scalars().all()
    return [
        {
            "id": faq.id,
            "question": faq.question,
            "answer": faq.answer,
            "category": faq.category,
            "tags": faq.tags,
        }
        for faq in faqs
    ]


@router.get("/inquiry-types")
async def list_inquiry_types():
    return [
        {"id": "general", "label": "General Question", "description": "General inquiries about StackSentry"},
        {"id": "project", "label": "New Project", "description": "Start a new software project"},
        {"id": "partnership", "label": "Partnership", "description": "Explore partnership opportunities"},
        {"id": "support", "label": "Support", "description": "Get support for an existing project"},
        {"id": "careers", "label": "Careers", "description": "Inquire about career opportunities"},
        {"id": "media", "label": "Media Inquiry", "description": "Press and media inquiries"},
        {"id": "other", "label": "Other", "description": "Something else"},
    ]
