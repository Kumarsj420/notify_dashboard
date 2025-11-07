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
  malwareType: string;
  riskLevel: string;
  cookies: number;
  infectionDate: string;
  detectionDate: string;
}

const mockData: ExposureEvent[] = [
  {
    id: '1',
    asset: 'matheley@notify.com',
    malwareIdentifier: 'wtkndkfnskdgnpsogn',
    malwareType: 'redline',
    riskLevel: 'moderate',
    cookies: 4,
    infectionDate: '11 Oct 2022',
    detectionDate: '12 Jan 2025',
  },
  {
    id: '1',
    asset: 'kamaya@notify.com',
    malwareIdentifier: 'sdfsdfdsf',
    malwareType: 'zipper',
    riskLevel: 'high',
    cookies: 4,
    infectionDate: '11 Oct 2022',
    detectionDate: '12 Jan 2025',
  },
  {
    id: '1',
    asset: 'tree@notify.com',
    malwareIdentifier: 'sdfsdfd',
    malwareType: 'zipper',
    riskLevel: 'critical',
    cookies: 4,
    infectionDate: '11 Oct 2022',
    detectionDate: '12 Jan 2025',
  },
  {
    id: '1',
    asset: 'elaonbhai@x.com',
    malwareIdentifier: 'sdfsdfsdfgsdg',
    malwareType: 'redline',
    riskLevel: 'low',
    cookies: 4,
    infectionDate: '11 Oct 2022',
    detectionDate: '12 Jan 2025',
  },
];

const domainTabs: Tab[] = [
  { name: 'Malware infections', count: '52', current: true },
  { name: 'Data breaches', count: '6' },
  { name: 'Combo lists', count: '4' },
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
                  <TableHead sortable>Asset</TableHead>
                  <TableHead sortable>Malware identifier</TableHead>
                  <TableHead sortable>Malware type</TableHead>
                  <TableHead sortable>Risk level</TableHead>
                  <TableHead sortable>cookies</TableHead>
                  <TableHead sortable>Infection date</TableHead>
                  <TableHead sortable>Detection date</TableHead>
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
                      <div className="flex items-center gap-2 text-sc-600/90">
                        {event.malwareType}
                        <button className="text-gray-400 hover:text-gray-600">
                        </button>
                      </div>
                    </TableCell>
      
                    <TableCell>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(
                          event.riskLevel
                        )}`}
                      >
                        {event.riskLevel}
                      </span>

              </TableCell>
      
                    <TableCell className='text-sc-600/90'>{event.cookies }</TableCell>
      
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium`}>
                        {event.infectionDate}
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
