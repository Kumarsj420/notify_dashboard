'use client'

import { useState, ReactNode, Children, isValidElement, cloneElement, ReactElement } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon,  ChevronDownIcon} from '@heroicons/react/20/solid'

// Types
export interface SelectOption {
  id: string | number
  name: string
  [key: string]: any
}

interface SelectDropdownProps<T extends SelectOption = SelectOption> {
  value?: T
  onChange?: (value: T) => void
  label?: string
  placeholder?: string
  className?: string
  children: ReactNode
}

interface DropdownHeaderProps {
  children: ReactNode
  className?: string
}

interface DropdownFooterProps {
  children: ReactNode
  className?: string
}

interface DropdownOptionProps<T extends SelectOption = SelectOption> {
  value: T
  children?: ReactNode
  className?: string
}

// Subcomponents
export function DropdownHeader({ children, className = '' }: DropdownHeaderProps) {
  return (
    <div className={`px-3 py-2 border-b border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  )
}

export function DropdownFooter({ children, className = '' }: DropdownFooterProps) {
  return (
    <div className={`px-3 py-2 border-t border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  )
}

export function DropdownOption<T extends SelectOption = SelectOption>({ 
  value, 
  children, 
  className = '' 
}: DropdownOptionProps<T>) {
  return (
    <ListboxOption
      value={value}
      className={`group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-sc-100 data-focus:outline-hidden ${className}`}
    >
      <div className="flex">
        {children ? (
          children
        ) : (
          <span className="truncate font-normal group-data-selected:font-semibold">
            {value.name}
          </span>
        )}
      </div>

      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-p-500 group-not-data-selected:hidden group-data-focus:text-p-500">
        <CheckIcon aria-hidden="true" className="size-5" />
      </span>
    </ListboxOption>
  )
}

// Main Component
export default function SelectDropdown<T extends SelectOption = SelectOption>({
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  className = '',
  children
}: SelectDropdownProps<T>) {
  // Extract all options from children
  const options: T[] = []
  let header: ReactNode = null
  let footer: ReactNode = null
  const optionElements: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === DropdownHeader) {
        header = child
      } else if (child.type === DropdownFooter) {
        footer = child
      } else if (child.type === DropdownOption) {
        const optionChild = child as ReactElement<DropdownOptionProps<T>>
        options.push(optionChild.props.value)
        optionElements.push(child)
      }
    }
  })

  const [internalSelected, setInternalSelected] = useState<T | undefined>(
    value || options[0]
  )
  
  const selected = value || internalSelected
  
  const handleChange = (newValue: T) => {
    setInternalSelected(newValue)
    onChange?.(newValue)
  }

  return (
    <Listbox value={selected} onChange={handleChange}>
      {label && <Label className="block text-sm/6 font-medium text-gray-900">{label}</Label>}
      <div className={`relative ${label ? 'mt-2' : ''} ${className}`}>
        <ListboxButton className="grid w-full grid-cols-1 rounded-xl bg-white hover:bg-sc-50 shadow-md shadow-sc-200 ring-1 ring-inset ring-sc-300 hover:ring-sc-400/80 px-3 py-2 text-sm  text-left text-gray-900 focus-visible:-outline-offset-2  sm:text-sm/6 cursor-pointer min-w-48 outline-none">
          <span className="col-start-1 row-start-1 flex w-full gap-2 pr-6">
            <span className="truncate">{selected?.name || placeholder}</span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-6 self-center justify-self-end text-gray-500/80 "
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white text-base shadow-lg shadow-sc-200/80 outline-1 outline-sc-200 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm rounded-xl"
        >
          {header}
          
          <div className="py-1">
            {optionElements}
          </div>
          
          {footer}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

// Re-export subcomponents for easier imports
SelectDropdown.Header = DropdownHeader
SelectDropdown.Footer = DropdownFooter
SelectDropdown.Option = DropdownOption