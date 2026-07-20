from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.config import get_db
from database.models import TeamMember

router = APIRouter(prefix="/api/team", tags=["Team"])


@router.get("/leadership")
async def list_leadership(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(TeamMember)
        .where(TeamMember.is_active == True, TeamMember.is_leadership == True)
        .order_by(TeamMember.sort_order)
    )
    members = result.scalars().all()
    return [
        {
            "id": m.id,
            "slug": m.slug,
            "name": m.name,
            "role": m.role,
            "department": m.department,
            "bio": m.bio,
            "avatar_url": m.avatar_url,
            "linkedin_url": m.linkedin_url,
            "twitter_url": m.twitter_url,
        }
        for m in members
    ]


@router.get("")
async def list_team(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(TeamMember)
        .where(TeamMember.is_active == True)
        .order_by(TeamMember.sort_order)
    )
    members = result.scalars().all()
    return [
        {
            "id": m.id,
            "slug": m.slug,
            "name": m.name,
            "role": m.role,
            "department": m.department,
            "bio": m.bio,
            "avatar_url": m.avatar_url,
            "linkedin_url": m.linkedin_url,
            "twitter_url": m.twitter_url,
            "is_leadership": m.is_leadership,
        }
        for m in members
    ]


@router.get("/{slug}")
async def get_team_member(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TeamMember).where(TeamMember.slug == slug))
    member = result.scalar_one_or_none()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {
        "id": member.id,
        "slug": member.slug,
        "name": member.name,
        "role": member.role,
        "department": member.department,
        "bio": member.bio,
        "avatar_url": member.avatar_url,
        "linkedin_url": member.linkedin_url,
        "twitter_url": member.twitter_url,
        "is_leadership": member.is_leadership,
    }
