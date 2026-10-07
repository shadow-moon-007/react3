import React, { useState, useMemo } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { PageHeader } from '../../components/common/PageHeader';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { Project, ProjectStatus } from '../../types';
import { Search, Filter, Briefcase, CheckCircle2, Calendar, DollarSign, X, Layers } from 'lucide-react';

export const ProjectsShowcasePage: React.FC = () => {
  const { projects } = useCMSStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;
      if (departmentFilter !== 'All' && !p.department.includes(departmentFilter)) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.leadName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, search, statusFilter, departmentFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Project Showcase & Strategic Initiatives"
        description="Delivery tracking for 84+ strategic transformation, multi-cloud modernization, and shared operations initiatives across GBS."
        badge={`${filteredProjects.length} Projects`}
      />

      {/* Control Bar */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by initiative code, name, lead..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg"
            >
              <option value="All">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="In Review">In Review</option>
              <option value="Planning">Planning</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Division:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg"
            >
              <option value="All">All Divisions</option>
              <option value="GBS-BTS">GBS-BTS</option>
              <option value="GBS-BO">GBS-BO</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            onSelect={(p) => setActiveProject(p)}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="font-bold text-[#D71920]">{activeProject.code}</span>
                <span>·</span>
                <span className="text-gray-500">{activeProject.department}</span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{activeProject.name}</h2>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Progress & Timeline */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700 uppercase tracking-wider">
                    Completion Status
                  </span>
                  <span className="font-mono font-bold text-gray-900">
                    {activeProject.status} ({activeProject.progress}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D71920] rounded-full"
                    style={{ width: `${activeProject.progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-gray-500 border-t border-gray-200/50">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400">
                      Target Delivery
                    </span>
                    <span className="font-mono text-gray-800">{activeProject.targetEndDate}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400">
                      Annualized Savings
                    </span>
                    <span className="font-mono font-bold text-[#16A34A]">
                      {activeProject.savingsAnnualized || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Objectives */}
              {activeProject.objectives && activeProject.objectives.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Key Deliverable Objectives
                  </h4>
                  <div className="space-y-1.5">
                    {activeProject.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcomes */}
              {activeProject.outcomes && activeProject.outcomes.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Verified Outcomes
                  </h4>
                  <div className="space-y-1.5">
                    {activeProject.outcomes.map((out, i) => (
                      <div key={i} className="p-2.5 rounded bg-emerald-50/60 text-xs text-emerald-900 border border-emerald-100 flex items-start gap-2">
                        <span className="font-mono font-bold text-emerald-700">✓</span>
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lead and practice */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-gray-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activeProject.leadAvatar}
                    alt={activeProject.leadName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">{activeProject.leadName}</span>
                    <span className="text-gray-400 text-[11px]">{activeProject.teamName}</span>
                  </div>
                </div>
                <span className="text-gray-400 font-mono text-[11px]">
                  {activeProject.membersCount} Core Assignees
                </span>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#D71920] rounded-lg hover:bg-[#b5141a]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
