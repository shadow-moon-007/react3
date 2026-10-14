import React, { useState } from 'react';
import { ResponsiveImage } from '../common/ResponsiveImage';
import {
  MapPin,
  Users,
  ShieldCheck,
  Building2,
  Server,
  Activity,
  Maximize2,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CampusData {
  id: string;
  name: string;
  code: string;
  division: string;
  divisionId: string;
  location: string;
  image: string;
  caption: string;
  photographer: string;
  headcount: string;
  director: string;
  directorRole: string;
  uptime: string;
  certifications: string[];
  keyFunctions: string[];
  description: string;
  badge: string;
}

export const GBS_CAMPUSES: CampusData[] = [
  {
    id: 'campus-london',
    name: 'Canary Wharf Global HQ & Operations Deck',
    code: 'HQ-LDN-L18',
    division: 'GBS Global Enterprise',
    divisionId: 'GBS',
    location: '25 Bank Street, Canary Wharf, London, UK',
    image: '/src/assets/images/hero_gbs_operations_1791784024601.jpg',
    caption: 'Live GBS Command Center · 24/7 Global Telemetry & Cross-Regional Operations Bridge',
    photographer: 'Corporate Communications & Facilities Bureau',
    headcount: '380 On-site Specialists',
    director: 'Marcus Vance',
    directorRole: 'Executive Vice President & Global Head of GBS',
    uptime: '99.96% SLA',
    badge: 'Global HQ & Command Center',
    certifications: ['ISO 27001 Certified', 'SOC-2 Type II', 'LEED Platinum', 'Tier 4 Datacenter Feed'],
    keyFunctions: [
      '24/7 Global Telemetry & Network Operations Bridge',
      'Executive Leadership Council & Strategy Chambers',
      'Unified Service-Desk Tier 3 Escalation Hub',
      'Global Incident Command & Business Continuity Deck',
    ],
    description:
      'The flagship headquarters of Global Business Services, housing the 24/7 Command Wall, executive steering committee, and multi-region operations federation bridge.',
  },
  {
    id: 'campus-bangalore',
    name: 'Bangalore Technology & Cloud Architecture Campus',
    code: 'TECH-BLR-E4',
    division: 'GBS Business Technology Services (BTS)',
    divisionId: 'GBS-BTS',
    location: 'EcoWorld Technology Park, Outer Ring Road, Bangalore, India',
    image: '/src/assets/images/bts_tech_architecture_1791784039637.jpg',
    caption: 'BTS Intelligent Automation & Cloud Architecture Engineering Hub',
    photographer: 'BTS Engineering Infrastructure Guild',
    headcount: '640 Engineers & Cloud Architects',
    director: 'Dr. Aris Thorne',
    directorRole: 'SVP of Technology & CIO, GBS-BTS',
    uptime: '99.99% Cloud SLA',
    badge: 'Technology Innovation Hub',
    certifications: ['ISO 27001', 'Cloud Security Alliance Star 2', 'Zero-Trust Architecture', 'CMMI Level 5'],
    keyFunctions: [
      'Autonomous Enterprise AI & LLM Model Integration Testbed',
      'Cloud Modernization, Microservices & FinOps Architecture',
      'DevSecOps Continuous Delivery Pipeline Infrastructure',
      'Global Cybersecurity & Threat Operations Center',
    ],
    description:
      'Premier engineering and digital innovation campus supporting 48 agile delivery squads across distributed cloud systems, generative AI workflows, and enterprise APIs.',
  },
  {
    id: 'campus-zurich',
    name: 'Zurich Financial Center & Shared Services Floor',
    code: 'OPS-ZRH-EA',
    division: 'GBS Business Operations (BO)',
    divisionId: 'GBS-BO',
    location: 'Europaallee Business Complex, Zurich, Switzerland',
    image: '/src/assets/images/bo_business_operations_1791784056212.jpg',
    caption: 'GBS Business Operations & Global Shared Services Collaboration Floor',
    photographer: 'Global Workplace Experience Guild',
    headcount: '420 Shared Services Specialists',
    director: 'Elena Rostova',
    directorRole: 'Senior Vice President, Global Operations, GBS-BO',
    uptime: '2.5-day Close Rate',
    badge: 'Shared Services & Finance Hub',
    certifications: ['SOX 404 Compliant', 'Lean Six Sigma Gold', 'ISO 9001 Quality', 'FINMA Guideline Aligned'],
    keyFunctions: [
      'Multi-currency Global P2P & Accounts Reconciliation Floor',
      'Strategic Sourcing, Global Vendor & Contract Management',
      'Enterprise People Operations & Global Mobility Bureau',
      'Lean Six Sigma Process Transformation Center',
    ],
    description:
      'Centralized operations powerhouse executing high-volume shared services, procurement transformation, and financial reconciliations across 34 operating countries.',
  },
  {
    id: 'campus-ny',
    name: 'New York Executive Center & Strategy Amphitheater',
    code: 'EXEC-NYC-MID',
    division: 'GBS Executive Governance',
    divisionId: 'GBS',
    location: 'Midtown Manhattan, 6th Avenue, New York, NY',
    image: '/src/assets/images/executive_townhall_summit_1791784068697.jpg',
    caption: 'Global Governance Council Amphitheater & Strategy Summit Auditorium',
    photographer: 'Executive Media Services',
    headcount: '160 Executive Staff & Partners',
    director: 'Victoria Sterling',
    directorRole: 'Chief of Staff & Head of Corporate Governance',
    uptime: '100% Board Readiness',
    badge: 'Executive Governance & Summit Deck',
    certifications: ['Confidential Boardroom Spec', 'FIDO2 Biometrics', 'Acoustic Sound Masking', 'Multi-Cast Broadcast'],
    keyFunctions: [
      'Global Executive Townhall Broadcast & Webcast Studio',
      'Board of Directors & Governance Council Sessions',
      'Annual Strategy Summit & Innovation Showcase Auditorium',
      'Senior Executive Briefings & Stakeholder Presentations',
    ],
    description:
      '300-seat acoustic amphitheater and high-security executive boardroom connecting global leadership across live telepresence links to all regional GBS campuses.',
  },
];

export const CampusShowcase: React.FC = () => {
  const navigate = useNavigate();
  const [activeCampusId, setActiveCampusId] = useState<string>(GBS_CAMPUSES[0].id);
  const [selectedDetailCampus, setSelectedDetailCampus] = useState<CampusData | null>(null);

  const activeCampus = GBS_CAMPUSES.find((c) => c.id === activeCampusId) || GBS_CAMPUSES[0];

  return (
    <section className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-red-50 text-[#D71920] border border-red-200/60">
              Site Infrastructure & Facilities
            </span>
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              4 Global Delivery Campuses Active
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            GBS Global Delivery Campuses & Operational Hubs
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            High-fidelity physical infrastructure powering our 1,420+ global professionals. Inspect certified facilities, telemetry SLAs, and campus leadership.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/departments')}
            className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-[#D71920]" />
            <span>Departments Directory</span>
          </button>
        </div>
      </div>

      {/* Campus Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {GBS_CAMPUSES.map((campus) => {
          const isActive = campus.id === activeCampusId;
          return (
            <button
              key={campus.id}
              onClick={() => setActiveCampusId(campus.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                isActive
                  ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200/80'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-[#D71920]' : 'text-gray-400'}`} />
              <span>{campus.name.split('·')[0].split('&')[0].trim()}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {campus.code}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Campus Spotlight (Responsive Image with Rich Metadata Details) */}
      <div className="border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs bg-gray-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: High-Res Responsive Image */}
          <div className="lg:col-span-7 bg-black">
            <ResponsiveImage
              src={activeCampus.image}
              alt={activeCampus.name}
              aspectRatio="16/9"
              caption={activeCampus.caption}
              location={activeCampus.location}
              photographer={activeCampus.photographer}
              className="rounded-none h-full min-h-[300px]"
            />
          </div>

          {/* Right: Detailed Campus Specification Sheet */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-gray-200/80">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                    {activeCampus.badge}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 leading-snug">
                    {activeCampus.name}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/70 shrink-0">
                  {activeCampus.uptime}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
                <span>{activeCampus.location}</span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {activeCampus.description}
              </p>

              {/* Facility Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-gray-400 block">
                  Core Operational Functions:
                </span>
                <ul className="space-y-1 text-xs text-gray-700">
                  {activeCampus.keyFunctions.slice(0, 3).map((func, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] mt-1.5 shrink-0" />
                      <span className="leading-snug">{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications badges */}
              <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-1.5">
                {activeCampus.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Row */}
            <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-400 block uppercase">Campus Director</span>
                <span className="text-xs font-bold text-gray-900">{activeCampus.director}</span>
                <span className="text-[10px] text-gray-500 block">{activeCampus.headcount}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDetailCampus(activeCampus)}
                  className="px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Inspect Dossier
                </button>
                <button
                  onClick={() => navigate(`/departments/${activeCampus.divisionId}`)}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#D71920] hover:bg-[#b5141a] rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>Division</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Card Responsive Grid for Quick Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {GBS_CAMPUSES.map((campus) => {
          const isCurrent = campus.id === activeCampusId;
          return (
            <div
              key={campus.id}
              onClick={() => setActiveCampusId(campus.id)}
              className={`border rounded-xl p-3.5 cursor-pointer transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'border-[#D71920] ring-1 ring-[#D71920]/20 bg-red-50/20 shadow-xs'
                  : 'border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="rounded-lg overflow-hidden mb-2.5 relative aspect-video bg-gray-100">
                  <img
                    src={campus.image}
                    alt={campus.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-black/70 text-white backdrop-blur-xs">
                    {campus.code}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-1">
                  {campus.name}
                </h4>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                  {campus.location.split(',')[0]}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="font-mono text-gray-400">{campus.headcount.split(' ')[0]} Staff</span>
                <span className="font-mono font-bold text-emerald-600">{campus.uptime}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Campus Dossier Modal */}
      {selectedDetailCampus && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold block">
                  Official Facility Dossier
                </span>
                <h3 className="text-base font-bold">{selectedDetailCampus.name}</h3>
              </div>
              <button
                onClick={() => setSelectedDetailCampus(null)}
                className="text-gray-400 hover:text-white text-sm font-bold p-1 rounded hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
              {/* Responsive Image in Modal */}
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <ResponsiveImage
                  src={selectedDetailCampus.image}
                  alt={selectedDetailCampus.name}
                  aspectRatio="16/9"
                  caption={selectedDetailCampus.caption}
                  location={selectedDetailCampus.location}
                  photographer={selectedDetailCampus.photographer}
                />
              </div>

              {/* Grid Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] font-mono block">CAMPUS CODE</span>
                  <span className="font-bold text-gray-900 font-mono">{selectedDetailCampus.code}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-mono block">HEADCOUNT</span>
                  <span className="font-bold text-gray-900">{selectedDetailCampus.headcount}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-mono block">SERVICE SLA</span>
                  <span className="font-bold text-emerald-600 font-mono">{selectedDetailCampus.uptime}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-mono block">DIVISION</span>
                  <span className="font-bold text-gray-900">{selectedDetailCampus.divisionId}</span>
                </div>
              </div>

              {/* Operational Functions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">
                  Operational Units & Dedicated Facilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {selectedDetailCampus.keyFunctions.map((func, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] mt-1.5 shrink-0" />
                      <span>{func}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications and Compliance */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">
                  Audited Certifications & Physical Security Controls
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDetailCampus.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-mono font-semibold"
                    >
                      🛡️ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Leadership & Contacts */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block">Site Director</span>
                  <span className="font-bold text-gray-900 text-sm block">{selectedDetailCampus.director}</span>
                  <span className="text-gray-500">{selectedDetailCampus.directorRole}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedDetailCampus(null);
                    navigate(`/departments/${selectedDetailCampus.divisionId}`);
                  }}
                  className="px-4 py-2 bg-[#D71920] text-white rounded-lg font-bold text-xs hover:bg-[#b5141a] transition-colors"
                >
                  View Division Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
