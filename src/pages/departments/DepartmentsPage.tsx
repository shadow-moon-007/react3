import React from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { DepartmentCard } from '../../components/cards/DepartmentCard';
import { PageHeader } from '../../components/common/PageHeader';
import { KPIWidget } from '../../components/cards/KPIWidget';
import { Building2, Users, Briefcase, Award, ShieldCheck, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DepartmentsPage: React.FC = () => {
  const { departments } = useCMSStore();
  const navigate = useNavigate();

  const gbsGlobal = departments.find((d) => d.id === 'GBS') || departments[0];
  const subDepartments = departments.filter((d) => d.id !== 'GBS');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <PageHeader
        title="Departments & Operating Units"
        description="The organizational architecture of Global Business Services: uniting Technology, Enterprise Cloud, Automation, and Global Shared Operations."
        badge="GBS Org Hierarchy"
        actions={
          <button
            onClick={() => navigate('/organization')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#D71920] hover:bg-[#b5141a] rounded-lg shadow-xs transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Org Chart</span>
          </button>
        }
      />

      {/* Top Level: GBS Global Overview Card */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider bg-gray-900 text-white px-2 py-0.5 rounded font-bold">
                Parent Organization
              </span>
              <span className="text-xs text-gray-400 font-mono">CODE: {gbsGlobal.code}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {gbsGlobal.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              {gbsGlobal.description}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-gray-50/80 p-4 rounded-xl border border-gray-200/70 shrink-0">
            <img
              src={gbsGlobal.headAvatar}
              alt={gbsGlobal.headName}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div className="text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Global Head of GBS
              </span>
              <span className="text-sm font-bold text-gray-900 block">{gbsGlobal.headName}</span>
              <span className="text-gray-500 text-[11px] block">{gbsGlobal.headTitle}</span>
              <span className="text-gray-400 font-mono text-[10px] mt-0.5 block">
                NTID: {gbsGlobal.headNtid}
              </span>
            </div>
          </div>
        </div>

        {/* Strategic Priorities */}
        <div className="mt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
            Core GBS Strategic Priorities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {gbsGlobal.strategicPriorities.map((priority, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-700 font-medium flex items-start gap-2"
              >
                <span className="font-mono text-[#D71920] font-bold">0{idx + 1}.</span>
                <span>{priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Departments Grid */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Operating Divisions (2 Sub-Departments)
          </h3>
          <p className="text-xs text-gray-500">
            Click any department to explore detailed leadership, active teams, technical deliverables, and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subDepartments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </div>
    </div>
  );
};
