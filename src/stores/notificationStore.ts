import { create } from 'zustand';
import { NotificationItem } from '../types';
import { mockNotifications } from '../mock/data';

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'isRead'>) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.isRead).length,

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, isRead: true }));
      return {
        notifications: updated,
        unreadCount: 0,
      };
    }),

  addNotification: (item) =>
    set((state) => {
      const newItem: NotificationItem = {
        ...item,
        id: `notif-${Date.now().toString(36)}`,
        isRead: false,
      };
      const updated = [newItem, ...state.notifications];
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    }),

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
