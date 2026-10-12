import React, { useState } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { useUIStore } from '../../stores/uiStore';
import { POSTGRES_SCHEMA_SQL, POSTGRES_SEEDS_SQL } from '../../constants/databaseSql';
import {
  Database,
  Terminal,
  FileCode,
  Download,
  Copy,
  Check,
  Play,
  Layers,
  Table as TableIcon,
  ShieldCheck,
  Server,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ColumnDef {
  name: string;
  type: string;
  constraints: string;
  description: string;
}

interface TableDef {
  name: string;
  category: 'Core Organization' | 'Collaboration & News' | 'Knowledge & Tools' | 'Governance & Security';
  recordCount: number;
  description: string;
  columns: ColumnDef[];
}

export const DatabaseStudio: React.FC = () => {
  const { users, departments, teams, announcements, resources, projects, achievements, quickLinks } =
    useCMSStore();
  const { showToast } = useUIStore();

  const [activeTab, setActiveTab] = useState<'console' | 'tables' | 'scripts' | 'deploy'>('console');
  const [selectedScript, setSelectedScript] = useState<'schema' | 'seeds'>('schema');
  const [copied, setCopied] = useState(false);

  // SQL Console State
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('departments');

  const sampleQueries = [
    {
      title: 'Active Operating Divisions & Strategic Priorities',
      sql: `SELECT id, code, name, employee_count, teams_count, color, cover_image \nFROM departments \nORDER BY employee_count DESC;`,
      run: () => departments.map((d) => ({
        id: d.id,
        code: d.code,
        name: d.name,
        employee_count: d.employeeCount,
        teams_count: d.teamsCount,
        color: d.color,
        has_cover_image: d.coverImage ? 'Yes (Live)' : 'No',
      })),
    },
    {
      title: 'Corporate Leadership & Admin Personas',
      sql: `SELECT id, ntid, name, role, title, department, location \nFROM users \nWHERE role = 'Admin' \nORDER BY name ASC;`,
      run: () => users.filter((u) => u.role === 'Admin').map((u) => ({
        id: u.id,
        ntid: u.ntid,
        name: u.name,
        role: u.role,
        title: u.title,
        department: u.department,
        location: u.location,
      })),
    },
    {
      title: 'Recent Executive Directives & High-Priority Bulletins',
      sql: `SELECT id, title, category, department, is_urgent, is_featured, views_count, likes_count \nFROM announcements \nORDER BY published_at DESC LIMIT 5;`,
      run: () => announcements.slice(0, 5).map((a) => ({
        id: a.id,
        title: a.title,
        category: a.category,
        department: a.department,
        is_urgent: a.isUrgent ? 'TRUE' : 'FALSE',
        is_featured: a.isFeatured ? 'TRUE' : 'FALSE',
        views: a.views,
        likes: a.likes,
      })),
    },
    {
      title: 'Active Strategic Initiatives & Projected Annual Savings',
      sql: `SELECT code, name, department_id, status, progress, priority, savings_annualized \nFROM projects \nWHERE status = 'In Progress' \nORDER BY progress DESC;`,
      run: () => projects.filter((p) => p.status === 'In Progress').map((p) => ({
        code: p.code,
        name: p.name,
        department: p.department,
        status: p.status,
        progress: `${p.progress}%`,
        priority: p.priority,
        annualized_savings: p.savingsAnnualized || 'N/A',
      })),
    },
    {
      title: 'Most Downloaded Enterprise SOPs & Governance Policies',
      sql: `SELECT id, title, category, department_id, file_type, version, download_count \nFROM resources \nWHERE is_popular = true \nORDER BY download_count DESC;`,
      run: () => resources.filter((r) => r.isPopular).map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category,
        department: r.department,
        type: r.fileType,
        version: r.version,
        downloads: r.downloadCount,
      })),
    },
  ];

  const handleRunQuery = (index = selectedQueryIndex) => {
    const start = performance.now();
    const result = sampleQueries[index].run();
    const duration = +(performance.now() - start).toFixed(2);
    setQueryResult(result);
    setExecutionTime(duration || 1.2);
  };

  const handleCopySql = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename} successfully!`, 'success');
  };

  // Table Definitions
  const tables: TableDef[] = [
    {
      name: 'departments',
      category: 'Core Organization',
      recordCount: departments.length,
      description: 'Organizational parent hierarchy, missions, metrics, cover images, and strategic priorities.',
      columns: [
        { name: 'id', type: 'VARCHAR(32)', constraints: 'PRIMARY KEY', description: 'Unique code (GBS, GBS-BTS, GBS-BO)' },
        { name: 'code', type: 'VARCHAR(64)', constraints: 'UNIQUE, NOT NULL', description: 'Business code (e.g. GBS-GLOBAL)' },
        { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Full official department name' },
        { name: 'employee_count', type: 'INT', constraints: 'NOT NULL DEFAULT 0', description: 'Active professional headcount' },
        { name: 'cover_image', type: 'TEXT', constraints: 'NULLABLE', description: 'High-fidelity operational facility visual asset' },
        { name: 'image_details', type: 'JSONB', constraints: 'NOT NULL DEFAULT {}', description: 'Provenance metadata (location, photographer, caption)' },
        { name: 'strategic_priorities', type: 'JSONB', constraints: 'NOT NULL DEFAULT []', description: 'Quarterly roadmap priority goals' },
      ],
    },
    {
      name: 'users',
      category: 'Core Organization',
      recordCount: users.length,
      description: 'Single source of truth employee directory, NT-IDs, roles, skills, and manager reporting lines.',
      columns: [
        { name: 'id', type: 'VARCHAR(64)', constraints: 'PRIMARY KEY', description: 'Canonical employee ID (e.g. emp-001)' },
        { name: 'ntid', type: 'VARCHAR(64)', constraints: 'UNIQUE, NOT NULL', description: 'Corporate single sign-on username' },
        { name: 'email', type: 'VARCHAR(255)', constraints: 'UNIQUE, NOT NULL', description: 'Corporate corporate email address' },
        { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Full legal/preferred employee name' },
        { name: 'role', type: 'user_role (ENUM)', constraints: 'NOT NULL DEFAULT User', description: 'Access tier (Admin, Manager, User)' },
        { name: 'department_id', type: 'VARCHAR(32)', constraints: 'FK -> departments.id', description: 'Primary business unit alignment' },
        { name: 'manager_id', type: 'VARCHAR(64)', constraints: 'FK -> users.id (Self)', description: 'Direct reporting manager' },
        { name: 'skills', type: 'TEXT[]', constraints: 'DEFAULT {}', description: 'Verified technical & operational capabilities' },
      ],
    },
    {
      name: 'teams',
      category: 'Core Organization',
      recordCount: teams.length,
      description: 'Specialized functional operating units across BTS engineering and BO shared services.',
      columns: [
        { name: 'id', type: 'VARCHAR(64)', constraints: 'PRIMARY KEY', description: 'Unique team identifier' },
        { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Team title (e.g. Cloud & DevOps)' },
        { name: 'department_id', type: 'VARCHAR(32)', constraints: 'FK -> departments.id', description: 'Parent division' },
        { name: 'lead_user_id', type: 'VARCHAR(64)', constraints: 'FK -> users.id', description: 'Team leader / manager' },
        { name: 'functions', type: 'TEXT[]', constraints: 'NOT NULL DEFAULT {}', description: 'Core functional responsibilities' },
        { name: 'tech_stack', type: 'TEXT[]', constraints: 'NOT NULL DEFAULT {}', description: 'Tools and technical ecosystem' },
      ],
    },
    {
      name: 'announcements',
      category: 'Collaboration & News',
      recordCount: announcements.length,
      description: 'Executive broadcasts, architecture decisions, town halls, and operational bulletins.',
      columns: [
        { name: 'id', type: 'VARCHAR(64)', constraints: 'PRIMARY KEY', description: 'Announcement bulletin ID' },
        { name: 'title', type: 'VARCHAR(500)', constraints: 'NOT NULL', description: 'Headline' },
        { name: 'category', type: 'announcement_category', constraints: 'NOT NULL', description: 'Category (Executive, Tech, Town Hall)' },
        { name: 'department_id', type: 'VARCHAR(32)', constraints: 'FK -> departments.id', description: 'Target audience scope' },
        { name: 'author_user_id', type: 'VARCHAR(64)', constraints: 'FK -> users.id', description: 'Publishing author' },
        { name: 'cover_image', type: 'TEXT', constraints: 'NULLABLE', description: 'Responsive high-res hero visual asset' },
        { name: 'image_details', type: 'JSONB', constraints: 'NOT NULL DEFAULT {}', description: 'Keynote location, date, and caption' },
        { name: 'views_count', type: 'INT', constraints: 'DEFAULT 0', description: 'Telemetry read counter' },
        { name: 'likes_count', type: 'INT', constraints: 'DEFAULT 0', description: 'Peer appreciation counter' },
      ],
    },
    {
      name: 'resources',
      category: 'Knowledge & Tools',
      recordCount: resources.length,
      description: 'Centralized knowledge repository housing SOPs, security policies, templates, and runbooks.',
      columns: [
        { name: 'id', type: 'VARCHAR(64)', constraints: 'PRIMARY KEY', description: 'Resource ID (e.g. res-001)' },
        { name: 'title', type: 'VARCHAR(500)', constraints: 'NOT NULL', description: 'Document title' },
        { name: 'category', type: 'resource_category', constraints: 'NOT NULL', description: 'SOPs, Policies, Templates, Training' },
        { name: 'file_type', type: 'resource_file_type', constraints: 'NOT NULL DEFAULT PDF', description: 'PDF, DOCX, XLSX, PPTX' },
        { name: 'version', type: 'VARCHAR(32)', constraints: 'NOT NULL DEFAULT 1.0', description: 'Document release version' },
        { name: 'download_count', type: 'INT', constraints: 'DEFAULT 0', description: 'Usage telemetry counter' },
      ],
    },
    {
      name: 'projects',
      category: 'Knowledge & Tools',
      recordCount: projects.length,
      description: 'Multi-quarter strategic transformation programs, timelines, milestones, and ROI savings.',
      columns: [
        { name: 'id', type: 'VARCHAR(64)', constraints: 'PRIMARY KEY', description: 'Project code (PRJ-BTS-101)' },
        { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Program title' },
        { name: 'status', type: 'project_status', constraints: 'NOT NULL', description: 'Planning, In Progress, Completed' },
        { name: 'progress', type: 'INT', constraints: 'CHECK (0-100)', description: 'Percentage completion' },
        { name: 'savings_annualized', type: 'VARCHAR(128)', constraints: 'NULLABLE', description: 'Projected monetary benefit' },
      ],
    },
    {
      name: 'achievements',
      category: 'Collaboration & News',
      recordCount: achievements.length,
      description: 'Wall of Recognition kudos, quarterly excellence awards, and leadership spotlights.',
      columns: [
        { name: 'id', type: 'VARCHAR(64)', constraints: 'PRIMARY KEY', description: 'Achievement record ID' },
        { name: 'title', type: 'VARCHAR(500)', constraints: 'NOT NULL', description: 'Honor or award title' },
        { name: 'recipient_name', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Individual or team recipient' },
        { name: 'category', type: 'achievement_type', constraints: 'NOT NULL', description: 'Award, Milestone, Recognition' },
        { name: 'impact_metric', type: 'VARCHAR(500)', constraints: 'NOT NULL', description: 'Quantifiable business contribution' },
      ],
    },
    {
      name: 'quick_links',
      category: 'Knowledge & Tools',
      recordCount: quickLinks.length,
      description: 'Curated enterprise portal catalog (ServiceNow, Workday, Coupa, SAP S/4HANA, Jira).',
      columns: [
        { name: 'id', type: 'VARCHAR(64)', constraints: 'PRIMARY KEY', description: 'Quick link ID' },
        { name: 'title', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Application name' },
        { name: 'category', type: 'quick_link_category', constraints: 'NOT NULL', description: 'IT Support, HR, Finance, Analytics' },
        { name: 'url', type: 'TEXT', constraints: 'NOT NULL', description: 'Corporate target URL' },
        { name: 'sort_order', type: 'INT', constraints: 'NOT NULL DEFAULT 0', description: 'Display priority rank' },
      ],
    },
    {
      name: 'audit_logs',
      category: 'Governance & Security',
      recordCount: 2,
      description: 'Immutable compliance audit ledger capturing user role changes and security operations.',
      columns: [
        { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT uuid_generate_v4()', description: 'Unique audit log entry' },
        { name: 'user_id', type: 'VARCHAR(64)', constraints: 'FK -> users.id', description: 'Actor initiating the modification' },
        { name: 'action', type: 'VARCHAR(128)', constraints: 'NOT NULL', description: 'ROLE_UPDATE, SOP_DOWNLOAD, INITIALIZATION' },
        { name: 'details', type: 'JSONB', constraints: 'NOT NULL DEFAULT {}', description: 'Contextual payload and state diff' },
        { name: 'created_at', type: 'TIMESTAMPTZ', constraints: 'NOT NULL DEFAULT NOW()', description: 'Immutable event timestamp' },
      ],
    },
  ];

  const currentTableObj = tables.find((t) => t.name === selectedTable) || tables[0];

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden">
      {/* Studio Header */}
      <div className="p-6 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-[#D71920] text-white">
              Database Architecture
            </span>
            <span className="text-xs font-mono text-gray-300">Engine: PostgreSQL 14+ / 16+</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            PostgreSQL Relational Studio & Schema Governance
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl">
            Production-ready PostgreSQL scripts designed for GBS enterprise scale. Explore schema definitions, interactive query simulation, ERD table dictionary, and export SQL scripts for Cloud SQL, AWS RDS, or Docker.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleDownloadSql(POSTGRES_SCHEMA_SQL, '01_schema.sql')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/20"
            title="Download 01_schema.sql DDL"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Schema.sql</span>
          </button>
          <button
            onClick={() => handleDownloadSql(POSTGRES_SEEDS_SQL, '02_seeds.sql')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/20"
            title="Download 02_seeds.sql DML"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Seeds.sql</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="border-b border-gray-200 bg-gray-50/70 px-6 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('console');
            if (!queryResult) handleRunQuery(selectedQueryIndex);
          }}
          className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'console'
              ? 'border-[#D71920] text-[#D71920]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Interactive SQL Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab('tables')}
          className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'tables'
              ? 'border-[#D71920] text-[#D71920]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <TableIcon className="w-4 h-4" />
          <span>Table Dictionary & ERD ({tables.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('scripts')}
          className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'scripts'
              ? 'border-[#D71920] text-[#D71920]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>PostgreSQL Scripts Viewer</span>
        </button>
        <button
          onClick={() => setActiveTab('deploy')}
          className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'deploy'
              ? 'border-[#D71920] text-[#D71920]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Cloud & Migration Guide</span>
        </button>
      </div>

      {/* Tab 1: Interactive SQL Console */}
      {activeTab === 'console' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Query Presets */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-gray-400 block font-mono">
                Select Pre-Built Enterprise Query
              </span>
              <div className="space-y-1.5">
                {sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedQueryIndex(idx);
                      handleRunQuery(idx);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      selectedQueryIndex === idx
                        ? 'bg-red-50/70 border-red-200 text-[#D71920] font-bold shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{q.title}</span>
                      <span className="text-[10px] font-mono text-gray-400">Query {idx + 1}</span>
                    </div>
                    <code className="text-[10px] font-mono text-gray-500 block truncate">
                      {q.sql.split('\n')[0]}
                    </code>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Code Editor & Execution Results */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-xl border border-gray-800 bg-gray-950 text-white overflow-hidden shadow-lg">
                <div className="px-4 py-2 bg-gray-900/90 border-b border-gray-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[11px] text-gray-300">
                      Query Simulator (Live Memory Engine)
                    </span>
                  </div>
                  <button
                    onClick={() => handleRunQuery(selectedQueryIndex)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#D71920] hover:bg-[#b5141a] text-white rounded font-bold text-xs transition-colors shadow-2xs"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Query</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                  {sampleQueries[selectedQueryIndex].sql}
                </pre>
              </div>

              {/* Result Grid */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
                <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700">
                    Execution Results ({queryResult ? queryResult.length : 0} Rows)
                  </span>
                  {executionTime !== null && (
                    <span className="text-xs font-mono text-[#16A34A] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Executed in {executionTime} ms
                    </span>
                  )}
                </div>

                {queryResult && queryResult.length > 0 ? (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-100/70 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] font-mono sticky top-0">
                        <tr>
                          {Object.keys(queryResult[0]).map((key) => (
                            <th key={key} className="py-2.5 px-3 whitespace-nowrap">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-mono text-[11px]">
                        {queryResult.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-gray-50">
                            {Object.values(row).map((val: any, cIdx) => (
                              <td key={cIdx} className="py-2 px-3 text-gray-700 whitespace-nowrap">
                                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-gray-400">
                    Click "Run Query" to execute the SQL simulation against the data store.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Table Dictionary & ERD */}
      {activeTab === 'tables' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Table Selector */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-gray-400 block font-mono">
                PostgreSQL Relational Entities ({tables.length})
              </span>
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                {tables.map((tbl) => (
                  <button
                    key={tbl.name}
                    onClick={() => setSelectedTable(tbl.name)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      selectedTable === tbl.name
                        ? 'bg-red-50/70 border-red-200 text-[#D71920] font-bold shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-bold block">{tbl.name}</span>
                      <span className="text-[10px] text-gray-400 block">{tbl.category}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-semibold">
                      {tbl.recordCount} rows
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Column Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TableIcon className="w-5 h-5 text-[#D71920]" />
                    <h3 className="text-base font-bold text-gray-900 font-mono">
                      {currentTableObj.name}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    Category: {currentTableObj.category}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">{currentTableObj.description}</p>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] font-mono">
                      <tr>
                        <th className="py-2.5 px-4">Column Name</th>
                        <th className="py-2.5 px-4">PostgreSQL Data Type</th>
                        <th className="py-2.5 px-4">Constraints</th>
                        <th className="py-2.5 px-4">Business Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentTableObj.columns.map((col, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/70">
                          <td className="py-2.5 px-4 font-mono font-bold text-gray-900">
                            {col.name}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-emerald-600">{col.type}</td>
                          <td className="py-2.5 px-4 font-mono text-[11px] text-gray-500">
                            {col.constraints}
                          </td>
                          <td className="py-2.5 px-4 text-gray-600">{col.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SQL Scripts Viewer */}
      {activeTab === 'scripts' && (
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedScript('schema')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedScript === 'schema'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                01_schema.sql (DDL Tables & Indexes)
              </button>
              <button
                onClick={() => setSelectedScript('seeds')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedScript === 'seeds'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                02_seeds.sql (DML Initial Enterprise Data)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleCopySql(
                    selectedScript === 'schema' ? POSTGRES_SCHEMA_SQL : POSTGRES_SEEDS_SQL,
                    selectedScript === 'schema' ? '01_schema.sql' : '02_seeds.sql'
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors border border-gray-200"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Script'}</span>
              </button>
              <button
                onClick={() =>
                  handleDownloadSql(
                    selectedScript === 'schema' ? POSTGRES_SCHEMA_SQL : POSTGRES_SEEDS_SQL,
                    selectedScript === 'schema' ? '01_schema.sql' : '02_seeds.sql'
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D71920] hover:bg-[#b5141a] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .sql</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-950 text-gray-100 overflow-hidden shadow-lg">
            <div className="p-3 bg-gray-900/90 border-b border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>{selectedScript === 'schema' ? '/sql/01_schema.sql' : '/sql/02_seeds.sql'}</span>
              <span>PostgreSQL 14+</span>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-200 overflow-x-auto max-h-[500px] leading-relaxed select-text">
              {selectedScript === 'schema' ? POSTGRES_SCHEMA_SQL : POSTGRES_SEEDS_SQL}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: Cloud & Migration Guide */}
      {activeTab === 'deploy' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Docker Local Run */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-bold text-gray-900">Docker Container (Instant Local)</h4>
              </div>
              <p className="text-xs text-gray-600">
                Run an isolated PostgreSQL 16 container with automatic schema & seed execution:
              </p>
              <pre className="p-3 bg-gray-900 text-emerald-400 rounded-lg text-[11px] font-mono overflow-x-auto">
{`docker run --name gbs-postgres \\
  -e POSTGRES_DB=gbs_portal_db \\
  -e POSTGRES_USER=postgres \\
  -e POSTGRES_PASSWORD=postgres \\
  -p 5432:5432 \\
  -v $(pwd)/sql/01_schema.sql:/docker-entrypoint-initdb.d/01_schema.sql \\
  -v $(pwd)/sql/02_seeds.sql:/docker-entrypoint-initdb.d/02_seeds.sql \\
  -d postgres:16-alpine`}
              </pre>
            </div>

            {/* Standard PSQL */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-600" />
                <h4 className="text-sm font-bold text-gray-900">psql Command Line Execution</h4>
              </div>
              <p className="text-xs text-gray-600">
                Direct execution on existing PostgreSQL host or managed cloud instance:
              </p>
              <pre className="p-3 bg-gray-900 text-emerald-400 rounded-lg text-[11px] font-mono overflow-x-auto">
{`# 1. Create target database
createdb -U postgres gbs_portal_db

# 2. Run DDL schema migration
psql -U postgres -d gbs_portal_db -f sql/01_schema.sql

# 3. Seed initial enterprise records
psql -U postgres -d gbs_portal_db -f sql/02_seeds.sql`}
              </pre>
            </div>

            {/* Cloud SQL / RDS */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#D71920]" />
                <h4 className="text-sm font-bold text-gray-900">Google Cloud SQL / AWS RDS</h4>
              </div>
              <p className="text-xs text-gray-600">
                Managed cloud relational setup:
              </p>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                <li>Create a PostgreSQL instance (PostgreSQL 14 or 15).</li>
                <li>Connect using Cloud SQL Auth Proxy or AWS IAM credentials.</li>
                <li>Ensure extensions <code className="font-mono bg-white px-1">uuid-ossp</code> and <code className="font-mono bg-white px-1">pg_trgm</code> are enabled in the database flags.</li>
              </ul>
            </div>

            {/* Supabase / Neon */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-gray-900">Supabase / Neon Database</h4>
              </div>
              <p className="text-xs text-gray-600">
                Serverless & Developer Postgres instances:
              </p>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                <li>Paste contents of <code className="font-mono bg-white px-1">01_schema.sql</code> into the SQL editor and execute.</li>
                <li>Execute <code className="font-mono bg-white px-1">02_seeds.sql</code> immediately following.</li>
                <li>Row-Level Security (RLS) can be turned on using user identity from auth headers.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
