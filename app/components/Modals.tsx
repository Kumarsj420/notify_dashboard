'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { X } from 'lucide-react'

export interface ModalProps {
    open: boolean
    onClose: (value: boolean) => void
    children: React.ReactNode
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

export interface ModalHeaderProps {
    children: React.ReactNode
    onClose?: (value: boolean) => void
    showCloseButton?: boolean,
    className?: string
}

const maxWidthClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl'
}

export default function Modal({
    open,
    onClose,
    children,
    maxWidth = 'lg'
}: ModalProps) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-400/55 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in backdrop-blur-[2px]"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full ${maxWidthClasses[maxWidth]} data-closed:sm:translate-y-0 data-closed:sm:scale-95`}
                    >
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export function ModalHeader({
    children,
    onClose,
    showCloseButton = true,
    className
}: ModalHeaderProps) {
    return (
        <div className={`px-5 py-4 border-b border-gray-200 relative ${className}`}>
            <span className="font-bold text-lg truncate">
                {children}
            </span>

            {showCloseButton && onClose && (
                <button 
                    onClick={() => onClose(false)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:rotate-90 transition duration-200 cursor-pointer"
                    aria-label="Close modal"
                >
                   <X />
                </button>
            )}
        </div>
    )
}

export function ModalBody({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white px-5 py-4 max-h-140 overflow-y-auto">
            {children}
        </div>
    )
}

export function ModalFooter({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-gray-50 px-4 py-3 border-t border-t-sc-200">
            {children}
        </div>
    )
}