import { Announcement, AnnouncementCategory } from '../types';
import { useCMSStore } from '../stores/cmsStore';

export interface AnnouncementFilters {
  category?: AnnouncementCategory | 'All';
  department?: string;
  search?: string;
  featuredOnly?: boolean;
}

export const announcementApi = {
  async getAnnouncements(filters?: AnnouncementFilters): Promise<Announcement[]> {
    await new Promise((r) => setTimeout(r, 100));
    let items = useCMSStore.getState().announcements;

    if (!filters) return items;

    if (filters.category && filters.category !== 'All') {
      items = items.filter((a) => a.category === filters.category);
    }

    if (filters.department && filters.department !== 'All') {
      items = items.filter(
        (a) => a.department === 'All GBS' || a.department === filters.department
      );
    }

    if (filters.featuredOnly) {
      items = items.filter((a) => a.isFeatured);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return items;
  },

  async getAnnouncementById(id: string): Promise<Announcement | null> {
    await new Promise((r) => setTimeout(r, 60));
    const item = useCMSStore.getState().announcements.find((a) => a.id === id);
    return item || null;
  },

  async likeAnnouncement(id: string): Promise<void> {
    useCMSStore.getState().likeAnnouncement(id);
  },
};
