import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useCMSStore } from '../../stores/cmsStore';
import { useUIStore } from '../../stores/uiStore';
import { useNavigate } from 'react-router-dom';
import { KPIWidget } from '../../components/cards/KPIWidget';
import { AnnouncementCard } from '../../components/cards/AnnouncementCard';
import { DepartmentCard } from '../../components/cards/DepartmentCard';
import { ResourceCard } from '../../components/cards/ResourceCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { QuickLinkCard } from '../../components/cards/QuickLinkCard';
import { TeamCard } from '../../components/cards/TeamCard';
import {
  Users,
  Briefcase,
  Layers,
  FileText,
  Award,
  Search,
  ArrowRight,
  TrendingUp,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  HeartHandshake,
} from 'lucide-react';
import { Announcement, Resource, Project } from '../../types';

export const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const {
    announcements,
    departments,
    projects,
    resources,
    quickLinks,
    teams,
    users,
  } = useCMSStore();
  const { setSearchModalOpen, setKudosModalOpen, activeDepartmentFilter } = useUIStore();
  const navigate = useNavigate();

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Filtered by top switcher if set
  const filteredAnnouncements = announcements.filter((a) => {
    if (activeDepartmentFilter === 'All') return true;
    return a.department === 'All GBS' || a.department === activeDepartmentFilter;
  });

  const featuredAnnouncement = filteredAnnouncements.find((a) => a.isFeatured) || filteredAnnouncements[0];
  const regularAnnouncements = filteredAnnouncements.filter((a) => a.id !== featuredAnnouncement?.id).slice(0, 3);

  const topResources = resources.filter((r) => r.isPopular).slice(0, 4);
  const activeProjects = projects.filter((p) => p.status === 'In Progress').slice(0, 3);
  const featuredTeams = teams.slice(0, 2);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#222222] text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-800">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider bg-[#D71920] px-2.5 py-0.5 rounded font-bold text-white shadow-2xs">
              Single Source of Truth
            </span>
            <span className="text-xs text-gray-400 font-mono">
              NT-ID: {user?.ntid || 'guest'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Welcome, {user?.name || 'GBS Team Member'}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2 font-normal leading-relaxed">
            Global Business Services operational hub. Discover organizational hierarchy, access
            enterprise SOPs, connect with colleagues, and track strategic transformation across GBS-BTS and GBS-BO.
          </p>

          {/* Quick Action Trigger Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors shadow-xs"
            >
              <Search className="w-3.5 h-3.5 text-[#D71920]" />
              <span>Search Entire Portal (⌘K)</span>
            </button>
            <button
              onClick={() => navigate('/organization')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-lg text-xs font-semibold transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-gray-300" />
              <span>Org Hierarchy</span>
            </button>
            <button
              onClick={() => navigate('/resources')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-lg text-xs font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-gray-300" />
              <span>Browse SOPs & Docs</span>
            </button>
            <button
              onClick={() => setKudosModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#D71920]/80 hover:bg-[#D71920] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Send Kudos</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative motif */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-red-600/10 via-transparent to-transparent pointer-events-none hidden lg:block" />
        <div className="absolute right-8 bottom-6 opacity-10 pointer-events-none text-right hidden xl:block">
          <span className="text-8xl font-black font-mono tracking-tighter text-white">GBS</span>
        </div>
      </section>

      {/* 2. GBS AT A GLANCE (KPIs) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">GBS At A Glance</h2>
            <p className="text-xs text-gray-500">Real-time enterprise metrics and shared service performance</p>
          </div>
          <button
            onClick={() => navigate('/analytics')}
            className="text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1"
          >
            <span>Full Analytics Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <KPIWidget
            label="Employees"
            value="1,420"
            change="+4.2%"
            trend="up"
            subtext="Across 6 global hubs"
            icon={Users}
          />
          <KPIWidget
            label="Teams"
            value="48"
            change="12 BTS / 12 BO"
            trend="neutral"
            subtext="Specialized units"
            icon={Layers}
          />
          <KPIWidget
            label="Active Projects"
            value="84"
            change="+18"
            trend="up"
            subtext="Delivery on track"
            icon={Briefcase}
          />
          <KPIWidget
            label="Divisions"
            value="2"
            change="BTS & BO"
            trend="neutral"
            subtext="Under unified GBS"
            icon={ShieldCheck}
          />
          <KPIWidget
            label="Curated SOPs"
            value="320+"
            change="+24 this mo"
            trend="up"
            subtext="Audited compliance"
            icon={FileText}
          />
          <KPIWidget
            label="Value Delivered"
            value="$84.2M"
            change="+18.5%"
            trend="up"
            subtext="Annualized ROI"
            icon={Award}
          />
        </div>
      </section>

      {/* 3. LATEST ANNOUNCEMENTS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Latest Announcements & Directives</h2>
            <p className="text-xs text-gray-500">Official communications from Executive Leadership and Practice Heads</p>
          </div>
          <button
            onClick={() => navigate('/announcements')}
            className="text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1"
          >
            <span>All Announcements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {featuredAnnouncement && (
            <div className="lg:col-span-2">
              <AnnouncementCard
                announcement={featuredAnnouncement}
                featured={true}
                onSelect={(ann) => setSelectedAnnouncement(ann)}
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            {regularAnnouncements.map((ann) => (
              <AnnouncementCard
                key={ann.id}
                announcement={ann}
                onSelect={(a) => setSelectedAnnouncement(a)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEPARTMENT OVERVIEW (GBS-BTS & GBS-BO) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Department Overview</h2>
            <p className="text-xs text-gray-500">Core operational pillars driving technology and global shared services</p>
          </div>
          <button
            onClick={() => navigate('/departments')}
            className="text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1"
          >
            <span>All Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {departments
            .filter((d) => d.id !== 'GBS')
            .map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
        </div>
      </section>

      {/* 5. QUICK ACCESS APPLICATIONS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Quick Access Applications</h2>
            <p className="text-xs text-gray-500">Frequently used corporate systems and employee self-service tools</p>
          </div>
          <button
            onClick={() => navigate('/quicklinks')}
            className="text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1"
          >
            <span>Enterprise System Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickLinks.slice(0, 8).map((link) => (
            <QuickLinkCard key={link.id} item={link} />
          ))}
        </div>
      </section>

      {/* 6. LEADERSHIP MESSAGE & UPCOMING EVENTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Leadership Message */}
        <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D71920]" />
              <span>Leadership Corner</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 leading-snug">
              "Driving Agility and Unified Excellence Across Global Delivery Centers"
            </h3>
            <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
              As we advance into Q4 2026, our mandate remains focused: eliminating friction for every
              employee, scaling autonomous automation safely, and delivering measurable cost-leadership for the wider enterprise. The GBS Portal represents our dedication to total transparency, clear ownership, and rapid information discovery.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Marcus Vance"
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div className="text-xs">
                <span className="font-bold text-gray-900 block">Marcus Vance</span>
                <span className="text-gray-500 text-[11px]">Executive Vice President & Global Head of GBS</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/announcements')}
              className="text-xs font-semibold text-[#D71920] hover:underline"
            >
              Read full executive address
            </button>
          </div>
        </div>

        {/* Upcoming Events Box */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D71920]" />
                Upcoming Events & Town Halls
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  date: 'OCT 18',
                  title: 'Global Town Hall & Q3 Awards',
                  time: '14:00 GMT · Hybrid Broadcast',
                },
                {
                  date: 'OCT 24',
                  title: 'Enterprise Architecture Board',
                  time: '10:00 EST · Microsoft Teams',
                },
                {
                  date: 'NOV 04',
                  title: 'Lean Six Sigma Showcase',
                  time: '16:00 IST · Zurich / Bangalore Hubs',
                },
              ].map((ev, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-11 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-[10px] font-bold text-gray-400 font-mono leading-none">
                      {ev.date.split(' ')[0]}
                    </span>
                    <span className="text-xs font-black text-gray-900 font-mono leading-none mt-0.5">
                      {ev.date.split(' ')[1]}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-gray-900 truncate">{ev.title}</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-gray-300" />
                      {ev.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400">All sessions recorded & archived in Resource Center</span>
          </div>
        </div>
      </section>

      {/* 7. FEATURED TEAMS & SUCCESS STORIES */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900">Featured Teams</h3>
            <button
              onClick={() => navigate('/teams')}
              className="text-xs font-semibold text-[#D71920] hover:underline"
            >
              All 48 Teams
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredTeams.map((t) => (
              <TeamCard key={t.id} team={t} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900">Strategic Project Milestones</h3>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs font-semibold text-[#D71920] hover:underline"
            >
              All 84 Initiatives
            </button>
          </div>
          <div className="space-y-3">
            {activeProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={() => navigate(`/projects?code=${p.code}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESOURCE CENTER HIGHLIGHTS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Popular SOPs & Governing Policies</h2>
            <p className="text-xs text-gray-500">Most downloaded guidelines, templates, and operational manuals</p>
          </div>
          <button
            onClick={() => navigate('/resources')}
            className="text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1"
          >
            <span>Explore 320+ SOPs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onPreview={() => navigate(`/resources?q=${encodeURIComponent(res.title)}`)}
            />
          ))}
        </div>
      </section>

      {/* Detail Reader Modal for Announcements */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span className="font-semibold text-gray-800">{selectedAnnouncement.category}</span>
                <span>·</span>
                <span>{selectedAnnouncement.department}</span>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedAnnouncement.title}</h2>
              <div className="flex items-center gap-3 text-xs text-gray-500 py-2 border-y border-gray-100">
                <img
                  src={selectedAnnouncement.authorAvatar}
                  alt={selectedAnnouncement.authorName}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold text-gray-900 block">{selectedAnnouncement.authorName}</span>
                  <span className="text-[11px] text-gray-400">{selectedAnnouncement.authorTitle}</span>
                </div>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedAnnouncement.content}
              </div>
              {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Official Attachments
                  </span>
                  <div className="space-y-1.5">
                    {selectedAnnouncement.attachments.map((att, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs">
                        <span className="font-medium text-gray-800">{att.name}</span>
                        <span className="font-mono text-gray-400">{att.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#D71920] rounded-lg hover:bg-[#b5141a]"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
