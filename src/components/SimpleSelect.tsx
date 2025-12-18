'use client'

import { ReactNode, Children, isValidElement } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

interface SimpleSelectProps {
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  children: ReactNode
}

interface OptionData {
  value: string | number
  label: string
}

interface OptionProps {
  value: string | number
  children: ReactNode
}

export default function SimpleSelect({
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  children
}: SimpleSelectProps) {
  // Extract options from native option elements
  const options: OptionData[] = []
  
  Children.forEach(children, (child) => {
    if (isValidElement<OptionProps>(child) && child.type === 'option') {
      const optionValue = child.props.value
      const optionLabel = typeof child.props.children === 'string' 
        ? child.props.children 
        : String(child.props.children)
      
      if (optionValue !== '' && optionValue !== undefined) {
        options.push({
          value: optionValue,
          label: optionLabel
        })
      }
    }
  })

  // Find selected option or use null as default
  const selectedOption = options.find(opt => opt.value === value) || null

  // Handle change - convert to select-like event
  const handleChange = (option: OptionData | null) => {
    if (!option) return
    
    const syntheticEvent = {
      target: { 
        value: String(option.value)
      }
    } as React.ChangeEvent<HTMLSelectElement>
    
    onChange(syntheticEvent)
  }

  return (
    <Listbox value={selectedOption} onChange={handleChange} disabled={disabled}>
      {label && <Label className="block text-sm/6 font-medium text-gray-900">{label}</Label>}
      <div className={`relative ${label ? 'mt-2' : ''} ${className}`}>
        <ListboxButton 
          className={`grid w-full grid-cols-1 rounded-xl bg-white shadow-md shadow-sc-200 ring-1 ring-inset ring-sc-300 px-3 py-2 text-sm text-left text-gray-900 sm:text-sm/6 cursor-pointer min-w-48 outline-none ${
            disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-sc-50 hover:ring-sc-400/80 focus-visible:-outline-offset-2'
          }`}
        >
          <span className="col-start-1 row-start-1 flex w-full gap-2 pr-6">
            <span className="truncate">{selectedOption?.label || placeholder}</span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-6 self-center justify-self-end text-gray-500/80"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white text-base shadow-lg shadow-sc-200/80 outline-1 outline-sc-200 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm rounded-xl"
        >
          <div className="py-1">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option}
                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-sc-100 data-focus:outline-hidden"
              >
                <div className="flex">
                  <span className="truncate font-normal group-data-selected:font-semibold">
                    {option.label}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-p-500 group-not-data-selected:hidden group-data-focus:text-p-500">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </div>
        </ListboxOptions>
      </div>
    </Listbox>
  )
}