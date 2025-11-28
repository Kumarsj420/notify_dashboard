"use client";

import React from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export interface Tab {
  name: string;
  href?: string;
  count?: string;
  current?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange?: (tab: Tab) => void;
  activeColor?: string;
  secondaryColor?: string;
}

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({
  tabs,
  onTabChange,
  activeColor = "p",
  secondaryColor = "sc",
}: TabsProps) {
  const currentTab = tabs.find((t) => t.current);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = tabs.find((tab) => tab.name === e.target.value);
    if (selected && onTabChange) onTabChange(selected);
  };

  return (
    <div>
      {/* Mobile */}
      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={currentTab?.name}
          aria-label="Select a tab"
          onChange={handleSelect}
          className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-sc-900 outline-1 -outline-offset-1 outline-sc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-${activeColor}-600`}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>

        <ChevronDownIcon
          aria-hidden="true"
          className={`pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-sc-500`}
        />
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div className={`border-b border-sc-200`}>
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => onTabChange && onTabChange(tab)}
                className={classNames(
                  tab.current
                    ? `border-p-500 text-p-600`
                    : `border-transparent text-sc-500 hover:border-sc-300 hover:text-sc-700`,
                  "flex border-b-2 px-1 py-4 text-sm font-semibold whitespace-nowrap"
                )}
              >
                {tab.name}

                {tab.count && (
                  <span
                    className={classNames(
                      tab.current
                        ? `bg-linear-to-b from-p-50 to-p-100 ring-1 ring-inset ring-p-200/75 text-p-600`
                        : `bg-linear-to-b from-sc-50 to-sc-100 ring-1 ring-inset ring-sc-200/75 text-sc-500`,
                      "ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
