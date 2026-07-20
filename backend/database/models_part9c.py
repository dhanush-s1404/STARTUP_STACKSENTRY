import uuid
from datetime import datetime

from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, Text,
    ForeignKey, Float,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database.config import Base


def _uuid() -> uuid.UUID:
    return uuid.uuid4()


# ---------------------------------------------------------------------------
# Footer Links
# ---------------------------------------------------------------------------

class FooterLink(Base):
    __tablename__ = "footer_links"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    section = Column(String(100), nullable=False)
    label = Column(String(255), nullable=False)
    href = Column(String(500), nullable=False)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    open_external = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)


# ---------------------------------------------------------------------------
# Company Information
# ---------------------------------------------------------------------------

class CompanyInformation(Base):
    __tablename__ = "company_information"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    key = Column(String(100), unique=True, index=True, nullable=False)
    value = Column(Text, nullable=True)
    description = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


# ---------------------------------------------------------------------------
# Announcements
# ---------------------------------------------------------------------------

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    message = Column(Text, nullable=False)
    type = Column(String(50), nullable=False, default="info")
    href = Column(String(500), nullable=True)
    link_text = Column(String(100), nullable=True)
    is_dismissible = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    priority = Column(Integer, default=0)
    start_date = Column(DateTime(timezone=True), nullable=True)
    end_date = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)


# ---------------------------------------------------------------------------
# Legal Pages
# ---------------------------------------------------------------------------

class LegalPage(Base):
    __tablename__ = "legal_pages"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    version = Column(String(20), nullable=True)
    effective_date = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)


# ---------------------------------------------------------------------------
# Media
# ---------------------------------------------------------------------------

class Media(Base):
    __tablename__ = "media"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    filename = Column(String(255), nullable=False)
    original_name = Column(String(255), nullable=False)
    mime_type = Column(String(100), nullable=False)
    size = Column(Integer, nullable=False)
    url = Column(String(500), nullable=False)
    alt_text = Column(String(500), nullable=True)
    title = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)
