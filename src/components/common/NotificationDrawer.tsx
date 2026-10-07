import React from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { X, Check, Bell, ExternalLink, Trash2, Megaphone, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationDrawer: React.FC = () => {
  const { notificationDrawerOpen, setNotificationDrawerOpen } = useUIStore();
  const { notifications, markAsRead, markAllAsRead, clearAll, unreadCount } = useNotificationStore();
  const navigate = useNavigate();

  if (!notificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-250 border-l border-gray-200"
        role="dialog"
        aria-label="Enterprise notifications"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#D71920]" />
            <h2 className="text-sm font-bold text-gray-900 tracking-tight">Enterprise Notifications</h2>
            {unreadCount > 0 && (
              <span className="font-mono text-xs bg-[#D71920] text-white px-1.5 py-0.2 rounded-full font-semibold">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                title="Mark all as read"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark Read</span>
              </button>
            )}
            <button
              onClick={() => setNotificationDrawerOpen(false)}
              className="p-1.5 rounded-md hover:bg-gray-200/70 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6 text-gray-400">
              <Bell className="w-10 h-10 mb-2 opacity-30 stroke-1" />
              <p className="text-sm font-medium text-gray-600">No active notifications</p>
              <p className="text-xs text-gray-400 mt-1">You are completely caught up with all GBS alerts.</p>
            </div>
          ) : (
            notifications.map((item) => {
              let Icon = Bell;
              let iconBg = 'bg-gray-100 text-gray-600';
              if (item.type === 'announcement') {
                Icon = Megaphone;
                iconBg = 'bg-blue-50 text-blue-600';
              } else if (item.type === 'approval') {
                Icon = CheckCircle2;
                iconBg = 'bg-emerald-50 text-emerald-600';
              } else if (item.type === 'system') {
                Icon = ShieldAlert;
                iconBg = 'bg-red-50 text-[#D71920]';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    markAsRead(item.id);
                    if (item.actionUrl) {
                      setNotificationDrawerOpen(false);
                      navigate(item.actionUrl);
                    }
                  }}
                  className={`p-4 transition-colors cursor-pointer hover:bg-gray-50 flex items-start gap-3.5 ${
                    !item.isRead ? 'bg-red-50/20' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-xs font-semibold truncate ${
                          !item.isRead ? 'text-gray-900 font-bold' : 'text-gray-700'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-mono text-gray-400 shrink-0">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.message}</p>
                    {item.actionUrl && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D71920] mt-2 hover:underline">
                        View details <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
            <span>{notifications.length} alerts in activity feed</span>
            <button
              onClick={clearAll}
              className="text-gray-500 hover:text-red-600 flex items-center gap-1 p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear history</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
