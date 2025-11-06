'use client'

import React, { useState } from 'react'
import { Globe, Plus, ChevronDown } from 'lucide-react'

const SidebarSelector = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('example.com')
  const [open, setOpen] = useState<boolean>(false)

  const domains: string[] = [
    'example.com',
    'teamhashfoundation.com',
    'internet.net',
    'nobodydoesitbetter.com',
  ]

  const handleSelect = (domain: string) => {
    setSelectedDomain(domain)
    setOpen(false)
  }

  const handleAddDomain = () => {
    setOpen(false)
    alert('Open "Add Domain" modal or input field here')
  }

  return (
    <div className="relative inline-block text-left w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-2 text-sc-600 cursor-pointer rounded-lg ring ring-sc-300 shadow-sm transition"
      >
        <div className="flex items-center gap-2">
          <Globe size={18} />
          <span>{selectedDomain}</span>
        </div>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}><ChevronDown size={16}/></span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-full text-sc-500 bg-white rounded-lg shadow-lg z-10 overflow-hidden border border-sc-200">
          {domains.map((domain: string) => (
            <div
              key={domain}
              onClick={() => handleSelect(domain)}
              className={`px-3 py-2 cursor-pointer hover:bg-sc-100 ${
                selectedDomain === domain ? 'bg-sc-100' : ''
              }`}
            >
              {domain}
            </div>
          ))}

          <div
            onClick={handleAddDomain}
            className="px-3 py-2 cursor-pointer hover:bg-sc-100 flex items-center gap-2 border-t border-sc-200 text-sc-700"
          >
            <Plus size={16} />
            <span>Add Domain</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SidebarSelector
