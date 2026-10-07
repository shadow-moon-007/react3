import React, { useState, useMemo } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { PageHeader } from '../../components/common/PageHeader';
import { ResourceCard } from '../../components/cards/ResourceCard';
import { Resource, ResourceCategory } from '../../types';
import { Search, Filter, FileText, Download, X, Layers, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';

export const ResourceCenterPage: React.FC = () => {
  const { resources, incrementDownload } = useCMSStore();
  const { showToast } = useUIStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All');
  const [fileTypeFilter, setFileTypeFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [previewResource, setPreviewResource] = useState<Resource | null>(null);

  const categories: (ResourceCategory | 'All')[] = [
    'All',
    'SOPs',
    'Policies',
    'Templates',
    'Forms',
    'Training Material',
    'Knowledge Articles',
    'Presentations',
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;
      if (fileTypeFilter !== 'All' && r.fileType !== fileTypeFilter) return false;
      if (departmentFilter !== 'All' && r.department !== 'All GBS' && r.department !== departmentFilter)
        return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.ownerName.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [resources, search, selectedCategory, fileTypeFilter, departmentFilter]);

  const handleDownload = (resource: Resource) => {
    incrementDownload(resource.id);
    showToast(`Downloading "${resource.title}" (${resource.fileSize})...`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Resource & Knowledge Center"
        description="Single source of truth for Standard Operating Procedures (SOPs), governance policies, templates, and enterprise presentation assets across GBS."
        badge={`${filteredResources.length} Assets`}
      />

      {/* Filter and Category Bar */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keyword, SOP code, author..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span>File:</span>
              <select
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                className="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="All">All Formats</option>
                <option value="PDF">PDF Documents</option>
                <option value="DOCX">Word (.docx)</option>
                <option value="XLSX">Excel Sheets</option>
                <option value="PPTX">PowerPoint Decks</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span>Division:</span>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="All">All Divisions</option>
                <option value="GBS-BTS">GBS-BTS</option>
                <option value="GBS-BO">GBS-BO</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clean Segmented Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-50 text-[#D71920] border border-red-200 shadow-2xs font-bold'
                  : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-200 text-gray-400">
          <FileText className="w-10 h-10 mx-auto mb-2 opacity-30 stroke-1" />
          <h3 className="text-sm font-bold text-gray-700">No Resources Found</h3>
          <p className="text-xs text-gray-400 mt-1">Try resetting the category filter or searching a different term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onPreview={(r) => setPreviewResource(r)}
            />
          ))}
        </div>
      )}

      {/* Resource Detail & Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">
                {previewResource.category} · v{previewResource.version}
              </span>
              <button
                onClick={() => setPreviewResource(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 leading-snug">
                {previewResource.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {previewResource.description}
              </p>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Document Owner:</span>
                  <span className="font-semibold text-gray-800">{previewResource.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Division:</span>
                  <span className="font-semibold text-gray-800">{previewResource.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">File Type & Size:</span>
                  <span className="font-mono text-gray-800 font-semibold">
                    {previewResource.fileType} ({previewResource.fileSize})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Audited / Updated:</span>
                  <span className="font-mono text-gray-800">{previewResource.updatedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Downloads:</span>
                  <span className="font-mono font-bold text-[#D71920]">
                    {previewResource.downloadCount}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {previewResource.tags.map((t, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setPreviewResource(null)}
                className="text-xs text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(previewResource);
                  setPreviewResource(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#D71920] rounded-lg hover:bg-[#b5141a] shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
