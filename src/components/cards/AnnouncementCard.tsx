import React from 'react';
import { Announcement } from '../../types';
import { Eye, Heart, Paperclip, ChevronRight } from 'lucide-react';
import { useCMSStore } from '../../stores/cmsStore';

interface AnnouncementCardProps {
  announcement: Announcement;
  onSelect?: (announcement: Announcement) => void;
  featured?: boolean;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  onSelect,
  featured = false,
}) => {
  const { likeAnnouncement } = useCMSStore();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likeAnnouncement(announcement.id);
  };

  const formattedDate = new Date(announcement.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      onClick={() => onSelect && onSelect(announcement)}
      className={`bg-white border rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group ${
        featured
          ? 'border-red-200/90 ring-1 ring-[#D71920]/15'
          : 'border-gray-200/80 hover:border-gray-300'
      }`}
    >
      <div>
        {/* Unboxed clean metadata (Zero-Pill discipline) */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="font-semibold text-gray-800">{announcement.category}</span>
          <span aria-hidden="true">·</span>
          <span>{announcement.department}</span>
          <span aria-hidden="true">·</span>
          <span>{formattedDate}</span>
          {announcement.isUrgent && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-bold text-[#D71920] uppercase text-[10px] tracking-wide">
                Priority
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#D71920] transition-colors leading-snug line-clamp-2">
          {announcement.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2">
          {announcement.summary}
        </p>
      </div>

      {/* Author & Footer Interactions */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={announcement.authorAvatar}
            alt={announcement.authorName}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
            }}
          />
          <div className="text-xs">
            <span className="font-medium text-gray-900 block truncate max-w-[140px]">
              {announcement.authorName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          {announcement.attachments && announcement.attachments.length > 0 && (
            <span className="flex items-center gap-1 font-mono text-[11px]" title="Attachments">
              <Paperclip className="w-3.5 h-3.5" />
              <span>{announcement.attachments.length}</span>
            </span>
          )}

          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Eye className="w-3.5 h-3.5" />
            <span>{announcement.views}</span>
          </span>

          <button
            onClick={handleLike}
            className="flex items-center gap-1 font-mono text-[11px] hover:text-[#D71920] transition-colors"
            title="Like announcement"
          >
            <Heart className="w-3.5 h-3.5 fill-[#D71920]/10 hover:fill-[#D71920]" />
            <span>{announcement.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
