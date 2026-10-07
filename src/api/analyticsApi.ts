import { useCMSStore } from '../stores/cmsStore';

export interface HeadcountDistribution {
  location: string;
  bts: number;
  bo: number;
  total: number;
}

export interface ProjectStatusMetrics {
  status: string;
  count: number;
  color: string;
}

export interface ResourceUsageMetrics {
  month: string;
  sops: number;
  templates: number;
  policies: number;
}

export interface SavingsImpactMetrics {
  quarter: string;
  targetSavings: number;
  achievedSavings: number;
}

export const analyticsApi = {
  async getDashboardAnalytics() {
    await new Promise((r) => setTimeout(r, 120));
    const store = useCMSStore.getState();

    const totalEmployees = store.users.length;
    const totalProjects = store.projects.length;
    const totalResources = store.resources.length;
    const totalAnnouncements = store.announcements.length;
    const totalTeams = store.teams.length;

    // Headcount by location
    const locationData: HeadcountDistribution[] = [
      { location: 'Bangalore Hub', bts: 480, bo: 290, total: 770 },
      { location: 'London Regional HQ', bts: 160, bo: 120, total: 280 },
      { location: 'New York Executive', bts: 90, bo: 75, total: 165 },
      { location: 'Zurich Ops Center', bts: 35, bo: 65, total: 100 },
      { location: 'Singapore Hub', bts: 30, bo: 45, total: 75 },
      { location: 'Tokyo Tech Center', bts: 25, bo: 5, total: 30 },
    ];

    // Project breakdown
    const projectStatusData: ProjectStatusMetrics[] = [
      { status: 'Completed', count: store.projects.filter((p) => p.status === 'Completed').length, color: '#16A34A' },
      { status: 'In Progress', count: store.projects.filter((p) => p.status === 'In Progress').length, color: '#2563EB' },
      { status: 'In Review', count: store.projects.filter((p) => p.status === 'In Review').length, color: '#F59E0B' },
      { status: 'Planning', count: store.projects.filter((p) => p.status === 'Planning').length, color: '#6B7280' },
    ];

    // Monthly SOP & Resource downloads
    const resourceUsage: ResourceUsageMetrics[] = [
      { month: 'May 2026', sops: 2400, templates: 1100, policies: 950 },
      { month: 'Jun 2026', sops: 2900, templates: 1450, policies: 1200 },
      { month: 'Jul 2026', sops: 3400, templates: 1680, policies: 1420 },
      { month: 'Aug 2026', sops: 4100, templates: 2100, policies: 1850 },
      { month: 'Sep 2026', sops: 4950, templates: 2600, policies: 2300 },
      { month: 'Oct 2026', sops: 5400, templates: 2980, policies: 2750 },
    ];

    // Quarterly cost savings in Millions
    const savingsData: SavingsImpactMetrics[] = [
      { quarter: 'Q1 2026', targetSavings: 15.0, achievedSavings: 17.4 },
      { quarter: 'Q2 2026', targetSavings: 18.0, achievedSavings: 21.2 },
      { quarter: 'Q3 2026', targetSavings: 20.0, achievedSavings: 24.8 },
      { quarter: 'Q4 (Proj)', targetSavings: 22.0, achievedSavings: 26.5 },
    ];

    // Operational SLA breakdown
    const slaMetrics = [
      { metric: 'Global IT Platform Uptime', score: 99.96, target: 99.9, status: 'Exceeding' },
      { metric: 'Procurement Turnaround Time', score: 96.8, target: 95.0, status: 'Exceeding' },
      { metric: 'P2P Invoice Automation Rate', score: 94.8, target: 90.0, status: 'Exceeding' },
      { metric: 'New Hire 90-Day Satisfaction', score: 96.4, target: 92.0, status: 'Exceeding' },
      { metric: 'SOC Security Incident Deflection', score: 99.8, target: 99.5, status: 'Exceeding' },
    ];

    return {
      overview: {
        totalEmployees,
        totalProjects,
        totalResources,
        totalAnnouncements,
        totalTeams,
        annualizedValue: '$84.2M',
        overallSLA: '99.8%',
      },
      locationData,
      projectStatusData,
      resourceUsage,
      savingsData,
      slaMetrics,
    };
  },
};
