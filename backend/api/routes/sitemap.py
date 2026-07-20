from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/sitemap", tags=["Sitemap"])


class SitemapEntry(BaseModel):
    path: str
    title: str
    section: str
    priority: float
    changefreq: str


SITEMAP_DATA: List[SitemapEntry] = [
    SitemapEntry(path="/", title="Home", section="Main", priority=1.0, changefreq="weekly"),
    SitemapEntry(path="/services", title="Services", section="Main", priority=0.9, changefreq="weekly"),
    SitemapEntry(path="/solutions", title="Solutions", section="Main", priority=0.9, changefreq="weekly"),
    SitemapEntry(path="/industries", title="Industries", section="Main", priority=0.9, changefreq="weekly"),
    SitemapEntry(path="/portfolio", title="Portfolio", section="Main", priority=0.9, changefreq="weekly"),
    SitemapEntry(path="/case-studies", title="Case Studies", section="Resources", priority=0.8, changefreq="weekly"),
    SitemapEntry(path="/blog", title="Blog", section="Resources", priority=0.9, changefreq="daily"),
    SitemapEntry(path="/technology", title="Technology", section="Resources", priority=0.8, changefreq="weekly"),
    SitemapEntry(path="/engineering", title="Engineering", section="Resources", priority=0.7, changefreq="weekly"),
    SitemapEntry(path="/testimonials", title="Testimonials", section="Resources", priority=0.7, changefreq="monthly"),
    SitemapEntry(path="/company/about", title="About Us", section="Company", priority=0.8, changefreq="monthly"),
    SitemapEntry(path="/careers", title="Careers", section="Company", priority=0.8, changefreq="weekly"),
    SitemapEntry(path="/careers/jobs", title="Open Positions", section="Company", priority=0.8, changefreq="daily"),
    SitemapEntry(path="/contact", title="Contact", section="Company", priority=0.8, changefreq="monthly"),
    SitemapEntry(path="/consultation", title="Consultation", section="Company", priority=0.8, changefreq="monthly"),
    SitemapEntry(path="/privacy", title="Privacy Policy", section="Legal", priority=0.3, changefreq="yearly"),
    SitemapEntry(path="/terms", title="Terms & Conditions", section="Legal", priority=0.3, changefreq="yearly"),
    SitemapEntry(path="/cookies", title="Cookie Policy", section="Legal", priority=0.3, changefreq="yearly"),
    SitemapEntry(path="/accessibility", title="Accessibility", section="Legal", priority=0.3, changefreq="yearly"),
]


@router.get("")
async def get_sitemap_data():
    return {
        "status": "success",
        "data": [entry.model_dump() for entry in SITEMAP_DATA],
    }


@router.get("/xml")
async def get_xml_sitemap():
    urls = "\n".join(
        f'  <url>\n    <loc>https://stacksentry.com{entry.path}</loc>\n    <changefreq>{entry.changefreq}</changefreq>\n    <priority>{entry.priority}</priority>\n  </url>'
        for entry in SITEMAP_DATA
    )
    xml = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>'
    from fastapi.responses import Response
    return Response(content=xml, media_type="application/xml")
