"use client";

import React, { useState } from 'react';
import Title from "@/components/Title";
import Intro from "@/components/Intro";
import SearchCard from "@/components/SearchCard";
import { Download, ExternalLink } from 'lucide-react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Badge from "@/components/Badge";

import {
  TableHeader,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TablePagination,
  TableStructure
} from "@/components/Table";

import { useDomainExposure, type ExposureCredential } from '@/hooks/useDomainExposure';
import { useUserDomains } from '@/hooks/useUserDomains';


export default function ConsumerPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDomainId, setSelectedDomainId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pageSize] = useState(10);
  const [exposureType] = useState<'EMPLOYEE' | 'OTHERS' | 'all'>('all');

  // NEW: password visibility per row
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePassword = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: domainsData, isLoading: domainsLoading } = useUserDomains();

  React.useEffect(() => {
    if (domainsData?.domains?.length && !selectedDomainId) {
      const defaultDomain = domainsData.mainDomain || domainsData.domains[0];
      if (defaultDomain) {
        setSelectedDomainId(defaultDomain.id);
      }
    }
  }, [domainsData, selectedDomainId]);

  const { data: exposureData, isLoading: exposureLoading } = useDomainExposure({
    domainId: selectedDomainId,
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    exposureType,
  });

  const breaches = exposureData?.data || [];
  const pagination = exposureData?.pagination;

  console.log(pagination);

  if (domainsLoading || exposureLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading consumers...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Title>Consumer Leaked Data</Title>
        <Intro>
          This table shows credentials from malware infections.
          For real-time breach checks, contact your account manager to learn about our knowledge API.
        </Intro>
      </div>


      <TableStructure className="mt-7">

        {/* Header w/ Export Button */}
        <div className="flex justify-between items-center mb-5 px-6">
          <h1 className="text-xl font-bold">Consumers</h1>
        </div>

        <Table>
          <TableHeader>
            <TableRow>

              <TableHead >Email/Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>URL</TableHead>
              <TableHead >Source</TableHead>
              <TableHead sortable>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {breaches.map((credential: ExposureCredential) => (
              <TableRow key={credential.id}>

                <TableCell className="text-sc-900">
                  {credential.username || "—"}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-sc-600/90">
                    {visiblePasswords[credential.id]
                      ? credential.password || "—"
                      : "•••••••••••"
                    }

                    <button
                      onClick={() => togglePassword(credential.id)}
                      className="text-sc-400 hover:text-sc-500 cursor-pointer"
                    >
                      {visiblePasswords[credential.id]
                        ? <EyeSlashIcon className="size-4" />
                        : <EyeIcon className="size-4" />
                      }
                    </button>
                  </div>
                </TableCell>

                <TableCell >
                  {credential.url ? (
                    <div className='flex items-center gap-1'>
                      <ExternalLink size={14} className='text-sc-600/80' />
                      <a
                        href={credential.url}
                        target="_blank"
                        className="rounded-full text-xs font-medium text-sc-600/90 hover:text-p-500 underline cursor-pointer block w-[30ch] truncate px-0.5"
                      >
                        {credential.url}
                      </a>
                    </div>
                  ) : "—"}
                </TableCell>

                <TableCell>
                  <Badge variant="error" size='auto' className="font-medium text-xs w-max px-3.5 py-1.5">
                    Malware Infection
                  </Badge>
                </TableCell>

                <TableCell className="text-xs font-medium text-sc-600/90">
                  {credential.date || "01 Jan 2021"}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

{
  pagination && (
          <TableFooter>
            <tr>
              <td colSpan={7}>
                <TablePagination
                  currentPage={currentPage}
                  totalPages={pagination?.totalPages || 1}
                  totalResults={pagination?.totalRecords }
                  onPageChange={setCurrentPage}
                  resLength={10}
                />
              </td>
            </tr>
          </TableFooter>
  )
}

        </Table>
      </TableStructure>
    </>
  );
}
