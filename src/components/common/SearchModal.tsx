import React, { useState, useEffect, useMemo } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useCMSStore } from '../../stores/cmsStore';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Users,
  FileText,
  Megaphone,
  Briefcase,
  ExternalLink,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, setSelectedEmployee } = useUIStore();
  const { users, announcements, resources, projects, quickLinks } = useCMSStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchModalOpen]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        employees: users.slice(0, 4),
        announcements: announcements.slice(0, 3),
        resources: resources.filter((r) => r.isPopular).slice(0, 3),
        quickLinks: quickLinks.filter((q) => q.isFrequent).slice(0, 4),
        projects: projects.slice(0, 3),
      };
    }

    const q = query.toLowerCase();
    return {
      employees: users
        .filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.ntid.toLowerCase().includes(q) ||
            u.title.toLowerCase().includes(q) ||
            u.department.toLowerCase().includes(q)
        )
        .slice(0, 5),
      announcements: announcements
        .filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
        )
        .slice(0, 4),
      resources: resources
        .filter(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            r.tags.some((t) => t.toLowerCase().includes(q))
        )
        .slice(0, 5),
      projects: projects
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.code.toLowerCase().includes(q) ||
            p.leadName.toLowerCase().includes(q)
        )
        .slice(0, 4),
      quickLinks: quickLinks
        .filter(
          (ql) =>
            ql.title.toLowerCase().includes(ql.title.toLowerCase()) &&
            ql.title.toLowerCase().includes(q)
        )
        .slice(0, 4),
    };
  }, [query, users, announcements, resources, projects, quickLinks]);

  if (!searchModalOpen) return null;

  const totalHits =
    results.employees.length +
    results.announcements.length +
    results.resources.length +
    results.projects.length +
    results.quickLinks.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-start justify-center pt-14 sm:pt-20 px-4">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Search input line */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-200 bg-gray-50/50">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search colleagues, SOPs, announcements, projects, or apps..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 mr-2 text-xs"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono text-gray-400 bg-gray-100 border border-gray-200 rounded">
            ESC
          </kbd>
          <button
            onClick={() => setSearchModalOpen(false)}
            className="ml-2 p-1.5 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5 divide-y divide-gray-100">
          {totalHits === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching by NT-ID, author name, SOP code, or department.</p>
            </div>
          ) : (
            <>
              {/* People Section */}
              {results.employees.length > 0 && (
                <div className="pt-2 first:pt-0">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Colleagues & Leadership
                    </span>
                    <button
                      onClick={() => {
                        setSearchModalOpen(false);
                        navigate('/people');
                      }}
                      className="text-[#D71920] hover:underline normal-case text-xs font-semibold"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-1">
                    {results.employees.map((emp) => (
                      <div
                        key={emp.id}
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setSearchModalOpen(false);
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={emp.avatar}
                            alt={emp.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">{emp.name}</span>
                              <span className="font-mono text-[11px] text-gray-400">({emp.ntid})</span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {emp.title} · {emp.department}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources & SOPs */}
              {results.resources.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Resources & SOPs
                    </span>
                    <button
                      onClick={() => {
                        setSearchModalOpen(false);
                        navigate('/resources');
                      }}
                      className="text-[#D71920] hover:underline normal-case text-xs font-semibold"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-1">
                    {results.resources.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          navigate(`/resources?q=${encodeURIComponent(res.title)}`);
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{res.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span className="font-mono font-semibold text-gray-700">{res.fileType}</span>
                            <span>·</span>
                            <span>{res.category}</span>
                            <span>·</span>
                            <span>{res.department}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Announcements */}
              {results.announcements.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Megaphone className="w-3.5 h-3.5" /> Announcements
                    </span>
                    <button
                      onClick={() => {
                        setSearchModalOpen(false);
                        navigate('/announcements');
                      }}
                      className="text-[#D71920] hover:underline normal-case text-xs font-semibold"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-1">
                    {results.announcements.map((ann) => (
                      <div
                        key={ann.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          navigate(`/announcements?id=${ann.id}`);
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{ann.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{ann.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {results.projects.length > 0 && (
                <div className="pt-3">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Projects & Strategic Initiatives
                    </span>
                    <button
                      onClick={() => {
                        setSearchModalOpen(false);
                        navigate('/projects');
                      }}
                      className="text-[#D71920] hover:underline normal-case text-xs font-semibold"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-1">
                    {results.projects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          navigate(`/projects?code=${proj.code}`);
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#D71920]">{proj.code}</span>
                            <span className="text-sm font-medium text-gray-900">{proj.name}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Lead: {proj.leadName} · {proj.status} ({proj.progress}%)
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white border border-gray-300 rounded px-1 text-[10px]">↑↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono bg-white border border-gray-300 rounded px-1 text-[10px]">↵</kbd> to select
            </span>
          </div>
          <span className="text-gray-400 font-mono text-[11px]">GBS Search Hub v2.4</span>
        </div>
      </div>
    </div>
  );
};
