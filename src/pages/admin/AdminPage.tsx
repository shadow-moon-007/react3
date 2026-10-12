import React, { useState } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { PageHeader } from '../../components/common/PageHeader';
import { DatabaseStudio } from '../../components/database/DatabaseStudio';
import {
  ShieldCheck,
  Users,
  Search,
  Key,
  Database,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Server,
} from 'lucide-react';
import { Role } from '../../types';

export const AdminPage: React.FC = () => {
  const { users, announcements, resources, updateUserRole, resetToDefaults } = useCMSStore();
  const { user: currentUser } = useAuthStore();
  const { showToast } = useUIStore();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [activeAdminTab, setActiveAdminTab] = useState<'database' | 'rbac' | 'system'>('database');

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.ntid.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRoleChange = (userId: string, newRole: Role) => {
    updateUserRole(userId, newRole);
    showToast(`Updated user role to ${newRole}`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Administration & RBAC Governance"
        description="Enterprise Role-Based Access Control (RBAC), user directory rights, security federation parameters, and platform diagnostic telemetry."
        badge="Super Admin"
      />

      {/* Security Status Banner */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-[#16A34A] shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">Azure AD / Okta Bridge</span>
            <span className="text-[11px] text-gray-500 block">
              NT-ID federation active (FIDO2 Biometrics)
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">Mock API Service Layer</span>
            <span className="text-[11px] text-gray-500 block">
              {users.length} Active accounts provisioned
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-50 text-[#F59E0B] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">Session Governance</span>
            <span className="text-[11px] text-gray-500 block">
              Active persona: {currentUser?.name} ({currentUser?.role})
            </span>
          </div>
        </div>
      </div>

      {/* Admin Primary Section Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-200/70 rounded-xl w-fit">
        <button
          onClick={() => setActiveAdminTab('database')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeAdminTab === 'database'
              ? 'bg-white text-gray-900 shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Database className="w-4 h-4 text-[#D71920]" />
          <span>PostgreSQL Relational Studio & SQL Scripts</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('rbac')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeAdminTab === 'rbac'
              ? 'bg-white text-gray-900 shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4 text-blue-600" />
          <span>User Directory & RBAC Governance</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('system')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeAdminTab === 'system'
              ? 'bg-white text-gray-900 shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-emerald-600" />
          <span>State Diagnostics & Reset</span>
        </button>
      </div>

      {/* TAB 1: PostgreSQL Studio */}
      {activeAdminTab === 'database' && <DatabaseStudio />}

      {/* TAB 2: RBAC Directory */}
      {activeAdminTab === 'rbac' && (
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">User Access Control & Roles</h3>
            <p className="text-xs text-gray-500">
              Assign Admin, Manager, or User privileges. Changes persist across sessions.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by NTID, name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">NTID</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4 text-right">Modify Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.slice(0, 20).map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-semibold text-gray-900 block">{u.name}</span>
                        <span className="text-[11px] text-gray-400">{u.title}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-500">{u.ntid}</td>
                  <td className="py-3 px-4 text-gray-600">{u.department}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                        u.role === 'Admin'
                          ? 'bg-red-50 text-[#D71920] border border-red-200'
                          : u.role === 'Manager'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                      className="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded font-medium"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* TAB 3: System Diagnostics & Reset */}
      {activeAdminTab === 'system' && (
        <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Prototype State Diagnostics</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage local browser state and restore canonical seed data for all departments, teams, and resources.
              </p>
            </div>
            <button
              onClick={() => {
                resetToDefaults();
                showToast('Prototype state successfully reset to canonical seeds!', 'info');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All State to Seed Defaults</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-xs">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Database Entities</span>
              <span className="text-base font-bold text-gray-900 font-mono mt-1 block">15 Relational Tables</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Indexed Entities</span>
              <span className="text-base font-bold text-gray-900 font-mono mt-1 block">{users.length + announcements.length + resources.length} Live Records</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">PostgreSQL Migration Readiness</span>
              <span className="text-base font-bold text-emerald-600 font-mono mt-1 block">100% Production Ready</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
