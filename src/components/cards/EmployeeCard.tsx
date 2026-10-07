import React from 'react';
import { User } from '../../types';
import { useUIStore } from '../../stores/uiStore';
import { Mail, MapPin, Building2, ChevronRight, User as UserIcon } from 'lucide-react';

interface EmployeeCardProps {
  employee: User;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { setSelectedEmployee, showToast } = useUIStore();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(employee.email);
    showToast(`Copied ${employee.email} to clipboard!`, 'success');
  };

  return (
    <div
      onClick={() => setSelectedEmployee(employee)}
      className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-start gap-3">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#D71920] transition-colors truncate">
                {employee.name}
              </h4>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 shrink-0">
                {employee.ntid}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">
              {employee.title}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-400">
              <Building2 className="w-3 h-3 shrink-0" />
              <span className="truncate">{employee.department}</span>
            </div>
          </div>
        </div>

        {/* Location & Manager line */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-1 text-xs text-gray-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="truncate">{employee.location}</span>
          </div>
          {employee.managerName && (
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <span className="font-semibold text-gray-500">Mgr:</span>
              <span className="truncate">{employee.managerName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer controls */}
      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={handleCopyEmail}
          className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors text-xs flex items-center gap-1"
          title="Copy email address"
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="text-[11px] font-mono">Copy Email</span>
        </button>

        <span className="inline-flex items-center text-xs font-semibold text-[#D71920] group-hover:translate-x-0.5 transition-transform">
          Profile <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
