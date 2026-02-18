'use client'
import { useState } from 'react'
import Flyout from './ui/Flyout'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
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
import Button from './Button';
import Link from 'next/link'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const userNavigation = [
    { name: 'Your profile', href: '#' },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}



export default function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-sc-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>

                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sc-900 px-6 pb-2 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="-mx-2 flex-1 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-sc-800 text-white'
                                                        : 'text-sc-400 hover:bg-sc-800 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                )}
                                            >
                                                <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-p-300/80 bg-linear-to-b from-p-50 to-p-200 f px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-sc-700 lg:hidden">
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>


                <div aria-hidden="true" className="h-6 w-px bg-sc-900/10 lg:hidden" />

                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <form action="#" method="GET" className="grid group flex-1 grid-cols-1 items-center">
                        <input
                            name="search"
                            placeholder="Search threats, domains, employees…"
                            aria-label="Search"
                            className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-white focus:text-sc-900 outline-hidden placeholder:text-sc-500/80  placeholder:font-medium sm:text-sm/6 h-10 rounded-xl  w-full max-w-96 ring-1 ring-inset ring-sc-400/80 focus:bg-white focus:ring-2 focus:ring-p-500/90 font-medium transition-colors duration-200 ease-in-out"
                        />
                        <MagnifyingGlassIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-sc-400 ml-2 group-focus-within:text-gray-500 transition-colors duration-200 ease-in-out"
                        />
                    </form>
                    <div className="flex items-center gap-x-4 lg:gap-x-6">


                        {/* <Link
                            href="/subscription"
                            className="rounded-xl bg-emerald-500 px-3.5 py-2 text-sm font-semibold text-white  hover:bg-emerald-400 outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 shadow-lg shadow-emerald-700/20"
                        >
                            Upgrade Plan
                        </Link> */}

                        {/* Separator */}
                        <div aria-hidden="true" className="hidden lg:block lg:h-8 lg:w-px lg:bg-p-900/20" />

                        {/* Profile dropdown */}
                        <Flyout />
                    </div>
                </div>
            </header>
        </>

    )
}
