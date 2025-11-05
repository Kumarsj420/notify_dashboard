'use client'

import Header from './components/Header';
import Sidebar from './components/Sidebar';


import { Children, useState } from 'react'

import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'



export default function Example() {


  

  return (
    
    <>

      <div>
        <Sidebar />

        <div className="lg:ml-64 bg-sc-50">
          <Header />

          <main className="h-[95vh] bg-sc-50">
            {children}
          </main>
        </div>


      </div>
    </>
  )
}
