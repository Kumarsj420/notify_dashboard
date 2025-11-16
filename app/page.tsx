import React from 'react';
import { auth } from './lib/auth';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';
// import { env } from '@/config/env';
import type { DashboardOverviewResponse } from './hooks/useDashboardApi';
import API from './services/api';

// Server-side dashboard data fetch
async function getDashboardData(): Promise<DashboardOverviewResponse> {
  const session = await auth();
  
  if (!session?.token) {
    throw new Error('No authentication token');
  }

  // const API_URL = env.NEXT_PUBLIC_API_PRIMARY || env.NEXT_PUBLIC_API;
  
  try {
    const response = await API.get<DashboardOverviewResponse>(`/dashboard/overview`);

    // if (!response.ok) {
    //   if (response.status === 401) {
    //     redirect('/login');
    //   }
    //   throw new Error(`Failed to fetch dashboard data: ${response.status}`);
    // }

    return response;
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    throw error;
  }
}

export default async function DashboardPage() {
  const session = await auth();
  
  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/login');
  }

  try {
    // Fetch dashboard data server-side
    const dashboardData = await getDashboardData();
    return (
      <DashboardClient 
        initialData={dashboardData}
        user={session.user}
      />
    );
  } catch (error) {
    // Handle errors by showing error state
    return (
      <DashboardClient 
        error={error instanceof Error ? error.message : 'Failed to load dashboard'}
        user={session.user}
      />
    );
  }
}
