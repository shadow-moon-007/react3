import { Resource, ResourceCategory } from '../types';
import { useCMSStore } from '../stores/cmsStore';

export interface ResourceFilters {
  category?: ResourceCategory | 'All';
  department?: string;
  fileType?: string;
  search?: string;
}

export const resourceApi = {
  async getResources(filters?: ResourceFilters): Promise<Resource[]> {
    await new Promise((r) => setTimeout(r, 110));
    let list = useCMSStore.getState().resources;

    if (!filters) return list;

    if (filters.category && filters.category !== 'All') {
      list = list.filter((r) => r.category === filters.category);
    }

    if (filters.department && filters.department !== 'All') {
      list = list.filter(
        (r) => r.department === 'All GBS' || r.department === filters.department
      );
    }

    if (filters.fileType && filters.fileType !== 'All') {
      list = list.filter((r) => r.fileType === filters.fileType);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.ownerName.toLowerCase().includes(q)
      );
    }

    return list;
  },

  async getResourceById(id: string): Promise<Resource | null> {
    await new Promise((r) => setTimeout(r, 60));
    const item = useCMSStore.getState().resources.find((r) => r.id === id);
    return item || null;
  },

  async recordDownload(id: string): Promise<void> {
    useCMSStore.getState().incrementDownload(id);
  },
};
