'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export interface UserData {
  id: string;
  email: string;
  name: string;
  userType: 'USER' | 'ADMIN';
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
  status: 'PENDING' | 'ACTIVE' | 'REJECTED' | 'SUSPENDED' | 'DELETED';
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  domains: Array<{
    id: string;
    domain: string;
    isMain: boolean;
    status: 'PENDING' | 'VERIFIED' | 'FAILED';
    createdAt: Date;
  }>;
  companies: Array<{
    id: number;
    companyName: string;
    industry: string | null;
    website: string | null;
    description: string | null;
    createdAt: Date;
    userDomain: {
      id: string;
      domain: string;
      isMain: boolean;
      status: 'PENDING' | 'VERIFIED' | 'FAILED';
    };
  }>;
  mainDomain?: {
    id: string;
    domain: string;
    isMain: boolean;
    status: 'PENDING' | 'VERIFIED' | 'FAILED';
    createdAt: Date;
  };
  mainCompany?: {
    id: number;
    companyName: string;
    industry: string | null;
    website: string | null;
    description: string | null;
    createdAt: Date;
    userDomain: {
      id: string;
      domain: string;
      isMain: boolean;
      status: 'PENDING' | 'VERIFIED' | 'FAILED';
    };
  };
}

async function getCurrentUser(token: string): Promise<UserData> {
  const response = await fetch('/api/user/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
}

export function useCurrentUser() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ['currentUser', session?.token],
    queryFn: () => getCurrentUser(session?.token as string),
    enabled: status === 'authenticated' && !!session?.token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

// Alternative hook that returns the session user data directly (lighter)
export function useSessionUser() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}