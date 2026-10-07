import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCMSStore } from '../../stores/cmsStore';
import { useUIStore } from '../../stores/uiStore';
import { PageHeader } from '../../components/common/PageHeader';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { EmployeeCard } from '../../components/cards/EmployeeCard';
import {
  Users,
  MapPin,
  Award,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const TeamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teams, users, projects } = useCMSStore();
  const { setSelectedEmployee } = useUIStore();

  const team = teams.find((t) => t.id === id);

  if (!team) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Team Practice Not Found</h2>
        <button
          onClick={() => navigate('/teams')}
          className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#D71920] rounded-lg"
        >
          Back to Teams
        </button>
      </div>
    );
  }

  // Get matching team members from directory (filter by department and sample cohort)
  const teamLead = users.find((u) => u.name.toLowerCase() === team.leadName.toLowerCase()) || users[3];
  const members = users.filter((u) => u.department === team.departmentId).slice(0, 8);
  const teamProjects = projects.filter((p) => team.activeProjects.includes(p.code) || p.teamName === team.name);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <button
          onClick={() => navigate('/teams')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Teams</span>
        </button>
      </div>

      {/* Team Header Banner */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider bg-red-50 text-[#D71920] border border-red-100 px-2 py-0.5 rounded font-bold">
                {team.departmentId}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {team.location} · {team.memberCount} Staff Members
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {team.name}
            </h1>
            <p className="text-sm font-semibold text-gray-700 mt-1">{team.focusArea}</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
              {team.description}
            </p>
          </div>

          {/* Team Lead Card */}
          <div
            onClick={() => setSelectedEmployee(teamLead)}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200/80 shrink-0 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <img
              src={team.leadAvatar}
              alt={team.leadName}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div className="text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Practice Lead
              </span>
              <span className="text-sm font-bold text-gray-900 block">{team.leadName}</span>
              <span className="text-gray-500 text-[11px] block">{team.leadTitle}</span>
              <span className="text-[#D71920] text-[10px] font-bold mt-1 block">
                Click to view profile →
              </span>
            </div>
          </div>
        </div>

        {/* Recent Achievement Banner */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-3">
          <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-950 uppercase tracking-wider block mb-0.5">
              Recent Team Milestone
            </span>
            <p className="text-amber-900 leading-relaxed">{team.recentAchievement}</p>
          </div>
        </div>

        {/* Core Functions and Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
              Core Practice Functions
            </span>
            <div className="space-y-1.5">
              {team.functions.map((fn, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>{fn}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
              Technologies & Systems Managed
            </span>
            <div className="flex flex-wrap gap-1.5">
              {team.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-gray-100 rounded text-xs font-mono font-medium text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Active Practice Deliverables</h3>
          <span className="text-xs font-mono text-gray-500">{teamProjects.length} Initiatives</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      {/* Team Members Roster */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Featured Team Members</h3>
          <span className="text-xs font-mono text-gray-500">{team.memberCount} Total Staff</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((m) => (
            <EmployeeCard key={m.id} employee={m} />
          ))}
        </div>
      </div>
    </div>
  );
};
