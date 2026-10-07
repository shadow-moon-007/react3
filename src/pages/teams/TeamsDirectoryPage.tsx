import React, { useState } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { PageHeader } from '../../components/common/PageHeader';
import { TeamCard } from '../../components/cards/TeamCard';
import { Search, Layers, Building2 } from 'lucide-react';

export const TeamsDirectoryPage: React.FC = () => {
  const { teams } = useCMSStore();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<'All' | 'GBS-BTS' | 'GBS-BO'>('All');

  const filteredTeams = teams.filter((t) => {
    if (deptFilter !== 'All' && t.departmentId !== deptFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.leadName.toLowerCase().includes(q) ||
        t.focusArea.toLowerCase().includes(q) ||
        t.functions.some((f) => f.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Teams & Functional Practices"
        description="Explore delivery practices across Technology (GBS-BTS) and Operations (GBS-BO). Discover team leads, member counts, active deliverables, and competencies."
        badge={`${filteredTeams.length} Practices`}
      />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teams, leads, or capabilities..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
          />
        </div>

        <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs font-semibold w-full sm:w-auto justify-center">
          {(['All', 'GBS-BTS', 'GBS-BO'] as const).map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1 rounded-md transition-colors ${
                deptFilter === dept
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {dept === 'All' ? 'All Divisions' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};
