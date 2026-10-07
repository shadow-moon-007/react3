import { Project, ProjectStatus } from '../types';
import { useCMSStore } from '../stores/cmsStore';

export interface ProjectFilters {
  department?: string;
  status?: ProjectStatus | 'All';
  search?: string;
}

export const projectApi = {
  async getProjects(filters?: ProjectFilters): Promise<Project[]> {
    await new Promise((r) => setTimeout(r, 110));
    let list = useCMSStore.getState().projects;

    if (!filters) return list;

    if (filters.department && filters.department !== 'All') {
      list = list.filter((p) => p.department.includes(filters.department!));
    }

    if (filters.status && filters.status !== 'All') {
      list = list.filter((p) => p.status === filters.status);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.leadName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  },

  async getProjectById(id: string): Promise<Project | null> {
    await new Promise((r) => setTimeout(r, 60));
    const project = useCMSStore.getState().projects.find((p) => p.id === id || p.code === id);
    return project || null;
  },
};
