import React, { useState } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { PageHeader } from '../../components/common/PageHeader';
import { QuickLinkCard } from '../../components/cards/QuickLinkCard';
import { Search, BookmarkCheck, ExternalLink } from 'lucide-react';

export const QuickLinksPage: React.FC = () => {
  const { quickLinks } = useCMSStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = [
    'All',
    'Communication',
    'Productivity',
    'IT & Support',
    'HR & Benefits',
    'Finance & Procurement',
    'Analytics',
  ];

  const filteredLinks = quickLinks.filter((ql) => {
    if (categoryFilter !== 'All' && ql.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        ql.title.toLowerCase().includes(q) ||
        ql.description.toLowerCase().includes(q) ||
        ql.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Quick Links & Enterprise Application Catalog"
        description="Single launching pad for Microsoft 365, ServiceNow, Workday, SAP S/4HANA, Coupa, PowerBI, and corporate IT resources."
        badge={`${filteredLinks.length} Portals`}
      />

      {/* Control Bar */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs space-y-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enterprise tools and portals..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-red-50 text-[#D71920] border border-red-200 shadow-2xs font-bold'
                  : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredLinks.map((item) => (
          <QuickLinkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
