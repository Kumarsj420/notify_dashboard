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
  domain: number;
  impactedEmployee: number;
  impactedconsumers: number;
  malwareInfections: number;
  dataBreaches: number;
  comboLists: number;
  detectionDate: string;
}

const mockData: ExposureEvent[] = [
  {
    id: '1',
    domain: 10,
    impactedEmployee: 1,
    impactedconsumers: 2,
    malwareInfections: 3,
    dataBreaches: 4,
    comboLists: 5,
    detectionDate: '12 Jan 2025',
  },


];

const domainTabs: Tab[] = [
  { name: 'Domains', count: '52', current: true },
  { name: 'Emails', count: '6' },
  { name: 'Phone number', count: '4' },
]
const domain = () => {
    const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <div>
      <Tabs tabs={domainTabs} />
      <ExposoreSearch />


          <TableStructure className="mt-7" title='Exposure Event'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable>Domain</TableHead>
                  <TableHead sortable>Impacted employee</TableHead>
                  <TableHead sortable>Impacted consumers</TableHead>
                  <TableHead sortable>Malware infections</TableHead>
                  <TableHead sortable>Date Breaches</TableHead>
                  <TableHead sortable>Combo Lists</TableHead>
                  <TableHead sortable>Detection date</TableHead>
                </TableRow>
              </TableHeader>
      
              <TableBody>
                {mockData.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sc-800/90 font-medium">
                        {event.domain}
                      </div>
                    </TableCell>
      
                    <TableCell className='text-sc-600/90'>{event.impactedEmployee}</TableCell>
      
                    <TableCell>
                      <div className="flex items-center gap-2 text-sc-600/90">
                        {event.impactedconsumers}
                        <button className="text-gray-400 hover:text-gray-600">
                        </button>
                      </div>
                    </TableCell>
      
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium`}>
                        {event.malwareInfections}
                      </span>
                    </TableCell>
      
                    <TableCell className='text-sc-600/90'>{event.dataBreaches }</TableCell>
      
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium`}>
                        {event.comboLists}
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
