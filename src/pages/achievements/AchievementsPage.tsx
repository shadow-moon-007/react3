import React, { useState } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { useUIStore } from '../../stores/uiStore';
import { PageHeader } from '../../components/common/PageHeader';
import { AchievementCard } from '../../components/cards/AchievementCard';
import { AchievementType } from '../../types';
import { Award, Trophy, HeartHandshake, Star, Sparkles, Filter } from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { achievements } = useCMSStore();
  const { setKudosModalOpen } = useUIStore();

  const [categoryFilter, setCategoryFilter] = useState<AchievementType | 'All'>('All');
  const [deptFilter, setDeptFilter] = useState<'All' | 'GBS' | 'GBS-BTS' | 'GBS-BO'>('All');

  const filteredAchievements = achievements.filter((a) => {
    if (categoryFilter !== 'All' && a.category !== categoryFilter) return false;
    if (deptFilter !== 'All' && a.department !== deptFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Achievements & Wall of Recognition"
        description="Celebrating outstanding technical ingenuity, operational excellence benchmarks, and peer recognition across Global Business Services."
        badge="GBS Hall of Honor"
        actions={
          <button
            onClick={() => setKudosModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#D71920] hover:bg-[#b5141a] rounded-lg shadow-xs transition-colors"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Send Peer Kudos</span>
          </button>
        }
      />

      {/* Filter Tabs */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {(['All', 'Award', 'Milestone', 'Recognition', 'Spotlight'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-red-50 text-[#D71920] border border-red-200 shadow-2xs font-bold'
                  : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 w-full sm:w-auto justify-end">
          <span>Division:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value as any)}
            className="px-2.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg"
          >
            <option value="All">All GBS</option>
            <option value="GBS-BTS">GBS-BTS</option>
            <option value="GBS-BO">GBS-BO</option>
          </select>
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAchievements.map((ach) => (
          <AchievementCard key={ach.id} achievement={ach} />
        ))}
      </div>
    </div>
  );
};
