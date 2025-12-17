"use client";

import React from "react";
import Layout from "@/components/Layout";
import {
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import type { DashboardOverviewResponse } from "@/hooks/useDashboardApi";
import type { User } from "@/lib/auth";
import Card from "@/components/Card";
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
  // const stats = initialData.stats;
  // const recentThreats = initialData.recentThreats;
  // const company = initialData.company;

  // // Prepare threat level data for pie chart
  // const threatLevelData = [
  //   { name: "None", value: stats.threatProfilesByLevel.NONE, color: "#10B981" },
  //   { name: "Low", value: stats.threatProfilesByLevel.LOW, color: "#F59E0B" },
  //   {
  //     name: "Medium",
  //     value: stats.threatProfilesByLevel.MEDIUM,
  //     color: "#EF4444",
  //   },
  //   { name: "High", value: stats.threatProfilesByLevel.HIGH, color: "#DC2626" },
  //   {
  //     name: "Critical",
  //     value: stats.threatProfilesByLevel.CRITICAL,
  //     color: "#7F1D1D",
  //   },
  // ].filter((item) => item.value > 0);

  // const getThreatLevelColor = (level: string) => {
  //   switch (level) {
  //     case "CRITICAL":
  //       return "text-red-800 bg-red-100";
  //     case "HIGH":
  //       return "text-red-700 bg-red-50";
  //     case "MEDIUM":
  //       return "text-yellow-700 bg-yellow-50";
  //     case "LOW":
  //       return "text-blue-700 bg-blue-50";
  //     default:
  //       return "text-gray-700 bg-gray-50";
  //   }
  // };


  const recentThreats = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Marketing Manager",
    severity: "CRITICAL",
    count: 3,
    lastScanned: "2 hours ago",
  },
  {
    name: "Mike Chen",
    email: "mike.chen@company.com",
    role: "Software Engineer",
    severity: "MEDIUM",
    count: 1,
    lastScanned: "5 hours ago",
  },
];

const getSeverityBadge = (level: string) => {
  switch (level) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    case "HIGH":
      return "bg-orange-100 text-orange-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    case "LOW":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
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


// 🚧 TEMPORARY: Disable dashboard UI
// return (
//   <Layout>
//     <ComingSoon
//       title="Dashboard Coming Soon"
//       description="We’re currently building this dashboard. Analytics and threat insights will be available shortly."
//     />
//   </Layout>
// );

  return (
    <Layout>
      <div className="space-y-8">

  {/* Company Info */}
  <Card className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
        🏢
      </div>
      <div>
        <h2 className="text-xl font-semibold">TechCorp Solutions</h2>
        <p className="text-sm text-gray-500">Financial Technology</p>
        <div className="flex gap-2 mt-2">
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            Active
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
            Pro Plan
          </span>
        </div>
      </div>
    </div>

    <div className="flex gap-3">
      <button className="px-4 py-2 text-sm rounded-lg border border-orange-500 text-orange-600">
        Upgrade Plan
      </button>
      <button className="px-4 py-2 text-sm rounded-lg bg-orange-500 text-white">
        Edit Company Info
      </button>
    </div>
  </Card>

  {/* Security Dashboard Stats */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {[
      { title: "Total Employees", value: "1,247", sub: "+12% from last month", color: "green" },
      { title: "Active Alerts", value: "23", sub: "8 critical", color: "red" },
      { title: "Monitored Domains", value: "15", sub: "All verified", color: "green" },
      { title: "Threat Profiles", value: "89", sub: "12 pending review", color: "yellow" },
    ].map((item, i) => (
      <Card key={i} className="">
        <p className="text-sm text-gray-500">{item.title}</p>
        <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
        <p className={`text-sm mt-1 text-${item.color}-600`}>
          {item.sub}
        </p>
      </Card>
    ))}
  </div>

  {/* Analytics */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BaseLineChart
          title="Breach Trends (Last 6 Months)"
          data={breachData}
          xKey="month"
          yKey="breaches"
        />

        <BasePieChart
          title="Risk Distribution"
          data={riskData}
        />
  </div>

  {/* Bottom Cards */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <Card>
      <h3 className="font-semibold mb-4">Recent Alerts</h3>
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-red-50">
          <p className="text-sm font-medium">High Risk Breach</p>
          <span className="text-xs text-red-600">Critical</span>
        </div>
        <div className="p-3 rounded-lg bg-yellow-50">
          <p className="text-sm font-medium">Data Exposure</p>
          <span className="text-xs text-yellow-600">Medium</span>
        </div>
      </div>
    </Card>

    <Card>
      <h3 className="font-semibold mb-4">Third-party Exposure</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span>Vendor Breaches</span>
          <span className="font-medium">23</span>
        </li>
        <li className="flex justify-between">
          <span>Partner Risks</span>
          <span className="font-medium">7</span>
        </li>
        <li className="flex justify-between">
          <span>Supply Chain</span>
          <span className="font-medium">12</span>
        </li>
      </ul>
    </Card>

    <Card>
      <h3 className="font-semibold mb-2">Security Score</h3>
      <p className="text-4xl font-bold text-green-600">87</p>
      <p className="text-sm text-gray-500">Good Security Posture</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div className="bg-green-500 h-2 rounded-full w-[87%]" />
      </div>
    </Card>
  </div>


<TableStructure>
  <h3 className="px-6 pb-4 text-lg font-semibold text-sc-900">
    Recent Threats
  </h3>

  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Severity</TableHead>
        <TableHead>Count</TableHead>
        <TableHead>Last Scanned</TableHead>
        <TableHead>Other</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {recentThreats.map((item, index) => (
        <TableRow key={index} className="hover:bg-sc-100/70">
          <TableCell>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">{item.email}</p>
            </div>
          </TableCell>

          <TableCell>{item.role}</TableCell>

          <TableCell>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getSeverityBadge(item.severity)}`}
            >
              {item.severity}
            </span>
          </TableCell>

          <TableCell className="text-center">
            {item.count}
          </TableCell>

          <TableCell>{item.lastScanned}</TableCell>

          <TableCell className="text-right">
            <button className="text-orange-600 font-medium hover:underline">
              View Details
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableStructure>


</div>

    </Layout>
  );
};

export default DashboardClient;