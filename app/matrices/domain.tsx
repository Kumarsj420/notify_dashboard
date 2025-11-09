"use client";

import React, { useState } from "react";
import Tabs, { Tab } from "../components/Tabs";
import ExposoreSearch from "../components/ExposoreSearch";
import TableSkeleton from "../components/TableSkeleton";

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

interface ExposureEvent {
  id: string;
  domain: number;
  impactedEmployee: number;
  impactedconsumers: number;
  dataBreaches: number;
}

const mockData: ExposureEvent[] = [
  {
    id: "1",
    domain: 10,
    impactedEmployee: 1,
    impactedconsumers: 2,
    dataBreaches: 4,
  },
];

const domainTabs: Tab[] = [
  { name: "Domains", count: "52", current: true },
  { name: "Employee", count: "6", current: false },
];

const Domain: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Domains");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: Tab) => {
    if (tab.name === activeTab) return;

    setIsLoading(true);
    setActiveTab(tab.name);

    setTimeout(() => setIsLoading(false), 600);
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

      <ExposoreSearch />

      {/* Fixed height container to avoid layout jump */}
      <div className="mt-7 min-h-[380px] relative">
        {isLoading && (

<TableSkeleton />

)}


        {!isLoading && activeTab === "Domains" && (
          <TableStructure title="Exposure Event">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable>Domain</TableHead>
                  <TableHead sortable>Impacted employee</TableHead>
                  <TableHead sortable>Impacted consumers</TableHead>
                  <TableHead sortable>Date Breaches</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mockData.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.domain}</TableCell>
                    <TableCell>{event.impactedEmployee}</TableCell>
                    <TableCell>{event.impactedconsumers}</TableCell>
                    <TableCell>{event.dataBreaches}</TableCell>
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

        {!isLoading && activeTab === "Employee" && (
          <TableStructure title="Employee Exposure">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable>Domain</TableHead>
                  <TableHead sortable>Impacted employee</TableHead>
                  <TableHead sortable>Impacted consumers</TableHead>
                  <TableHead sortable>Date Breaches</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mockData.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.domain}</TableCell>
                    <TableCell>{event.impactedEmployee}</TableCell>
                    <TableCell>{event.impactedconsumers}</TableCell>
                    <TableCell>{event.dataBreaches}</TableCell>
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
