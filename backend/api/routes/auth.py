from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.config import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login")
async def login(
    email: str,
    password: str,
    db: AsyncSession = Depends(get_db),
):
    return {
        "status": "success",
        "access_token": "placeholder-token",
        "token_type": "bearer",
    }


@router.post("/register")
async def register(
    name: str,
    email: str,
    password: str,
    db: AsyncSession = Depends(get_db),
):
    return {
        "status": "success",
        "message": "User registered successfully",
    }


@router.post("/logout")
async def logout():
    return {"status": "success", "message": "Logged out successfully"}
