"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import type { DashboardOverviewResponse } from "@/hooks/useDashboardApi";
import type { User } from "@/lib/auth";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import {
  TableStructure,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/Table";
import BasePieChart from "@/components/charts/BasePieChart";
import BaseLineChart from "@/components/charts/BaseLineChart";
import ComingSoon from "@/components/ComingSoon";
import Button from "@/components/Button";
import {
  UsersIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';
import Image from "next/image";
import InfoCard from '@/components/InfoCard';
import Link from "next/link";
import { success } from "zod";

interface DashboardClientProps {
  initialData?: DashboardOverviewResponse;
  error?: string;
  user: User;
}

const DashboardClient: React.FC<DashboardClientProps> = ({
  initialData,
  error,
  user,
}) => {

  const [imageError, setImageError] = useState(false);

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Failed to load dashboard
          </h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
        </div>
      </Layout>
    );
  }

  if (!initialData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </Layout>
    );
  }

  // Use the actual API response data
  const stats = initialData.stats;
  const recentThreats = initialData.recentThreats;
  const company = initialData.company;
  console.log(stats);
  console.log(recentThreats);

  // Prepare threat level data for pie chart
  const threatLevelData = [
    { name: "None", value: stats.threatProfilesByLevel.NONE, color: "#00C951" },
    { name: "Low", value: stats.threatProfilesByLevel.LOW, color: "#00BD7D" },
    {
      name: "Medium",
      value: stats.threatProfilesByLevel.MEDIUM,
      color: "#00A6F4",
    },
    { name: "High", value: stats.threatProfilesByLevel.HIGH, color: "#FE9900" },
    {
      name: "Critical",
      value: stats.threatProfilesByLevel.CRITICAL,
      color: "#FB2B37",
    },
  ].filter((item) => item.value > 0);

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "text-red-800 bg-red-100";
      case "HIGH":
        return "text-red-700 bg-red-50";
      case "MEDIUM":
        return "text-yellow-700 bg-yellow-50";
      case "LOW":
        return "text-blue-700 bg-blue-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };


  //   const recentThreats = [
  //   {
  //     name: "Sarah Johnson",
  //     email: "sarah.johnson@company.com",
  //     role: "Marketing Manager",
  //     severity: "CRITICAL",
  //     count: 3,
  //     lastScanned: "2 hours ago",
  //   },
  //   {
  //     name: "Mike Chen",
  //     email: "mike.chen@company.com",
  //     role: "Software Engineer",
  //     severity: "MEDIUM",
  //     count: 1,
  //     lastScanned: "5 hours ago",
  //   },
  // ];

  type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | string;

  const getSeverityVariant = (level: Severity): 'error' | 'warning' | 'info' | 'secondary' | 'success' => {
    switch (level) {
      case 'CRITICAL':
        return 'error';
      case 'HIGH':
        return 'warning';
      case 'MEDIUM':
        return 'info';
      case 'LOW':
        return 'success';
      default:
        return 'secondary';
    }
  };


  const riskData = [
    { name: "Critical", value: 5 },
    { name: "High", value: 15 },
    { name: "Medium", value: 55 },
    { name: "Low", value: 25 },
  ];

  const breachData = [
    { month: "May", breaches: 23 },
    { month: "Jun", breaches: 31 },
    { month: "Jul", breaches: 28 },
    { month: "Aug", breaches: 45 },
    { month: "Sep", breaches: 52 },
    { month: "Oct", breaches: 39 },
  ];


  interface ThreatProfilesByLevel {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
    NONE: number;
  }

  interface SecurityScoreResult {
    score: number;
    rating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
    status: string;
    color: string;
    description: string;
  }

  function calculateSecurityScore(
    threatProfilesByLevel: ThreatProfilesByLevel
  ): SecurityScoreResult {
    const { CRITICAL, HIGH, MEDIUM, LOW, NONE } = threatProfilesByLevel;

    // Total number of assessed items/systems
    const total = CRITICAL + HIGH + MEDIUM + LOW + NONE;

    // If no data, return neutral score
    if (total === 0) {
      return {
        score: 100,
        rating: 'Excellent',
        status: 'No threats detected',
        color: '#10B981',
        description: 'No systems assessed or all systems are secure.'
      };
    }

    // Weight factors (how much each threat level impacts security)
    // Higher weight = worse for security score
    const weights = {
      CRITICAL: 100,  // Each critical threat heavily impacts score
      HIGH: 50,       // High threats are serious
      MEDIUM: 20,     // Medium threats are concerning
      LOW: 5,         // Low threats have minimal impact
      NONE: 0         // No threat = perfect
    };

    // Calculate weighted threat score (lower is better)
    const threatScore =
      (CRITICAL * weights.CRITICAL) +
      (HIGH * weights.HIGH) +
      (MEDIUM * weights.MEDIUM) +
      (LOW * weights.LOW) +
      (NONE * weights.NONE);

    // Calculate maximum possible threat score (if all were critical)
    const maxThreatScore = total * weights.CRITICAL;

    // Convert to security score (0-100, where 100 is best)
    // Formula: 100 - (actual_threat / max_threat * 100)
    const rawScore = 100 - (threatScore / maxThreatScore * 100);

    // Ensure score is between 0 and 100
    const score = Math.max(0, Math.min(100, Math.round(rawScore)));

    // Determine rating based on score
    return getScoreRating(score);
  }

  function getScoreRating(score: number): SecurityScoreResult {
    if (score >= 90) {
      return {
        score,
        rating: 'Excellent',
        status: 'Secure',
        color: '#10B981',
        description: 'Excellent security posture with minimal to no critical vulnerabilities.'
      };
    } else if (score >= 75) {
      return {
        score,
        rating: 'Good',
        status: 'Low Risk',
        color: '#22C55E',
        description: 'Good security posture with manageable vulnerabilities.'
      };
    } else if (score >= 60) {
      return {
        score,
        rating: 'Fair',
        status: 'Medium Risk',
        color: '#F59E0B',
        description: 'Moderate security risks that require attention and remediation.'
      };
    } else if (score >= 40) {
      return {
        score,
        rating: 'Poor',
        status: 'High Risk',
        color: '#F97316',
        description: 'Significant security vulnerabilities requiring urgent remediation.'
      };
    } else {
      return {
        score,
        rating: 'Critical',
        status: 'Critical Risk',
        color: '#EF4444',
        description: 'Critical security risks detected. Immediate action required.'
      };
    }
  }

  // Usage with your data
  const { score, rating, color, description } = calculateSecurityScore(stats.threatProfilesByLevel);


  return (
    <Layout>
      <div className="space-y-8">

        <Card className="flex items-center justify-between">
          {
            company?.domain && (
              <div className="flex items-center gap-4">

                {
                  imageError ? (
                    <Badge className="size-16 rounded-xl!" variant="secondary" size="auto">
                      <BuildingOfficeIcon className="size-10 text-sc-500/80" />
                    </Badge>
                  ) : (
                    <Image
                      src={`https://logo.clearbit.com/${company.domain}`}
                      alt={`${company.companyName} logo`}
                      width={64}
                      height={64}
                      onError={() => setImageError(true)}
                    />
                  )
                }

                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{company
                    ? `${company.companyName} - Security Overview`
                    : "Security Dashboard"}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="info">
                      {user.plan} PLAN
                    </Badge>
                    <Badge variant={user.status === "ACTIVE" ? 'success' : user.status === "PENDING" ? 'secondary' : 'error'}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          }


          <div className="flex gap-3">
            <Link href='/subscription'>
              <Button variant="outline">
                Upgrade Plan
              </Button>
            </Link>
            <Link href='/company-info'>
              <Button>
                Company Info
              </Button>
            </Link>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <InfoCard
            title='Total Employees'
            value={stats.totalEmployees.toLocaleString()}
            icon={<UsersIcon className="size-6" />}
            iconVariant='success'
            message="Add more for better results"
            messageVariant="info"
          />

          <InfoCard
            title='Active Employees'
            value={stats.activeEmployees.toLocaleString()}
            icon={< InformationCircleIcon className="size-6" />}
            iconVariant='info'
          />

          <InfoCard
            title='Threat Profiles'
            value={stats.totalThreatProfiles.toLocaleString()}
            icon={<UsersIcon className="size-6" />}
            iconVariant='error'
            message="Check employee data"
            messageVariant="warning"
          />

          <InfoCard
            title='Contact Info'
            value={(
              stats.employeesWithEmail + stats.employeesWithPhone
            ).toLocaleString()}
            icon={<GlobeAltIcon className="size-6" />}
            iconVariant='warning'
          />

        </div>


        {/* Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <BaseLineChart />
          {
            threatLevelData.length > 0 ? (
              <BasePieChart
                title="Risk Distribution"
                data={threatLevelData}
                colors={threatLevelData.map(item => item.color)}
              />
            ) : (
              <div className="text-center py-12">
                <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  No threat data available
                </p>
              </div>
            )
          }

        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold mb-4">Threat Profiles By Level</h3>
            <div className="space-y-3">
              {
                stats.threatProfilesByLevel && (
                  <div className="p-3 rounded-lg bg-red-50">
                    <p className="text-sm font-medium">Threats Required Imidiate Actions</p>
                    <span className="text-xs text-red-600 font-semibold">{stats.threatProfilesByLevel.CRITICAL + stats.threatProfilesByLevel.HIGH}</span>
                  </div>
                )
              }

              <div className="p-3 rounded-lg bg-emerald-50">
                <p className="text-sm font-medium">Acceptable Threats Count</p>
                <span className="text-xs text-emerald-600 font-semibold">{stats.threatProfilesByLevel.LOW + stats.threatProfilesByLevel.MEDIUM}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4">More Stats</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Employees With Emails</span>
                <span className="font-medium">{stats.employeesWithEmail}</span>
              </li>
              <li className="flex justify-between">
                <span>Employees With Phone</span>
                <span className="font-medium">{stats.employeesWithPhone}</span>
              </li>
              <li className="flex justify-between">
                <span>Completed Threat Profiles</span>
                <span className="font-medium">{stats.threatProfilesByStatus.COMPLETED}</span>
              </li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold mb-2">Security Score</h3>
            <p className={`text-4xl font-bold ${(rating === 'Excellent' || rating === 'Good') ? 'text-emerald-500' : rating === 'Fair' ? 'text-sky-500' : rating === 'Poor' ? 'text-amber-500' : 'text-red-500'}`}>{score}</p>
            <span className="text-sm font-semibold text-sc-900">{rating}</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className={`${(rating === 'Excellent' || rating === 'Good') ? 'bg-emerald-500' : rating === 'Fair' ? 'bg-sky-500' : rating === 'Poor' ? 'bg-amber-500' : 'bg-red-500'} h-2 rounded-full `} style={{ width: score + '%' }} />
            </div>
            <p className="text-sm text-gray-500 mt-4">{description}</p>
          </Card>
        </div>


        <TableStructure>
          <div className="flex justify-between items-center px-6 pb-4">
            <h3 className=" text-lg font-semibold text-sc-900">
              Recent Threats
            </h3>
            <Link href='/threats-and-incidents'>
              <Button variant="outline">Check In Detail</Button>
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Results</TableHead>
                <TableHead>Databases</TableHead>
                <TableHead>Last Scanned</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentThreats.map((item, index) => (
                <TableRow key={index} className="hover:bg-sc-100/70">
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.employeeName}</p>
                      <p className="text-xs text-gray-500">{item.searchValue}</p>
                    </div>
                  </TableCell>

                  <TableCell>{item.employeeTitle}</TableCell>

                  <TableCell>
                    <Badge
                      variant={getSeverityVariant(item.threatLevel)}
                      size="sm"
                    >
                      {item.threatLevel}
                    </Badge>

                  </TableCell>

                  <TableCell className="text-center">
                    {item.numOfResults}
                  </TableCell>

                  <TableCell className="text-center">
                    {item.numOfDatabases}
                  </TableCell>

                  <TableCell>{new Date(item.lastScanned).toLocaleDateString()}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableStructure>


      </div>

    </Layout >
  );
};

export default DashboardClient;