import React from 'react';
import { Department } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, ArrowRight, ShieldCheck, Layers, MapPin } from 'lucide-react';
import { ResponsiveImage } from '../common/ResponsiveImage';

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Responsive Cover Image Banner with details overlay */}
        {department.coverImage && (
          <div className="relative">
            <ResponsiveImage
              src={department.coverImage}
              alt={`${department.name} Operations Hub`}
              aspectRatio="16/9"
              caption={department.imageDetails?.caption}
              location={department.imageDetails?.location}
              photographer={department.imageDetails?.photographer}
              className="rounded-none border-b border-gray-100"
            />
            <div className="absolute top-3 left-3 z-10">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs bg-white/95 backdrop-blur-xs text-gray-900 border border-gray-200"
              >
                {department.code}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#D71920] transition-colors">
                {department.name}
              </h3>
              <p className="text-xs text-gray-400 font-mono">{department.tagline}</p>
            </div>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600 shrink-0">
              {department.teamsCount} Teams
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-2">
            {department.description}
          </p>

          {/* Leadership preview */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
            <img
              src={department.headAvatar}
              alt={department.headName}
              className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
            />
            <div className="text-xs min-w-0">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Leadership</span>
              <span className="font-bold text-gray-900 block truncate">{department.headName}</span>
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
      </div>

      {/* Action Footer */}
      <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
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

