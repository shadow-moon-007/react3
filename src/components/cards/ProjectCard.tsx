import React from 'react';
import { Project } from '../../types';
import { Calendar, DollarSign, Users, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  let statusBadgeClass = 'bg-gray-100 text-gray-700';
  if (project.status === 'Completed') {
    statusBadgeClass = 'bg-emerald-50 text-[#16A34A] border border-emerald-100';
  } else if (project.status === 'In Progress') {
    statusBadgeClass = 'bg-blue-50 text-[#2563EB] border border-blue-100';
  } else if (project.status === 'In Review') {
    statusBadgeClass = 'bg-amber-50 text-[#F59E0B] border border-amber-100';
  }

  return (
    <div
      onClick={() => onSelect && onSelect(project)}
      className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-[#D71920]">{project.code}</span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${statusBadgeClass}`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#D71920] transition-colors line-clamp-2 leading-snug">
          {project.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-400 font-medium">Delivery Progress</span>
            <span className="font-mono font-bold text-gray-900 tabular-nums">
              {project.progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                project.progress === 100
                  ? 'bg-[#16A34A]'
                  : 'bg-[#D71920]'
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <img
            src={project.leadAvatar}
            alt={project.leadName}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-gray-700 font-medium truncate max-w-[120px]">
            {project.leadName}
          </span>
        </div>

        {project.savingsAnnualized ? (
          <span className="font-mono font-semibold text-[#16A34A] text-[11px]">
            {project.savingsAnnualized}
          </span>
        ) : (
          <span className="text-gray-400 font-mono text-[11px]">
            {project.targetEndDate}
          </span>
        )}
      </div>
    </div>
  );
};
