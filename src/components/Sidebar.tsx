'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation';
import SidebarSelector from './SidebarSelector';

import {
  ShieldAlert,
  ChevronDown,
} from 'lucide-react'

import { UserGroupIcon, UsersIcon, ChartPieIcon, ShieldExclamationIcon, DocumentMagnifyingGlassIcon, HomeIcon, ExclamationTriangleIcon, UserIcon, BuildingOfficeIcon, CurrencyDollarIcon, Cog8ToothIcon, QuestionMarkCircleIcon, BookmarkIcon, UserMinusIcon } from '@heroicons/react/24/solid';

const sections = [
  {
    title: null,
    links: [
      { name: 'Dashboard', href: '/', icon: HomeIcon, active: true },
      { name: 'Threats & Incidents', href: '/threats-and-incidents', icon: ExclamationTriangleIcon },
      { name: 'My watchlists', href: '/my-watchlist', icon: BookmarkIcon },
    ],
  },
  {
    title: 'Darkweb Search',
    links: [
      { name: 'Ransomware', href: '/ransomware', icon: ShieldExclamationIcon },
      { name: 'Telegram Search', href: '/telegram-search', icon: DocumentMagnifyingGlassIcon },
    ],
  },
  {
    title: 'Leaked data',
    links: [
      // { name: 'Domain Exposure', href: '/domain-exposore', icon: Globe },

      { name: 'Matrices', href: '/matrices', icon: ChartPieIcon },
      { name: 'Employees', href: '/employees', icon: UserGroupIcon },
      { name: 'Consumers', href: '/consumers', icon: UsersIcon },
    ],
  },
  // {
  //   title: 'Employee Exposure',
  //   links: [
  //     { name: 'Employee Profile', href: '/employee-profile', icon: Users },
  //     { name: 'Add Employee', href: '/add-employee', icon: UserPlus },
  //   ],
  // },
  // {
  //   title: 'User Authentication',
  //   links: [
  //     { name: 'Password Leak Protection', href: '/password-leak-protection', icon: KeyRound },
  //     { name: 'User Role', href: '/user-role', icon: UserCheck },
  //   ],
  // },
  {
    title: 'Accounts',
    links: [
      { name: 'Profile', href: '/profile', icon: UserIcon },
      { name: 'Company Info', href: '/company-info', icon: BuildingOfficeIcon },
      { name: 'User roles', href: '/user-roles', icon: UserMinusIcon },
      { name: 'Subscription', href: '/subscription', icon: CurrencyDollarIcon },
      { name: 'Setting', href: '/setting', icon: Cog8ToothIcon },
      { name: 'Help & Support', href: '/help', icon: QuestionMarkCircleIcon },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.title || 'main', true]))
  )


  useEffect(() => {
    const updatedSections = { ...openSections }
    sections.forEach((section) => {
      const key = section.title || 'main'
      const hasActiveLink = section.links.some((link) =>
        link.href === '/'
          ? pathname === '/'
          : pathname.startsWith(link.href)
      )
      if (hasActiveLink) updatedSections[key] = true
    })
    setOpenSections(updatedSections)
  }, [pathname])

  const toggleSection = (title: string | null) => {
    setOpenSections((prev) => ({
      ...prev,
      [title || 'main']: !prev[title || 'main'],
    }))
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto bg-white lg:pb-4 border-r border-sc-200 px-4 no-scrollbar relative">

      <Link
        href="/"
        className="flex items-center gap-2 border-b border-sc-200 py-2 top-0 left-0 fixed z-10 bg-white w-64 border-r h-16 pl-4"
      >
        <ShieldAlert className="size-8 p-2 rounded-md bg-linear-to-r from-amber-500 to-orange-600 text-white" />
        <span className="text-black font-bold text-lg">NotifyBreach</span>
      </Link>


      <div className="mt-20">


        {sections.map((section, i) => (
          <div key={i} className="mt-5">
            {section.title && (
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between text-left text-sm font-bold mb-1 text-sc-900"
              >
                {section.title}
                <ChevronDown
                  className={`size-4.5 transition-transform duration-200 cursor-pointer text-sc-800 ${
                    openSections[section.title] ? 'rotate-180' : ''
                  }`}
                />
              </button>
            )}

            <AnimatePresence initial={false}>
              {openSections[section.title || 'main'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-0.5"
                >
                  {section.links.map((item: any, j) => {

                    const isActive =
                      item.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href)

                    return (
                      <Link
                        key={j}
                        href={item.href}
                        className={`flex items-center justify-start gap-3 rounded-lg px-2.5 py-2 text-sm/6 transition-colors duration-150 relative ${
                          isActive
                            ? 'bg-linear-to-b from-p-50 to-p-200  text-p-950 font-medium after:absolute after:left-0 after:w-1.5 after:bg-linear-to-b after:from-amber-500 after:to-orange-600 after:h-1/2 after:rounded-sm after:top-1/2 after:-translate-1/2 ring-1 ring-inset ring-p-300/75'
                            : 'text-sc-900 hover:text-sc-800 hover:bg-sc-100 '
                        }`}
                      >
                        <item.icon
                          className={`size-5 transition-colors duration-150 ${
                            isActive ? 'text-p-900' : 'text-sc-500/75'
                          }`}
                        />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}