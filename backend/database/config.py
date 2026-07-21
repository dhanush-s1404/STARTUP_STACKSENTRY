from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from pydantic_settings import BaseSettings
from pydantic import Field
import secrets


class Settings(BaseSettings):
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://postgres:dhanushS1404*@db.ojaxobnfhqnjyiorfbuw.supabase.co:5432/postgres",
        description="Async PostgreSQL connection string",
    )
    REDIS_URL: str = Field(
        default="redis://localhost:6379",
        description="Redis connection URL",
    )
    SECRET_KEY: str = Field(
        default_factory=lambda: secrets.token_urlsafe(64),
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

if settings.is_production and settings.SECRET_KEY == "change-me-in-production":
    raise RuntimeError(
        "SECRET_KEY must be set to a secure value in production. "
        "Set the SECRET_KEY environment variable."
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


async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
