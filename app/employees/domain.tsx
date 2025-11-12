"use client";

import React, { useState } from "react";
import Tabs, { Tab } from "../components/Tabs";
import TableSkeleton from "../components/TableSkeleton";
import { Siren, Plus } from 'lucide-react';

import AlertAllEmployee from "../components/popup/alertAllEmployee";
import AddEmployee from "../components/popup/AddEmployee";

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


const domainTabs: Tab[] = [
  { name: "Identity theft", count: "6" },
  { name: "Malware infections", count: "52" },
];

const Domain: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);


  const [activeTab, setActiveTab] = useState("Identity theft");

  const [isLoading, setIsLoading] = useState(false);


  const handleTabChange = (tab: Tab) => {
    if (tab.name === activeTab) return;
    setIsLoading(true);
    setActiveTab(tab.name);
    setTimeout(() => setIsLoading(false), 600);
  };

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

  const [alertAllOpen, setAlertAllOpen] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);

  return (
    <>
    <AlertAllEmployee open={alertAllOpen} onClose={setAlertAllOpen} />
    <AddEmployee open={addEmployeeOpen} onClose={setAddEmployeeOpen} />

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
            <TableStructure className="" >
              <div className="flex justify-between items-center px-6 pb-5 border-b border-b-sc-200 ">
                <h1 className="text-xl font-bold"> Employees Monitoring</h1>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setAddEmployeeOpen(true)}
                    className="bg-white hover:bg-sc-50 text-sc-500 rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 font-semibold shadow-md shadow-gray-200 transition cursor-pointer popup-trigger ring-1 ring-inset ring-sc-300 hover:ring-sc-400/80" data-popup="addEmployee">
                    <Plus size={16} /> Add employee
                  </button>

                  <button
                    onClick={() => setAlertAllOpen(true)}
                    className="bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <Siren size={16} className="scale-105" /> Alert all
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
    </>
  );
};

export default Domain;
