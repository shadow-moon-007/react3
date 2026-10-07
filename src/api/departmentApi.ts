import { Department } from '../types';
import { useCMSStore } from '../stores/cmsStore';

export const departmentApi = {
  async getDepartments(): Promise<Department[]> {
    await new Promise((r) => setTimeout(r, 100));
    return useCMSStore.getState().departments;
  },

  async getDepartmentById(id: string): Promise<Department | null> {
    await new Promise((r) => setTimeout(r, 60));
    const normalized = id.toUpperCase();
    const dept = useCMSStore
      .getState()
      .departments.find((d) => d.id.toUpperCase() === normalized || d.code.toUpperCase() === normalized);
    return dept || null;
  },
};
