export type Role = 'Admin' | 'Manager' | 'User';

export interface User {
  id: string;
  ntid: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  subDepartment?: 'GBS-BTS' | 'GBS-BO' | 'Executive Office';
  title: string;
  avatar: string;
  location: string;
  phone?: string;
  managerId?: string;
  managerName?: string;
  bio?: string;
  skills?: string[];
  joinedDate?: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  mission: string;
  headName: string;
  headTitle: string;
  headNtid: string;
  headAvatar: string;
  employeeCount: number;
  teamsCount: number;
  activeProjectsCount: number;
  color: string;
  metrics: {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
  }[];
  strategicPriorities: string[];
}

export interface Team {
  id: string;
  name: string;
  departmentId: 'GBS-BTS' | 'GBS-BO' | 'GBS';
  departmentName: string;
  leadName: string;
  leadTitle: string;
  leadNtid: string;
  leadAvatar: string;
  memberCount: number;
  location: string;
  focusArea: string;
  description: string;
  functions: string[];
  activeProjects: string[];
  techStack: string[];
  recentAchievement: string;
}

export type AnnouncementCategory =
  | 'Executive'
  | 'Technology'
  | 'Operations'
  | 'HR & Culture'
  | 'Compliance'
  | 'Town Hall';

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: AnnouncementCategory;
  department: 'All GBS' | 'GBS-BTS' | 'GBS-BO';
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  publishedAt: string;
  isUrgent?: boolean;
  isFeatured?: boolean;
  readTimeMinutes: number;
  views: number;
  likes: number;
  tags: string[];
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

export type ResourceCategory =
  | 'SOPs'
  | 'Policies'
  | 'Templates'
  | 'Forms'
  | 'Training Material'
  | 'Knowledge Articles'
  | 'Presentations';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  department: 'All GBS' | 'GBS-BTS' | 'GBS-BO';
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'PPTX' | 'URL';
  fileSize: string;
  updatedAt: string;
  version: string;
  ownerName: string;
  downloadCount: number;
  isPopular?: boolean;
  tags: string[];
  externalUrl?: string;
}

export type ProjectStatus = 'Planning' | 'In Progress' | 'In Review' | 'Completed' | 'Delayed';

export interface Project {
  id: string;
  code: string;
  name: string;
  department: 'GBS-BTS' | 'GBS-BO' | 'GBS Cross-Functional';
  teamId: string;
  teamName: string;
  leadName: string;
  leadAvatar: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  targetEndDate: string;
  description: string;
  objectives: string[];
  outcomes: string[];
  savingsAnnualized?: string;
  membersCount: number;
  tags: string[];
  priority: 'High' | 'Medium' | 'Critical';
}

export type AchievementType = 'Award' | 'Milestone' | 'Recognition' | 'Spotlight';

export interface Achievement {
  id: string;
  title: string;
  recipient: string;
  recipientType: 'Individual' | 'Team' | 'Department';
  department: 'GBS' | 'GBS-BTS' | 'GBS-BO';
  date: string;
  category: AchievementType;
  description: string;
  avatar?: string;
  impactMetric: string;
  presentedBy: string;
}

export interface QuickLink {
  id: string;
  title: string;
  category: 'Communication' | 'Productivity' | 'IT & Support' | 'HR & Benefits' | 'Finance & Procurement' | 'Analytics';
  description: string;
  url: string;
  iconName: string;
  isInternal: boolean;
  isFrequent?: boolean;
  badge?: string;
}

export interface OrgNode {
  id: string;
  name: string;
  ntid: string;
  title: string;
  department: string;
  avatar: string;
  location: string;
  email: string;
  children?: OrgNode[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'announcement' | 'approval' | 'system' | 'mention';
  isRead: boolean;
  actionUrl?: string;
}
