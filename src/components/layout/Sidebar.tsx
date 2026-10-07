import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import {
  Home,
  Megaphone,
  Building2,
  GitFork,
  Users2,
  Users,
  Briefcase,
  FileText,
  BookmarkCheck,
  Award,
  BarChart3,
  Edit3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
    setMobileMenuOpen,
    setFeedbackModalOpen,
  } = useUIStore();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Announcements', path: '/announcements', icon: Megaphone },
    { label: 'Departments', path: '/departments', icon: Building2 },
    { label: 'Organization', path: '/organization', icon: GitFork },
    { label: 'Teams', path: '/teams', icon: Users2 },
    { label: 'People Directory', path: '/people', icon: Users },
    { label: 'Projects', path: '/projects', icon: Briefcase },
    { label: 'Resources & SOPs', path: '/resources', icon: FileText },
    { label: 'Achievements', path: '/achievements', icon: Award },
    { label: 'Quick Links', path: '/quicklinks', icon: BookmarkCheck },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'CMS Portal', path: '/cms', icon: Edit3, roleRequirement: ['Admin', 'Manager'], badge: 'Admin' },
    { label: 'Administration', path: '/admin', icon: ShieldCheck, roleRequirement: ['Admin'], badge: 'Core' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] bg-white border-r border-gray-200/80 flex flex-col justify-between transition-all duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
            {!sidebarCollapsed && <span>Navigation</span>}
          </div>

          {navItems.map((item) => {
            // Check role authorization if restricted
            if (item.roleRequirement && user && !item.roleRequirement.includes(user.role)) {
              return null;
            }

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors group relative ${
                    isActive
                      ? 'bg-red-50/70 text-[#D71920]'
                      : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active vertical red accent pill */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#D71920] rounded-r" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#D71920]' : 'text-gray-400 group-hover:text-gray-700'
                      }`}
                    />

                    {!sidebarCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}

                    {!sidebarCollapsed && item.badge && (
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer controls & metadata */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/60 space-y-2">
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                <button
                  onClick={() => setFeedbackModalOpen(true)}
                  className="flex items-center gap-1.5 hover:text-[#D71920] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                  <span>Feedback</span>
                </button>
                <a
                  href="#support"
                  onClick={(e) => {
                    e.preventDefault();
                    setFeedbackModalOpen(true);
                  }}
                  className="flex items-center gap-1 hover:text-gray-900 transition-colors"
                >
                  <LifeBuoy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Support</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-1 px-1 text-[11px] font-mono text-gray-400 border-t border-gray-200/50">
                <span>GBS Portal</span>
                <span className="font-semibold text-gray-500">v2.4.0</span>
              </div>
            </>
          ) : (
            <div className="flex justify-center text-[10px] font-mono text-gray-400">
              v2.4
            </div>
          )}

          {/* Desktop collapse toggle button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex w-full items-center justify-center py-1.5 rounded-md hover:bg-gray-200/60 text-gray-400 hover:text-gray-700 transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Collapse menu</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
