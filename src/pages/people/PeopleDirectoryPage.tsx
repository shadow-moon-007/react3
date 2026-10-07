import React, { useState, useMemo } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { useUIStore } from '../../stores/uiStore';
import { PageHeader } from '../../components/common/PageHeader';
import { EmployeeCard } from '../../components/cards/EmployeeCard';
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  Users,
  Building2,
  MapPin,
  Mail,
  ChevronRight,
  Shield,
  Download,
} from 'lucide-react';

export const PeopleDirectoryPage: React.FC = () => {
  const { users } = useCMSStore();
  const { setSelectedEmployee, showToast } = useUIStore();

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredEmployees = useMemo(() => {
    return users.filter((u) => {
      if (departmentFilter !== 'All' && !u.department.includes(departmentFilter)) {
        return false;
      }
      if (locationFilter !== 'All' && !u.location.includes(locationFilter)) {
        return false;
      }
      if (roleFilter !== 'All' && u.role !== roleFilter) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.ntid.toLowerCase().includes(q) ||
          u.title.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.skills && u.skills.some((s) => s.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [users, search, departmentFilter, locationFilter, roleFilter]);

  const exportDirectoryCSV = () => {
    const headers = 'NTID,Name,Email,Department,Title,Location,Role\n';
    const rows = filteredEmployees
      .map(
        (e) =>
          `"${e.ntid}","${e.name}","${e.email}","${e.department}","${e.title}","${e.location}","${e.role}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GBS_People_Directory_${Date.now()}.csv`;
    a.click();
    showToast(`Exported ${filteredEmployees.length} personnel records to CSV!`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="People Directory"
        description="Searchable enterprise registry of all 1,420+ Global Business Services personnel, leads, and architects across regional hubs."
        badge={`${filteredEmployees.length} Colleagues`}
        actions={
          <button
            onClick={exportDirectoryCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export CSV</span>
          </button>
        }
      />

      {/* Filter and Control Bar */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, NTID, skill, or title..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            />
          </div>

          {/* View toggle (Grid / Table) */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-mono text-gray-400 mr-1">
              Showing {filteredEmployees.length} of {users.length}
            </span>
            <div className="flex bg-gray-100 p-0.5 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Dense Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-gray-100">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            >
              <option value="All">All Divisions (GBS, BTS, BO)</option>
              <option value="GBS-BTS">GBS-BTS (Technology Services)</option>
              <option value="GBS-BO">GBS-BO (Business Operations)</option>
              <option value="Executive">Executive Leadership</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
              Location Hub
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            >
              <option value="All">All Global Delivery Hubs</option>
              <option value="Bangalore">Bangalore Innovation Hub</option>
              <option value="London">London Regional HQ</option>
              <option value="New York">New York Executive Center</option>
              <option value="Zurich">Zurich Operational Center</option>
              <option value="Singapore">Singapore Trade Center</option>
              <option value="Tokyo">Tokyo Tech Center</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
              Directory Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User / Specialist</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results View */}
      {filteredEmployees.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
          <Users className="w-10 h-10 mx-auto mb-2 opacity-30 stroke-1" />
          <h3 className="text-sm font-bold text-gray-700">No Colleagues Match Your Filter</h3>
          <p className="text-xs text-gray-400 mt-1">Try resetting your search query or location filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setDepartmentFilter('All');
              setLocationFilter('All');
              setRoleFilter('All');
            }}
            className="mt-3 px-3 py-1.5 text-xs font-semibold text-[#D71920] bg-red-50 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      ) : (
        /* High-density Enterprise Table View */
        <div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">NTID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Manager</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp)}
                    className="hover:bg-gray-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-semibold text-gray-900">{emp.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-500">{emp.ntid}</td>
                    <td className="py-3 px-4 text-gray-700 font-medium max-w-[180px] truncate">
                      {emp.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{emp.department}</td>
                    <td className="py-3 px-4 text-gray-500">{emp.location}</td>
                    <td className="py-3 px-4 text-gray-500">{emp.managerName || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmployee(emp);
                        }}
                        className="text-[#D71920] font-semibold hover:underline"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
