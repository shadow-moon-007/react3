import React from 'react';
import { useUIStore } from '../../stores/uiStore';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-blue-200 bg-blue-50/90 text-blue-900';
        let iconColor = 'text-blue-600';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-emerald-200 bg-white text-gray-900 shadow-lg';
          iconColor = 'text-[#16A34A]';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-200 bg-amber-50/90 text-amber-900';
          iconColor = 'text-[#F59E0B]';
        } else if (toast.type === 'error') {
          Icon = XCircle;
          borderClass = 'border-red-200 bg-white text-gray-900 shadow-lg';
          iconColor = 'text-[#D71920]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg border text-sm transition-all duration-200 animate-in slide-in-from-bottom-2 ${borderClass}`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
              <p className="font-medium text-xs sm:text-sm leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
