"use client";

import React from "react";
import Layout from "./components/Layout";
import {
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import type { DashboardOverviewResponse } from "./hooks/useDashboardApi";
import type { User } from "./lib/auth";

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

  return (
    <Layout>
      <div className="space-y-8 px-5 my-5">
         dashboard open
      </div>
    </Layout>
  );
};

export default DashboardClient;