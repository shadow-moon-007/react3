import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { OrgChart } from '../../components/orgchart/OrgChart';
import { mockOrgChart } from '../../mock/data';
import { GitFork, ShieldAlert, Info } from 'lucide-react';

export const OrganizationPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Organization Hierarchy & Leadership Chart"
        description="Interactive visual representation of reporting structures across Global Business Services, GBS-BTS, and GBS-BO. Click any node to inspect profile, contacts, and reporting lines."
        badge="Enterprise Org Tree"
      />

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
