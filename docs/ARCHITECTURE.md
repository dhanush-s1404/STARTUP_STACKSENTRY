# StackSentry Technologies — Architecture

## Overview

Enterprise-grade software company website built with modern web technologies.

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS v4
- **State Management**: Zustand
- **Server State**: TanStack Query
- **Animations**: Framer Motion, GSAP
- **3D**: Three.js
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### Backend
- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy 2.0 (async)
- **Migrations**: Alembic
- **Cache**: Redis
- **Task Queue**: Celery
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose

## Folder Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── ui/           # Reusable UI primitives (Button, Card, Input, etc.)
│   ├── layout/       # Layout components (Navbar, Footer)
│   ├── sections/     # Page section components (Stats, CTA, etc.)
│   ├── shared/       # Shared utility components (ScrollReveal, etc.)
│   └── icons/        # Custom SVG icons
├── features/         # Feature-based modules (home, about, services, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Core utilities (cn helper, validation schemas)
├── utils/            # General utility functions
├── types/            # TypeScript type definitions
├── constants/        # Application constants
├── config/           # Configuration (site metadata, etc.)
├── stores/           # Zustand state stores
├── services/         # API service layer
├── styles/           # Additional stylesheets
├── providers/        # React context providers (Theme, Toast, Query)
└── layouts/          # Page layout components (Main, Auth)

backend/
├── api/              # FastAPI application
│   └── routes/       # API route modules (health, contact, newsletter, auth)
├── database/         # Database configuration and models
├── migrations/       # Alembic migrations
└── tests/            # Backend tests
```

## Design System

### Colors
- **Primary**: Electric Blue (#3B82F6), Royal Purple (#8B5CF6)
- **Secondary**: Neon Cyan (#06B6D4), Emerald (#10B981), Golden Amber (#F59E0B)
- **Background**: Deep Space Black (#09090B)
- **Glass**: Transparent with backdrop blur

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter
- **Code**: JetBrains Mono

### Components
All components follow Atomic Design principles and are fully reusable, accessible (WCAG AA), and responsive.

## Architecture Patterns

### Frontend
- **Atomic Design**: UI primitives → Molecules → Organisms → Templates → Pages
- **Feature-based**: Domain logic organized by feature
- **Custom Hooks**: Reusable stateful logic
- **Zustand Stores**: Lightweight global state
- **TanStack Query**: Server state management
- **Zod Validation**: Type-safe form validation

### Backend
- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: FastAPI's Depends system
- **Async/Await**: Non-blocking I/O throughout
- **Alembic Migrations**: Version-controlled database schema
