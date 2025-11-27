// API Response Types based on the NestJS backend models

// User Types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  userType: 'USER' | 'ADMIN';
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
  status: 'PENDING' | 'ACTIVE' | 'REJECTED' | 'SUSPENDED' | 'DELETED';
  isActive: boolean;
  emailVerified: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  company: string;
  mainDomain: string;
  plan?: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
}

export interface RegisterResponse {
  message: string;
}

// Employee Types
export interface Employee {
  id: string;
  fullName: string;
  liVanity?: string;
  liAvatar?: string;
  numConnections?: number;
  memberId?: number;
  locality?: string;
  headline?: string;
  htmlHeadline?: string;
  htmlShortHeadline?: string;
  industry?: string;
  countryCode?: string;
  influencer?: string;
  contactoutCompany?: string;
  contactoutCompanyId?: number;
  followersCount?: number;
  experience?: unknown;
  education?: unknown;
  skills?: unknown;
  yearStarted?: number;
  revealLogId?: number;
  revealed?: boolean;
  ranking?: string;
  companyDomain?: string;
  currentCompanyExperience?: string;
  hasPersonalEmail?: boolean;
  flaggedEmails?: unknown;
  title?: string;
  workEmail?: string;
  personalEmail?: string;
  phoneNumber?: string;
  companyId: number;
  userId: string;
  isActive: boolean;
  addedByUser?: boolean;
  createdAt: string;
  dbUpdatedAt: string;
  updatedAt?: string;
  company?: Company;
  threatSummary?: ThreatSummary;
  threatProfiles?: ThreatProfile[];
}

export interface ThreatSummary {
  overallThreatLevel: string;
  totalExposures: number;
  profilesCount: number;
  threatCounts: Record<string, number>;
}

export interface ThreatExposure {
  id: string;
  databaseName: string;
  numOfResults: number;
  infoLeak?: string;
  exposureData?: Record<string, unknown>[];
}

export interface EmployeesResponse {
  employees: Employee[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  company?: Company;
}

export interface UpdateEmployeeContactData extends Record<string, unknown> {
  workEmail?: string;
  personalEmail?: string;
  phoneNumber?: string;
}

export interface UpdateContactResponse {
  message: string;
  employee: Employee;
  threatAnalysis?: {
    scheduled: boolean;
    message: string;
  };
}

// Company Types
export interface Company {
  id: string;
  companyName: string;
  name?: string; // Alias for companyName
  industry?: string;
  userDomainId?: string;
  userDomain?: Domain;
  employees?: Employee[];
  createdAt: string;
  updatedAt: string;
}

// Domain Types
export interface Domain {
  id: string;
  domain: string;
  isMain: boolean;
  status: 'PENDING' | 'VERIFIED' | 'FAILED';
  userId: string;
  companies?: Company[];
  createdAt: string;
  updatedAt: string;
}

// Threat Intelligence Types
export interface ThreatProfile {
  id: string;
  employeeId: string;
  employee?: Employee;
  searchValue: string;
  searchType: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  threatLevel: string;
  numOfDatabases?: number;
  numOfResults?: number;
  exposuresCount: number;
  lastScanned: string;
  recentExposures?: ThreatExposure[];
  createdAt: string;
  updatedAt: string;
}

export interface ThreatAnalysisJob {
  id: string;
  employeeId: string;
  searchType: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  results?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ThreatAnalysisJobsResponse {
  jobs: ThreatAnalysisJob[];
  summary?: {
    hasActiveJobs: boolean;
    active: number;
    completed: number;
  };
  jobsByEmployee?: Record<string, ThreatAnalysisJob[]>;
}

// Dashboard Types
export interface DashboardData {
  totalEmployees: number;
  totalDomains: number;
  verifiedDomains: number;
  pendingDomains: number;
  recentBreaches: number;
  threatProfiles: number;
  activeThreatJobs: number;
  completedThreatJobs: number;
}

// API Error Response
export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  domainId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Leak Search Types
export interface LeakSearchRequest {
  searchRequest: string;
}

export interface LeakSearchApiResponse {
  results: Record<string, unknown>[];
  total: number;
  searchTerm: string;
}

// Schedule Threat Analysis Request
export interface ScheduleThreatAnalysisRequest {
  employeeId: string;
  searchType: string;
}