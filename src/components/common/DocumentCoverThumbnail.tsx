import React from 'react';
import { Resource } from '../../types';
import {
  ShieldAlert,
  CreditCard,
  ShieldCheck,
  Globe,
  FileText,
  FileSpreadsheet,
  Presentation,
} from 'lucide-react';

interface DocumentCoverThumbnailProps {
  resource: Resource;
  className?: string;
}

export const DocumentCoverThumbnail: React.FC<DocumentCoverThumbnailProps> = ({
  resource,
  className = '',
}) => {
  const title = resource.title.toLowerCase();
  const tags = resource.tags?.map((t) => t.toLowerCase()) || [];

  // Determine theme based on title and tags
  let theme: 'incident' | 'procurement' | 'infosec' | 'hybrid' | 'default' = 'default';

  if (title.includes('incident') || title.includes('sop-101') || tags.includes('incident management')) {
    theme = 'incident';
  } else if (
    title.includes('source-to-pay') ||
    title.includes('procurement') ||
    title.includes('sop-102') ||
    title.includes('purchase order') ||
    tags.includes('procurement')
  ) {
    theme = 'procurement';
  } else if (
    title.includes('security') ||
    title.includes('soc-2') ||
    title.includes('iso 27001') ||
    tags.includes('security policy')
  ) {
    theme = 'infosec';
  } else if (
    title.includes('remote') ||
    title.includes('hybrid') ||
    title.includes('charter') ||
    tags.includes('hybrid work')
  ) {
    theme = 'hybrid';
  }

  // Visual parameters per theme
  const config = {
    incident: {
      accentColor: 'bg-[#D71920]',
      stripeColor: 'bg-red-500/10',
      icon: ShieldAlert,
      iconColor: 'text-[#D71920]',
      docCode: 'SOP-101',
      badge: 'INCIDENT',
    },
    procurement: {
      accentColor: 'bg-emerald-600',
      stripeColor: 'bg-emerald-500/10',
      icon: CreditCard,
      iconColor: 'text-emerald-700',
      docCode: 'SOP-102',
      badge: 'S2P / PO',
    },
    infosec: {
      accentColor: 'bg-slate-800',
      stripeColor: 'bg-slate-700/10',
      icon: ShieldCheck,
      iconColor: 'text-slate-800',
      docCode: 'SEC-2026',
      badge: 'SOC-2',
    },
    hybrid: {
      accentColor: 'bg-[#D71920]',
      stripeColor: 'bg-red-500/10',
      icon: Globe,
      iconColor: 'text-gray-800',
      docCode: 'HR-2026',
      badge: 'HYBRID',
    },
    default: {
      accentColor: resource.fileType === 'XLSX' ? 'bg-emerald-600' : resource.fileType === 'PPTX' ? 'bg-amber-600' : 'bg-[#D71920]',
      stripeColor: 'bg-gray-100',
      icon: resource.fileType === 'XLSX' ? FileSpreadsheet : resource.fileType === 'PPTX' ? Presentation : FileText,
      iconColor: 'text-gray-700',
      docCode: resource.fileType,
      badge: resource.category.toUpperCase().slice(0, 6),
    },
  }[theme];

  const ThemeIcon = config.icon;

  return (
    <div
      className={`relative w-12 h-16 sm:w-13 sm:h-17 shrink-0 rounded bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between p-1.5 select-none overflow-hidden group-hover:border-gray-400/80 transition-all ${className}`}
      aria-label={`${resource.title} document cover thumbnail`}
      role="img"
    >
      {/* Top binding stripe with theme accent */}
      <div className="w-full">
        <div className={`h-1 w-full rounded-xs ${config.accentColor} mb-1`} />
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-mono font-bold tracking-tight text-gray-500 truncate max-w-[28px]">
            {config.docCode}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]/80" />
        </div>
      </div>

      {/* Center Theme Graphic / Icon */}
      <div className="flex flex-col items-center justify-center py-0.5">
        <div className={`p-1 rounded ${config.stripeColor}`}>
          <ThemeIcon className={`w-3.5 h-3.5 ${config.iconColor}`} />
        </div>
        {/* Micro-ruled text lines */}
        <div className="w-full mt-1 space-y-0.5">
          <div className="h-0.5 bg-gray-200 rounded-full w-full" />
          <div className="h-0.5 bg-gray-200 rounded-full w-3/4" />
        </div>
      </div>

      {/* Footer Tag */}
      <div className="pt-0.5 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[6.5px] font-mono font-bold uppercase tracking-tighter text-gray-400">
          {config.badge}
        </span>
        <span className="text-[6.5px] font-mono font-semibold text-gray-500">
          {resource.fileType}
        </span>
      </div>

      {/* Corner fold effect */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-bl from-gray-200 to-transparent pointer-events-none" />
    </div>
  );
};
