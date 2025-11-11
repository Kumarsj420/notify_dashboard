"use client";

import React, { useState } from "react";
import Tabs, { Tab } from "../components/Tabs";
import TableSkeleton from "../components/TableSkeleton";
import { Siren, Plus } from 'lucide-react';


import { EmployeeExposureData } from "../data/EmployeeExposureData";
const mockData = EmployeeExposureData;


import EmployeeList from "../components/employeeList";
import { employeeData } from "../data/employeeData";


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

  const [tableData, setTableData] = useState(mockData);
const handleStatusToggle = (id: string) => {
  setTableData(prev =>
    prev.map(item =>
      item.id === id
        ? {
            ...item,
            status: item.status === "resolve" ? "resolved" : "resolve",
          }
        : item
    )
  );
};

  return (
    <div>
      <Tabs
        tabs={domainTabs.map((t) => ({
          ...t,
          current: t.name === activeTab,
        }))}
        onTabChange={handleTabChange}
      />



      <div className="mt-7 min-h-[380px] relative">
        {isLoading && <TableSkeleton />}

        {/* TAB 1 */}
        {!isLoading && activeTab === "Identity theft" && (
          <TableStructure className="mt-7" >
            <div className="flex justify-between items-center px-6 py-4">
              <h1 className="text-xl font-bold"> Employees monitoring</h1>

              <div className="flex items-center gap-2">
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition cursor-pointer">
                  <Plus size={16} /> Add employee
                </button>

              <button className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-500 hover:to-red-400 text-white rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition cursor-pointer">
                <Siren size={16} /> Alert all
              </button>
              </div>
            </div>

            <div>
              {employeeData.map((event) => (
        <EmployeeList key={event.id} data={event} />
      ))}
            </div>





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
                  <TableHead sortable>Username</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead sortable>Url</TableHead>
                  <TableHead sortable>Source</TableHead>
                  <TableHead sortable>Risk level</TableHead>
                  <TableHead sortable>Detection date</TableHead>
                  <TableHead sortable>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tableData.map((event) => (
                  <TableRow key={event.id}>
                    

                    <TableCell className="text-sc-600/90 blur-xs">
                      {event.email}
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

                    <TableCell>
                      <button
                        onClick={() => handleStatusToggle(event.id)}
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium cursor-pointer 
                          ${event.status === "resolved" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-200 text-gray-600"}
                        `}
                      >
                        {event.status}
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
