from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from pydantic_settings import BaseSettings
from pydantic import Field
import asyncio
import logging
import secrets

logger = logging.getLogger("stacksentry.config")


class Settings(BaseSettings):
    DATABASE_URL: str = Field(
        default="",
        description="Async PostgreSQL connection string — MUST be set via env var",
    )
    REDIS_URL: str = Field(
        default="redis://localhost:6379",
        description="Redis connection URL",
    )
    SECRET_KEY: str = Field(
        default="",
        description="JWT signing secret — MUST be set in production",
    )
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    API_VERSION: str = "v1"
    ENVIRONMENT: str = Field(default="development", description="development | staging | production")
    CORS_ORIGINS: str = Field(default="http://localhost:3000", description="Comma-separated allowed origins")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == "production"


settings = Settings()

if settings.is_production:
    if not settings.SECRET_KEY:
        raise RuntimeError(
            "SECRET_KEY must be set to a secure value in production. "
            "Set the SECRET_KEY environment variable."
        )
    if not settings.DATABASE_URL:
        raise RuntimeError(
            "DATABASE_URL must be set in production. "
            "Set the DATABASE_URL environment variable."
        )

if not settings.SECRET_KEY:
    settings.SECRET_KEY = secrets.token_urlsafe(64)
    logger.warning(
        "SECRET_KEY was not set — generated a random key for this session. "
        "All tokens will be invalidated on restart. "
        "Set SECRET_KEY in your .env file for persistent tokens."
    )

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    pool_size=20 if settings.is_production else 5,
    max_overflow=10 if settings.is_production else 10,
    pool_recycle=300 if settings.is_production else -1,
)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def create_tables():
    """Create all tables if they don't exist (safe for production)."""
    import database.models  # noqa: F401 — registers all model tables
    import database.models_part9c  # noqa: F401 — registers part 9c model tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db():
    max_retries = 2
    for attempt in range(max_retries + 1):
        try:
            async with async_session() as session:
                yield session
                return
        except Exception as e:
            if attempt < max_retries:
                logger.warning(
                    "DB connection failed (attempt %d/%d): %s — retrying",
                    attempt + 1, max_retries + 1, e,
                )
                await asyncio.sleep(0.5 * (attempt + 1))
            else:
                raise
