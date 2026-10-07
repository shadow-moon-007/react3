import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { DEMO_USERS } from '../../constants/theme';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Grid,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Menu,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { user, logout, switchUser } = useAuthStore();
  const {
    setSearchModalOpen,
    setNotificationDrawerOpen,
    activeDepartmentFilter,
    setActiveDepartmentFilter,
    setMobileMenuOpen,
    mobileMenuOpen,
    setFeedbackModalOpen,
  } = useUIStore();
  const { unreadCount } = useNotificationStore();
  const navigate = useNavigate();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [deptMenuOpen, setDeptMenuOpen] = useState(false);
  const [appsMenuOpen, setAppsMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const deptMenuRef = useRef<HTMLDivElement>(null);
  const appsMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (deptMenuRef.current && !deptMenuRef.current.contains(e.target as Node)) {
        setDeptMenuOpen(false);
      }
      if (appsMenuRef.current && !appsMenuRef.current.contains(e.target as Node)) {
        setAppsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Zone 1: Brand & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Corporate Brand lockup */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-lg bg-[#111111] flex items-center justify-center text-white font-black text-sm tracking-wider shadow-xs relative overflow-hidden group-hover:bg-[#D71920] transition-colors">
            <span className="font-mono text-xs text-white">GBS</span>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-[#D71920]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-gray-950 text-base tracking-tight leading-none">
                GBS Portal
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-red-50 text-[#D71920] border border-red-100">
                Global
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium hidden md:block">
              Global Business Services Intranet
            </p>
          </div>
        </div>

        {/* Department Switcher Dropdown */}
        <div className="relative ml-2 sm:ml-4" ref={deptMenuRef}>
          <button
            onClick={() => setDeptMenuOpen(!deptMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-xs font-semibold text-gray-700 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#D71920]" />
            <span className="max-w-[100px] sm:max-w-none truncate">
              {activeDepartmentFilter === 'All' ? 'All GBS Divisions' : activeDepartmentFilter}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {deptMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Filter Portal Scope
              </div>
              <button
                onClick={() => {
                  setActiveDepartmentFilter('All');
                  setDeptMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  activeDepartmentFilter === 'All' ? 'bg-red-50/50 text-[#D71920] font-semibold' : 'text-gray-700'
                }`}
              >
                <span>All GBS (Enterprise Wide)</span>
                {activeDepartmentFilter === 'All' && <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />}
              </button>
              <button
                onClick={() => {
                  setActiveDepartmentFilter('GBS-BTS');
                  setDeptMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  activeDepartmentFilter === 'GBS-BTS' ? 'bg-red-50/50 text-[#D71920] font-semibold' : 'text-gray-700'
                }`}
              >
                <div>
                  <span className="font-semibold block">GBS-BTS</span>
                  <span className="text-[11px] text-gray-400">Business Technology Services</span>
                </div>
                {activeDepartmentFilter === 'GBS-BTS' && <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />}
              </button>
              <button
                onClick={() => {
                  setActiveDepartmentFilter('GBS-BO');
                  setDeptMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  activeDepartmentFilter === 'GBS-BO' ? 'bg-red-50/50 text-[#D71920] font-semibold' : 'text-gray-700'
                }`}
              >
                <div>
                  <span className="font-semibold block">GBS-BO</span>
                  <span className="text-[11px] text-gray-400">Business Operations</span>
                </div>
                {activeDepartmentFilter === 'GBS-BO' && <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Zone 2: Global Search Bar */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <button
          onClick={() => setSearchModalOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100/90 border border-gray-200/80 rounded-lg text-xs text-gray-400 transition-colors group cursor-text"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>Search people, SOPs, announcements, projects...</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-white border border-gray-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions & User Account */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Mobile Search trigger */}
        <button
          onClick={() => setSearchModalOpen(true)}
          className="md:hidden p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
          aria-label="Open search dialog"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Quick App Launcher */}
        <div className="relative" ref={appsMenuRef}>
          <button
            onClick={() => setAppsMenuOpen(!appsMenuOpen)}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Microsoft 365 & Enterprise Systems"
            aria-label="Enterprise App Launcher"
          >
            <Grid className="w-5 h-5" />
          </button>

          {appsMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                <span className="text-xs font-bold text-gray-900">Enterprise Apps</span>
                <button
                  onClick={() => {
                    setAppsMenuOpen(false);
                    navigate('/quicklinks');
                  }}
                  className="text-[11px] font-semibold text-[#D71920] hover:underline"
                >
                  All Tools
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'ServiceNow', icon: '⚡', url: 'https://servicenow.corp.gbs.com' },
                  { name: 'Teams', icon: '💬', url: 'https://teams.microsoft.com' },
                  { name: 'Outlook', icon: '✉️', url: 'https://outlook.office.com' },
                  { name: 'Workday', icon: '👥', url: 'https://workday.corp.gbs.com' },
                  { name: 'Coupa', icon: '🛒', url: 'https://coupa.corp.gbs.com' },
                  { name: 'PowerBI', icon: '📊', url: 'https://powerbi.corp.gbs.com' },
                ].map((app, idx) => (
                  <a
                    key={idx}
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-lg hover:bg-gray-50 text-center transition-colors group"
                  >
                    <span className="text-xl mb-1">{app.icon}</span>
                    <span className="text-[11px] font-medium text-gray-700 group-hover:text-gray-950 truncate w-full">
                      {app.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setNotificationDrawerOpen(true)}
          className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D71920] ring-2 ring-white" />
          )}
        </button>

        {/* User Profile Pill */}
        <div className="relative ml-1 sm:ml-2" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-gray-100 border border-gray-200/80 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'}
              className="w-7 h-7 rounded-full object-cover border border-gray-200"
            />
            <div className="hidden lg:block text-left text-xs leading-none">
              <span className="font-semibold text-gray-900 block truncate max-w-[110px]">
                {user?.name || 'Guest User'}
              </span>
              <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">{user?.ntid}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 text-xs animate-in fade-in zoom-in-95 divide-y divide-gray-100">
              {/* Profile Card in dropdown */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-sm font-bold text-gray-900">{user?.name}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-[#D71920] border border-red-100">
                    {user?.role}
                  </span>
                </div>
                <p className="text-gray-500 text-[11px] line-clamp-1">{user?.title}</p>
                <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-gray-400">
                  <span>NTID: {user?.ntid}</span>
                  <span>·</span>
                  <span>{user?.department}</span>
                </div>
              </div>

              {/* Demo Switcher for Evaluation */}
              <div className="px-3 py-2 bg-gray-50/70">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Switch Role / Persona
                </div>
                <div className="space-y-1">
                  {DEMO_USERS.map((demo) => (
                    <button
                      key={demo.ntid}
                      onClick={() => {
                        switchUser(demo.ntid);
                        setUserMenuOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between text-xs transition-colors ${
                        user?.ntid === demo.ntid
                          ? 'bg-white shadow-2xs text-[#D71920] font-semibold border border-red-100'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] bg-gray-200/60 px-1 py-0.5 rounded">
                          {demo.role}
                        </span>
                        <span className="truncate">{demo.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-gray-400">{demo.ntid}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    setFeedbackModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                  <span>Submit Portal Feedback</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out (Clear Session)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
