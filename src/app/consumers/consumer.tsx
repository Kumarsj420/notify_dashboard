"use client"
import Title from "@/components/Title";
import Intro from "@/components/Intro";
import SearchCard from "@/components/SearchCard";
import { useState } from "react";
import { Download, ExternalLink } from 'lucide-react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Badge from "@/components/Badge";

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
} from '@/components/Table';

interface ExposureEvent {
  id: string;
  email: string;
  username: string;
  password: string;
  url: string;
  source: string;
  date: string;
}

const mockData: ExposureEvent[] = [
  {
    id: '1',
    email: 'Kumarsj420@gmail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://soundeffectpro.com',
    source: 'Malware Infection',
    date: 'Oct 28, 2024',
  },
  {
    id: '2',
    email: 'ms123@email.com',
    username: '',
    password: '•••••••••••',
    url: 'https://example.com',
    source: 'Malware Infection',
    date: 'Jan 15, 2025',
  },
  {
    id: '3',
    email: 'john.doe@gmail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://linkedin.com',
    source: 'Malware Infection',
    date: 'Dec 12, 2024',
  },
  {
    id: '4',
    email: 'sneha.dev@outlook.com',
    username: '',
    password: '•••••••••••',
    url: 'https://dropbox.com',
    source: 'Malware Infection',
    date: 'Sep 22, 2024',
  },
  {
    id: '5',
    email: 'alex_ross@icloud.com',
    username: '',
    password: '•••••••••••',
    url: 'https://twitter.com',
    source: 'Malware Infection',
    date: 'Aug 10, 2024',
  },
  {
    id: '6',
    email: 'rahul.sharma@yahoo.in',
    username: '',
    password: '•••••••••••',
    url: 'https://zomato.com',
    source: 'Malware Infection',
    date: 'Jul 18, 2024',
  },
  {
    id: '7',
    email: 'lucy.j@gmail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://github.com',
    source: 'Malware Infection',
    date: 'Jun 02, 2024',
  },
  {
    id: '8',
    email: 'arjun.bose@protonmail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://spotify.com',
    source: 'Malware Infection',
    date: 'May 12, 2024',
  },
  {
    id: '9',
    email: 'nancy_rao@gmail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://amazon.in',
    source: 'Malware Infection',
    date: 'Apr 07, 2024',
  },
  {
    id: '10',
    email: 'devsingh@outlook.com',
    username: '',
    password: '•••••••••••',
    url: 'https://reddit.com',
    source: 'Malware Infection',
    date: 'Mar 14, 2024',
  },
  {
    id: '11',
    email: 'priya.mehta@gmail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://instagram.com',
    source: 'Malware Infection',
    date: 'Feb 20, 2024',
  },
  {
    id: '12',
    email: 'omkarv@company.com',
    username: '',
    password: '•••••••••••',
    url: 'https://figma.com',
    source: 'Malware Infection',
    date: 'Jan 29, 2024',
  },
  {
    id: '13',
    email: 'ashleycooper@gmail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://coursera.org',
    source: 'Malware Infection',
    date: 'Dec 02, 2023',
  },
  {
    id: '14',
    email: 'rahim.khan@company.org',
    username: '',
    password: '•••••••••••',
    url: 'https://slack.com',
    source: 'Malware Infection',
    date: 'Nov 18, 2023',
  },
  {
    id: '15',
    email: 'megha.verma@gmail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://airbnb.com',
    source: 'Malware Infection',
    date: 'Oct 05, 2023',
  },
  {
    id: '16',
    email: 'rohit.dev@icloud.com',
    username: '',
    password: '•••••••••••',
    url: 'https://canva.com',
    source: 'Malware Infection',
    date: 'Sep 12, 2023',
  },
  {
    id: '17',
    email: 'emily.watson@mail.com',
    username: '',
    password: '•••••••••••',
    url: 'https://facebook.com',
    source: 'Malware Infection',
    date: 'Aug 23, 2023',
  },
];


export default function consumer() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <div>
        <Title> Consumer Leaked Data</Title>
        <Intro>This table shows credentials from malware infections. For real-time breach checks, contact your account manager to learn about our knowledge api</Intro>
      </div>

      <SearchCard />


      <TableStructure className="mt-7" >
        <div className="flex justify-between items-center mb-5 px-6">
          <h1 className="text-xl font-bold "> Consumers </h1>
          <button className="bg-sc-900 hover:bg-sc-700 text-white rounded-xl px-3.5 py-2 text-sm flex items-center gap-2 cursor-pointer">
            <Download size={18} /> Export
          </button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead sortable>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Url</TableHead>
              <TableHead sortable>Source</TableHead>
              <TableHead sortable>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mockData.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="flex items-center gap-2 text-sc-900 font-medium">
                    {event.email}
                  </div>
                </TableCell>

                <TableCell className='text-sc-600/90'>{event.username}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-sc-600/90">
                    {event.password}
                    <button className="text-sc-400 hover:text-sc-500 cursor-pointer">
                      <EyeIcon className="size-4" />
                    </button>
                  </div>
                </TableCell>

                <TableCell>
                  <a href={event.url} target="blank" className={` rounded-full text-xs font-medium text-sc-600/90 hover:text-p-500 underline cursor-pointer`}>
                    <ExternalLink size={14} className="inline mr-1.5"/>
                    {event.url}
                  </a>
                </TableCell>

                <TableCell ><Badge variant="error" className="font-medium">{event.source}</Badge></TableCell>

                <TableCell>
                  <span className={` rounded-full text-xs font-medium text-sc-600/90`}>
                    {event.date}
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
    </>
  )
}
