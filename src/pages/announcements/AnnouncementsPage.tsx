import React, { useState, useMemo } from 'react';
import { useCMSStore } from '../../stores/cmsStore';
import { PageHeader } from '../../components/common/PageHeader';
import { AnnouncementCard } from '../../components/cards/AnnouncementCard';
import { Announcement, AnnouncementCategory } from '../../types';
import {
  Search,
  Filter,
  Megaphone,
  Heart,
  Eye,
  Calendar,
  Paperclip,
  Share2,
  X,
  ShieldAlert,
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, likeAnnouncement } = useCMSStore();
  const { showToast } = useUIStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AnnouncementCategory | 'All'>('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);

  const categories: (AnnouncementCategory | 'All')[] = [
    'All',
    'Executive',
    'Technology',
    'Operations',
    'HR & Culture',
    'Compliance',
    'Town Hall',
  ];

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
      if (departmentFilter !== 'All' && a.department !== 'All GBS' && a.department !== departmentFilter)
        return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [announcements, search, selectedCategory, departmentFilter]);

  const featured = filteredAnnouncements.find((a) => a.isFeatured) || filteredAnnouncements[0];
  const list = filteredAnnouncements.filter((a) => a.id !== featured?.id);

  const handleShare = (ann: Announcement) => {
    navigator.clipboard.writeText(`${window.location.origin}/announcements?id=${ann.id}`);
    showToast('Copied announcement intranet link to clipboard!', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Announcements & Executive Directives"
        description="Official global news, architecture updates, town hall announcements, and operational notices across Global Business Services."
        badge={`${filteredAnnouncements.length} Published`}
      />

      {/* Filter and Category Bar */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements, authors, tags..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-gray-500 font-medium">Division:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D71920]"
            >
              <option value="All">All GBS</option>
              <option value="GBS-BTS">GBS-BTS Only</option>
              <option value="GBS-BO">GBS-BO Only</option>
            </select>
          </div>
        </div>

        {/* Clean Segmented Category Buttons */}
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

      {/* Announcements List */}
      {filteredAnnouncements.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-200 text-gray-400">
          <Megaphone className="w-10 h-10 mx-auto mb-2 opacity-30 stroke-1" />
          <h3 className="text-sm font-bold text-gray-700">No Announcements Found</h3>
          <p className="text-xs text-gray-400 mt-1">Try selecting "All" categories or clear your search term.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {featured && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2 font-mono">
                Featured Bulletin
              </span>
              <AnnouncementCard
                announcement={featured}
                featured={true}
                onSelect={(ann) => setActiveAnnouncement(ann)}
              />
            </div>
          )}

          {list.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2 font-mono">
                Recent Broadcasts
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((ann) => (
                  <AnnouncementCard
                    key={ann.id}
                    announcement={ann}
                    onSelect={(a) => setActiveAnnouncement(a)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reader Modal */}
      {activeAnnouncement && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span className="font-semibold text-gray-800">{activeAnnouncement.category}</span>
                <span>·</span>
                <span>{activeAnnouncement.department}</span>
                <span>·</span>
                <span className="font-mono">{activeAnnouncement.readTimeMinutes} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activeAnnouncement)}
                  className="p-1 hover:bg-gray-200 rounded text-gray-500"
                  title="Copy link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveAnnouncement(null)}
                  className="p-1 hover:bg-gray-200 rounded text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[72vh] overflow-y-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                {activeAnnouncement.title}
              </h2>

              <div className="flex items-center justify-between py-3 border-y border-gray-100 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={activeAnnouncement.authorAvatar}
                    alt={activeAnnouncement.authorName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-bold text-gray-900 block">{activeAnnouncement.authorName}</span>
                    <span className="text-gray-400 text-[11px]">{activeAnnouncement.authorTitle}</span>
                  </div>
                </div>
                <div className="text-right text-gray-400 font-mono text-[11px]">
                  <span>{new Date(activeAnnouncement.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line space-y-3">
                {activeAnnouncement.content}
              </div>

              {/* Tags */}
              <div className="pt-4 flex flex-wrap gap-1.5 border-t border-gray-100">
                {activeAnnouncement.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-gray-100 rounded text-gray-600 font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Attachments */}
              {activeAnnouncement.attachments && activeAnnouncement.attachments.length > 0 && (
                <div className="pt-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Official Documents
                  </span>
                  <div className="space-y-2">
                    {activeAnnouncement.attachments.map((att, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-800">{att.name}</span>
                        </div>
                        <span className="font-mono text-gray-400">{att.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => likeAnnouncement(activeAnnouncement.id)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#D71920]"
              >
                <Heart className="w-4 h-4 text-[#D71920]" />
                <span>{activeAnnouncement.likes} Likes</span>
              </button>
              <button
                onClick={() => setActiveAnnouncement(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#D71920] rounded-lg hover:bg-[#b5141a]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
