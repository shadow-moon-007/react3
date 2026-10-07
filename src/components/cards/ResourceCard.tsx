import React from 'react';
import { Resource } from '../../types';
import { Download, FileText, FileSpreadsheet, Presentation, Globe, Clock, User } from 'lucide-react';
import { useCMSStore } from '../../stores/cmsStore';
import { useUIStore } from '../../stores/uiStore';

interface ResourceCardProps {
  resource: Resource;
  onPreview?: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onPreview }) => {
  const { incrementDownload } = useCMSStore();
  const { showToast } = useUIStore();

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    incrementDownload(resource.id);
    showToast(`Downloading "${resource.title}" (${resource.fileSize})...`, 'success');
  };

  let Icon = FileText;
  let typeColor = 'text-red-600 bg-red-50';
  if (resource.fileType === 'XLSX') {
    Icon = FileSpreadsheet;
    typeColor = 'text-emerald-600 bg-emerald-50';
  } else if (resource.fileType === 'PPTX') {
    Icon = Presentation;
    typeColor = 'text-amber-600 bg-amber-50';
  } else if (resource.fileType === 'URL') {
    Icon = Globe;
    typeColor = 'text-blue-600 bg-blue-50';
  }

  return (
    <div
      onClick={() => onPreview && onPreview(resource)}
      className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-800">{resource.category}</span>
            <span aria-hidden="true">·</span>
            <span>{resource.department}</span>
          </div>
          <span className="font-mono text-[11px] text-gray-400">v{resource.version}</span>
        </div>

        {/* Title & File Icon */}
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg shrink-0 ${typeColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#D71920] transition-colors leading-snug line-clamp-2">
              {resource.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {resource.description}
            </p>
          </div>
        </div>
      </div>

      {/* Footer details & download CTA */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-mono font-medium text-gray-600">{resource.fileSize}</span>
          <span>·</span>
          <span>{resource.ownerName}</span>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-950 font-semibold transition-colors text-xs border border-gray-200/70"
          title="Download resource"
        >
          <Download className="w-3.5 h-3.5 text-[#D71920]" />
          <span className="font-mono tabular-nums">{resource.downloadCount}</span>
        </button>
      </div>
    </div>
  );
};
