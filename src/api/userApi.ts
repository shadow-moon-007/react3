import { User, OrgNode } from '../types';
import { useCMSStore } from '../stores/cmsStore';
import { mockOrgChart } from '../mock/data';

export interface UserFilterParams {
  search?: string;
  department?: string;
  team?: string;
  location?: string;
  role?: string;
}

export const userApi = {
  async getEmployees(params?: UserFilterParams): Promise<User[]> {
    await new Promise((r) => setTimeout(r, 120));
    let list = useCMSStore.getState().users;

    if (!params) return list;

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.ntid.toLowerCase().includes(q) ||
          u.title.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.skills && u.skills.some((s) => s.toLowerCase().includes(q)))
      );
    }

    if (params.department && params.department !== 'All') {
      list = list.filter((u) => u.department.includes(params.department!));
    }

    if (params.location && params.location !== 'All') {
      list = list.filter((u) => u.location.toLowerCase().includes(params.location!.toLowerCase()));
    }

    if (params.role && params.role !== 'All') {
      list = list.filter((u) => u.role === params.role);
    }

    return list;
  },

  async getEmployeeById(id: string): Promise<User | null> {
    await new Promise((r) => setTimeout(r, 80));
    const user = useCMSStore.getState().users.find((u) => u.id === id || u.ntid === id);
    return user || null;
  },

  async getOrgChartHierarchy(): Promise<OrgNode> {
    await new Promise((r) => setTimeout(r, 150));
    return mockOrgChart;
  },
};
