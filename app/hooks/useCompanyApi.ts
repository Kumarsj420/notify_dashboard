import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import type {
  Company,
  ThreatProfile,
  LeakSearchApiResponse,
} from '../types/api';

// Query Keys
export const companyKeys = {
  all: ['companies'] as const,
  lists: () => [...companyKeys.all, 'list'] as const,
  details: () => [...companyKeys.all, 'detail'] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
  threatProfiles: () => [...companyKeys.all, 'threat-profiles'] as const,
  leakSearch: (searchTerm: string) => [...companyKeys.all, 'leak-search', searchTerm] as const,
} as const;

// Get all companies
export const useCompanies = () => {
  return useQuery<Company[]>({
    queryKey: companyKeys.lists(),
    queryFn: () => API.get<Company[]>('/companies'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get specific company
export const useCompany = (companyId: string) => {
  return useQuery<Company>({
    queryKey: companyKeys.detail(companyId),
    queryFn: () => API.get<Company>(`/companies/${companyId}`),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get threat profiles
export const useThreatProfiles = () => {
  return useQuery<ThreatProfile[]>({
    queryKey: companyKeys.threatProfiles(),
    queryFn: () => API.get<ThreatProfile[]>('/threat-profiles'),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Leak search
export const useLeakSearch = (searchRequest: string, enabled = true) => {
  return useQuery<LeakSearchApiResponse>({
    queryKey: companyKeys.leakSearch(searchRequest),
    queryFn: () => 
      API.get<LeakSearchApiResponse>('/tools/leak-search', {
        searchRequest: encodeURIComponent(searchRequest),
      }),
    enabled: !!searchRequest && enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create company
export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Company,
    Error,
    { companyName: string; industry?: string; userDomainId: string }
  >({
    mutationFn: (data) =>
      API.post<{ companyName: string; industry?: string; userDomainId: string }, Company>('/companies', data),
    onSuccess: () => {
      // Invalidate companies list
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    },
  });
};

// Update company
export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Company,
    Error,
    { companyId: string; data: { companyName?: string; industry?: string } }
  >({
    mutationFn: ({ companyId, data }) =>
      API.put<{ companyName?: string; industry?: string }, Company>(`/companies/${companyId}`, data),
    onSuccess: (_, { companyId }) => {
      // Invalidate specific company and companies list
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(companyId) });
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    },
  });
};

// Delete company
export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (companyId) => API.remove<void>(`/companies/${companyId}`),
    onSuccess: () => {
      // Invalidate companies list
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
    },
  });
};