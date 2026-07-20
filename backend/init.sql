-- =============================================================================
-- StackSentry — Database Initialization
-- =============================================================================
-- This script runs on first PostgreSQL container startup.
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for performance (these are examples; actual indexes
-- should be created via Alembic migrations for production)
-- ALTER TABLE services ADD INDEX IF NOT EXISTS idx_services_slug (slug);
-- ALTER TABLE blog_posts ADD INDEX IF NOT EXISTS idx_blog_posts_status (status);

-- Set default timezone
SET timezone = 'UTC';
