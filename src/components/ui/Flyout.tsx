import { logout } from '@/utils/auth'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, CursorArrowRippleIcon, StarIcon, UserIcon as UIcon, UserCircleIcon, BuildingOffice2Icon, UserIcon, AdjustmentsVerticalIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

import Link from 'next/link'
import useAppContext from '@/providers/AppContextProvider/useAppContext';
import Badge from '../Badge';

const solutions = [
    { name: 'Profile', description: 'Manage your account details', href: '/profile', icon: UserCircleIcon },
    { name: 'Company Info', description: 'View organization information', href: '/company-info', icon: BuildingOffice2Icon },
    { name: 'User Roles', description: "Manage user permissions", href: '/user-roles', icon: UserIcon },
    { name: 'Settings', description: 'Configure system preferences', href: '/setting', icon: AdjustmentsVerticalIcon },
    { name: 'Help & Support', description: 'Get help and resources', href: '/help', icon: QuestionMarkCircleIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'logout', href: '#', icon: PhoneIcon },
]

export default function Flyout() {
    const { user } = useAppContext();
    console.log(user);
    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 outline-none ">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <div className="size-8 rounded-full bg-linear-to-b from-sc-50 to-sc-200 flex items-center justify-center ring-1 ring-sc-300 outline-none ring-offset-2">
                    <UIcon aria-hidden='true' className='size-6 text-sc-600/70'/>
                </div>
                {user && (
                    <span className="hidden lg:flex lg:items-center">
                        <span aria-hidden="true" className="ml-4 ">
                            <span className='text-sm/6 font-semibold text-sc-900 block max-w-40 truncate'>{user.name}</span>
                            <span className='text-xs font-normal  text-sc-600/90 block'>Admin</span>
                        </span>
                        <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-sc-500" />
                    </span>
                )}
            </PopoverButton>

            <PopoverPanel
                transition
                className="absolute right-0 z-10 mt-5 flex w-screen max-w-max bg-transparent px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in translate-x-2.5"
            >
                <div className="w-screen max-w-[320px] flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg shadow-gray-300/70 outline-1 outline-gray-900/8">
                    <div className="p-3">
                        {solutions.map((item) => (
                            <div key={item.name} className="group relative flex gap-x-5 rounded-lg py-3.5 px-4 hover:bg-gray-100">
                                <Badge size='auto' className='mt-1 size-10 rounded-lg group-hover:from-p-50 group-hover:to-p-200 group-hover:ring-p-300' variant='secondary'>
                                     <item.icon aria-hidden="true" className="size-5 text-gray-500/90 group-hover:text-p-500" />
                                </Badge>
                                {/* <div className="mt-1 flex size-10 flex-none items-center justify-center rounded-lg bg-gray-100 group-hover:bg-white">
                                    <item.icon aria-hidden="true" className="size-5 text-gray-600/90 group-hover:text-p-600" />
                                </div> */}
                                <div>
                                    <Link href={item.href} className="font-semibold text-gray-900">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                    </Link>
                                    <p className="text-sm font-light text-gray-600/90">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-900/8 bg-gray-100">
                        <Link
                            href='/subscription'
                            className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-emerald-800 hover:bg-gray-50"
                        >
                            <StarIcon aria-hidden="true" className="size-5 flex-none text-emerald-500" />
                            Upgrade
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                            <CursorArrowRippleIcon aria-hidden="true" className="size-5 flex-none text-gray-500/90" />
                            Logout
                        </button>
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    )
}
