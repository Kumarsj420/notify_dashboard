import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@/services/api';
import type {
  EmployeesResponse,
  UpdateEmployeeContactData,
  UpdateContactResponse,
  Domain,
  ThreatAnalysisJob,
  ThreatAnalysisJobsResponse,
  ScheduleThreatAnalysisRequest,
  PaginationParams,
} from '@/types/api';

// Create Employee Types
export interface CreateEmployeeData {
  fullName: string;
  title?: string;
  workEmail?: string;
  personalEmail?: string;
  phoneNumber?: string;
  locality?: string;
  companyId: string;
}

export interface CreateEmployeeResponse {
  employee: {
    id: string;
    fullName: string;
    title?: string;
    workEmail?: string;
    personalEmail?: string;
    phoneNumber?: string;
    locality?: string;
    companyId: number;
    userId: string;
    isActive: boolean;
    createdAt: string;
  };
  threatAnalysis: {
    scheduled: boolean;
    message: string;
  };
}

// Query Keys
export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (params: PaginationParams) => [...employeeKeys.lists(), params] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeeKeys.details(), id] as const,
  domains: () => [...employeeKeys.all, 'domains'] as const,
  threatJobs: () => [...employeeKeys.all, 'threat-jobs'] as const,
  threatJobDetail: (jobId: string) => [...employeeKeys.threatJobs(), jobId] as const,
} as const;

// Insert new type definition for the API response
export interface DomainsResponse {
  domains: Domain[];
  totalDomains: number;
  mainDomain: Domain | null;
  verifiedDomains: number;
  pendingDomains: number;
}

// Get all domains
export const useUserDomains = (isAuthenticated:boolean) => {
  return useQuery<Domain[]>({
    queryKey: employeeKeys.domains(),
    queryFn: async () => {
      try {
        const response = await API.get<DomainsResponse>('/domains');
        return response?.domains||[];
      } catch (error) {
        console.error('Failed to fetch domains:', error);
        return [];
      }
    },
    enabled: !!isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get user domains (alias for useDomains for backward compatibility)
// export const useUserDomains = () => {
//   return useDomains();
// };

// Get employees with pagination
export const useEmployees = (params: PaginationParams = {}) => {
  return useQuery<EmployeesResponse>({
    queryKey: employeeKeys.list(params),
    queryFn: async () => {
      try {
        const queryParams: Record<string, string> = {};
        if (params.page) queryParams.page = params.page.toString();
        if (params.limit) queryParams.limit = params.limit.toString();
        if (params.search) queryParams.search = params.search;
        if (params.sortBy) queryParams.sortBy = params.sortBy;
        if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

        const employees = await API.get<EmployeesResponse>('/employees', queryParams);
        return employees || {
          employees: [],
          pagination: {
            total: 0,
            page: 1,
            limit: 20,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        };
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        return {
          employees: [],
          pagination: {
            total: 0,
            page: 1,
            limit: 20,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        };
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get employees by domain with pagination and search
export const useEmployeesByDomain = (domainId: string, page: number = 1, limit: number = 20, search: string = '') => {
  return useQuery<EmployeesResponse>({
    queryKey: employeeKeys.list({ page, limit, domainId, search }),
    queryFn: async () => {
      try {
        const queryParams: Record<string, string> = {
          page: page.toString(),
          limit: limit.toString(),
        };
        
        if (search && search.trim()) {
          queryParams.search = search.trim();
        }

        const employees = await API.get<EmployeesResponse>(`/employees/by-domain/${domainId}`, queryParams);
        return employees || {
          employees: [],
          pagination: {
            total: 0,
            page: 1,
            limit: 25,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        };
      } catch (error) {
        console.error('Failed to fetch employees by domain:', error);
        return {
          employees: [],
          pagination: {
            total: 0,
            page: 1,
            limit: 25,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        };
      }
    },
    enabled: !!domainId, // Only run query if domainId is provided
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Update employee contact information
export const useUpdateEmployeeContact = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateContactResponse,
    Error,
    { employeeId: string; data: UpdateEmployeeContactData }
  >({
    mutationFn: ({ employeeId, data }) =>
      API.put<UpdateEmployeeContactData, UpdateContactResponse>(`/employees/${employeeId}/contact`, data),
    onSuccess: (_, { employeeId }) => {
      // Invalidate employee queries
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      queryClient.invalidateQueries({ queryKey: employeeKeys.detail(employeeId) });
      // Invalidate threat jobs to show new jobs when contact details are updated
      queryClient.invalidateQueries({ queryKey: employeeKeys.threatJobs() });
    },
  });
};

// Create new employee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateEmployeeResponse, Error, CreateEmployeeData>({
    mutationFn: (data) =>
      API.post<CreateEmployeeData, CreateEmployeeResponse>('/employees', data),
    onSuccess: () => {
      // Invalidate all employee queries to refresh the list
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      // Invalidate threat jobs to show new jobs if contact details were provided
      queryClient.invalidateQueries({ queryKey: employeeKeys.threatJobs() });
    },
  });
};

// Get threat analysis jobs
export const useThreatAnalysisJobs = () => {
  return useQuery<ThreatAnalysisJobsResponse>({
    queryKey: employeeKeys.threatJobs(),
    queryFn: async () => {
      try {
        const jobs = await API.get<ThreatAnalysisJobsResponse>('/employees/threat-analysis-jobs');
        if (!jobs) {
          return {
            jobs: [],
            summary: {
              total: 0,
              hasActiveJobs: false,
              active: 0,
              completed: 0,
              failed: 0,
            },
            jobsByEmployee: {},
          };
        }
        return jobs;
      } catch (error) {
        console.error('Failed to fetch threat analysis jobs:', error);
        return {
          jobs: [],
          summary: {
            total: 0,
            hasActiveJobs: false,
            active: 0,
            completed: 0,
            failed: 0,
          },
          jobsByEmployee: {},
        };
      }
    },
    refetchInterval: (query) => {
      // Only refetch if there are active jobs
      const data = query.state.data;
      if (data?.summary?.hasActiveJobs) {
        return 5000; // Refetch every 5 seconds when there are active jobs
      }
      return false; // Don't refetch when no active jobs
    },
    staleTime: 30 * 1000, // Consider stale after 30 seconds when no active jobs
  });
};

// Get specific threat analysis job
export const useThreatAnalysisJob = (jobId: string) => {
  return useQuery<ThreatAnalysisJob>({
    queryKey: employeeKeys.threatJobDetail(jobId),
    queryFn: () => API.get<ThreatAnalysisJob>(`/employees/threat-analysis-jobs/${jobId}`),
    refetchInterval: (query) => {
      // Stop refetching if job is completed or failed
      const data = query.state.data;
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false;
      }
      return 3000; // Refetch every 3 seconds for active jobs
    },
    enabled: !!jobId,
  });
};

// Schedule threat analysis
export const useScheduleThreatAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ScheduleThreatAnalysisRequest>({
    mutationFn: (data) =>
      API.post<ScheduleThreatAnalysisRequest, void>('/threat-profiles/schedule', data),
    onSuccess: () => {
      // Invalidate threat jobs to show the new job
      queryClient.invalidateQueries({ queryKey: employeeKeys.threatJobs() });
    },
  });
};