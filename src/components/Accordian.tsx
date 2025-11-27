'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


interface AccordianContextProps {
  isOpen: boolean;
  toggle: () => void;
}

interface AccordianProps {
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

interface AccordianHeaderProps {
  children: ReactNode;
  className?: string;
}

interface AccordianBodyProps {
  children: ReactNode;
  className?: string;
}


const AccordianContext = createContext<AccordianContextProps | undefined>(
  undefined
);

function useAccordian(): AccordianContextProps {
  const context = useContext(AccordianContext);
  if (!context) {
    throw new Error('Accordian components must be used within <Accordian>');
  }
  return context;
}


export default function Accordian({
  children,
  defaultOpen = false,
  className = '',
}: AccordianProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <AccordianContext.Provider value={{ isOpen, toggle }}>
      <div
        className={`ring-1 ring-inset ring-sc-300/70 bg-white rounded-lg shadow-sm ${className}`}
      >
        {children}
      </div>
    </AccordianContext.Provider>
  );
}


export function AccordianHeader({ children, className = '' }: AccordianHeaderProps) {
  const { isOpen, toggle } = useAccordian();

  return (
    <button
      onClick={toggle}
      className={`flex justify-between items-center w-full px-4 py-3 cursor-pointer select-none ${className}`}
    >
      <div>{children}</div>
      <ChevronDown
        className={`text-sc-500 size-6 transform transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
}


export function AccordianBody({ children, className = '' }: AccordianBodyProps) {
  const { isOpen } = useAccordian();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={`border-t border-t-gray-200 px-4 py-4 overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
