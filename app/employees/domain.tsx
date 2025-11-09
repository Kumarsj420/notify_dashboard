"use client";

import React, { useState } from "react";
import Tabs, { Tab } from "../components/Tabs";
import TableSkeleton from "../components/TableSkeleton";
import SearchCard from "../components/SearchCard";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TablePagination,
  TableStructure,
} from "../components/Table";

// ---------------- Mock Data ----------------
interface ExposureEvent {
  id: string;
  email: string;
  user: string;
  password: string;
  url: string;
  source: string;
  riskLevel: string;
  detectionDate: string;
  action: string;
}

const mockData: ExposureEvent[] = [
  {
    id: "1",
    email: "matheley@notify.com",
    user: "user",
    password: "password",
    url: "url",
    source: "source",
    riskLevel: "high",
    detectionDate: "12 jan 2023",
    action: "actions",
  },
  {
    id: "1",
    email: "matheley@notify.com",
    user: "user",
    password: "password",
    url: "url",
    source: "source",
    riskLevel: "high",
    detectionDate: "12 jan 2023",
    action: "actions",
  },
  {
    id: "1",
    email: "matheley@notify.com",
    user: "user",
    password: "password",
    url: "url",
    source: "source",
    riskLevel: "high",
    detectionDate: "12 jan 2023",
    action: "actions",
  },
  {
    id: "1",
    email: "matheley@notify.com",
    user: "user",
    password: "password",
    url: "url",
    source: "source",
    riskLevel: "high",
    detectionDate: "12 jan 2023",
    action: "actions",
  },
];

// ---------------- Tabs ----------------
const domainTabs: Tab[] = [
  { name: "Identity theft", count: "6" },
  { name: "Malware infections", count: "52" },
];

const Domain: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Correct default = first tab
  const [activeTab, setActiveTab] = useState("Identity theft");

  const [isLoading, setIsLoading] = useState(false);

  // ---------------- Tab Change Handler ----------------
  const handleTabChange = (tab: Tab) => {
    if (tab.name === activeTab) return;

    setIsLoading(true);
    setActiveTab(tab.name);

    setTimeout(() => setIsLoading(false), 600);
  };

  // ---------------- Risk Level Color ----------------
  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-700";
      case "midium":
        return "bg-yellow-100 text-yellow-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      {/* Tabs */}
      <Tabs
        tabs={domainTabs.map((t) => ({
          ...t,
          current: t.name === activeTab,
        }))}
        onTabChange={handleTabChange}
      />

      <SearchCard />

      {/* Maintain Stable Height */}
      <div className="mt-7 min-h-[380px] relative">
        {isLoading && <TableSkeleton />}

        {/* TAB 1 */}
        {!isLoading && activeTab === "Identity theft" && (
          <TableStructure className="mt-7" >
             <h1 className="text-xl font-bold mb-5 px-6"> Employees </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable>Email</TableHead>
                  <TableHead sortable>Username identifier</TableHead>
                  <TableHead sortable>Password</TableHead>
                  <TableHead sortable>Url</TableHead>
                  <TableHead sortable>Source</TableHead>
                  <TableHead sortable>Risk level</TableHead>
                  <TableHead sortable>Detection date</TableHead>
                  <TableHead sortable>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mockData.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sc-800/90 font-medium">
                        {event.email}
                      </div>
                    </TableCell>

                    <TableCell className="text-sc-600/90">{event.user}</TableCell>
                    <TableCell className="text-sc-600/90">{event.password}</TableCell>
                    <TableCell className="text-sc-600/90">
                      <a href={event.url} target="_blank">
                        {event.url}
                      </a>
                    </TableCell>
                    <TableCell className="text-sc-600/90">{event.source}</TableCell>

                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(
                          event.riskLevel
                        )}`}
                      >
                        {event.riskLevel}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="px-3 py-1 rounded-full text-xs font-medium">
                        {event.detectionDate}
                      </span>
                    </TableCell>

                    <TableCell className="text-sc-600/90">
                      <button className="bg-sc-300 text-sc-700 px-2 py-1 rounded-md text-xs cursor-pointer">
                        Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <tr>
                  <td colSpan={7}>
                    <TablePagination
                      currentPage={currentPage}
                      totalPages={42}
                      totalResults={1247}
                      onPageChange={setCurrentPage}
                    />
                  </td>
                </tr>
              </TableFooter>
            </Table>
          </TableStructure>
        )}

        {/* TAB 2 */}
        {!isLoading && activeTab === "Malware infections" && (
          <TableStructure className="mt-7">
             <h1 className="text-xl font-bold mb-5 px-6"> Malware Infection </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable>Email</TableHead>
                  <TableHead sortable>Username identifier</TableHead>
                  <TableHead sortable>Password</TableHead>
                  <TableHead sortable>Url</TableHead>
                  <TableHead sortable>Source</TableHead>
                  <TableHead sortable>Risk level</TableHead>
                  <TableHead sortable>Detection date</TableHead>
                  <TableHead sortable>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mockData.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sc-800/90 font-medium">
                        {event.email}
                      </div>
                    </TableCell>

                    <TableCell className="text-sc-600/90">{event.user}</TableCell>
                    <TableCell className="text-sc-600/90">{event.password}</TableCell>
                    <TableCell className="text-sc-600/90">
                      <a href={event.url} target="_blank">
                        {event.url}
                      </a>
                    </TableCell>
                    <TableCell className="text-sc-600/90">{event.source}</TableCell>

                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(
                          event.riskLevel
                        )}`}
                      >
                        {event.riskLevel}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="px-3 py-1 rounded-full text-xs font-medium">
                        {event.detectionDate}
                      </span>
                    </TableCell>

                    <TableCell className="text-sc-600/90">
                      <button className="bg-sc-300 text-sc-700 px-2 py-1 rounded-md text-xs cursor-pointer">
                        Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <tr>
                  <td colSpan={7}>
                    <TablePagination
                      currentPage={currentPage}
                      totalPages={42}
                      totalResults={1247}
                      onPageChange={setCurrentPage}
                    />
                  </td>
                </tr>
              </TableFooter>
            </Table>
          </TableStructure>
        )}
      </div>
    </div>
  );
};

export default Domain;
