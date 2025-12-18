import React from 'react'
import Button from '../Button';
import { cn } from '@/utils/style';

type SearchBoxProps = {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void,
    placeholder?: string,
    formClassName?: string,
    inputClassName?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
} 

function SearchBox({ onSubmit, placeholder, formClassName, inputClassName,  value,  onChange }: SearchBoxProps) {
    return (
        <form className={cn("flex items-center max-w-sm space-x-2", formClassName)} onSubmit={onSubmit}>
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="size-4 text-sc-500/90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                </div>
                <input type="text" value={value} onChange={onChange} id="simple-search" className={cn("px-3 py-2.5 bg-sc-50  ps-9 text-heading text-sm ring-1 ring-sc-300 focus:ring-p-400 focus:ring-2 block w-full placeholder:text-sc-400/95 rounded-xl outline-none border-none font-medium", inputClassName)} placeholder={placeholder} required />
            </div>

        </form>

    )
}

export default SearchBox;
