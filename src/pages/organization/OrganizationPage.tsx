import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { OrgChart } from '../../components/orgchart/OrgChart';
import { mockOrgChart } from '../../mock/data';
import { ResponsiveImage } from '../../components/common/ResponsiveImage';
import { GitFork, ShieldAlert, Info, MapPin, Users, Award, Radio } from 'lucide-react';

export const OrganizationPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Organization Hierarchy & Leadership Chart"
        description="Interactive visual representation of reporting structures across Global Business Services, GBS-BTS, and GBS-BO. Click any node to inspect profile, contacts, and reporting lines."
        badge="Enterprise Org Tree"
      />

      {/* Site Visual Banner: Executive Leadership & Governance Amphitheater */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 bg-black">
            <ResponsiveImage
              src="/src/assets/images/executive_townhall_summit_1791784068697.jpg"
              alt="GBS Global Governance Council & Strategy Summit Amphitheater"
              aspectRatio="16/9"
              caption="Global Governance Council Amphitheater · Annual Strategic Alignment & Hybrid Executive Townhall"
              location="Midtown Manhattan HQ · Executive Center Floor 42"
              photographer="Executive Media Bureau & Global Corporate Communications"
              className="rounded-none h-full min-h-[260px]"
            />
          </div>

          <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-gray-50/60 border-t lg:border-t-0 lg:border-l border-gray-200/80">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-700">
                  Site Facility · Executive Chambers
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Broadcast Deck
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900 leading-snug">
                Executive Leadership Governance Council
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed">
                The GBS Executive Council convenes across this 300-seat amphitheater and hybrid telepresence network, establishing operating standards, capital allocation, and transformation roadmaps across GBS-BTS and GBS-BO.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/70 text-xs">
                <div className="p-2 rounded-lg bg-white border border-gray-200">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">GLOBAL SCOPE</span>
                  <span className="font-bold text-gray-900 font-mono">1,420 Professionals</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-gray-200">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">OPERATING HUBS</span>
                  <span className="font-bold text-gray-900 font-mono">4 Global Campuses</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200/70 text-[11px] text-gray-500 flex items-center justify-between">
              <span className="font-mono text-gray-400">Marcus Vance · Executive VP & Head</span>
              <span className="font-mono font-bold text-[#D71920]">FIDO2 Secured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-center gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <p>
          <span className="font-bold">Navigation tip:</span> Use horizontal scrolling to pan across delivery divisions. Click any colleague card to trigger their full reporting dossier, skills, and direct contact options.
        </p>
      </div>

      <OrgChart rootNode={mockOrgChart} />
    </div>
  );
};
