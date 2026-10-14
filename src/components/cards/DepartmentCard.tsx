import React from 'react';
import { Department } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, ArrowRight, ShieldCheck, Layers, Server, Workflow } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const navigate = useNavigate();

  // Thematic imagery mapping per department
  const isBTS = department.id === 'GBS-BTS';
  const isBO = department.id === 'GBS-BO';

  const imageUrl = isBTS
    ? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
    : isBO
    ? 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80';

  const imageAlt = isBTS
    ? 'Modern data centers, cloud infrastructure and server architecture'
    : isBO
    ? 'Business operations team collaborating on process optimization'
    : 'Global enterprise facilities';

  const imageLabel = isBTS
    ? 'Cloud & Server Architecture'
    : isBO
    ? 'Operational Excellence'
    : 'Enterprise Campus';

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Compact 16:9 Landscape Thumbnail (Enhances rather than dominates) */}
        <div className="w-full aspect-[16/9] max-h-36 rounded-lg overflow-hidden mb-4 bg-slate-900 border border-gray-100 relative shrink-0">
          <SafeImage
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            fallbackText={department.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90 flex items-center gap-1.5">
            {isBTS ? (
              <Server className="w-3 h-3 text-blue-400" />
            ) : (
              <Workflow className="w-3 h-3 text-emerald-400" />
            )}
            <span>{imageLabel}</span>
          </div>
        </div>

        {/* Top bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono text-sm shadow-xs shrink-0"
              style={{
                backgroundColor: `${department.color}15`,
                color: department.color,
                border: `1px solid ${department.color}30`,
              }}
            >
              {department.shortName.replace('GBS-', '')}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#D71920] transition-colors">
                {department.name}
              </h3>
              <p className="text-xs text-gray-400 font-mono">{department.code}</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600 shrink-0">
            {department.teamsCount} Teams
          </span>
        </div>

        {/* Mission / Tagline */}
        <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-3">
          {department.description}
        </p>

        {/* Leadership preview */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
          <img
            src={department.headAvatar}
            alt={department.headName}
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
          />
          <div className="text-xs">
            <span className="text-gray-400 block text-[10px] uppercase font-semibold">Leadership</span>
            <span className="font-bold text-gray-900 block">{department.headName}</span>
            <span className="text-gray-500 text-[11px] line-clamp-1">{department.headTitle}</span>
          </div>
        </div>

        {/* Key Metrics grid */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {department.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100/80">
              <span className="text-[10px] text-gray-500 uppercase font-semibold block truncate">
                {m.label}
              </span>
              <span className="text-base font-bold text-gray-900 font-mono tabular-nums block mt-0.5">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1 font-mono">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {department.employeeCount}+ Staff
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Briefcase className="w-3.5 h-3.5 text-gray-400" />
            {department.activeProjectsCount} Initiatives
          </span>
        </div>

        <button
          onClick={() => navigate(`/departments/${department.id}`)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#D71920] hover:translate-x-0.5 transition-transform"
        >
          <span>Explore Department</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
