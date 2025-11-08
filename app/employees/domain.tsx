"use client"
import React from 'react'
import { useState } from "react";
import Tabs, { Tab } from '../components/Tabs'
import ExposoreSearch from '../components/ExposoreSearch';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TablePagination,
  TableStructure
} from '../components/Table';
interface ExposureEvent {
  id: string;
  asset: string;
  malwareIdentifier: string;
  riskLevel: string;
  detectionDate: string;
}

const mockData: ExposureEvent[] = [
  {
    id: '1',
    asset: 'matheley@notify.com',
    malwareIdentifier: 'wtkndkfnskdgnpsogn',
    riskLevel: 'moderate',
    detectionDate: '12 Jan 2025',
  },
  {
    id: '1',
    asset: 'kamaya@notify.com',
    malwareIdentifier: 'sdfsdfdsf',
    riskLevel: 'high',
    detectionDate: '12 Jan 2025',
  },
  {
    id: '1',
    asset: 'tree@notify.com',
    malwareIdentifier: 'sdfsdfd',
    riskLevel: 'critical',
    detectionDate: '12 Jan 2025',
  },
  {
    id: '1',
    asset: 'elaonbhai@x.com',
    malwareIdentifier: 'sdfsdfsdfgsdg',
    riskLevel: 'low',
    detectionDate: '12 Jan 2025',
  },
];

const domainTabs: Tab[] = [
  { name: 'Identity theft', count: '6' },
  { name: 'Malware infections', count: '52', current: true },
]
const domain = () => {
    const [currentPage, setCurrentPage] = useState(1);
  
function getRiskLevelColor(level: string) {
  switch (level.toLowerCase()) {
    case 'low':
      return 'bg-green-100 text-green-700'
    case 'midium':
      return 'bg-yellow-100 text-yellow-700'
    case 'high':
      return 'bg-orange-100 text-orange-700'
    case 'critical':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

  return (
    <div>
      <Tabs tabs={domainTabs} />
      <ExposoreSearch />


          <TableStructure className="mt-7" title='Exposure Event'>
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
                        {event.asset}
                      </div>
                    </TableCell>
      
                    <TableCell className='text-sc-600/90'>{event.malwareIdentifier}</TableCell>
      
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
                <span className={`px-3 py-1 rounded-full text-xs font-medium`}>
                    {event.detectionDate}
                </span>
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
    </div>
  )
}

export default domain
