// Complete PostgreSQL Schema & Seed scripts for in-app viewing and downloading

export const POSTGRES_SCHEMA_SQL = `-- =============================================================================
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
    'Executive', 'Technology', 'Operations', 'HR & Culture', 'Compliance', 'Town Hall'
);
CREATE TYPE resource_category AS ENUM (
    'SOPs', 'Policies', 'Templates', 'Forms', 'Training Material', 'Knowledge Articles', 'Presentations'
);
CREATE TYPE resource_file_type AS ENUM ('PDF', 'DOCX', 'XLSX', 'PPTX', 'URL');
CREATE TYPE project_status AS ENUM ('Planning', 'In Progress', 'In Review', 'Completed', 'Delayed');
CREATE TYPE project_priority AS ENUM ('Critical', 'High', 'Medium', 'Low');
CREATE TYPE achievement_type AS ENUM ('Award', 'Milestone', 'Recognition', 'Spotlight');
CREATE TYPE recipient_type AS ENUM ('Individual', 'Team', 'Department');
CREATE TYPE quick_link_category AS ENUM (
    'Communication', 'Productivity', 'IT & Support', 'HR & Benefits', 'Finance & Procurement', 'Analytics'
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
    head_user_id VARCHAR(64),
    employee_count INT NOT NULL DEFAULT 0,
    teams_count INT NOT NULL DEFAULT 0,
    active_projects_count INT NOT NULL DEFAULT 0,
    cover_image TEXT,
    image_details JSONB NOT NULL DEFAULT '{}'::jsonb,
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
    location VARCHAR(255) NOT NULL,
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
    value VARCHAR(64) NOT NULL,
    change VARCHAR(64) NOT NULL,
    trend metric_trend NOT NULL DEFAULT 'neutral',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 5. FUNCTIONAL TEAMS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'team-bts-01'
    name VARCHAR(255) NOT NULL,
    department_id VARCHAR(32) NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    lead_user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    member_count INT NOT NULL DEFAULT 1,
    location VARCHAR(255) NOT NULL,
    focus_area VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    functions TEXT[] NOT NULL DEFAULT '{}',
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    recent_achievement TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
    id VARCHAR(64) PRIMARY KEY,
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
    id VARCHAR(64) PRIMARY KEY,
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
    id VARCHAR(64) PRIMARY KEY,
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
    id VARCHAR(64) PRIMARY KEY,
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
    id VARCHAR(64) PRIMARY KEY,
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
    id VARCHAR(64) PRIMARY KEY,
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
    status VARCHAR(64) NOT NULL DEFAULT 'New',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 13. ENTERPRISE AUDIT LOGS (Compliance & Change Tracking)
-- =============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(128) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 14. INDEXES FOR HIGH-THROUGHPUT QUERYING & TEXT SEARCH
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_users_ntid ON users (ntid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_dept ON users (department_id);
CREATE INDEX IF NOT EXISTS idx_users_manager ON users (manager_id);
CREATE INDEX IF NOT EXISTS idx_users_name_trgm ON users USING gin (name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_announcements_published_at ON announcements (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_dept ON announcements (department_id);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements (category);
CREATE INDEX IF NOT EXISTS idx_announcements_featured ON announcements (is_featured) WHERE is_featured = true;

CREATE INDEX IF NOT EXISTS idx_resources_category ON resources (category);
CREATE INDEX IF NOT EXISTS idx_resources_dept ON resources (department_id);
CREATE INDEX IF NOT EXISTS idx_resources_downloads ON resources (download_count DESC);
CREATE INDEX IF NOT EXISTS idx_resources_title_trgm ON resources USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_projects_code ON projects (code);
CREATE INDEX IF NOT EXISTS idx_projects_dept ON projects (department_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_lead ON projects (lead_user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications (user_id, is_read, created_at DESC);
`;

export const POSTGRES_SEEDS_SQL = `-- =============================================================================
-- GBS Portal (Global Business Services) - PostgreSQL Initial Seed Data
-- =============================================================================

BEGIN;

-- 1. SEED DEPARTMENTS
INSERT INTO departments (id, code, name, short_name, tagline, description, mission, color, employee_count, teams_count, active_projects_count, cover_image, image_details, strategic_priorities)
VALUES
(
    'GBS',
    'GBS-GLOBAL',
    'Global Business Services',
    'GBS',
    'Driving operational excellence, enterprise technology, and scalable shared services globally.',
    'GBS is the unified operational backbone of the enterprise, consolidating business technology, digital transformation, supply chain orchestration, and end-to-end operational capabilities into a high-performance global delivery network.',
    'To deliver world-class business outcomes, seamless digital platforms, and frictionless operational experiences across all regions while eliminating silos and driving measurable value.',
    '#D71920',
    1420,
    48,
    84,
    '/src/assets/images/hero_gbs_operations_1791784024601.jpg',
    '{"caption": "Global Business Services Operations Command Center & Telemetry Video Wall", "location": "London Canary Wharf HQ", "photographer": "Enterprise Media Unit"}'::jsonb,
    '["Autonomous Enterprise Operations & Agentic Workflows", "Unified Data Lakehouse & Real-time Telemetry", "Zero-Trust Global Security & Resilience Architecture", "Standardized Global Shared Service Centers across EMEA, APAC & Americas"]'::jsonb
),
(
    'GBS-BTS',
    'GBS-BTS',
    'Business Technology Services',
    'GBS-BTS',
    'Architecting digital platforms, enterprise cloud, and automation ecosystems.',
    'GBS-BTS delivers enterprise-grade software architecture, cloud platforms, cybersecurity, AI automation, and shared technology infrastructure supporting 40,000+ corporate employees globally.',
    'Empowering business lines through modern scalable infrastructure, intuitive applications, and intelligent automation that accelerates time-to-market.',
    '#2563EB',
    820,
    26,
    52,
    '/src/assets/images/bts_tech_architecture_1791784039637.jpg',
    '{"caption": "Cloud Infrastructure & Microservices Architecture Collaborative Lab", "location": "Bangalore Technology Innovation Hub", "photographer": "GBS Tech Lens"}'::jsonb,
    '["Next-Gen Multi-Cloud Hybrid Mesh (AWS/Azure/GCP)", "Enterprise Copilot & GenAI Gateway Rollout", "Zero-Day Vulnerability Shield & SOC Automation", "Microservices Transformation of Legacy ERP Integrations"]'::jsonb
),
(
    'GBS-BO',
    'GBS-BO',
    'Business Operations',
    'GBS-BO',
    'Standardizing global business processes, procurement, shared services, and finance operations.',
    'GBS-BO orchestrates end-to-end business operations including source-to-pay procurement, order-to-cash, hire-to-retire shared HR services, and enterprise compliance across 34 countries.',
    'Delivering hyper-efficient, compliance-certified, and customer-centric business workflows that enable rapid organizational agility and operational cost-leadership.',
    '#059669',
    600,
    22,
    32,
    '/src/assets/images/bo_business_operations_1791784056212.jpg',
    '{"caption": "Global Logistics Orchestration & Strategic Sourcing Boardroom", "location": "Zurich Operational Center", "photographer": "Corporate Operations Journal"}'::jsonb,
    '["Global Unified Procurement Engine via Smart Contracts", "Hyper-Automated Payroll & Benefits Service Desk", "ESG Sustainable Sourcing & Carbon Supply Chain Tracking", "Cross-Regional Shared Services Hub Standardization"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED USERS / LEADERSHIP
INSERT INTO users (id, ntid, email, name, role, department_id, sub_department, title, avatar, location, phone, bio, skills, joined_date)
VALUES
(
    'emp-001', 'marcusv', 'marcus.vance@corp.gbs.com', 'Marcus Vance', 'Admin', 'GBS', 'Executive Office',
    'Executive Vice President & Global Head of GBS',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'New York Executive Center', '+1 (212) 555-0100',
    'Executive Vice President leading Global Business Services across 34 countries and 1,400+ professionals.',
    ARRAY['Enterprise Strategy', 'Executive Governance', 'Digital Transformation'], '2019-03-15'
),
(
    'emp-002', 'aristh', 'aris.thorne@corp.gbs.com', 'Dr. Aris Thorne', 'Admin', 'GBS-BTS', 'GBS-BTS',
    'Senior Vice President & CIO, GBS-BTS',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'London Regional HQ', '+44 20 7946 0912',
    'SVP of Technology leading 820+ engineers and digital creators. Holds a Ph.D. in Distributed Systems from ETH Zurich.',
    ARRAY['Cloud Architecture', 'Cybersecurity', 'Enterprise Modernization', 'AI Strategy'], '2020-01-10'
),
(
    'emp-003', 'elenar', 'elena.rostova@corp.gbs.com', 'Elena Rostova', 'Admin', 'GBS-BO', 'GBS-BO',
    'Senior Vice President, Global Operations, GBS-BO',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    'Zurich Operational Center', '+41 44 668 1234',
    'SVP of Business Operations directing global procurement, supply chain, financial operations, and shared services.',
    ARRAY['Global Procurement', 'Shared Services', 'Lean Six Sigma', 'Operational Resilience'], '2020-05-18'
),
(
    'emp-004', 'keshavb', 'keshav.bansal@corp.gbs.com', 'Keshav Bansal', 'Admin', 'GBS-BTS', 'GBS-BTS',
    'Principal Enterprise Architect & GBS Digital Lead',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'Bangalore Technology Innovation Hub', '+91 80 4123 8900',
    'Principal Architect steering enterprise design systems, portal modernization, and autonomous AI services.',
    ARRAY['System Architecture', 'React', 'Cloud Native', 'Enterprise API Strategy'], '2021-04-12'
)
ON CONFLICT (id) DO NOTHING;

-- Set leadership foreign keys
UPDATE departments SET head_user_id = 'emp-001' WHERE id = 'GBS';
UPDATE departments SET head_user_id = 'emp-002' WHERE id = 'GBS-BTS';
UPDATE departments SET head_user_id = 'emp-003' WHERE id = 'GBS-BO';

COMMIT;
`;
