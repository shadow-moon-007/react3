# GBS Portal - PostgreSQL Database Architecture & Setup Guide

This directory contains the production-ready PostgreSQL relational database schema and seed data for the **GBS Portal (Global Business Services)** enterprise platform.

---

## 📁 Files Overview

| File | Purpose | Description |
| :--- | :--- | :--- |
| `01_schema.sql` | **DDL & Schema Definitions** | Full table definitions, custom PostgreSQL ENUM types, primary keys, foreign key constraints, composite junction tables, UUID generators, Trigram text search indexes, and automatic `updated_at` trigger functions. |
| `02_seeds.sql` | **DML & Seed Records** | Complete initial seed data reflecting the prototype state: GBS, GBS-BTS, and GBS-BO departments, leadership hierarchy, cross-functional teams, high-priority projects, corporate SOPs/resources, announcements, quick links, awards, and initial compliance audit logs. |

---

## 🗄️ Relational Data Model (15 Core Tables)

```
                              ┌──────────────┐
                              │ departments  │
                              └──────┬───────┘
                                     │ 1:N
             ┌───────────────────────┼───────────────────────┐
             │                       │                       │
             ▼                       ▼                       ▼
      ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
      │    users    │◄────────┤    teams    │         │  projects   │
      └──────┬──────┘         └──────┬──────┘         └──────┬──────┘
             │                       │                       │
             ├───────────────┐       ▼                       ▼
             │               │ ┌────────────┐         ┌─────────────┐
             ▼               ▼ │team_members│         │proj_members │
      ┌─────────────┐ ┌─────────────┐ └────────────┘  └─────────────┘
      │announcements│ │  resources  │
      └──────┬──────┘ └──────┬──────┘
             │               │
             ▼               ▼
      ┌─────────────┐ ┌─────────────┐
      │ann_likes    │ │download_logs│
      │attachments  │ └─────────────┘
      └─────────────┘
```

### Table Dictionary

1. **`departments`**: Core organizational business units (`GBS`, `GBS-BTS`, `GBS-BO`) with executive leadership, missions, strategic priorities JSON, operational metrics, cover images, and employee counts.
2. **`users`**: Employee directory storing NT-IDs (`ntid`), email, corporate roles (`Admin`, `Manager`, `User`), sub-departments, titles, locations, reporting managers (`manager_id` self-referencing FK), skills array, and avatars.
3. **`department_metrics`**: Operational SLAs and KPIs with historical trend comparisons (`up`, `down`, `neutral`).
4. **`teams`**: Specialized technical and operational units (e.g., Cloud & DevOps, Intelligent Automation, Global Strategic Procurement).
5. **`team_members`**: Junction table mapping many-to-many employee assignments to functional teams.
6. **`announcements`**: Executive bulletins and directives with categories (`Executive`, `Technology`, `Operations`, etc.), priority flags, views/likes, cover images, and markdown content.
7. **`announcement_attachments`**: Downloadable files attached to bulletins (PDF, PPTX).
8. **`announcement_likes`**: User likes tracking for internal communications analytics.
9. **`resources`**: Centralized knowledge center and SOP repository with versioning, categories (`SOPs`, `Policies`, `Templates`, etc.), file types, and download telemetry.
10. **`resource_download_logs`**: Compliance download audit trail with timestamps and IP records.
11. **`projects`**: High-impact transformation projects with Gantt timeline dates, completion percentages, annualized dollar savings, deliverables JSON, and priority tiers.
12. **`project_members`**: Cross-functional team assignments to strategic initiatives.
13. **`achievements`**: Peer-to-peer Kudos and enterprise excellence awards with impact metrics and executive presenter links.
14. **`quick_links`**: Curated enterprise portal catalog (ServiceNow, Workday, Coupa, SAP S/4HANA, Jira, PowerBI) with sort ordering and internal badges.
15. **`user_quick_link_favorites`**: Personalized pinned toolbars for individual employees.
16. **`notifications`**: User alert inbox with direct action links and read state tracking.
17. **`portal_feedback`**: Internal employee suggestions and satisfaction surveys.
18. **`audit_logs`**: Immutable enterprise audit ledger for role modifications and critical actions.

---

## 🚀 Execution Instructions

### Option 1: Standard `psql` Command Line
Ensure PostgreSQL 14+ is installed and your target database is created:

```bash
# 1. Create target database
createdb -U postgres gbs_portal_db

# 2. Execute schema migration
psql -U postgres -d gbs_portal_db -f 01_schema.sql

# 3. Seed initial enterprise records
psql -U postgres -d gbs_portal_db -f 02_seeds.sql
```

### Option 2: Docker Container (Instant Local Environment)
Spin up an isolated PostgreSQL 16 container with automatic schema and seed execution:

```bash
docker run --name gbs-postgres \
  -e POSTGRES_DB=gbs_portal_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -v $(pwd)/01_schema.sql:/docker-entrypoint-initdb.d/01_schema.sql \
  -v $(pwd)/02_seeds.sql:/docker-entrypoint-initdb.d/02_seeds.sql \
  -d postgres:16-alpine
```

### Option 3: Cloud Managed Databases
- **Google Cloud SQL**: Upload `01_schema.sql` and `02_seeds.sql` to a Cloud Storage bucket, then run `gcloud sql import sql [INSTANCE_NAME] gs://[BUCKET]/01_schema.sql`.
- **AWS RDS / Aurora**: Connect via `psql` or pgAdmin using the endpoint address and run the scripts in sequence.
- **Supabase / Neon**: Paste contents of `01_schema.sql` directly into the SQL Editor, execute, followed by `02_seeds.sql`.

---

## 🛡️ Enterprise Security & Integrity Features
- **Trigram Fuzzy Search**: Uses `pg_trgm` GIN index on `users.name` and `resources.title` for instant sub-millisecond search query resolution.
- **Cascading Integrity**: Foreign keys enforce referential consistency while `ON DELETE RESTRICT` protects mission-critical tables like `departments` and `users` from accidental deletion when associated with active projects.
- **Automated Timestamps**: Trigger `trigger_set_timestamp()` automatically updates `updated_at` on any `UPDATE` statement.
