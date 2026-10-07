import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { Sidebar } from './Sidebar';
import { ProfileDrawer } from '../common/ProfileDrawer';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { SearchModal } from '../common/SearchModal';
import { KudosModal } from '../common/KudosModal';
import { FeedbackModal } from '../common/FeedbackModal';
import { ToastContainer } from '../common/ToastContainer';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] flex flex-col antialiased">
      <AppHeader />
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Global Modals, Drawers & Overlays */}
      <ProfileDrawer />
      <NotificationDrawer />
      <SearchModal />
      <KudosModal />
      <FeedbackModal />
      <ToastContainer />
    </div>
  );
};
