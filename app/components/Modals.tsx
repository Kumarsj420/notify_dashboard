'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

export interface ModalProps {
    open: boolean
    onClose: (value: boolean) => void,
    children: React.ReactNode
}

export default function Modal({
    open,
    onClose,
    children
}: ModalProps) {

    return (
        <div>
            <Dialog open={open} onClose={onClose} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-400/55 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in backdrop-blur-[2px]"
                />

                <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            {children}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export function ModalHeader({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="px-4 py-3 border-b border-b-sc-200">
            <span className='font-bold text-lg truncate'>
                {children}
            </span>
        </div>
    )
}

export function ModalBody({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white px-4 py-2">
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