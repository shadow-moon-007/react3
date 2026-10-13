import React, { useState } from 'react';
import { Department } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, ArrowRight, ShieldCheck, Layers, Server, Workflow } from 'lucide-react';

import btsDataCenterImg from '../../assets/images/dept_bts_datacenter_1791870932140.jpg';
import boOperationsImg from '../../assets/images/dept_bo_operations_1791870932471.jpg';

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const thumbnailSrc =
    department.id === 'GBS-BTS'
      ? btsDataCenterImg
      : department.id === 'GBS-BO'
      ? boOperationsImg
      : null;

  const FallbackIcon = department.id === 'GBS-BTS' ? Server : Workflow;

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Compact 16:9 Landscape Department Thumbnail */}
        {thumbnailSrc && (
          <div className="relative aspect-[16/9] max-h-36 w-full rounded-lg overflow-hidden border border-gray-150 mb-4 bg-gray-100 group-hover:border-gray-300 transition-colors">
            {!imgError ? (
              <img
                src={thumbnailSrc}
                alt={`${department.name} operations visual`}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                onError={() => setImgError(true)}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <FallbackIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono font-medium text-white">
              {department.shortName}
            </div>
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono text-sm shadow-xs"
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
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
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
