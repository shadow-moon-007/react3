import React from 'react';
import { Team } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, Award, ChevronRight, Layers, Cloud, Cpu, Network } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const navigate = useNavigate();

  // Thematic visual mapping
  const isCloudDevOps =
    team.id === 'team-bts-01' ||
    team.name.toLowerCase().includes('cloud') ||
    team.name.toLowerCase().includes('devops');

  const isAutomationAI =
    team.id === 'team-bts-02' ||
    team.name.toLowerCase().includes('automation') ||
    team.name.toLowerCase().includes('ai');

  const bannerImageUrl = isCloudDevOps
    ? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
    : isAutomationAI
    ? 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80';

  const bannerAlt = isCloudDevOps
    ? 'Connected multi-cloud infrastructure and distributed server network'
    : isAutomationAI
    ? 'Abstract neural network architecture and intelligent workflow automation'
    : `${team.name} practice environment`;

  const bannerLabel = isCloudDevOps
    ? 'Cloud & Distributed Systems'
    : isAutomationAI
    ? 'Intelligent Automation & AI'
    : team.focusArea;

  const BannerIcon = isCloudDevOps ? Cloud : isAutomationAI ? Cpu : Network;

  return (
    <div
      onClick={() => navigate(`/teams/${team.id}`)}
      className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Compact Thematic Image Banner */}
        <div className="w-full h-24 sm:h-26 rounded-lg overflow-hidden mb-3.5 relative bg-slate-900 border border-gray-100 shrink-0">
          <SafeImage
            src={bannerImageUrl}
            alt={bannerAlt}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
            fallbackText={team.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-slate-200">
              <BannerIcon className="w-3 h-3 text-[#D71920]" />
              <span className="truncate max-w-[170px]">{bannerLabel}</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-xs text-white">
              {team.departmentId}
            </span>
          </div>
        </div>

        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
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
