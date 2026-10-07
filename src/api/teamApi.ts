import { Team } from '../types';
import { useCMSStore } from '../stores/cmsStore';

export const teamApi = {
  async getTeams(departmentId?: string): Promise<Team[]> {
    await new Promise((r) => setTimeout(r, 90));
    let list = useCMSStore.getState().teams;
    if (departmentId && departmentId !== 'All') {
      list = list.filter((t) => t.departmentId === departmentId);
    }
    return list;
  },

  async getTeamById(id: string): Promise<Team | null> {
    await new Promise((r) => setTimeout(r, 50));
    const team = useCMSStore.getState().teams.find((t) => t.id === id);
    return team || null;
  },
};
