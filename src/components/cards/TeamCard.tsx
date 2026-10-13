import React from 'react';
import { Team } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, Award, ChevronRight, Layers } from 'lucide-react';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/teams/${team.id}`)}
      className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block font-mono">
              {team.departmentId}
            </span>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#D71920] transition-colors leading-snug">
              {team.name}
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600 shrink-0">
            {team.memberCount} Members
          </span>
        </div>

        {/* Lead profile */}
        <div className="flex items-center gap-2.5 my-3 p-2 bg-gray-50/70 rounded-lg">
          <img
            src={team.leadAvatar}
            alt={team.leadName}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <div className="text-xs min-w-0">
            <span className="text-gray-400 text-[10px] uppercase font-semibold block">Team Lead</span>
            <span className="font-bold text-gray-900 block truncate">{team.leadName}</span>
          </div>
        </div>

        {/* Focus area */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {team.description}
        </p>

        {/* Functions list */}
        <div className="mt-3 flex flex-wrap gap-1">
          {team.functions.slice(0, 3).map((f, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium truncate"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Achievement Highlight */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-start gap-1.5 text-xs text-gray-500">
          <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-600 line-clamp-1 italic">
            "{team.recentAchievement}"
          </p>
        </div>
        <div className="mt-2.5 flex justify-end">
          <span className="inline-flex items-center text-xs font-bold text-[#D71920] group-hover:translate-x-0.5 transition-transform">
            View Team Roster <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
