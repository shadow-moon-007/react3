import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/home/HomePage';
import { DepartmentsPage } from '../pages/departments/DepartmentsPage';
import { DepartmentDetailPage } from '../pages/departments/DepartmentDetailPage';
import { OrganizationPage } from '../pages/organization/OrganizationPage';
import { PeopleDirectoryPage } from '../pages/people/PeopleDirectoryPage';
import { TeamsDirectoryPage } from '../pages/teams/TeamsDirectoryPage';
import { TeamDetailPage } from '../pages/teams/TeamDetailPage';
import { AnnouncementsPage } from '../pages/announcements/AnnouncementsPage';
import { ResourceCenterPage } from '../pages/resources/ResourceCenterPage';
import { ProjectsShowcasePage } from '../pages/projects/ProjectsShowcasePage';
import { AchievementsPage } from '../pages/achievements/AchievementsPage';
import { QuickLinksPage } from '../pages/quicklinks/QuickLinksPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { CMSPage } from '../pages/cms/CMSPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Role-Based Guard (Admin / Manager)
const RoleRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: ('Admin' | 'Manager' | 'User')[];
}> = ({ children, allowedRoles }) => {
  const { user } = useAuthStore();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Enterprise Portal Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="departments/:id" element={<DepartmentDetailPage />} />
        <Route path="organization" element={<OrganizationPage />} />
        <Route path="people" element={<PeopleDirectoryPage />} />
        <Route path="teams" element={<TeamsDirectoryPage />} />
        <Route path="teams/:id" element={<TeamDetailPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="resources" element={<ResourceCenterPage />} />
        <Route path="projects" element={<ProjectsShowcasePage />} />
        <Route path="achievements" element={<AchievementsPage />} />
        <Route path="quicklinks" element={<QuickLinksPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />

        {/* CMS Route (Admin & Manager) */}
        <Route
          path="cms"
          element={
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <CMSPage />
            </RoleRoute>
          }
        />

        {/* Admin Route (Admin only) */}
        <Route
          path="admin"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <AdminPage />
            </RoleRoute>
          }
        />

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
