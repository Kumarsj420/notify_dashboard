"use client";

import React, { useState } from "react";
import Tabs, { Tab } from "@/components/Tabs";
import TableSkeleton from "@/components/TableSkeleton";
import Title from "@/components/Title";
import Intro from "@/components/Intro";

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
} from "@/components/Table";

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
      <div >
        <Title>Matrices</Title>
        <Intro>
          Matrices data for Domain, Impacted Employee, Impacted Consumers and Data Breaches
        </Intro>
      </div>

      <div className="mt-5 min-h-[380px] relative">
        {isLoading && (
          <TableSkeleton />
        )}

        {!isLoading && activeTab === "Domains" && (
          <TableStructure>
            <h1 className="text-xl font-bold mb-5 px-6"> Domains </h1>
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

            </Table>
          </TableStructure>
        )}

      </div>
    </div>
  );
};

export default Domain;
