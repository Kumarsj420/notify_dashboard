"use client";

import { useState } from "react";

import InlineCard from "../components/InlineCards";
import ExposoreSearch from "../components/ExposoreSearch";

import {
  AlertTriangle,
  TrendingUp,
  Globe,
  CheckCircle,
} from 'lucide-react'

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

  const cardData = [
    {
      upperTitle: "Total Exposures",
      mainTitle: "1,247",
      bottomTitle: "surfing on web",
      icon: <AlertTriangle className="text-red-600 w-5 h-5" />,
      color: "bg-red-100",
    },
    {
      upperTitle: "New This Week",
      mainTitle: "+23",
      bottomTitle: "↑ 12% increase",
      bottomColor: "text-red-500",
      icon: <TrendingUp className="text-orange-500 w-5 h-5" />,
      color: "bg-orange-100",
    },
    {
      upperTitle: "Most Exposed",
      mainTitle: "company.com",
      bottomTitle: "342 exposures",
      icon: <Globe className="text-blue-600 w-5 h-5" />,
      color: "bg-blue-100",
    },
    {
      upperTitle: "Resolved",
      mainTitle: "89.2%",
      bottomTitle: "↑ 5% improvement",
      bottomColor: "text-green-600",
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      color: "bg-green-100",
    },
  ];

interface ExposureEvent {
  id: string;
  source: string;
  username: string;
  password: string;
  type: 'Employee' | 'Other';
  date: string;
  status: 'Resolved' | 'Unresolved';
}

const mockData: ExposureEvent[] = [
  {
    id: '1',
    source: 'breachforum.to',
    username: 'john@company.com',
    password: '•••••••••',
    type: 'Employee',
    date: 'Oct 28, 2024',
    status: 'Unresolved'
  },
  {
    id: '2',
    source: 'pastebin.com',
    username: 'sarah@company.com',
    password: '•••••••••',
    type: 'Employee',
    date: 'Oct 25, 2024',
    status: 'Resolved'
  },
  {
    id: '3',
    source: 'darkweb-forum.onion',
    username: 'admin@company.com',
    password: '•••••••••',
    type: 'Other',
    date: 'Oct 22, 2024',
    status: 'Unresolved'
  },
  {
    id: '4',
    source: 'breachforum.to',
    username: 'john@company.com',
    password: '•••••••••',
    type: 'Employee',
    date: 'Oct 28, 2024',
    status: 'Unresolved'
  },
  {
    id: '5',
    source: 'pastebin.com',
    username: 'sarah@company.com',
    password: '•••••••••',
    type: 'Employee',
    date: 'Oct 25, 2024',
    status: 'Resolved'
  },
  {
    id: '6',
    source: 'darkweb-forum.onion',
    username: 'admin@company.com',
    password: '•••••••••',
    type: 'Other',
    date: 'Oct 22, 2024',
    status: 'Unresolved'
  }
];

export default function Resume() {

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {cardData.map((card, index) => (
                <InlineCard
                  key={index}
                  upperTitle={card.upperTitle}
                  mainTitle={card.mainTitle}
                  bottomTitle={card.bottomTitle}
                  bottomColor={card.bottomColor}
                  icon={card.icon}
                  color={card.color}
                  />
                ))}
              </div>
    </div>


    <ExposoreSearch />

    <TableStructure className="mt-6" title='Exposure Event'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead sortable>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Type</TableHead>
            <TableHead sortable>Date</TableHead>
            <TableHead sortable>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mockData.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <div className="flex items-center gap-2 text-sc-800/90 font-medium">
                  <span className="text-gray-400">🌐</span>
                  {event.source}
                </div>
              </TableCell>

              <TableCell className='text-sc-600/90'>{event.username}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2 text-sc-600/90">
                  {event.password}
                  <button className="text-gray-400 hover:text-gray-600">
                    👁️
                  </button>
                </div>
              </TableCell>

              <TableCell>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.type === 'Employee'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                  }`}>
                  {event.type}
                </span>
              </TableCell>

              <TableCell className='text-sc-600/90'>{event.date}</TableCell>

              <TableCell>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Resolved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  }`}>
                  {event.status}
                </span>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <button className="text-orange-500 hover:text-orange-600">
                    🛡️
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    🔗
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    ⬇️
                  </button>
                </div>
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

    </>
  );
}
