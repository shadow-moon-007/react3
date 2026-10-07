import React from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useCMSStore } from '../../stores/cmsStore';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Award,
  ExternalLink,
  MessageSquare,
  Shield,
  Briefcase,
  ChevronRight,
} from 'lucide-react';

export const ProfileDrawer: React.FC = () => {
  const { selectedEmployee, setSelectedEmployee, showToast, setKudosModalOpen } = useUIStore();
  const { users, projects } = useCMSStore();

  if (!selectedEmployee) return null;

  const manager = users.find(
    (u) =>
      u.id === selectedEmployee.managerId ||
      u.ntid === selectedEmployee.managerId ||
      (selectedEmployee.managerName && u.name === selectedEmployee.managerName)
  );

  const directReports = users.filter(
    (u) =>
      u.managerId === selectedEmployee.id ||
      u.managerId === selectedEmployee.ntid ||
      u.managerName === selectedEmployee.name
  );

  const userProjects = projects.filter(
    (p) =>
      p.leadName.toLowerCase() === selectedEmployee.name.toLowerCase() ||
      p.department === selectedEmployee.department
  ).slice(0, 3);

  const copyEmail = () => {
    navigator.clipboard.writeText(selectedEmployee.email);
    showToast(`Copied ${selectedEmployee.email} to clipboard!`, 'success');
  };

  const startTeamsChat = () => {
    showToast(`Launching Teams direct chat with ${selectedEmployee.name}...`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-250 border-l border-gray-200"
        role="dialog"
        aria-label="Employee profile details"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-[#D71920]" />
            <span>Enterprise Employee Profile</span>
          </div>
          <button
            onClick={() => setSelectedEmployee(null)}
            className="p-1.5 rounded-md hover:bg-gray-200/70 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close profile drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Hero Bio */}
          <div className="flex items-start gap-4">
            <img
              src={selectedEmployee.avatar}
              alt={selectedEmployee.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100 shadow-xs"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{selectedEmployee.name}</h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  {selectedEmployee.role}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-0.5 font-medium">{selectedEmployee.title}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                  NTID: {selectedEmployee.ntid}
                </span>
                <span>·</span>
                <span>{selectedEmployee.department}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={copyEmail}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <span>Email</span>
            </button>
            <button
              onClick={startTeamsChat}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#D71920] hover:bg-[#b5141a] rounded-lg shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Teams Chat</span>
            </button>
            <button
              onClick={() => setKudosModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Send Kudos</span>
            </button>
          </div>

          {/* Bio statement */}
          {selectedEmployee.bio && (
            <div className="p-3.5 bg-gray-50/60 rounded-lg border border-gray-100 text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800 block mb-1">About</span>
              {selectedEmployee.bio}
            </div>
          )}

          {/* Contact & Location Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Workplace Details</h3>
            <div className="bg-white border border-gray-200/80 rounded-lg divide-y divide-gray-100 text-sm">
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  Corporate Email
                </span>
                <span className="font-mono text-xs text-gray-800 font-medium">{selectedEmployee.email}</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  Location Hub
                </span>
                <span className="text-xs text-gray-800 font-medium">{selectedEmployee.location}</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  Division
                </span>
                <span className="text-xs text-gray-800 font-medium">{selectedEmployee.department}</span>
              </div>
              {selectedEmployee.phone && (
                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    Office Phone
                  </span>
                  <span className="font-mono text-xs text-gray-800">{selectedEmployee.phone}</span>
                </div>
              )}
              {selectedEmployee.joinedDate && (
                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Joined GBS
                  </span>
                  <span className="text-xs text-gray-800">{selectedEmployee.joinedDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reporting Chain */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Reporting Chain</h3>
            {manager ? (
              <div
                onClick={() => setSelectedEmployee(manager)}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={manager.avatar}
                    alt={manager.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 block uppercase">Manager</span>
                    <span className="text-sm font-semibold text-gray-900">{manager.name}</span>
                    <p className="text-xs text-gray-500">{manager.title}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">Executive head / no direct reporting line specified</p>
            )}

            {directReports.length > 0 && (
              <div className="mt-3">
                <span className="text-xs text-gray-500 font-medium block mb-2">
                  Direct Reports ({directReports.length})
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {directReports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => setSelectedEmployee(report)}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={report.avatar}
                          alt={report.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800">{report.name}</span>
                        <span className="text-gray-400">· {report.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Core Skills */}
          {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Core Competencies</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedEmployee.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-gray-200/80 rounded text-gray-700 font-medium transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Active Initiatives */}
          {userProjects.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Initiatives</h3>
              <div className="space-y-2">
                {userProjects.map((p) => (
                  <div key={p.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{p.name}</span>
                      <span className="font-mono text-[11px] text-[#D71920] font-semibold">{p.progress}%</span>
                    </div>
                    <p className="text-gray-500 text-[11px] mt-1 line-clamp-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
