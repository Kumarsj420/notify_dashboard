import { useQuery } from '@tanstack/react-query';
import API from '../services/api';

export interface ExposureCredential {
  id: string;
  url: string;
  username: string;
  password: string;
  exposureType: 'EMPLOYEE' | 'OTHERS';
  isEmployeeEmail: boolean;
  createdAt: string;
  updatedAt: string;
  domainExposure: {
    id: string;
    domain: string;
    domainRecord: {
      id: string;
      domain: string;
    };
  };
}

export interface DomainExposureResponse {
  success: boolean;
  data: ExposureCredential[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
  };
  summary: {
    totalCredentials: number;
    employeeCredentials: number;
    othersCredentials: number;
  };
  filters: {
    search: string | null;
    exposureType: 'EMPLOYEE' | 'OTHERS' | 'all';
    sortBy: string;
    sortOrder: string;
  };
}

export interface DomainExposureParams {
  domainId: string;
  page?: number;
  limit?: number;
  search?: string;
  exposureType?: 'EMPLOYEE' | 'OTHERS' | 'all';
  sortBy?: 'createdAt' | 'username' | 'url';
  sortOrder?: 'asc' | 'desc';
}

export function useDomainExposure(params: DomainExposureParams) {
  const {
    domainId,
    page = 1,
    limit = 10,
    search = '',
    exposureType = 'all',
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = params;

  return useQuery({
    queryKey: [
      'domainExposure',
      domainId,
      page,
      limit,
      search,
      exposureType,
      sortBy,
      sortOrder,
    ],
    queryFn: async (): Promise<DomainExposureResponse> => {
      if (!domainId) {
        throw new Error('Domain ID is required');
      }

      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      
      if (search) {
        queryParams.append('search', search);
      }
      
      if (exposureType !== 'all') {
        queryParams.append('exposureType', exposureType);
      }
      
      queryParams.append('sortBy', sortBy);
      queryParams.append('sortOrder', sortOrder);

      const response = await API.get<DomainExposureResponse>(
        `/domains/${domainId}/exposure?${queryParams.toString()}`
      );

      return response;
    },
    enabled: !!domainId, // Only run query if domainId is provided
    staleTime: 30000, // Data is fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

export function useDomainExposurePrefetch() {
  // This hook can be used to prefetch domain exposure data
  // when hovering over domain selection or other interactive elements
  return (params: DomainExposureParams) => {
    // Implementation for prefetching if needed
    console.log('Prefetching domain exposure for:', params);
  };
}