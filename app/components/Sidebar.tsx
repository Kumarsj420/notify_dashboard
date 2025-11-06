'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation';
import SidebarSelector from './SidebarSelector';


import {
  Shield,
  ShieldAlert,
  CirclePlus,
  FileChartColumn,
  Users,
  UserPlus,
  KeyRound,
  UserCheck,
  SquareUser,
  Globe,
  Building2,
  Gem,
  Settings,
  MessageCircleQuestion,
  LayoutDashboard,
  VenetianMask,
  Group,
  ChevronDown,
} from 'lucide-react'

const sections = [
  {
    title: null,
    links: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard, active: true },
      { name: 'Threats & Incidents', href: '/threats-and-incidents', icon: ShieldAlert },
    ],
  },
  // {
  //   title: 'Ransomware',
  //   links: [
  //     { name: 'Victims', href: '/victims', icon: VenetianMask },
  //     { name: 'Groups', href: '/groups', icon: Group },
  //   ],
  // },
  {
    title: 'Domain',
    links: [
      { name: 'Domain Exposure', href: '/domain-exposore', icon: Globe },
      { name: 'Add Domain', href: '/add-domain', icon: CirclePlus },
      { name: 'Domain Status', href: '/domain-status', icon: FileChartColumn },
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
      { name: 'Profile', href: '/', icon: SquareUser },
      { name: 'Company Info', href: '/', icon: Building2 },
      { name: 'Subscriptions', href: '/', icon: Gem },
      { name: 'Settings', href: '/', icon: Settings },
      { name: 'Help & Support', href: '/', icon: MessageCircleQuestion },
    ],
  },
]

export default function Sidebar() {
  // Each section open by default
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.title || 'main', true]))
  )

  const toggleSection = (title: string | null) => {
    setOpenSections((prev) => ({
      ...prev,
      [title || 'main']: !prev[title || 'main'],
    }))
  }

  const pathname = usePathname();


  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto bg-white lg:pb-4 border-r border-sc-200 px-4 no-scrollbar relative">
      {/* Logo */}
      <Link 
        href={'/'}
        className="flex items-center pl-4 gap-2 border-b border-sc-200 py-6 top-0 left-0 fixed z-10 bg-white w-64 border-r">
        <Shield className="size-8 p-2 rounded-md bg-orange-500 text-white" />
        <span className="text-black font-bold text-lg">NotifyBreach</span>
      </Link>



      {/* Navigation */}
      <div className="mt-24">
              <SidebarSelector />

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
                  {section.links.map((item:any, j) => (
                    <Link
                      key={j}
                      href={item.href}
                      className={`flex items-center justify-start gap-3 rounded-lg p-2 text-sm/6 ${
                        item.active
                          ? 'bg-orange-100 text-p-700'
                          : 'text-sc-700 hover:text-sc-800 hover:bg-sc-100'
                      }`}
                    >
                      <item.icon className={`size-5 ${item.active ? 'text-p-700' : 'text-sc-500/75'}`} />
                      <span>{item.name}</span>
                    </Link>

                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
