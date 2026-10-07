export const GBS_THEME = {
  colors: {
    primaryRed: '#D71920',
    primaryBlack: '#111111',
    background: '#F8F9FA',
    cardBackground: '#FFFFFF',
    border: '#E5E7EB',
    primaryText: '#111827',
    secondaryText: '#6B7280',
    success: '#16A34A',
    warning: '#F59E0B',
    info: '#2563EB',
  },
  typography: {
    fontSans: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
} as const;

export const DEMO_USERS = [
  {
    ntid: 'keshavb',
    name: 'Keshav Bansal',
    role: 'Admin' as const,
    title: 'Principal Enterprise Architect & GBS Digital Lead',
    department: 'Global Business Services (GBS)',
    email: 'keshav.bansal@corp.gbs.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Bangalore Innovation Hub',
  },
  {
    ntid: 'sarahm',
    name: 'Sarah Mitchell',
    role: 'Manager' as const,
    title: 'Director of Cloud & Automation Solutions',
    department: 'GBS-BTS',
    email: 'sarah.mitchell@corp.gbs.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    location: 'London Regional HQ',
  },
  {
    ntid: 'davidk',
    name: 'David Koenig',
    role: 'User' as const,
    title: 'Senior Global Operations Specialist',
    department: 'GBS-BO',
    email: 'david.koenig@corp.gbs.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'New York Executive Center',
  },
];
