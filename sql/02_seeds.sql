-- =============================================================================
-- GBS Portal (Global Business Services) - PostgreSQL Initial Seed Data
-- =============================================================================

BEGIN;

-- 1. SEED DEPARTMENTS (Without head FK first to avoid circular reference)
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

-- 2. SEED CORE USERS / LEADERSHIP
INSERT INTO users (id, ntid, email, name, role, department_id, sub_department, title, avatar, location, phone, bio, skills, joined_date)
VALUES
(
    'emp-001',
    'marcusv',
    'marcus.vance@corp.gbs.com',
    'Marcus Vance',
    'Admin',
    'GBS',
    'Executive Office',
    'Executive Vice President & Global Head of GBS',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'New York Executive Center',
    '+1 (212) 555-0100',
    'Executive Vice President leading Global Business Services across 34 countries and 1,400+ professionals. Former Global COO with 20+ years driving operational scale.',
    ARRAY['Enterprise Strategy', 'Executive Governance', 'Digital Transformation', 'P&L Management'],
    '2019-03-15'
),
(
    'emp-002',
    'aristh',
    'aris.thorne@corp.gbs.com',
    'Dr. Aris Thorne',
    'Admin',
    'GBS-BTS',
    'GBS-BTS',
    'Senior Vice President & CIO, GBS-BTS',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'London Regional HQ',
    '+44 20 7946 0912',
    'SVP of Technology leading 820+ engineers and digital creators. Holds a Ph.D. in Distributed Systems from ETH Zurich.',
    ARRAY['Cloud Architecture', 'Cybersecurity', 'Enterprise Modernization', 'AI Strategy'],
    '2020-01-10'
),
(
    'emp-003',
    'elenar',
    'elena.rostova@corp.gbs.com',
    'Elena Rostova',
    'Admin',
    'GBS-BO',
    'GBS-BO',
    'Senior Vice President, Global Operations, GBS-BO',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    'Zurich Operational Center',
    '+41 44 668 1234',
    'SVP of Business Operations directing global procurement, supply chain, financial operations, and shared services.',
    ARRAY['Global Procurement', 'Shared Services', 'Lean Six Sigma', 'Operational Resilience'],
    '2020-05-18'
),
(
    'emp-004',
    'keshavb',
    'keshav.bansal@corp.gbs.com',
    'Keshav Bansal',
    'Admin',
    'GBS-BTS',
    'GBS-BTS',
    'Principal Enterprise Architect & GBS Digital Lead',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'Bangalore Innovation Hub',
    '+91 80 4123 9081',
    'Principal Architect driving the next-generation digital intranet, intelligent agent orchestrations, and multi-cloud resilience across GBS.',
    ARRAY['Micro-frontends', 'Distributed Systems', 'Enterprise Architecture', 'AI Workflows', 'React/TS'],
    '2021-08-01'
),
(
    'emp-005',
    'vikrams',
    'vikram.sethi@corp.gbs.com',
    'Vikram Sethi',
    'Manager',
    'GBS-BTS',
    'GBS-BTS',
    'Principal Cloud Platform Architect',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'Bangalore Hub',
    '+91 80 4123 9082',
    'Leading cloud infrastructure and multi-cluster Kubernetes deployments.',
    ARRAY['AWS', 'Azure', 'Kubernetes', 'Terraform'],
    '2021-09-15'
),
(
    'emp-006',
    'rachelg',
    'rachel.greenburg@corp.gbs.com',
    'Rachel Greenburg',
    'Manager',
    'GBS-BTS',
    'GBS-BTS',
    'Chief Information Security Architect',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    'London Regional HQ',
    '+44 20 7946 0915',
    'Managing enterprise SOC, threat hunting, and zero-trust identity compliance.',
    ARRAY['Cybersecurity', 'SOC-2', 'Okta', 'Zero Trust'],
    '2021-11-20'
),
(
    'emp-007',
    'sofiam',
    'sofia.al-mansoor@corp.gbs.com',
    'Sofia Al-Mansoor',
    'Manager',
    'GBS-BO',
    'GBS-BO',
    'Senior Director of Global Sourcing',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    'Zurich Operational Center',
    '+41 44 668 1238',
    'Leading global indirect and direct procurement and supplier diversity.',
    ARRAY['Strategic Sourcing', 'Coupa', 'Contract AI', 'Vendor Governance'],
    '2022-02-01'
),
(
    'emp-008',
    'davidk',
    'david.koenig@corp.gbs.com',
    'David Koenig',
    'User',
    'GBS-BO',
    'GBS-BO',
    'Director of Shared Financial Services',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'Bangalore Hub',
    '+91 80 4123 9085',
    'Directing transaction accounting, continuous ledger reconciliations, and P2P.',
    ARRAY['SAP FI/CO', 'BlackLine', 'P2P', 'Financial Close'],
    '2022-03-10'
)
ON CONFLICT (id) DO NOTHING;

-- Set reporting lines
UPDATE users SET manager_id = 'emp-001' WHERE id IN ('emp-002', 'emp-003');
UPDATE users SET manager_id = 'emp-002' WHERE id IN ('emp-004', 'emp-005', 'emp-006');
UPDATE users SET manager_id = 'emp-003' WHERE id IN ('emp-007', 'emp-008');

-- Link department heads
UPDATE departments SET head_user_id = 'emp-001' WHERE id = 'GBS';
UPDATE departments SET head_user_id = 'emp-002' WHERE id = 'GBS-BTS';
UPDATE departments SET head_user_id = 'emp-003' WHERE id = 'GBS-BO';

-- 3. SEED DEPARTMENT METRICS
INSERT INTO department_metrics (department_id, label, value, change_value, trend, display_order)
VALUES
('GBS', 'Global Service SLA', '99.8%', '+0.4%', 'up', 1),
('GBS', 'Annualized Value Generated', '$84.2M', '+18.5%', 'up', 2),
('GBS', 'Customer Satisfaction (CSAT)', '4.82 / 5.0', '+0.15', 'up', 3),
('GBS', 'Process Automation Rate', '64.2%', '+12.0%', 'up', 4),
('GBS-BTS', 'System Uptime Across Platforms', '99.96%', '+0.04%', 'up', 1),
('GBS-BTS', 'DevSecOps Release Frequency', '142 / month', '+24%', 'up', 2),
('GBS-BTS', 'Cloud Modernization Index', '88.4%', '+9.2%', 'up', 3),
('GBS-BTS', 'Mean Time to Resolution (MTTR)', '18 mins', '-32%', 'up', 4),
('GBS-BO', 'Invoice Processing Automation', '94.8%', '+7.1%', 'up', 1),
('GBS-BO', 'Vendor Compliance Rate', '99.2%', '+1.1%', 'up', 2),
('GBS-BO', 'Procurement Turnaround Time', '1.4 days', '-45%', 'up', 3),
('GBS-BO', 'Shared Services Cost Reduction', '$38.4M', '+22.3%', 'up', 4);

-- 4. SEED TEAMS
INSERT INTO teams (id, name, department_id, lead_user_id, member_count, location, focus_area, description, functions, tech_stack, recent_achievement)
VALUES
(
    'team-bts-01',
    'Cloud Infrastructure & DevOps',
    'GBS-BTS',
    'emp-005',
    28,
    'Bangalore Hub',
    'Hybrid Multi-Cloud, Kubernetes, Terraform, Site Reliability Engineering',
    'Manages enterprise multi-cloud foundations, automated infrastructure pipelines, and 24/7 reliability across global datacenters.',
    ARRAY['Multi-cloud provisioning', 'Observability & Monitoring', 'Infrastructure-as-Code', 'Chaos Engineering'],
    ARRAY['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Datadog', 'Go'],
    'Maintained 99.98% platform reliability over Q3 without a single Sev-1 downtime.'
),
(
    'team-bts-02',
    'Intelligent Automation & AI',
    'GBS-BTS',
    'emp-004',
    24,
    'Bangalore Innovation Hub',
    'Enterprise LLM Gateway, RPA, Document AI, Agentic Workflows',
    'Builds cutting-edge AI copilot capabilities, document intelligence, and robotic process automation across enterprise business lines.',
    ARRAY['Enterprise GenAI Integration', 'Document OCR & NLP', 'RPA Process Mining', 'Agentic Workflow Engines'],
    ARRAY['Python', 'TypeScript', 'LangChain', 'FastAPI', 'UiPath', 'PyTorch'],
    'Automated 1.2M document classification tasks, saving 84,000 man-hours in 2026.'
),
(
    'team-bo-01',
    'Global Strategic Procurement',
    'GBS-BO',
    'emp-007',
    26,
    'Zurich Operational Center',
    'Category Management, Vendor Negotiations, Global Supplier Diversity',
    'Manages $2.4B in annual enterprise indirect and direct spend, supplier master agreements, and strategic cost containment.',
    ARRAY['Supplier negotiations', 'Contract governance', 'Cost optimization', 'Sustainable procurement'],
    ARRAY['Coupa', 'Ariba', 'PowerBI', 'DocuSign Enterprise'],
    'Negotiated enterprise-wide software and hardware agreements yielding $14.2M in recurring savings.'
),
(
    'team-bo-02',
    'Shared Financial Operations & P2P',
    'GBS-BO',
    'emp-008',
    38,
    'Bangalore Hub',
    'Procure-to-Pay (P2P), Order-to-Cash (O2C), Record-to-Report (R2R)',
    'Runs transaction accounting, invoice settlement, intercompany reconciliations, and regulatory financial filings globally.',
    ARRAY['Accounts payable', 'Accounts receivable', 'General ledger reconciliations', 'Treasury support'],
    ARRAY['SAP FI/CO', 'BlackLine', 'HighRadius', 'Workday Financials'],
    'Shortened global monthly financial closing cycle from 6 calendar days to 2.5 days.'
)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED STRATEGIC PROJECTS
INSERT INTO projects (id, code, name, department_id, team_id, lead_user_id, status, progress, priority, start_date, target_end_date, description, objectives, outcomes, savings_annualized, members_count, tags)
VALUES
(
    'PRJ-BTS-101',
    'PRJ-BTS-101',
    'Multi-Cloud Mesh Unification (AWS & Azure)',
    'GBS-BTS',
    'team-bts-01',
    'emp-005',
    'In Progress',
    74,
    'Critical',
    '2026-01-15',
    '2026-12-15',
    'Architecting an automated hybrid multi-cloud service mesh connecting 6 global datacenters with AWS and Azure regions, featuring zero-latency VPC peering.',
    '["Zero-downtime service mesh with Istio", "Automated disaster failover under 45 seconds", "30% reduction in inter-region egress network costs"]'::jsonb,
    '["Migrated 220 container workloads successfully", "Unified cloud security postures under a single policy engine"]'::jsonb,
    '$4.2M / year',
    16,
    ARRAY['Multi-Cloud', 'Kubernetes', 'Istio', 'DevOps']
),
(
    'PRJ-BTS-102',
    'PRJ-BTS-102',
    'GBS GenAI Copilot & Enterprise Knowledge Graph',
    'GBS-BTS',
    'team-bts-02',
    'emp-004',
    'In Progress',
    88,
    'Critical',
    '2026-02-01',
    '2026-11-30',
    'Corporate-grade conversational AI assistant grounded on 12,000 internal SOPs, technical runbooks, and SAP data dictionaries, with role-based access filtering.',
    '["Sub-second query responses for 40,000 corporate staff", "Strict DLP guardrails ensuring zero external training leakage", "50% reduction in tier-1 IT support queries"]'::jsonb,
    '["Deflected 34,000 monthly tickets in pilot phase", "Rated 4.9/5 by pilot user cohort of 1,200 employees"]'::jsonb,
    '$6.8M / year',
    14,
    ARRAY['GenAI', 'LLM', 'RAG', 'Digital Assistant']
),
(
    'PRJ-BO-201',
    'PRJ-BO-201',
    'Global Autonomous Procurement & S2P Modernization',
    'GBS-BO',
    'team-bo-01',
    'emp-007',
    'In Progress',
    68,
    'Critical',
    '2026-03-01',
    '2027-01-30',
    'Revolutionizing end-to-end source-to-pay processes with automated contract term extraction, intelligent vendor rating, and straight-through PO generation.',
    '["Automate 80% of routine purchasing requests under $50,000", "Consolidate 1,400 indirect vendors into 350 preferred contracts", "Deliver $18M in negotiated supplier cost reductions"]'::jsonb,
    '["Sourced $850M in spend through digitized workflows", "Cycle time dropped from 7 days to 18 hours"]'::jsonb,
    '$18.4M / year',
    18,
    ARRAY['Procurement', 'Coupa', 'Contract AI', 'Savings']
)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED ANNOUNCEMENTS
INSERT INTO announcements (id, title, summary, content, category, department_id, author_user_id, published_at, is_urgent, is_featured, read_time_minutes, views_count, likes_count, tags, cover_image, image_details)
VALUES
(
    'ann-001',
    'GBS Annual Strategic Vision 2027: The Autonomous Enterprise Journey',
    'Executive roadmap unveiling our multi-year blueprint for agentic enterprise automation, cloud unification, and shared services expansion.',
    'Dear GBS Colleagues, Over the past three quarters, our combined teams across GBS-BTS and GBS-BO have eliminated over 140,000 hours of redundant manual toil and elevated our global service SLA to 99.8%. Our 2027 roadmap establishes three paramount pillars: Autonomous Enterprise Workflows, Global Shared Services Co-location, and Employee Experience First with the GBS Portal.',
    'Executive',
    'GBS',
    'emp-001',
    '2026-10-04 09:00:00+00',
    true,
    true,
    4,
    1840,
    312,
    ARRAY['Strategy', 'Leadership', 'Roadmap', 'Vision 2027'],
    '/src/assets/images/executive_townhall_summit_1791784068697.jpg',
    '{"caption": "GBS Annual Global Leadership Keynote Address & Vision 2027 Unveiling", "location": "New York Executive Center Amphitheater", "eventDate": "October 2026"}'::jsonb
),
(
    'ann-002',
    'Global Rollout: Next-Gen Enterprise AI Gateway Now Live for All BTS Teams',
    'Secure corporate GenAI gateway provides unified model access, data loss prevention (DLP), and zero-retention compliance.',
    'The Intelligent Automation & AI practice has deployed the corporate-grade AI Gateway. Engineers and operational analysts can now leverage modern LLM endpoints through approved internal proxies without risk of intellectual property leakage.',
    'Technology',
    'GBS-BTS',
    'emp-004',
    '2026-10-02 14:30:00+00',
    false,
    true,
    3,
    1290,
    245,
    ARRAY['AI Gateway', 'Cloud', 'Compliance', 'Security'],
    '/src/assets/images/bts_tech_architecture_1791784039637.jpg',
    '{"caption": "BTS Intelligent Automation & Cloud Architecture Engineering Hub", "location": "Bangalore Technology Innovation Hub", "eventDate": "October 2026"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 7. SEED ACHIEVEMENTS & WALL OF RECOGNITION
INSERT INTO achievements (id, title, recipient_name, recipient_type, recipient_user_id, department_id, date, category, description, impact_metric, presented_by, presenter_user_id)
VALUES
(
    'ach-001',
    'Global Operational Excellence Pinnacle Award 2026',
    'Shared Financial Operations Team',
    'Team',
    NULL,
    'GBS-BO',
    '2026-09-30',
    'Award',
    'Celebrated for slashing global monthly financial ledger close from 6 calendar days to an unprecedented 2.5 days across 34 operating subsidiaries.',
    'Saved 18,000 corporate accounting hours annually and improved fiscal audit accuracy by 99.4%.',
    'Marcus Vance (EVP Global Head of GBS)',
    'emp-001'
),
(
    'ach-002',
    'Enterprise Cloud Modernization Innovation Trophy',
    'Cloud Infrastructure & DevOps Team',
    'Team',
    NULL,
    'GBS-BTS',
    '2026-09-15',
    'Milestone',
    'Successfully orchestrated the zero-downtime migration of 220 container workloads into the unified multi-cloud mesh with automated disaster failover.',
    'Attained 99.98% platform uptime and curtailed inter-region egress cloud expenses by $4.2M annually.',
    'Dr. Aris Thorne (SVP & CIO, GBS-BTS)',
    'emp-002'
)
ON CONFLICT (id) DO NOTHING;

-- 8. SEED AUDIT LOGS
INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, details, ip_address)
VALUES
('a0000001-0000-0000-0000-000000000001', 'emp-001', 'PORTAL_INITIALIZATION', 'System', 'GBS-PORTAL', '{"status": "ACTIVE", "version": "2.4.0", "engine": "PostgreSQL 14+"}'::jsonb, '10.240.0.1'::inet),
('a0000002-0000-0000-0000-000000000002', 'emp-001', 'ROLE_VERIFIED', 'User', 'emp-001', '{"assignedRole": "Admin", "ntid": "marcusv"}'::jsonb, '10.240.0.15'::inet)
ON CONFLICT (id) DO NOTHING;

-- 7. SEED SOPs & RESOURCES
INSERT INTO resources (id, title, description, category, department_id, file_type, file_size, version, owner_user_id, download_count, is_popular, tags)
VALUES
(
    'res-001',
    'GBS-SOP-101: Enterprise Incident Management & Severity-1 Protocol',
    'Standard operating procedure for declaring, triaging, and resolving critical P1/Sev-1 outages across global datacenters and business services.',
    'SOPs',
    'GBS',
    'PDF',
    '1.4 MB',
    '4.2',
    'emp-005',
    1420,
    true,
    ARRAY['Incident Management', 'SLA', 'SRE', 'Emergency']
),
(
    'res-002',
    'GBS-SOP-102: Source-to-Pay (S2P) Requisition and Purchase Order Guidelines',
    'Comprehensive operational manual for creating purchase requisitions, three-way invoice matching, and approval matrices in Coupa and SAP.',
    'SOPs',
    'GBS-BO',
    'PDF',
    '2.8 MB',
    '3.1',
    'emp-007',
    2890,
    true,
    ARRAY['Procurement', 'Coupa', 'PO Guide', 'Finance']
),
(
    'res-003',
    'Enterprise Information Security Policy (SOC-2 & ISO 27001 Standard)',
    'Governing corporate security mandate covering endpoint encryption, password managers, privileged access management, and data handling.',
    'Policies',
    'GBS-BTS',
    'PDF',
    '3.5 MB',
    '5.0',
    'emp-006',
    3120,
    true,
    ARRAY['Security Policy', 'SOC-2', 'ISO 27001', 'Compliance']
)
ON CONFLICT (id) DO NOTHING;

-- 8. SEED QUICK LINKS
INSERT INTO quick_links (id, title, category, description, url, icon_name, is_internal, is_frequent, badge, sort_order)
VALUES
('ql-001', 'ServiceNow Employee Center', 'IT & Support', 'Submit IT incidents, hardware requests, software access approvals, and track status.', 'https://servicenow.corp.gbs.com', 'LifeBuoy', true, true, 'Core IT', 1),
('ql-002', 'Microsoft Teams Enterprise', 'Communication', 'Corporate chats, department channels, video conferences, and team collaboration.', 'https://teams.microsoft.com', 'MessageSquare', false, true, 'Popular', 2),
('ql-003', 'Microsoft Outlook 365', 'Communication', 'Corporate email, calendar scheduling, meeting invites, and executive bookings.', 'https://outlook.office365.com', 'Mail', false, true, NULL, 3),
('ql-004', 'Workday HCM & Shared Services', 'HR & Benefits', 'Manage compensation, PTO leaves, benefits, performance reviews, and org hierarchy.', 'https://workday.corp.gbs.com', 'Users', true, true, 'Essential', 4),
('ql-005', 'Coupa Strategic Procurement', 'Finance & Procurement', 'Create purchase requisitions, approve vendor purchase orders, and track invoices.', 'https://coupa.corp.gbs.com', 'ShoppingCart', true, true, NULL, 5),
('ql-006', 'SAP S/4HANA Enterprise Cloud', 'Finance & Procurement', 'Global ledger, asset accounting, treasury management, and corporate reporting.', 'https://sap.corp.gbs.com', 'Database', true, false, NULL, 6),
('ql-007', 'PowerBI Enterprise Analytics', 'Analytics', 'Interactive executive scorecards, department SLAs, financial dashboards, and KPIs.', 'https://powerbi.corp.gbs.com', 'BarChart3', true, true, 'Real-time', 7),
('ql-008', 'Jira Software & Align', 'Productivity', 'Agile sprints, backlog planning, roadmaps, and cross-functional project tracking.', 'https://jira.corp.gbs.com', 'CheckSquare', true, true, NULL, 8)
ON CONFLICT (id) DO NOTHING;

COMMIT;
