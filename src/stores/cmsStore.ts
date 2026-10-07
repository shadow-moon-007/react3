import { create } from 'zustand';
import {
  Announcement,
  Resource,
  Project,
  Team,
  QuickLink,
  Achievement,
  Department,
  User,
} from '../types';
import {
  mockAnnouncements,
  mockResources,
  mockProjects,
  mockTeams,
  mockQuickLinks,
  mockAchievements,
  mockDepartments,
  mockEmployees,
} from '../mock/data';

interface CMSState {
  announcements: Announcement[];
  resources: Resource[];
  projects: Project[];
  teams: Team[];
  quickLinks: QuickLink[];
  achievements: Achievement[];
  departments: Department[];
  users: User[];

  // Announcements CRUD
  addAnnouncement: (item: Omit<Announcement, 'id' | 'views' | 'likes'>) => Announcement;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  likeAnnouncement: (id: string) => void;

  // Resources CRUD
  addResource: (item: Omit<Resource, 'id' | 'downloadCount'>) => Resource;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  incrementDownload: (id: string) => void;

  // Projects CRUD
  addProject: (item: Omit<Project, 'id'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Teams CRUD
  addTeam: (item: Omit<Team, 'id'>) => Team;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;

  // Quick Links CRUD
  addQuickLink: (item: Omit<QuickLink, 'id'>) => QuickLink;
  updateQuickLink: (id: string, updates: Partial<QuickLink>) => void;
  deleteQuickLink: (id: string) => void;

  // Achievements CRUD
  addAchievement: (item: Omit<Achievement, 'id'>) => Achievement;
  updateAchievement: (id: string, updates: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;

  // Users role management
  updateUserRole: (id: string, newRole: 'Admin' | 'Manager' | 'User') => void;

  // Reset to factory defaults
  resetToDefaults: () => void;
}

const STORAGE_PREFIX = 'gbs_cms_';

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
};

export const useCMSStore = create<CMSState>((set, get) => ({
  announcements: loadFromStorage('announcements', mockAnnouncements),
  resources: loadFromStorage('resources', mockResources),
  projects: loadFromStorage('projects', mockProjects),
  teams: loadFromStorage('teams', mockTeams),
  quickLinks: loadFromStorage('quickLinks', mockQuickLinks),
  achievements: loadFromStorage('achievements', mockAchievements),
  departments: loadFromStorage('departments', mockDepartments),
  users: loadFromStorage('users', mockEmployees),

  // Announcement Actions
  addAnnouncement: (item) => {
    const newAnnouncement: Announcement = {
      ...item,
      id: `ann-${Date.now().toString(36)}`,
      views: 1,
      likes: 0,
    };
    const updated = [newAnnouncement, ...get().announcements];
    saveToStorage('announcements', updated);
    set({ announcements: updated });
    return newAnnouncement;
  },

  updateAnnouncement: (id, updates) => {
    const updated = get().announcements.map((a) => (a.id === id ? { ...a, ...updates } : a));
    saveToStorage('announcements', updated);
    set({ announcements: updated });
  },

  deleteAnnouncement: (id) => {
    const updated = get().announcements.filter((a) => a.id !== id);
    saveToStorage('announcements', updated);
    set({ announcements: updated });
  },

  likeAnnouncement: (id) => {
    const updated = get().announcements.map((a) =>
      a.id === id ? { ...a, likes: a.likes + 1 } : a
    );
    saveToStorage('announcements', updated);
    set({ announcements: updated });
  },

  // Resource Actions
  addResource: (item) => {
    const newResource: Resource = {
      ...item,
      id: `res-${Date.now().toString(36)}`,
      downloadCount: 0,
    };
    const updated = [newResource, ...get().resources];
    saveToStorage('resources', updated);
    set({ resources: updated });
    return newResource;
  },

  updateResource: (id, updates) => {
    const updated = get().resources.map((r) => (r.id === id ? { ...r, ...updates } : r));
    saveToStorage('resources', updated);
    set({ resources: updated });
  },

  deleteResource: (id) => {
    const updated = get().resources.filter((r) => r.id !== id);
    saveToStorage('resources', updated);
    set({ resources: updated });
  },

  incrementDownload: (id) => {
    const updated = get().resources.map((r) =>
      r.id === id ? { ...r, downloadCount: r.downloadCount + 1 } : r
    );
    saveToStorage('resources', updated);
    set({ resources: updated });
  },

  // Project Actions
  addProject: (item) => {
    const newProject: Project = {
      ...item,
      id: item.code || `PRJ-${Date.now().toString(36).toUpperCase()}`,
    };
    const updated = [newProject, ...get().projects];
    saveToStorage('projects', updated);
    set({ projects: updated });
    return newProject;
  },

  updateProject: (id, updates) => {
    const updated = get().projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    saveToStorage('projects', updated);
    set({ projects: updated });
  },

  deleteProject: (id) => {
    const updated = get().projects.filter((p) => p.id !== id);
    saveToStorage('projects', updated);
    set({ projects: updated });
  },

  // Team Actions
  addTeam: (item) => {
    const newTeam: Team = {
      ...item,
      id: `team-${Date.now().toString(36)}`,
    };
    const updated = [...get().teams, newTeam];
    saveToStorage('teams', updated);
    set({ teams: updated });
    return newTeam;
  },

  updateTeam: (id, updates) => {
    const updated = get().teams.map((t) => (t.id === id ? { ...t, ...updates } : t));
    saveToStorage('teams', updated);
    set({ teams: updated });
  },

  deleteTeam: (id) => {
    const updated = get().teams.filter((t) => t.id !== id);
    saveToStorage('teams', updated);
    set({ teams: updated });
  },

  // Quick Links Actions
  addQuickLink: (item) => {
    const newLink: QuickLink = {
      ...item,
      id: `ql-${Date.now().toString(36)}`,
    };
    const updated = [...get().quickLinks, newLink];
    saveToStorage('quickLinks', updated);
    set({ quickLinks: updated });
    return newLink;
  },

  updateQuickLink: (id, updates) => {
    const updated = get().quickLinks.map((q) => (q.id === id ? { ...q, ...updates } : q));
    saveToStorage('quickLinks', updated);
    set({ quickLinks: updated });
  },

  deleteQuickLink: (id) => {
    const updated = get().quickLinks.filter((q) => q.id !== id);
    saveToStorage('quickLinks', updated);
    set({ quickLinks: updated });
  },

  // Achievements Actions
  addAchievement: (item) => {
    const newAch: Achievement = {
      ...item,
      id: `ach-${Date.now().toString(36)}`,
    };
    const updated = [newAch, ...get().achievements];
    saveToStorage('achievements', updated);
    set({ achievements: updated });
    return newAch;
  },

  updateAchievement: (id, updates) => {
    const updated = get().achievements.map((a) => (a.id === id ? { ...a, ...updates } : a));
    saveToStorage('achievements', updated);
    set({ achievements: updated });
  },

  deleteAchievement: (id) => {
    const updated = get().achievements.filter((a) => a.id !== id);
    saveToStorage('achievements', updated);
    set({ achievements: updated });
  },

  // User role admin
  updateUserRole: (id, newRole) => {
    const updated = get().users.map((u) => (u.id === id ? { ...u, role: newRole } : u));
    saveToStorage('users', updated);
    set({ users: updated });
  },

  resetToDefaults: () => {
    localStorage.removeItem(`${STORAGE_PREFIX}announcements`);
    localStorage.removeItem(`${STORAGE_PREFIX}resources`);
    localStorage.removeItem(`${STORAGE_PREFIX}projects`);
    localStorage.removeItem(`${STORAGE_PREFIX}teams`);
    localStorage.removeItem(`${STORAGE_PREFIX}quickLinks`);
    localStorage.removeItem(`${STORAGE_PREFIX}achievements`);
    localStorage.removeItem(`${STORAGE_PREFIX}departments`);
    localStorage.removeItem(`${STORAGE_PREFIX}users`);
    set({
      announcements: mockAnnouncements,
      resources: mockResources,
      projects: mockProjects,
      teams: mockTeams,
      quickLinks: mockQuickLinks,
      achievements: mockAchievements,
      departments: mockDepartments,
      users: mockEmployees,
    });
  },
}));
