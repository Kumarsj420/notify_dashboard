import { useQuery } from '@tanstack/react-query';
import API from '../services/api';

// Types for the actual API response
export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
}

export interface DashboardMainDomain {
  domain: string;
  status: string;
}

export interface DashboardCompany {
  id: number;
  companyName: string;
  description: string;
  website: string;
  domain: string;
  linkedin: string | null;
  industry: string;
  founded: number;
  employeesCount: number;
  location: string;
  logoUrl: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalEmployees: number;
  totalThreatProfiles: number;
  activeEmployees: number;
  employeesWithEmail: number;
  employeesWithPhone: number;
  threatProfilesByLevel: {
    NONE: number;
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    CRITICAL: number;
  };
  threatProfilesByStatus: {
    PENDING: number;
    PROCESSING: number;
    COMPLETED: number;
    FAILED: number;
    RATE_LIMITED: number;
  };
}

export interface RecentThreat {
  id: string;
  employeeName: string;
  employeeTitle: string;
  searchValue: string;
  searchType: string;
  threatLevel: string;
  status: string;
  numOfDatabases: number;
  numOfResults: number;
  lastScanned: string;
}

export interface DashboardOverviewResponse {
  user: DashboardUser;
  mainDomain: DashboardMainDomain;
  company: DashboardCompany;
  stats: DashboardStats;
  recentThreats: RecentThreat[];
}

// Query Keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  overview: () => [...dashboardKeys.all, 'overview'] as const,
} as const;

// Dashboard overview data
export const useDashboardOverview = (isAuthenticated: boolean = false) => {
  return useQuery<DashboardOverviewResponse>({
    queryKey: dashboardKeys.overview(),
    queryFn: async () => {
      try {
        const dashboard = await API.get<DashboardOverviewResponse>('/dashboard/overview');
        if (!dashboard) {
          return {
            user: {
              id: '',
              name: '',
              email: '',
              plan: '',
              status: '',
            },
            mainDomain: {
              domain: '',
              status: '',
            },
            company: {
              id: 0,
              companyName: '',
              description: '',
              website: '',
              domain: '',
              linkedin: null,
              industry: '',
              founded: 0,
              employeesCount: 0,
              location: '',
              logoUrl: '',
              isActive: false,
            },
            stats: {
              totalEmployees: 0,
              totalThreatProfiles: 0,
              activeEmployees: 0,
              employeesWithEmail: 0,
              employeesWithPhone: 0,
              threatProfilesByLevel: {
                NONE: 0,
                LOW: 0,
                MEDIUM: 0,
                HIGH: 0,
                CRITICAL: 0,
              },
              threatProfilesByStatus: {
                PENDING: 0,
                PROCESSING: 0,
                COMPLETED: 0,
                FAILED: 0,
                RATE_LIMITED: 0,
              },
            },
            recentThreats: [],
          };
        }
        return dashboard;
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
        return {
          user: {
            id: '',
            name: '',
            email: '',
            plan: '',
            status: '',
          },
          mainDomain: {
            domain: '',
            status: '',
          },
          company: {
            id: 0,
            companyName: '',
            description: '',
            website: '',
            domain: '',
            linkedin: null,
            industry: '',
            founded: 0,
            employeesCount: 0,
            location: '',
            logoUrl: '',
            isActive: false,
          },
          stats: {
            totalEmployees: 0,
            totalThreatProfiles: 0,
            activeEmployees: 0,
            employeesWithEmail: 0,
            employeesWithPhone: 0,
            threatProfilesByLevel: {
              NONE: 0,
              LOW: 0,
              MEDIUM: 0,
              HIGH: 0,
              CRITICAL: 0,
            },
            threatProfilesByStatus: {
              PENDING: 0,
              PROCESSING: 0,
              COMPLETED: 0,
              FAILED: 0,
              RATE_LIMITED: 0,
            },
          },
          recentThreats: [],
        };
      }
    },
    enabled: isAuthenticated, // Only run when authenticated
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};