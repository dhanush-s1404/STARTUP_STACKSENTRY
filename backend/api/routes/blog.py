from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from sqlalchemy.orm import joinedload
from database.config import get_db
from database.models import BlogPost, TeamMember

router = APIRouter(prefix="/api/blog", tags=["Blog"])


@router.get("/categories")
async def list_blog_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BlogPost.category)
        .where(BlogPost.status == "published", BlogPost.category.isnot(None))
        .distinct()
    )
    categories = [row[0] for row in result.all()]
    return categories


@router.get("/tags")
async def list_blog_tags(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BlogPost.tags)
        .where(BlogPost.status == "published", BlogPost.tags.isnot(None))
    )
    tag_set: set[str] = set()
    for row in result.all():
        tags = row[0]
        if tags:
            import json
            try:
                parsed = json.loads(tags) if isinstance(tags, str) else tags
                if isinstance(parsed, list):
                    for t in parsed:
                        tag_set.add(str(t).strip())
            except (json.JSONDecodeError, TypeError):
                pass
    return sorted(tag_set)


@router.get("")
async def list_blog_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    category: str = Query(None),
    tag: str = Query(None),
    search: str = Query(None),
    featured: bool = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = (
        select(BlogPost)
        .options(joinedload(BlogPost.author))
        .where(BlogPost.status == "published")
    )

    if category:
        query = query.where(BlogPost.category == category)
    if tag:
        query = query.where(BlogPost.tags.like(f'%{tag}%'))
    if featured is not None:
        query = query.where(BlogPost.is_featured == featured)
    if search:
        search_filter = or_(
            BlogPost.title.ilike(f'%{search}%'),
            BlogPost.excerpt.ilike(f'%{search}%'),
            BlogPost.content.ilike(f'%{search}%'),
        )
        query = query.where(search_filter)

    count_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_query)
    total = total_result.scalar()

    query = query.order_by(BlogPost.published_at.desc())
    query = query.offset((page - 1) * page_size).limit(page_size)

    result = await db.execute(query)
    posts = result.unique().scalars().all()

    return {
        "items": [_serialize_post(p) for p in posts],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size if total else 0,
    }


@router.get("/featured")
async def get_featured_posts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BlogPost)
        .options(joinedload(BlogPost.author))
        .where(BlogPost.status == "published", BlogPost.is_featured == True)
        .order_by(BlogPost.published_at.desc())
        .limit(3)
    )
    posts = result.unique().scalars().all()
    return [_serialize_post(p) for p in posts]


@router.get("/popular")
async def get_popular_posts(limit: int = Query(5, ge=1), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BlogPost)
        .options(joinedload(BlogPost.author))
        .where(BlogPost.status == "published")
        .order_by(BlogPost.view_count.desc())
        .limit(limit)
    )
    posts = result.unique().scalars().all()
    return [_serialize_post(p) for p in posts]


@router.get("/related/{slug}")
async def get_related_posts(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BlogPost).options(joinedload(BlogPost.author)).where(BlogPost.slug == slug)
    )
    post = result.unique().scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")

    related = await db.execute(
        select(BlogPost)
        .options(joinedload(BlogPost.author))
        .where(
            BlogPost.status == "published",
            BlogPost.slug != slug,
            or_(
                BlogPost.category == post.category,
                BlogPost.tags.like(f'%{post.tags.split(",")[0].strip() if post.tags else ""}%'),
            ),
        )
        .order_by(BlogPost.published_at.desc())
        .limit(3)
    )
    return [_serialize_post(p) for p in related.unique().scalars().all()]


@router.get("/{slug}")
async def get_blog_post(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BlogPost)
        .options(joinedload(BlogPost.author))
        .where(BlogPost.slug == slug)
    )
    post = result.unique().scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")

    await db.execute(
        BlogPost.__table__.update()
        .where(BlogPost.id == post.id)
        .values(view_count=BlogPost.view_count + 1)
    )
    await db.commit()

    data = _serialize_post(post, full=True)
    return data


def _serialize_post(post: BlogPost, full: bool = False) -> dict:
    base = {
        "id": post.id,
        "slug": post.slug,
        "title": post.title,
        "excerpt": post.excerpt,
        "category": post.category,
        "tags": post.tags,
        "featured_image": post.featured_image,
        "reading_time": post.reading_time,
        "is_featured": post.is_featured,
        "view_count": post.view_count,
        "published_at": post.published_at.isoformat() if post.published_at else None,
    }

    if post.author:
        base["author"] = {
            "name": post.author.name,
            "slug": post.author.slug,
            "avatar_url": post.author.avatar_url,
            "role": post.author.role,
        }
    else:
        base["author"] = {"name": "StackSentry Team", "slug": "stacksentry-team"}

    if full:
        base.update({
            "content": post.content,
            "seo_title": post.seo_title,
            "seo_description": post.seo_description,
            "seo_keywords": post.seo_keywords,
            "created_at": post.created_at.isoformat() if post.created_at else None,
            "updated_at": post.updated_at.isoformat() if post.updated_at else None,
        })

    return base
