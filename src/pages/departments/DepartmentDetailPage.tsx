import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCMSStore } from '../../stores/cmsStore';
import { PageHeader } from '../../components/common/PageHeader';
import { TeamCard } from '../../components/cards/TeamCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { ResourceCard } from '../../components/cards/ResourceCard';
import { AnnouncementCard } from '../../components/cards/AnnouncementCard';
import { AchievementCard } from '../../components/cards/AchievementCard';
import { KPIWidget } from '../../components/cards/KPIWidget';
import {
  Users,
  Briefcase,
  FileText,
  Megaphone,
  Award,
  Layers,
  ArrowLeft,
  Building2,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const DepartmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { departments, teams, projects, resources, announcements, achievements, users } = useCMSStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'teams' | 'projects' | 'resources' | 'announcements' | 'achievements'
  >('overview');

  const dept = departments.find(
    (d) => d.id.toLowerCase() === id?.toLowerCase() || d.code.toLowerCase() === id?.toLowerCase()
  );

  if (!dept) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Department Not Found</h2>
        <p className="text-xs text-gray-500 mt-1">The requested department code does not exist.</p>
        <button
          onClick={() => navigate('/departments')}
          className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#D71920] rounded-lg"
        >
          Back to Departments
        </button>
      </div>
    );
  }

  const deptTeams = teams.filter((t) => t.departmentId === dept.id);
  const deptProjects = projects.filter((p) => p.department.includes(dept.id));
  const deptResources = resources.filter((r) => r.department === 'All GBS' || r.department === dept.id);
  const deptAnnouncements = announcements.filter(
    (a) => a.department === 'All GBS' || a.department === dept.id
  );
  const deptAchievements = achievements.filter((ach) => ach.department === dept.id);
  const deptEmployees = users.filter((u) => u.department.includes(dept.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/departments')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Departments</span>
        </button>
      </div>

      {/* Department Hero Banner */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold"
                style={{
                  backgroundColor: `${dept.color}15`,
                  color: dept.color,
                }}
              >
                {dept.code}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {dept.employeeCount}+ Professionals Globally
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {dept.name}
            </h1>
            <p className="text-sm font-medium text-gray-700 mt-1">{dept.tagline}</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
              {dept.description}
            </p>
          </div>

          {/* Department Head Lockup */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200/80 shrink-0">
            <img
              src={dept.headAvatar}
              alt={dept.headName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div className="text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Department Executive Lead
              </span>
              <span className="text-sm font-bold text-gray-900 block">{dept.headName}</span>
              <span className="text-gray-500 text-[11px] block">{dept.headTitle}</span>
              <span className="text-gray-400 font-mono text-[10px] mt-1 block">
                NTID: {dept.headNtid}
              </span>
            </div>
          </div>
        </div>

        {/* Mission Statement Box */}
        <div className="mt-6 p-4 rounded-xl bg-gray-50/80 border border-gray-100 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-gray-900 uppercase tracking-wider block mb-0.5">
              Department Mission
            </span>
            <p className="text-gray-700 leading-relaxed">{dept.mission}</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {dept.metrics.map((m, idx) => (
            <div key={idx} className="p-3 bg-gray-50/70 border border-gray-100 rounded-lg">
              <span className="text-[10px] text-gray-400 uppercase font-semibold block truncate">
                {m.label}
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl font-bold text-gray-900 font-mono tabular-nums">
                  {m.value}
                </span>
                <span className="text-xs font-semibold text-[#16A34A] font-mono">{m.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto pb-px">
        {[
          { key: 'overview', label: 'Overview & Priorities', icon: Building2 },
          { key: 'teams', label: `Teams (${deptTeams.length})`, icon: Layers },
          { key: 'projects', label: `Projects (${deptProjects.length})`, icon: Briefcase },
          { key: 'resources', label: `SOPs & Docs (${deptResources.length})`, icon: FileText },
          { key: 'announcements', label: `Directives (${deptAnnouncements.length})`, icon: Megaphone },
          { key: 'achievements', label: `Awards (${deptAchievements.length})`, icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                isActive
                  ? 'border-[#D71920] text-[#D71920]'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-3">Strategic Priorities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dept.strategicPriorities.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-gray-50 rounded-lg border border-gray-100 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Headcount Pool
                </span>
                <span className="text-2xl font-black text-gray-900 font-mono mt-1 block">
                  {dept.employeeCount}+
                </span>
                <p className="text-xs text-gray-400 mt-1">Engineers, architects & analysts</p>
              </div>
              <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Functional Teams
                </span>
                <span className="text-2xl font-black text-gray-900 font-mono mt-1 block">
                  {deptTeams.length}
                </span>
                <p className="text-xs text-gray-400 mt-1">Active practice units</p>
              </div>
              <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Strategic Projects
                </span>
                <span className="text-2xl font-black text-gray-900 font-mono mt-1 block">
                  {deptProjects.length}
                </span>
                <p className="text-xs text-gray-400 mt-1">Multi-quarter initiatives</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deptTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deptProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deptResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deptAnnouncements.map((ann) => (
              <AnnouncementCard key={ann.id} announcement={ann} />
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deptAchievements.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No specific awards recorded for this department yet.</p>
            ) : (
              deptAchievements.map((ach) => <AchievementCard key={ach.id} achievement={ach} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};
