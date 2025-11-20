import { useQuery } from '@tanstack/react-query';
import API from '../services/api';

export interface Domain {
  id: string;
  domain: string;
  isMain: boolean;
  status: 'PENDING' | 'VERIFIED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
  companiesCount: number;
}

export interface UserDomainsResponse {
  domains: Domain[];
  totalDomains: number;
  mainDomain: Domain | null;
  verifiedDomains: number;
  pendingDomains: number;
}

export function useUserDomains() {
  return useQuery({
    queryKey: ['userDomains'],
    queryFn: async (): Promise<UserDomainsResponse> => {
      const response = await API.get<UserDomainsResponse>('/domains');
      return response;
    },
    staleTime: 60000, // Data is fresh for 1 minute
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}