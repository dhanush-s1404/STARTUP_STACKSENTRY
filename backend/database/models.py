import uuid
from datetime import datetime

from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, Date, Text,
    ForeignKey, Enum as SAEnum, Float,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database.config import Base


# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------

def _uuid() -> uuid.UUID:
    return uuid.uuid4()


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

TechnologyExperienceEnum = SAEnum(
    "beginner", "intermediate", "advanced", "expert",
    name="technology_experience_enum", create_constraint=True,
)

BlogPostStatusEnum = SAEnum(
    "draft", "published", "archived",
    name="blog_post_status_enum", create_constraint=True,
)

MilestoneTypeEnum = SAEnum(
    "foundation", "growth", "product", "global", "team",
    name="milestone_type_enum", create_constraint=True,
)


# ===========================================================================
# Original models (kept intact)
# ===========================================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    profile = relationship("UserProfile", back_populates="user", uselist=False)


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    company = Column(String(255), nullable=True)
    role = Column(String(100), nullable=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(500), nullable=True)

    user = relationship("User", back_populates="profile")


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    subject = Column(String(500), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


# ===========================================================================
# CMS / content models
# ===========================================================================

# ---------------------------------------------------------------------------
# Service Category
# ---------------------------------------------------------------------------

class ServiceCategory(Base):
    __tablename__ = "service_categories"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class Service(Base):
    __tablename__ = "services"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    icon = Column(String(100), nullable=True)
    features = Column(Text, nullable=True)          # JSON stored as text
    process = Column(Text, nullable=True)           # JSON
    faq = Column(Text, nullable=True)               # JSON
    technologies = Column(Text, nullable=True)      # JSON
    pricing_tier = Column(String(50), nullable=True)
    status = Column(String(50), default="active")
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    seo_keywords = Column(Text, nullable=True)
    category_id = Column(String(36), ForeignKey("service_categories.id"), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # relationships
    category = relationship("ServiceCategory", backref="services", lazy="selectin")


# ---------------------------------------------------------------------------
# Service Comparison
# ---------------------------------------------------------------------------

class ServiceComparison(Base):
    __tablename__ = "service_comparisons"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    service_id = Column(String(36), ForeignKey("services.id"), nullable=False)
    category = Column(String(100), nullable=True)
    feature_name = Column(String(255), nullable=False)
    feature_value = Column(Text, nullable=True)
    highlight = Column(Boolean, default=False)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    service = relationship("Service", backref="comparisons", lazy="selectin")


# ---------------------------------------------------------------------------
# Audit Log
# ---------------------------------------------------------------------------

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    table_name = Column(String(255), nullable=False)
    record_id = Column(String(36), nullable=False)
    action = Column(String(50), nullable=False)  # CREATE, UPDATE, DELETE
    old_values = Column(Text, nullable=True)     # JSON
    new_values = Column(Text, nullable=True)     # JSON
    changed_by = Column(String(255), nullable=True)
    ip_address = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Solution(Base):
    __tablename__ = "solutions"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    icon = Column(String(100), nullable=True)
    business_problems = Column(Text, nullable=True)
    key_features = Column(Text, nullable=True)
    business_benefits = Column(Text, nullable=True)
    expected_roi = Column(String(255), nullable=True)
    architecture = Column(Text, nullable=True)
    technologies = Column(Text, nullable=True)
    screenshots = Column(Text, nullable=True)
    deployment_models = Column(Text, nullable=True)
    integration_support = Column(Text, nullable=True)
    pricing_tier = Column(String(50), nullable=True)
    status = Column(String(50), default="active")
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    seo_keywords = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class Industry(Base):
    __tablename__ = "industries"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    icon = Column(String(100), nullable=True)
    challenges = Column(Text, nullable=True)
    solutions = Column(Text, nullable=True)
    benefits = Column(Text, nullable=True)
    case_examples = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class Technology(Base):
    __tablename__ = "technologies"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    icon_url = Column(String(500), nullable=True)
    experience_level = Column(TechnologyExperienceEnum, default="intermediate")
    use_cases = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    role = Column(String(255), nullable=True)
    department = Column(String(100), nullable=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    email = Column(String(255), nullable=True)
    social_links = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    is_leadership = Column(Boolean, default=False)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # relationships
    authored_posts = relationship("BlogPost", back_populates="author")


class CompanyTimeline(Base):
    __tablename__ = "company_timelines"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    year = Column(Integer, nullable=False)
    month = Column(Integer, nullable=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    milestone_type = Column(MilestoneTypeEnum, default="growth")
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class CompanyStat(Base):
    __tablename__ = "company_stats"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    label = Column(String(255), nullable=False)
    value = Column(String(100), nullable=False)
    suffix = Column(String(50), nullable=True)
    prefix = Column(String(50), nullable=True)
    icon = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class CompanyValue(Base):
    __tablename__ = "company_values"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    principles = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class CompanyInfo(Base):
    __tablename__ = "company_info"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    key = Column(String(255), unique=True, index=True, nullable=False)
    value = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    excerpt = Column(String(500), nullable=True)
    content = Column(Text, nullable=True)
    author_id = Column(String(36), ForeignKey("team_members.id"), nullable=True)
    category = Column(String(100), nullable=True)
    tags = Column(Text, nullable=True)
    featured_image = Column(String(500), nullable=True)
    reading_time = Column(Integer, nullable=True)
    status = Column(BlogPostStatusEnum, default="draft")
    published_at = Column(DateTime(timezone=True), nullable=True)
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    seo_keywords = Column(Text, nullable=True)
    is_featured = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # relationships
    author = relationship("TeamMember", back_populates="authored_posts")


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon_url = Column(String(500), nullable=True)
    issue_date = Column(DateTime(timezone=True), nullable=True)
    expiry_date = Column(DateTime(timezone=True), nullable=True)
    issuer = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class Office(Base):
    __tablename__ = "offices"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    city = Column(String(255), nullable=False)
    country = Column(String(255), nullable=False)
    address = Column(Text, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    is_hq = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class CompanyCulture(Base):
    __tablename__ = "company_culture"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    highlights = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class SEOSetting(Base):
    __tablename__ = "seo_settings"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    page_path = Column(String(500), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=True)
    description = Column(String(500), nullable=True)
    keywords = Column(Text, nullable=True)
    og_image = Column(String(500), nullable=True)
    canonical_url = Column(String(500), nullable=True)
    schema_json = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


# ===========================================================================
# Part 5: Portfolio & Case Studies models
# ===========================================================================

class ProjectCategory(Base):
    __tablename__ = "project_categories"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

class Project(Base):
    __tablename__ = "projects"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    short_description = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    client_name = Column(String(255), nullable=True)
    client_type = Column(String(100), nullable=True)
    industry_slug = Column(String(255), nullable=True)
    category_slug = Column(String(255), nullable=True)
    icon = Column(String(100), nullable=True)
    thumbnail_url = Column(String(500), nullable=True)
    hero_image_url = Column(String(500), nullable=True)
    technologies = Column(Text, nullable=True)
    features = Column(Text, nullable=True)
    business_problem = Column(Text, nullable=True)
    challenges = Column(Text, nullable=True)
    solution_overview = Column(Text, nullable=True)
    architecture = Column(Text, nullable=True)
    database_design = Column(Text, nullable=True)
    api_architecture = Column(Text, nullable=True)
    development_timeline = Column(Text, nullable=True)
    security_measures = Column(Text, nullable=True)
    scalability_features = Column(Text, nullable=True)
    performance_metrics = Column(Text, nullable=True)
    testing_strategy = Column(Text, nullable=True)
    deployment_info = Column(Text, nullable=True)
    monitoring = Column(Text, nullable=True)
    screenshots = Column(Text, nullable=True)
    videos = Column(Text, nullable=True)
    key_features = Column(Text, nullable=True)
    business_outcomes = Column(Text, nullable=True)
    client_testimonial = Column(Text, nullable=True)
    future_improvements = Column(Text, nullable=True)
    project_duration = Column(String(100), nullable=True)
    team_size = Column(Integer, nullable=True)
    year = Column(Integer, nullable=True)
    status = Column(String(50), default="completed")
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)
    view_count = Column(Integer, default=0)
    sort_order = Column(Integer, default=0)
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    seo_keywords = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    images = relationship("ProjectImage", back_populates="project", lazy="selectin")

class ProjectImage(Base):
    __tablename__ = "project_images"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    url = Column(String(500), nullable=False)
    alt = Column(String(255), nullable=True)
    caption = Column(String(500), nullable=True)
    category = Column(String(100), nullable=True)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    project = relationship("Project", back_populates="images")

class CaseStudy(Base):
    __tablename__ = "case_studies"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    subtitle = Column(String(500), nullable=True)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=True)
    client_background = Column(Text, nullable=True)
    business_challenge = Column(Text, nullable=True)
    discovery_phase = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    research = Column(Text, nullable=True)
    wireframes = Column(Text, nullable=True)
    ui_design = Column(Text, nullable=True)
    architecture = Column(Text, nullable=True)
    backend_design = Column(Text, nullable=True)
    database_design = Column(Text, nullable=True)
    security_strategy = Column(Text, nullable=True)
    development_process = Column(Text, nullable=True)
    deployment = Column(Text, nullable=True)
    results = Column(Text, nullable=True)
    kpis = Column(Text, nullable=True)
    roi = Column(Text, nullable=True)
    performance_improvements = Column(Text, nullable=True)
    lessons_learned = Column(Text, nullable=True)
    technologies_used = Column(Text, nullable=True)
    future_roadmap = Column(Text, nullable=True)
    hero_image_url = Column(String(500), nullable=True)
    timeline_events = Column(Text, nullable=True)
    is_published = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    sort_order = Column(Integer, default=0)
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    project = relationship("Project", backref="case_studies")

class ProjectTestimonial(Base):
    __tablename__ = "project_testimonials"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=True)
    client_name = Column(String(255), nullable=False)
    client_role = Column(String(255), nullable=True)
    client_company = Column(String(255), nullable=True)
    client_avatar_url = Column(String(500), nullable=True)
    content = Column(Text, nullable=False)
    rating = Column(Integer, nullable=True)
    video_url = Column(String(500), nullable=True)
    industry = Column(String(100), nullable=True)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    project = relationship("Project", backref="testimonials")

class Award(Base):
    __tablename__ = "awards"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    issuer = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    year = Column(Integer, nullable=True)
    image_url = Column(String(500), nullable=True)
    link_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)

class ClientSuccessMetric(Base):
    __tablename__ = "client_success_metrics"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    label = Column(String(255), nullable=False)
    value = Column(String(100), nullable=False)
    suffix = Column(String(50), nullable=True)
    prefix = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    icon = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)

class ProjectInquiry(Base):
    __tablename__ = "project_inquiries"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    industry = Column(String(100), nullable=True)
    project_type = Column(String(100), nullable=True)
    budget_range = Column(String(100), nullable=True)
    timeline = Column(String(100), nullable=True)
    requirements = Column(Text, nullable=True)
    preferred_contact = Column(String(50), nullable=True)
    attachments = Column(Text, nullable=True)
    status = Column(String(50), default="new")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)


# ===========================================================================
# Career Models
# ===========================================================================

class Department(Base):
    __tablename__ = "departments"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)
    color = Column(String(20), nullable=True)
    head_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class Location(Base):
    __tablename__ = "locations"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    name = Column(String(150), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    city = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    region = Column(String(100), nullable=True)
    address = Column(Text, nullable=True)
    is_remote = Column(Boolean, default=False)
    timezone = Column(String(50), nullable=True)
    office_size = Column(String(50), nullable=True)
    country_code = Column(String(5), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class Job(Base):
    __tablename__ = "jobs"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=True)
    location_id = Column(String(36), ForeignKey("locations.id"), nullable=True)
    employment_type = Column(String(50), nullable=True)
    experience_level = Column(String(50), nullable=True)
    work_model = Column(String(50), nullable=True)
    salary_min = Column(Integer, nullable=True)
    salary_max = Column(Integer, nullable=True)
    salary_currency = Column(String(10), default="USD")
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    posted_at = Column(DateTime(timezone=True), nullable=True)
    application_deadline = Column(DateTime(timezone=True), nullable=True)
    responsibilities = Column(Text, nullable=True)        # JSON stored as text
    requirements = Column(Text, nullable=True)            # JSON stored as text
    preferred_skills = Column(Text, nullable=True)        # JSON stored as text
    benefits = Column(Text, nullable=True)                # JSON stored as text
    technology_stack = Column(Text, nullable=True)        # JSON stored as text
    interview_process = Column(Text, nullable=True)       # JSON stored as text
    team_info = Column(Text, nullable=True)               # JSON stored as text
    seo_title = Column(String(255), nullable=True)
    seo_description = Column(String(500), nullable=True)
    seo_keywords = Column(String(500), nullable=True)
    view_count = Column(Integer, default=0)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # relationships
    department = relationship("Department")
    location = relationship("Location")


class JobApplication(Base):
    __tablename__ = "job_applications"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    job_id = Column(String(36), ForeignKey("jobs.id"), nullable=False)
    full_name = Column(String(200), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    country = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    portfolio_url = Column(String(500), nullable=True)
    resume_url = Column(String(500), nullable=True)
    cover_letter = Column(Text, nullable=True)
    years_of_experience = Column(Integer, nullable=True)
    skills = Column(Text, nullable=True)                   # JSON stored as text
    expected_salary = Column(Integer, nullable=True)
    current_salary = Column(Integer, nullable=True)
    notice_period = Column(String(50), nullable=True)
    availability = Column(String(100), nullable=True)
    education = Column(Text, nullable=True)                # JSON stored as text
    certifications = Column(Text, nullable=True)           # JSON stored as text
    projects = Column(Text, nullable=True)                 # JSON stored as text
    languages = Column(Text, nullable=True)                # JSON stored as text
    agreement = Column(Boolean, default=False)
    status = Column(String(50), default="submitted")

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # relationships
    job = relationship("Job")


class CareerBenefit(Base):
    __tablename__ = "career_benefits"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)
    category = Column(String(50), nullable=True)
    features = Column(Text, nullable=True)                 # JSON stored as text
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class Internship(Base):
    __tablename__ = "internships"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=True)
    duration = Column(String(50), nullable=True)
    requirements = Column(Text, nullable=True)             # JSON stored as text
    mentorship_details = Column(Text, nullable=True)
    certificate_provided = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class GraduateProgram(Base):
    __tablename__ = "graduate_programs"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    duration = Column(String(50), nullable=True)
    roadmap_items = Column(Text, nullable=True)            # JSON stored as text
    requirements = Column(Text, nullable=True)             # JSON stored as text
    benefits = Column(Text, nullable=True)                 # JSON stored as text
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class HiringStage(Base):
    __tablename__ = "hiring_stages"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)
    estimated_duration = Column(String(50), nullable=True)
    tips = Column(Text, nullable=True)                     # JSON stored as text
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class CareerFAQ(Base):
    __tablename__ = "career_faqs"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    question = Column(String(500), nullable=False)
    answer = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class RecruitmentContact(Base):
    __tablename__ = "recruitment_contacts"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    contact_type = Column(String(50), nullable=False)
    label = Column(String(100), nullable=False)
    value = Column(String(255), nullable=False)
    url = Column(String(500), nullable=True)
    icon = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class LifeAtStackSentry(Base):
    __tablename__ = "life_at_stacksentry"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    section = Column(String(50), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    items = Column(Text, nullable=True)                    # JSON stored as text
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class RecruitmentProcess(Base):
    __tablename__ = "recruitment_process"
    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)
    step_number = Column(Integer, nullable=True)
    estimated_duration = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


# ===========================================================================
# Part 8B: Enterprise Solutions models
# ===========================================================================


class BusinessChallenge(Base):
    __tablename__ = "business_challenges"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    impact = Column(Text, nullable=True)
    symptoms = Column(Text, nullable=True)
    root_cause = Column(Text, nullable=True)
    recommended_solutions = Column(Text, nullable=True)  # JSON
    relevant_industries = Column(Text, nullable=True)     # JSON
    metrics = Column(Text, nullable=True)                 # JSON
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class ROITemplate(Base):
    __tablename__ = "roi_templates"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    industry = Column(String(100), nullable=True)
    solution_slug = Column(String(255), nullable=True)
    inputs = Column(Text, nullable=True)           # JSON
    formulas = Column(Text, nullable=True)          # JSON
    default_values = Column(Text, nullable=True)    # JSON
    output_metrics = Column(Text, nullable=True)    # JSON
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class ConsultationRequest(Base):
    __tablename__ = "consultation_requests"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    company_name = Column(String(255), nullable=False)
    contact_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    industry = Column(String(100), nullable=True)
    company_size = Column(String(50), nullable=True)
    project_goals = Column(Text, nullable=True)
    challenges = Column(Text, nullable=True)
    budget_range = Column(String(100), nullable=True)
    timeline = Column(String(100), nullable=True)
    meeting_preference = Column(String(50), nullable=True)
    additional_info = Column(Text, nullable=True)
    status = Column(String(50), default="new")
    notes = Column(Text, nullable=True)
    assigned_to = Column(String(255), nullable=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class ArchitectureModel(Base):
    __tablename__ = "architecture_models"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    solution_slug = Column(String(255), nullable=True)
    layers = Column(Text, nullable=True)          # JSON
    technologies = Column(Text, nullable=True)     # JSON
    diagram_data = Column(Text, nullable=True)     # JSON
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class WorldCoverage(Base):
    __tablename__ = "world_coverage"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    country = Column(String(255), nullable=False)
    code = Column(String(10), nullable=True)
    region = Column(String(100), nullable=True)
    status = Column(String(50), default="active")
    delivery_center = Column(Boolean, default=False)
    timezone = Column(String(100), nullable=True)
    languages = Column(String(255), nullable=True)
    cloud_regions = Column(String(255), nullable=True)
    support_available = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class BusinessMetric(Base):
    __tablename__ = "business_metrics"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    label = Column(String(255), nullable=False)
    value = Column(String(100), nullable=False)
    suffix = Column(String(50), nullable=True)
    prefix = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    icon = Column(String(100), nullable=True)
    source = Column(String(255), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class FAQ(Base):
    __tablename__ = "faqs"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    question = Column(String(500), nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    tags = Column(Text, nullable=True)           # JSON array
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class BudgetRange(Base):
    __tablename__ = "budget_ranges"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    label = Column(String(100), nullable=False)
    min_amount = Column(Integer, nullable=True)
    max_amount = Column(Integer, nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class TechnologyRecommendation(Base):
    __tablename__ = "technology_recommendations"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    project_type = Column(String(100), nullable=False, index=True)
    category = Column(String(100), nullable=False)   # frontend, backend, database, cloud, ai
    technology = Column(String(255), nullable=False)
    priority = Column(Integer, default=0)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class MeetingRequest(Base):
    __tablename__ = "meeting_requests"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    company = Column(String(255), nullable=True)
    preferred_date = Column(Date, nullable=True)
    preferred_time = Column(String(50), nullable=True)
    timezone = Column(String(100), nullable=True)
    meeting_type = Column(String(50), default="video")
    notes = Column(Text, nullable=True)
    status = Column(String(50), default="pending")
    admin_notes = Column(Text, nullable=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class ProjectDiscovery(Base):
    __tablename__ = "project_discoveries"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    # Step 1: Business Info
    company = Column(String(255), nullable=True)
    industry = Column(String(100), nullable=True)
    team_size = Column(String(50), nullable=True)
    country = Column(String(100), nullable=True)
    website = Column(String(255), nullable=True)
    # Step 2: Project Type
    project_type = Column(String(100), nullable=True)
    # Step 3: Business Goals (JSON)
    business_goals = Column(Text, nullable=True)
    # Step 4: Desired Features (JSON)
    desired_features = Column(Text, nullable=True)
    # Step 5: Preferred Technologies (JSON)
    preferred_technologies = Column(Text, nullable=True)
    # Step 6: Timeline
    project_timeline = Column(String(100), nullable=True)
    # Step 7: Budget
    budget_range = Column(String(100), nullable=True)
    # Step 8: Additional Requirements
    additional_requirements = Column(Text, nullable=True)
    # Contact info
    contact_name = Column(String(255), nullable=False)
    contact_email = Column(String(255), nullable=False)
    contact_phone = Column(String(50), nullable=True)

    status = Column(String(50), default="submitted")
    admin_notes = Column(Text, nullable=True)
    assigned_to = Column(String(255), nullable=True)

    # audit
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class EngineeringPrinciple(Base):
    __tablename__ = "engineering_principles"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    icon = Column(String(100), nullable=True)
    business_value = Column(Text, nullable=True)
    use_cases = Column(Text, nullable=True)
    related_practices = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class SecurityTopic(Base):
    __tablename__ = "security_topics"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    icon = Column(String(100), nullable=True)
    details = Column(Text, nullable=True)
    best_practices = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class KnowledgeArticle(Base):
    __tablename__ = "knowledge_articles"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    tags = Column(Text, nullable=True)
    read_time = Column(String(50), nullable=True)
    author = Column(String(255), nullable=True)
    image_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class PerformanceTopic(Base):
    __tablename__ = "performance_topics"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    icon = Column(String(100), nullable=True)
    impact = Column(String(100), nullable=True)
    best_practices = Column(Text, nullable=True)
    tools = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)


class ArchitectureLayer(Base):
    __tablename__ = "architecture_layers"

    id = Column(String(36), primary_key=True, default=lambda: str(_uuid()), index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    layer_order = Column(Integer, default=0)
    description = Column(Text, nullable=True)
    responsibilities = Column(Text, nullable=True)
    security_considerations = Column(Text, nullable=True)
    scalability_approach = Column(Text, nullable=True)
    performance = Column(Text, nullable=True)
    technologies = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)
