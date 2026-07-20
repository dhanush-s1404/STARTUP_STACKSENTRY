from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/footer", tags=["Footer"])


class FooterLinkResponse(BaseModel):
    section: str
    label: str
    href: str
    order: int
    open_external: bool


@router.get("/links")
async def get_footer_links():
    return {
        "status": "success",
        "data": {
            "sections": [
                {
                    "title": "Services",
                    "links": [
                        {"label": "AI Automation", "href": "/solutions/ai-automation"},
                        {"label": "Cloud Platform", "href": "/solutions/cloud"},
                        {"label": "Data Analytics", "href": "/solutions/analytics"},
                        {"label": "Security Suite", "href": "/solutions/security"},
                        {"label": "Custom Development", "href": "/services"},
                    ],
                },
                {
                    "title": "Solutions",
                    "links": [
                        {"label": "Enterprise", "href": "/solutions/enterprise"},
                        {"label": "Startups", "href": "/solutions/startups"},
                        {"label": "Healthcare", "href": "/industries/healthcare"},
                        {"label": "Finance", "href": "/industries/finance"},
                        {"label": "All Industries", "href": "/industries"},
                    ],
                },
                {
                    "title": "Portfolio",
                    "links": [
                        {"label": "Case Studies", "href": "/case-studies"},
                        {"label": "Client Success", "href": "/client-success"},
                        {"label": "Testimonials", "href": "/testimonials"},
                        {"label": "Technology", "href": "/technology"},
                    ],
                },
                {
                    "title": "Blog",
                    "links": [
                        {"label": "Latest Posts", "href": "/blog"},
                        {"label": "Engineering", "href": "/engineering"},
                        {"label": "Industry Insights", "href": "/blog"},
                        {"label": "Tutorials", "href": "/blog"},
                    ],
                },
                {
                    "title": "Company",
                    "links": [
                        {"label": "About Us", "href": "/company/about"},
                        {"label": "Careers", "href": "/careers"},
                        {"label": "Contact", "href": "/contact"},
                        {"label": "Consultation", "href": "/consultation"},
                    ],
                },
            ],
            "company": {
                "name": "StackSentry Technologies",
                "description": "Delivering world-class AI-powered enterprise software solutions.",
                "email": "hello@stacksentry.com",
                "phone": "+1 (555) 012-3456",
                "city": "San Francisco",
                "state": "CA",
            },
            "social": [
                {"name": "Twitter", "url": "https://twitter.com/stacksentry"},
                {"name": "GitHub", "url": "https://github.com/stacksentry"},
                {"name": "LinkedIn", "url": "https://linkedin.com/company/stacksentry"},
                {"name": "YouTube", "url": "https://youtube.com/@stacksentry"},
            ],
        },
    }


@router.get("/company-info")
async def get_company_info():
    return {
        "status": "success",
        "data": {
            "name": "StackSentry Technologies",
            "tagline": "Building Intelligent Software for Tomorrow",
            "description": "StackSentry Technologies delivers world-class AI-powered enterprise software solutions. Trusted by organizations worldwide.",
            "email": "hello@stacksentry.com",
            "phone": "+1 (555) 012-3456",
            "support_email": "support@stacksentry.com",
            "address": {
                "street": "123 Innovation Drive",
                "city": "San Francisco",
                "state": "CA",
                "zip": "94105",
                "country": "United States",
            },
            "social": {
                "twitter": "https://twitter.com/stacksentry",
                "github": "https://github.com/stacksentry",
                "linkedin": "https://linkedin.com/company/stacksentry",
                "youtube": "https://youtube.com/@stacksentry",
            },
        },
    }
