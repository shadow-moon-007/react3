import React, { useState } from 'react';
import { OrgNode, User } from '../../types';
import { useUIStore } from '../../stores/uiStore';
import { ChevronDown, ChevronRight, User as UserIcon, Building2, MapPin, Search } from 'lucide-react';

interface OrgChartNodeProps {
  node: OrgNode;
  level: number;
  expandedMap: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelectUser: (node: OrgNode) => void;
  searchFilter?: string;
  departmentFilter?: string;
}

const OrgChartNodeItem: React.FC<OrgChartNodeProps> = ({
  node,
  level,
  expandedMap,
  onToggle,
  onSelectUser,
  searchFilter,
  departmentFilter,
}) => {
  const isExpanded = expandedMap[node.id] !== false; // default open
  const hasChildren = node.children && node.children.length > 0;

  // Filter children by department if selected
  const visibleChildren = node.children
    ? node.children.filter((c) => {
        if (!departmentFilter || departmentFilter === 'All') return true;
        return c.department.includes(departmentFilter);
      })
    : [];

  const isMatched =
    searchFilter &&
    (node.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      node.ntid.toLowerCase().includes(searchFilter.toLowerCase()) ||
      node.title.toLowerCase().includes(searchFilter.toLowerCase()));

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div
        className={`relative z-10 w-64 bg-white border rounded-xl p-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer group ${
          isMatched
            ? 'ring-2 ring-[#D71920] border-[#D71920]'
            : 'border-gray-200/80 hover:border-gray-300'
        }`}
        onClick={() => onSelectUser(node)}
      >
        <div className="flex items-start gap-3">
          <img
            src={node.avatar}
            alt={node.name}
            className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';
            }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 group-hover:text-[#D71920] transition-colors truncate">
                {node.name}
              </span>
              <span className="text-[10px] font-mono text-gray-400">({node.ntid})</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
              {node.title}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400">
              <Building2 className="w-3 h-3 text-gray-300 shrink-0" />
              <span className="truncate">{node.department}</span>
            </div>
          </div>
        </div>

        {/* Expand / Collapse badge button */}
        {hasChildren && (
          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-mono">
              {node.children?.length} Direct Report{node.children && node.children.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(node.id);
              }}
              className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              title={isExpanded ? 'Collapse team' : 'Expand team'}
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Children Hierarchy Branches */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center w-full">
          {/* Vertical connecting line down from parent */}
          <div className="w-px h-6 bg-gray-300" />

          {/* Children container with horizontal bus line */}
          <div className="relative flex justify-center gap-6 pt-0">
            {visibleChildren.length > 1 && (
              <div className="absolute top-0 left-32 right-32 h-px bg-gray-300" />
            )}

            {visibleChildren.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                {/* Vertical drop line down to child */}
                <div className="w-px h-6 bg-gray-300" />
                <OrgChartNodeItem
                  node={child}
                  level={level + 1}
                  expandedMap={expandedMap}
                  onToggle={onToggle}
                  onSelectUser={onSelectUser}
                  searchFilter={searchFilter}
                  departmentFilter={departmentFilter}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface OrgChartProps {
  rootNode: OrgNode;
}

export const OrgChart: React.FC<OrgChartProps> = ({ rootNode }) => {
  const { setSelectedEmployee } = useUIStore();
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState<'All' | 'GBS-BTS' | 'GBS-BO'>('All');

  const handleToggle = (id: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: prev[id] === false ? true : false,
    }));
  };

  const handleSelectUser = (node: OrgNode) => {
    // Convert OrgNode into User format for ProfileDrawer
    const user: User = {
      id: node.id,
      ntid: node.ntid,
      name: node.name,
      email: node.email,
      role: 'Manager',
      department: node.department,
      title: node.title,
      avatar: node.avatar,
      location: node.location,
    };
    setSelectedEmployee(user);
  };

  const expandAll = () => {
    setExpandedMap({});
  };

  const collapseAll = () => {
    setExpandedMap({
      'org-01': false,
      'org-02': false,
      'org-03': false,
      'org-04': false,
      'org-05': false,
    });
  };

  return (
    <div className="space-y-4">
      {/* Org Chart Controls Bar */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search person or role in tree..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
          />
        </div>

        {/* Filters and Expand/Collapse */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
            {(['All', 'GBS-BTS', 'GBS-BO'] as const).map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartment(dept)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  department === dept
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <button
            onClick={expandAll}
            className="px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-8 overflow-x-auto min-h-[550px] shadow-xs flex justify-center">
        <div className="min-w-fit py-4">
          <OrgChartNodeItem
            node={rootNode}
            level={0}
            expandedMap={expandedMap}
            onToggle={handleToggle}
            onSelectUser={handleSelectUser}
            searchFilter={search}
            departmentFilter={department}
          />
        </div>
      </div>
    </div>
  );
};
