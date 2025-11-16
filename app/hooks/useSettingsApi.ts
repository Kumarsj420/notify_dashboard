import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@/services/api';

// Types
interface UserProfile {
  id: string;
  email: string;
  name: string;
  userType: "USER" | "ADMIN";
  plan: "BASIC" | "PRO" | "ENTERPRISE";
  status: "PENDING" | "ACTIVE" | "REJECTED" | "SUSPENDED" | "DELETED";
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  domains: Domain[];
  companies: Company[];
}

interface Domain {
  id: string;
  domain: string;
  isMain: boolean;
  status: 'PENDING' | 'VERIFIED' | 'FAILED';
  createdAt: string;
}

interface Company {
  id: number;
  vanity: string | null;
  companyId: number | null;
  companyMemberId: number | null;
  companyName: string;
  description: string | null;
  website: string | null;
  domain: string | null;
  linkedin: string | null;
  facebook: string | null;
  twitter: string | null;
  location: string | null;
  industry: string | null;
  founded: number | null;
  revenue: string | null;
  followersCount: number | null;
  employeesCount: number;
  countryCode: string | null;
  logoUrl: string | null;
  companyType: string | null;
  isActive: boolean;
  userId: string;
  domainId: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDomainsResponse {
  user: UserProfile;
  domains: Domain[];
  stats: {
    totalDomains: number;
    verifiedDomains: number;
    pendingDomains: number;
    totalCompanies: number;
    totalEmployees: number;
  };
  mainDomain: Domain | null;
  mainCompany: Company | null;
}

interface AddDomainRequest {
  domain: string;
  isMain?: boolean;
}

export type { UserProfile, Domain, UserDomainsResponse, AddDomainRequest, Company };
const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await API.get<UserProfile>('/user/me');
  return response;
};

const fetchUserDomains = async (): Promise<UserDomainsResponse> => {
  // Get user data with domains and companies
  const user = await API.get<UserProfile>('/user/me');
  
  // Calculate stats
  const totalDomains = user.domains.length;
  const verifiedDomains = user.domains.filter(domain => domain.status === 'VERIFIED').length;
  const pendingDomains = user.domains.filter(domain => domain.status === 'PENDING').length;
  const totalCompanies = user.companies.length;
  const totalEmployees = user.companies.reduce((sum, company) => sum + company.employeesCount, 0);
  
  // Get main domain and company (first one or marked as main)
  const mainDomain = user.domains.find(domain => domain.isMain) || user.domains[0] || null;
  const mainCompany = user.companies[0] || null;
  
  return {
    user,
    domains: user.domains,
    stats: {
      totalDomains,
      verifiedDomains,
      pendingDomains,
      totalCompanies,
      totalEmployees,
    },
    mainDomain,
    mainCompany,
  };
};

const addDomain = async (domainData: AddDomainRequest): Promise<Domain> => {
  const userProfile = await fetchUserProfile();
  
  const response = await API.post<AddDomainRequest, Domain>(
    `/user/${userProfile.id}/domains`,
    domainData
  );

  return response;
};

// Custom hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserDomains = () => {
  return useQuery({
    queryKey: ['userDomains'],
    queryFn: fetchUserDomains,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useAddDomain = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addDomain,
    onSuccess: () => {
      // Invalidate and refetch domains
      queryClient.invalidateQueries({ queryKey: ['userDomains'] });
    },
  });
};

// Hook for managing domain form state
export const useDomainForm = () => {
  const [domain, setDomain] = useState('');
  const [isMain, setIsMain] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateDomain = (domainValue: string) => {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!domainValue.trim()) {
      return 'Domain is required';
    }
    
    if (!domainRegex.test(domainValue.trim())) {
      return 'Please enter a valid domain (e.g., company.com)';
    }
    
    return '';
  };

  const handleDomainChange = (value: string) => {
    setDomain(value);
    const error = validateDomain(value);
    setErrors(prev => ({ ...prev, domain: error }));
  };

  const resetForm = () => {
    setDomain('');
    setIsMain(false);
    setErrors({});
  };

  const isValid = () => {
    const domainError = validateDomain(domain);
    return !domainError && domain.trim().length > 0;
  };

  return {
    domain,
    isMain,
    errors,
    handleDomainChange,
    setIsMain,
    resetForm,
    isValid,
  };
};