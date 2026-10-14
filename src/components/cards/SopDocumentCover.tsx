import React from 'react';
import { Resource } from '../../types';

interface SopDocumentCoverProps {
  resource: Resource;
}

export const SopDocumentCover: React.FC<SopDocumentCoverProps> = ({ resource }) => {
  const title = resource.title.toLowerCase();
  const isIncident = title.includes('incident') || title.includes('severity') || resource.id === 'res-001';
  const isProcurement = title.includes('source-to-pay') || title.includes('procurement') || title.includes('purchase') || resource.id === 'res-002';
  const isSecurity = title.includes('security') || title.includes('soc-2') || title.includes('iso 27001') || resource.id === 'res-003';
  const isHybridWork = title.includes('remote') || title.includes('hybrid') || title.includes('work charter') || resource.id === 'res-004';

  return (
    <div
      className="w-14 h-[72px] sm:w-16 sm:h-20 bg-white border border-gray-200 rounded-md shadow-2xs relative shrink-0 overflow-hidden flex flex-col justify-between p-1.5 transition-transform group-hover:border-gray-300"
      aria-hidden="true"
    >
      {/* Top binding stripe with subtle red accent */}
      <div className="flex items-center justify-between pb-1 border-b border-gray-100">
        <div className="w-4 h-0.5 bg-[#D71920] rounded-full" />
        <span className="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-tighter">
          {resource.fileType}
        </span>
      </div>

      {/* Central Cover Artwork / Theme Glyphs */}
      <div className="flex-1 flex flex-col items-center justify-center my-1">
        {isIncident ? (
          // Enterprise Incident Management Theme: Shield / Pulse alert
          <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 7.5h.008v.008H12v-.008z" />
          </svg>
        ) : isProcurement ? (
          // Source-to-Pay and Procurement Theme: Requisition / Barcode flows
          <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6H1.5m16.5-1.5v.75c0 .414.336.75.75.75H20M3 13.5h18M3 16.5h18M3 19.5h18" />
          </svg>
        ) : isSecurity ? (
          // Enterprise Information Security Theme: Cyber Lock / Shield
          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        ) : isHybridWork ? (
          // Global Remote & Hybrid Work Theme: Globe / Connected Work
          <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        ) : (
          // Standard SOP Cover
          <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        )}
      </div>

      {/* Simulated document lines & version seal */}
      <div className="pt-1 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-0.5 flex-1 mr-1">
          <div className="h-[2px] bg-gray-200 rounded-full w-full" />
          <div className="h-[2px] bg-gray-150 rounded-full w-3/4" />
        </div>
        <span className="text-[7px] font-mono text-gray-400 font-semibold">
          v{resource.version}
        </span>
      </div>
    </div>
  );
};
