# StackSentry Technologies — Enterprise Software Website

Production-grade enterprise software company website built with Next.js 16, TypeScript, TailwindCSS v4, and FastAPI.

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

### Backend
- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy 2.0 (async)
- **Migrations**: Alembic
- **Cache**: Redis
- **Task Queue**: Celery
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.12+
- PostgreSQL 16+
- Redis 7+

### Frontend Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend Development

```bash
cd backend
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

API docs: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

### Docker

```bash
docker-compose up -d
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run typecheck    # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check formatting
npm run test         # Run tests with Vitest
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── ui/           # Reusable UI primitives
│   ├── layout/       # Layout components (Navbar, Footer)
│   ├── sections/     # Page section components
│   ├── shared/       # Shared utility components
│   └── icons/        # Custom SVG icons
├── features/         # Feature-based modules
├── hooks/            # Custom React hooks
├── lib/              # Core utilities
├── utils/            # General utility functions
├── types/            # TypeScript type definitions
├── constants/        # Application constants
├── config/           # Configuration
├── stores/           # Zustand state stores
├── services/         # API service layer
├── styles/           # Additional stylesheets
├── providers/        # React context providers
└── layouts/          # Page layout components

backend/
├── api/              # FastAPI application
│   └── routes/       # API route modules
├── database/         # Database configuration and models
├── migrations/       # Alembic migrations
└── requirements.txt  # Python dependencies
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

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## License

Proprietary — StackSentry Technologies
