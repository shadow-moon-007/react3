import { useCMSStore } from '../stores/cmsStore';
import {
  Announcement,
  Resource,
  Project,
  Team,
  QuickLink,
  Achievement,
} from '../types';

export const cmsApi = {
  // Announcements
  async createAnnouncement(data: Omit<Announcement, 'id' | 'views' | 'likes'>) {
    await new Promise((r) => setTimeout(r, 120));
    return useCMSStore.getState().addAnnouncement(data);
  },
  async updateAnnouncement(id: string, updates: Partial<Announcement>) {
    await new Promise((r) => setTimeout(r, 120));
    useCMSStore.getState().updateAnnouncement(id, updates);
  },
  async deleteAnnouncement(id: string) {
    await new Promise((r) => setTimeout(r, 100));
    useCMSStore.getState().deleteAnnouncement(id);
  },

  // Resources
  async createResource(data: Omit<Resource, 'id' | 'downloadCount'>) {
    await new Promise((r) => setTimeout(r, 120));
    return useCMSStore.getState().addResource(data);
  },
  async updateResource(id: string, updates: Partial<Resource>) {
    await new Promise((r) => setTimeout(r, 120));
    useCMSStore.getState().updateResource(id, updates);
  },
  async deleteResource(id: string) {
    await new Promise((r) => setTimeout(r, 100));
    useCMSStore.getState().deleteResource(id);
  },

  // Projects
  async createProject(data: Omit<Project, 'id'>) {
    await new Promise((r) => setTimeout(r, 120));
    return useCMSStore.getState().addProject(data);
  },
  async updateProject(id: string, updates: Partial<Project>) {
    await new Promise((r) => setTimeout(r, 120));
    useCMSStore.getState().updateProject(id, updates);
  },
  async deleteProject(id: string) {
    await new Promise((r) => setTimeout(r, 100));
    useCMSStore.getState().deleteProject(id);
  },

  // Quick Links
  async createQuickLink(data: Omit<QuickLink, 'id'>) {
    await new Promise((r) => setTimeout(r, 120));
    return useCMSStore.getState().addQuickLink(data);
  },
  async updateQuickLink(id: string, updates: Partial<QuickLink>) {
    await new Promise((r) => setTimeout(r, 120));
    useCMSStore.getState().updateQuickLink(id, updates);
  },
  async deleteQuickLink(id: string) {
    await new Promise((r) => setTimeout(r, 100));
    useCMSStore.getState().deleteQuickLink(id);
  },

  // Achievements
  async createAchievement(data: Omit<Achievement, 'id'>) {
    await new Promise((r) => setTimeout(r, 120));
    return useCMSStore.getState().addAchievement(data);
  },
  async updateAchievement(id: string, updates: Partial<Achievement>) {
    await new Promise((r) => setTimeout(r, 120));
    useCMSStore.getState().updateAchievement(id, updates);
  },
  async deleteAchievement(id: string) {
    await new Promise((r) => setTimeout(r, 100));
    useCMSStore.getState().deleteAchievement(id);
  },

  // User Role Management
  async updateUserRole(id: string, role: 'Admin' | 'Manager' | 'User') {
    await new Promise((r) => setTimeout(r, 100));
    useCMSStore.getState().updateUserRole(id, role);
  },

  // Reset demo state
  async resetAllContent() {
    await new Promise((r) => setTimeout(r, 150));
    useCMSStore.getState().resetToDefaults();
  },
};
