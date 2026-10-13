-- =============================================================================
-- GBS Portal (Global Business Services) - PostgreSQL Enterprise Schema
-- Version: 2.4.0
-- Database Engine: PostgreSQL 14+
-- Character Set: UTF8
-- =============================================================================

-- Enable standard UUID generation and text search extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================================================
-- 1. CUSTOM DOMAINS & ENUMS
-- =============================================================================

CREATE TYPE user_role AS ENUM ('Admin', 'Manager', 'User');

CREATE TYPE sub_department_code AS ENUM ('GBS-BTS', 'GBS-BO', 'Executive Office');

CREATE TYPE announcement_category AS ENUM (
    'Executive',
    'Technology',
    'Operations',
    'HR & Culture',
    'Compliance',
    'Town Hall'
);

CREATE TYPE resource_category AS ENUM (
    'SOPs',
    'Policies',
    'Templates',
    'Forms',
    'Training Material',
    'Knowledge Articles',
    'Presentations'
);

CREATE TYPE resource_file_type AS ENUM ('PDF', 'DOCX', 'XLSX', 'PPTX', 'URL');

CREATE TYPE project_status AS ENUM (
    'Planning',
    'In Progress',
    'In Review',
    'Completed',
    'Delayed'
);

CREATE TYPE project_priority AS ENUM ('Critical', 'High', 'Medium', 'Low');

CREATE TYPE achievement_type AS ENUM ('Award', 'Milestone', 'Recognition', 'Spotlight');

CREATE TYPE recipient_type AS ENUM ('Individual', 'Team', 'Department');

CREATE TYPE quick_link_category AS ENUM (
    'Communication',
    'Productivity',
    'IT & Support',
    'HR & Benefits',
    'Finance & Procurement',
    'Analytics'
);

CREATE TYPE notification_type AS ENUM ('announcement', 'approval', 'system', 'mention');

CREATE TYPE metric_trend AS ENUM ('up', 'down', 'neutral');

-- =============================================================================
-- 2. CORE DEPARTMENTS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(32) PRIMARY KEY, -- e.g. 'GBS', 'GBS-BTS', 'GBS-BO'
    code VARCHAR(64) NOT NULL UNIQUE, -- e.g. 'GBS-GLOBAL', 'GBS-BTS', 'GBS-BO'
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(64) NOT NULL,
    tagline VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    mission TEXT NOT NULL,
    color VARCHAR(16) NOT NULL DEFAULT '#D71920',
    head_user_id VARCHAR(64), -- Foreign key forward declaration to users(id)
    strategic_priorities JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 3. USERS / EMPLOYEES DIRECTORY TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'emp-001' or UUID
    ntid VARCHAR(64) NOT NULL UNIQUE, -- Corporate NT-ID (e.g. 'keshavb')
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'User',
    department_id VARCHAR(32) NOT NULL REFERENCES departments(id) ON UPDATE CASCADE,
    sub_department sub_department_code,
    title VARCHAR(255) NOT NULL,
    avatar TEXT,
    location VARCHAR(255) NOT NULL, -- e.g. 'Bangalore Innovation Hub', 'London Regional HQ'
    phone VARCHAR(64),
    manager_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    bio TEXT,
    skills TEXT[] DEFAULT '{}',
    joined_date DATE,
    last_login_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraint back from departments.head_user_id to users.id
ALTER TABLE departments 
ADD CONSTRAINT fk_departments_head 
FOREIGN KEY (head_user_id) REFERENCES users(id) ON DELETE SET NULL;

-- =============================================================================
-- 4. DEPARTMENT PERFORMANCE METRICS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS department_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id VARCHAR(32) NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    value VARCHAR(64) NOT NULL, -- e.g. '99.8%', '$84.2M'
    change_value VARCHAR(64) NOT NULL, -- e.g. '+0.4%', '+18.5%'
    trend metric_trend NOT NULL DEFAULT 'up',
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 5. FUNCTIONAL TEAMS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'team-bts-01'
    name VARCHAR(255) NOT NULL,
    department_id VARCHAR(32) NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    lead_user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    member_count INT NOT NULL DEFAULT 1,
    location VARCHAR(255) NOT NULL,
    focus_area TEXT NOT NULL,
    description TEXT NOT NULL,
    functions TEXT[] NOT NULL DEFAULT '{}',
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    recent_achievement TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Team members mapping (junction table for full roster membership)
CREATE TABLE IF NOT EXISTS team_members (
    team_id VARCHAR(64) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_in_team VARCHAR(128) DEFAULT 'Member',
    joined_team_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, user_id)
);

-- =============================================================================
-- 6. ANNOUNCEMENTS & DIRECTIVES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS announcements (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'ann-001' or UUID
    title VARCHAR(500) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category announcement_category NOT NULL,
    department_id VARCHAR(32) NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    author_user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    published_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_urgent BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    read_time_minutes INT NOT NULL DEFAULT 3,
    views_count INT NOT NULL DEFAULT 0,
    likes_count INT NOT NULL DEFAULT 0,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcement_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    announcement_id VARCHAR(64) NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    file_size VARCHAR(64) NOT NULL,
    file_type VARCHAR(64) NOT NULL,
    download_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcement_likes (
    announcement_id VARCHAR(64) NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    liked_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (announcement_id, user_id)
);

-- =============================================================================
-- 7. RESOURCE CENTER (SOPs, POLICIES, TEMPLATES) TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS resources (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'res-001' or UUID
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category resource_category NOT NULL,
    department_id VARCHAR(32) NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    file_type resource_file_type NOT NULL DEFAULT 'PDF',
    file_size VARCHAR(64) NOT NULL,
    version VARCHAR(32) NOT NULL DEFAULT '1.0',
    owner_user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    download_count INT NOT NULL DEFAULT 0,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    external_url TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Log of resource downloads for compliance audit and analytics
CREATE TABLE IF NOT EXISTS resource_download_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id VARCHAR(64) NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    downloaded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- =============================================================================
-- 8. PROJECTS & STRATEGIC INITIATIVES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'PRJ-BTS-101'
    code VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    department_id VARCHAR(32) NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    team_id VARCHAR(64) REFERENCES teams(id) ON DELETE SET NULL,
    lead_user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status project_status NOT NULL DEFAULT 'Planning',
    progress INT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    priority project_priority NOT NULL DEFAULT 'High',
    start_date DATE NOT NULL,
    target_end_date DATE NOT NULL,
    description TEXT NOT NULL,
    objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
    outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
    savings_annualized VARCHAR(128),
    members_count INT NOT NULL DEFAULT 1,
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_members (
    project_id VARCHAR(64) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_role VARCHAR(128) DEFAULT 'Contributor',
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, user_id)
);

-- =============================================================================
-- 9. ACHIEVEMENTS & WALL OF RECOGNITION (KUDOS) TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS achievements (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'ach-001'
    title VARCHAR(500) NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    recipient_type recipient_type NOT NULL DEFAULT 'Individual',
    recipient_user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    department_id VARCHAR(32) NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    category achievement_type NOT NULL DEFAULT 'Recognition',
    description TEXT NOT NULL,
    impact_metric VARCHAR(500) NOT NULL,
    presented_by VARCHAR(255) NOT NULL,
    presenter_user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 10. QUICK LINKS & ENTERPRISE TOOLS CATALOG TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS quick_links (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'ql-001'
    title VARCHAR(255) NOT NULL,
    category quick_link_category NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    icon_name VARCHAR(64) NOT NULL DEFAULT 'Globe',
    is_internal BOOLEAN NOT NULL DEFAULT true,
    is_frequent BOOLEAN NOT NULL DEFAULT false,
    badge VARCHAR(64),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User-specific customized pinned / favorite quick links
CREATE TABLE IF NOT EXISTS user_quick_link_favorites (
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quick_link_id VARCHAR(64) NOT NULL REFERENCES quick_links(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, quick_link_id)
);

-- =============================================================================
-- 11. NOTIFICATIONS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'notif-001' or UUID
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL DEFAULT 'system',
    is_read BOOLEAN NOT NULL DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 12. PORTAL FEEDBACK TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS portal_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    topic VARCHAR(128) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    status VARCHAR(64) NOT NULL DEFAULT 'New', -- 'New', 'In Review', 'Resolved'
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 13. INDEXES FOR HIGH-THROUGHPUT QUERYING & TEXT SEARCH
-- =============================================================================

-- Users indexing
CREATE INDEX IF NOT EXISTS idx_users_ntid ON users (ntid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_dept ON users (department_id);
CREATE INDEX IF NOT EXISTS idx_users_manager ON users (manager_id);
CREATE INDEX IF NOT EXISTS idx_users_name_trgm ON users USING gin (name gin_trgm_ops);

-- Announcements indexing
CREATE INDEX IF NOT EXISTS idx_announcements_published_at ON announcements (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_dept ON announcements (department_id);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements (category);
CREATE INDEX IF NOT EXISTS idx_announcements_featured ON announcements (is_featured) WHERE is_featured = true;

-- Resources indexing
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources (category);
CREATE INDEX IF NOT EXISTS idx_resources_dept ON resources (department_id);
CREATE INDEX IF NOT EXISTS idx_resources_downloads ON resources (download_count DESC);
CREATE INDEX IF NOT EXISTS idx_resources_title_trgm ON resources USING gin (title gin_trgm_ops);

-- Projects indexing
CREATE INDEX IF NOT EXISTS idx_projects_code ON projects (code);
CREATE INDEX IF NOT EXISTS idx_projects_dept ON projects (department_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_lead ON projects (lead_user_id);

-- Notifications indexing
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications (user_id, is_read, created_at DESC);

-- =============================================================================
-- 14. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
          AND table_schema = 'public'
    LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS set_timestamp ON %I;
            CREATE TRIGGER set_timestamp
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION trigger_set_timestamp();', t, t);
    END LOOP;
END;
$$;
