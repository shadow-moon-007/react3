import { create } from 'zustand';
import { User } from '../types';
import { DEMO_USERS } from '../constants/theme';
import { mockEmployees } from '../mock/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (ntid: string) => Promise<User>;
  logout: () => void;
  switchUser: (ntid: string) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
}

const STORAGE_KEY = 'gbs_auth_user';

const getInitialUser = (): User => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse auth from storage', e);
  }
  // Default to Keshav Bansal (Admin)
  const defaultEmp = mockEmployees.find((e) => e.ntid === 'keshavb') || mockEmployees[3];
  return defaultEmp;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getInitialUser(),
  isAuthenticated: true,
  isLoading: false,
  error: null,

  login: async (ntid: string): Promise<User> => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 350));

    const trimmed = ntid.trim().toLowerCase();
    const found = mockEmployees.find(
      (e) => e.ntid.toLowerCase() === trimmed || e.email.toLowerCase().startsWith(trimmed)
    );

    if (!found) {
      // Check if it's one of the demo users
      const demo = DEMO_USERS.find((d) => d.ntid.toLowerCase() === trimmed);
      if (demo) {
        const fullUser: User = {
          id: `emp-demo-${demo.ntid}`,
          ntid: demo.ntid,
          name: demo.name,
          email: demo.email,
          role: demo.role,
          department: demo.department,
          title: demo.title,
          avatar: demo.avatar,
          location: demo.location,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fullUser));
        set({ user: fullUser, isAuthenticated: true, isLoading: false });
        return fullUser;
      }

      set({
        isLoading: false,
        error: `NT-ID "${ntid}" not found in corporate directory. Try "keshavb", "sarahm", or "davidk".`,
      });
      throw new Error(`NT-ID "${ntid}" not found`);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    set({ user: found, isAuthenticated: true, isLoading: false, error: null });
    return found;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, isAuthenticated: false, error: null });
  },

  switchUser: (ntid: string) => {
    const found = mockEmployees.find((e) => e.ntid.toLowerCase() === ntid.toLowerCase());
    if (found) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      set({ user: found, isAuthenticated: true, error: null });
    }
  },

  updateCurrentUser: (updates: Partial<User>) => {
    const current = get().user;
    if (current) {
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      set({ user: updated });
    }
  },
}));
