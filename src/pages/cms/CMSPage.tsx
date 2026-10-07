import React, { useState } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { PageHeader } from '../../components/common/PageHeader';
import {
  Edit3,
  Plus,
  Trash2,
  Check,
  X,
  FileText,
  Megaphone,
  Briefcase,
  Layers,
  BookmarkCheck,
  Award,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Announcement, Resource, Project, QuickLink } from '../../types';

export const CMSPage: React.FC = () => {
  const { user } = useAuthStore();
  const { showToast } = useUIStore();
  const {
    announcements,
    resources,
    projects,
    quickLinks,
    teams,
    achievements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addResource,
    deleteResource,
    addProject,
    deleteProject,
    addQuickLink,
    deleteQuickLink,
    resetToDefaults,
  } = useCMSStore();

  const [activeTab, setActiveTab] = useState<
    'announcements' | 'resources' | 'projects' | 'quickLinks'
  >('announcements');

  // Modal State for new item
  const [modalType, setModalType] = useState<string | null>(null);

  // Form states
  const [annTitle, setAnnTitle] = useState('');
  const [annSummary, setAnnSummary] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<any>('Technology');
  const [annDept, setAnnDept] = useState<any>('GBS-BTS');

  const [resTitle, setResTitle] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resCategory, setResCategory] = useState<any>('SOPs');
  const [resDept, setResDept] = useState<any>('GBS-BTS');
  const [resType, setResType] = useState<any>('PDF');

  const [prjName, setPrjName] = useState('');
  const [prjCode, setPrjCode] = useState('');
  const [prjDept, setPrjDept] = useState<any>('GBS-BTS');
  const [prjDesc, setPrjDesc] = useState('');
  const [prjStatus, setPrjStatus] = useState<any>('In Progress');

  const [qlTitle, setQlTitle] = useState('');
  const [qlUrl, setQlUrl] = useState('');
  const [qlCat, setQlCat] = useState<any>('IT & Support');
  const [qlDesc, setQlDesc] = useState('');

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title: annTitle,
      summary: annSummary,
      content: annContent,
      category: annCategory,
      department: annDept,
      authorName: user?.name || 'GBS Editor',
      authorTitle: user?.title || 'Communications Lead',
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      publishedAt: new Date().toISOString(),
      readTimeMinutes: 3,
      tags: [annCategory, annDept],
    });
    showToast('Announcement published to GBS Portal!', 'success');
    setAnnTitle('');
    setAnnSummary('');
    setAnnContent('');
    setModalType(null);
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    addResource({
      title: resTitle,
      description: resDesc,
      category: resCategory,
      department: resDept,
      fileType: resType,
      fileSize: '1.8 MB',
      updatedAt: new Date().toISOString().split('T')[0],
      version: '1.0',
      ownerName: user?.name || 'Resource Manager',
      tags: [resCategory, resDept],
    });
    showToast('Resource added to Resource Center!', 'success');
    setResTitle('');
    setResDesc('');
    setModalType(null);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      code: prjCode || `PRJ-${Date.now().toString(36).toUpperCase()}`,
      name: prjName,
      department: prjDept,
      teamId: 'team-bts-01',
      teamName: 'Enterprise Practice',
      leadName: user?.name || 'Project Lead',
      leadAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      status: prjStatus,
      progress: 20,
      startDate: new Date().toISOString().split('T')[0],
      targetEndDate: '2027-03-31',
      description: prjDesc,
      objectives: ['Complete architectural phase 1', 'Achieve operational sign-off'],
      outcomes: ['Initial scoping finalized'],
      membersCount: 8,
      tags: [prjDept, 'Strategic'],
      priority: 'High',
    });
    showToast('Project created and published to Showcase!', 'success');
    setPrjName('');
    setPrjCode('');
    setPrjDesc('');
    setModalType(null);
  };

  const handleCreateQuickLink = (e: React.FormEvent) => {
    e.preventDefault();
    addQuickLink({
      title: qlTitle,
      url: qlUrl || 'https://corp.gbs.com',
      category: qlCat,
      description: qlDesc,
      iconName: 'Globe',
      isInternal: true,
    });
    showToast('Quick Link added to portal!', 'success');
    setQlTitle('');
    setQlUrl('');
    setQlDesc('');
    setModalType(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Content Management System (CMS)"
        description="Portal authoring console. Create, update, or remove Announcements, SOPs, Projects, and Quick Links. Changes reflect in real-time."
        badge="Editor Studio"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Reset portal content to initial factory mock data?')) {
                  resetToDefaults();
                  showToast('Reset portal to default enterprise dataset.', 'info');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
              <span>Reset Data</span>
            </button>
            <button
              onClick={() => setModalType(activeTab)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#D71920] hover:bg-[#b5141a] rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New {activeTab.slice(0, -1)}</span>
            </button>
          </div>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Announcements
          </span>
          <span className="text-2xl font-black text-gray-900 font-mono mt-0.5 block">
            {announcements.length}
          </span>
          <span className="text-[11px] text-gray-400">Published items</span>
        </div>
        <div className="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Resources & SOPs
          </span>
          <span className="text-2xl font-black text-gray-900 font-mono mt-0.5 block">
            {resources.length}
          </span>
          <span className="text-[11px] text-gray-400">Audited documents</span>
        </div>
        <div className="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Active Projects
          </span>
          <span className="text-2xl font-black text-gray-900 font-mono mt-0.5 block">
            {projects.length}
          </span>
          <span className="text-[11px] text-gray-400">Initiatives tracked</span>
        </div>
        <div className="p-4 bg-white border border-gray-200/80 rounded-xl shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Quick Links
          </span>
          <span className="text-2xl font-black text-gray-900 font-mono mt-0.5 block">
            {quickLinks.length}
          </span>
          <span className="text-[11px] text-gray-400">System portals</span>
        </div>
      </div>

      {/* Segmented Navigation */}
      <div className="flex items-center gap-1.5 border-b border-gray-200 overflow-x-auto pb-px">
        {[
          { key: 'announcements', label: `Announcements (${announcements.length})`, icon: Megaphone },
          { key: 'resources', label: `Resources (${resources.length})`, icon: FileText },
          { key: 'projects', label: `Projects (${projects.length})`, icon: Briefcase },
          { key: 'quickLinks', label: `Quick Links (${quickLinks.length})`, icon: BookmarkCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                isActive
                  ? 'border-[#D71920] text-[#D71920]'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CRUD Tables */}
      <div className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs">
        {activeTab === 'announcements' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Division</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {announcements.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold text-gray-900 max-w-sm truncate">
                      {a.title}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-600">{a.category}</td>
                    <td className="py-3 px-4 text-gray-500">{a.department}</td>
                    <td className="py-3 px-4 text-gray-600">{a.authorName}</td>
                    <td className="py-3 px-4 font-mono text-gray-400">
                      {new Date(a.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete announcement "${a.title}"?`)) {
                            deleteAnnouncement(a.id);
                            showToast('Announcement deleted', 'info');
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                        title="Delete announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Downloads</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {resources.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold text-gray-900 max-w-sm truncate">
                      {r.title}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-600">{r.category}</td>
                    <td className="py-3 px-4 font-mono text-gray-500">{r.fileType}</td>
                    <td className="py-3 px-4 text-gray-600">{r.ownerName}</td>
                    <td className="py-3 px-4 font-mono text-gray-500">{r.downloadCount}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete resource "${r.title}"?`)) {
                            deleteResource(r.id);
                            showToast('Resource deleted', 'info');
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                        title="Delete resource"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Project Name</th>
                  <th className="py-3 px-4">Division</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono font-bold text-[#D71920]">{p.code}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900 max-w-sm truncate">
                      {p.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{p.department}</td>
                    <td className="py-3 px-4">{p.status}</td>
                    <td className="py-3 px-4 font-mono font-bold">{p.progress}%</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${p.name}"?`)) {
                            deleteProject(p.id);
                            showToast('Project deleted', 'info');
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'quickLinks' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Tool Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Target URL</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quickLinks.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold text-gray-900">{q.title}</td>
                    <td className="py-3 px-4 text-gray-600">{q.category}</td>
                    <td className="py-3 px-4 font-mono text-gray-400 max-w-xs truncate">{q.url}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete quick link "${q.title}"?`)) {
                            deleteQuickLink(q.id);
                            showToast('Link removed', 'info');
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-900 text-sm">
                Create New {modalType.slice(0, -1)}
              </h3>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalType === 'announcements' && (
              <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Announcement Headline
                  </label>
                  <input
                    type="text"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    required
                    placeholder="e.g. Q4 Town Hall Scheduled"
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="Executive">Executive</option>
                      <option value="Technology">Technology</option>
                      <option value="Operations">Operations</option>
                      <option value="HR & Culture">HR & Culture</option>
                      <option value="Compliance">Compliance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Scope
                    </label>
                    <select
                      value={annDept}
                      onChange={(e) => setAnnDept(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="All GBS">All GBS</option>
                      <option value="GBS-BTS">GBS-BTS</option>
                      <option value="GBS-BO">GBS-BO</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Summary Lead
                  </label>
                  <input
                    type="text"
                    value={annSummary}
                    onChange={(e) => setAnnSummary(e.target.value)}
                    required
                    placeholder="One sentence synopsis..."
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Content
                  </label>
                  <textarea
                    rows={4}
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    required
                    placeholder="Provide full announcement text..."
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#D71920] rounded-lg"
                  >
                    Publish Announcement
                  </button>
                </div>
              </form>
            )}

            {modalType === 'resources' && (
              <form onSubmit={handleCreateResource} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Resource / SOP Title
                  </label>
                  <input
                    type="text"
                    value={resTitle}
                    onChange={(e) => setResTitle(e.target.value)}
                    required
                    placeholder="e.g. GBS-SOP-301: Incident Protocol"
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={resCategory}
                      onChange={(e) => setResCategory(e.target.value as any)}
                      className="w-full px-2 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="SOPs">SOPs</option>
                      <option value="Policies">Policies</option>
                      <option value="Templates">Templates</option>
                      <option value="Forms">Forms</option>
                      <option value="Training Material">Training</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Division
                    </label>
                    <select
                      value={resDept}
                      onChange={(e) => setResDept(e.target.value as any)}
                      className="w-full px-2 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="All GBS">All GBS</option>
                      <option value="GBS-BTS">GBS-BTS</option>
                      <option value="GBS-BO">GBS-BO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Format
                    </label>
                    <select
                      value={resType}
                      onChange={(e) => setResType(e.target.value as any)}
                      className="w-full px-2 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX</option>
                      <option value="XLSX">XLSX</option>
                      <option value="PPTX">PPTX</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={resDesc}
                    onChange={(e) => setResDesc(e.target.value)}
                    required
                    placeholder="Audited operational description..."
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#D71920] rounded-lg"
                  >
                    Add Resource
                  </button>
                </div>
              </form>
            )}

            {modalType === 'projects' && (
              <form onSubmit={handleCreateProject} className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Initiative Name
                    </label>
                    <input
                      type="text"
                      value={prjName}
                      onChange={(e) => setPrjName(e.target.value)}
                      required
                      placeholder="e.g. Multi-Region DR Drill"
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Code
                    </label>
                    <input
                      type="text"
                      value={prjCode}
                      onChange={(e) => setPrjCode(e.target.value)}
                      placeholder="PRJ-BTS-199"
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Division
                    </label>
                    <select
                      value={prjDept}
                      onChange={(e) => setPrjDept(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="GBS-BTS">GBS-BTS</option>
                      <option value="GBS-BO">GBS-BO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Status
                    </label>
                    <select
                      value={prjStatus}
                      onChange={(e) => setPrjStatus(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Deliverable Scope
                  </label>
                  <textarea
                    rows={3}
                    value={prjDesc}
                    onChange={(e) => setPrjDesc(e.target.value)}
                    required
                    placeholder="Objectives and scope description..."
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#D71920] rounded-lg"
                  >
                    Publish Project
                  </button>
                </div>
              </form>
            )}

            {modalType === 'quickLinks' && (
              <form onSubmit={handleCreateQuickLink} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    System Title
                  </label>
                  <input
                    type="text"
                    value={qlTitle}
                    onChange={(e) => setQlTitle(e.target.value)}
                    required
                    placeholder="e.g. Jira Product Discovery"
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      URL Endpoint
                    </label>
                    <input
                      type="url"
                      value={qlUrl}
                      onChange={(e) => setQlUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={qlCat}
                      onChange={(e) => setQlCat(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <option value="IT & Support">IT & Support</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Communication">Communication</option>
                      <option value="HR & Benefits">HR & Benefits</option>
                      <option value="Finance & Procurement">Finance & Procurement</option>
                      <option value="Analytics">Analytics</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={qlDesc}
                    onChange={(e) => setQlDesc(e.target.value)}
                    required
                    placeholder="Access purpose..."
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#D71920] rounded-lg"
                  >
                    Add Quick Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
