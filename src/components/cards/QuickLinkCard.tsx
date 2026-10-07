import React from 'react';
import { QuickLink } from '../../types';
import {
  ExternalLink,
  LifeBuoy,
  MessageSquare,
  Mail,
  Users,
  ShoppingCart,
  Database,
  BarChart3,
  CheckSquare,
  FileText,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';

const iconMap: Record<string, React.ElementType> = {
  LifeBuoy,
  MessageSquare,
  Mail,
  Users,
  ShoppingCart,
  Database,
  BarChart3,
  CheckSquare,
  FileText,
  CreditCard,
  GraduationCap,
  ShieldCheck,
};

interface QuickLinkCardProps {
  item: QuickLink;
}

export const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ item }) => {
  const { showToast } = useUIStore();
  const Icon = iconMap[item.iconName] || Globe;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast(`Opening corporate portal "${item.title}" in new secure tab...`, 'info');
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={item.url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-red-50 flex items-center justify-center text-gray-700 group-hover:text-[#D71920] transition-colors border border-gray-100">
            <Icon className="w-5 h-5" />
          </div>
          {item.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-[#D71920] border border-red-100 font-mono">
              {item.badge}
            </span>
          )}
        </div>

        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#D71920] transition-colors leading-snug">
          {item.title}
        </h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span className="text-[11px] font-medium text-gray-500">{item.category}</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D71920] group-hover:translate-x-0.5 transition-transform">
          Launch <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
};
