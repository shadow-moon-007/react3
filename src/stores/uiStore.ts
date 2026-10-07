import { create } from 'zustand';
import { User } from '../types';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface UIState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  searchModalOpen: boolean;
  notificationDrawerOpen: boolean;
  kudosModalOpen: boolean;
  feedbackModalOpen: boolean;
  activeDepartmentFilter: 'All' | 'GBS-BTS' | 'GBS-BO';
  selectedEmployee: User | null;
  toasts: Toast[];

  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  setNotificationDrawerOpen: (open: boolean) => void;
  setKudosModalOpen: (open: boolean) => void;
  setFeedbackModalOpen: (open: boolean) => void;
  setActiveDepartmentFilter: (dept: 'All' | 'GBS-BTS' | 'GBS-BO') => void;
  setSelectedEmployee: (employee: User | null) => void;

  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  searchModalOpen: false,
  notificationDrawerOpen: false,
  kudosModalOpen: false,
  feedbackModalOpen: false,
  activeDepartmentFilter: 'All',
  selectedEmployee: null,
  toasts: [],

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchModalOpen: (open) => set({ searchModalOpen: open }),
  setNotificationDrawerOpen: (open) => set({ notificationDrawerOpen: open }),
  setKudosModalOpen: (open) => set({ kudosModalOpen: open }),
  setFeedbackModalOpen: (open) => set({ feedbackModalOpen: open }),
  setActiveDepartmentFilter: (dept) => set({ activeDepartmentFilter: dept }),
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),

  showToast: (message, type = 'success') => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
