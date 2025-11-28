'use client';
import React from 'react';
import Card from './Card';
import { Search, FileDown, RotateCcw } from 'lucide-react';

const ExposoreSearch = () => {
  return (
    <div className="mt-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-5">

          <div className='flex items-center gap-2 w-full'>
                <div className="flex items-center border border-sc-300 focus:border-p-500 rounded-lg overflow-hidden w-full flex-grow ">
                    <Search className="ml-3 text-sc-500" size={18} />
                    <input
                    type="text"
                    placeholder="Search by domain"
                    className="w-full px-3 py-2 focus:outline-none"
                    />
                </div>

                <button className="bg-p-500 hover:bg-p-600  text-white rounded-lg px-6 cursor-pointer py-3 text-sm flex items-center gap-1">
                    <Search size={16} /> Search
                </button>
            </div>


          <div className="flex items-center justify-between w-full">
            <div className='flex items-center gap-2'>
                <select className="border border-sc-300 rounded-lg px-3 py-1.5 text-sm text-sc-500 focus:outline-none">
                <option>Sort by Date</option>
                <option>Sort by Name</option>
                </select>

                <select className="border border-sc-300 rounded-lg px-3 py-1.5 text-sm text-sc-500 focus:outline-none">
                <option>All Types</option>
                <option>Type 1</option>
                <option>Type 2</option>
                </select>

                <select className="border border-sc-300 rounded-lg px-3 py-1.5 text-sm text-sc-500 focus:outline-none">
                <option>All Domains</option>
                <option>Domain 1</option>
                <option>Domain 2</option>
                </select>
            </div>


            <div className='flex items-center gap-2'>
                <button className="border border-sc-300 rounded-lg px-3 py-1.5 text-sm text-sc-500 focus:outline-none flex items-center gap-1">
                <span className="text-lg"><RotateCcw size={16}/></span> Reset Filters
                </button>

                <button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl px-4 py-2 text-sm flex gap-2">
                <FileDown size={16} /> Export CSV
                </button>
            </div>
          </div>



        </div>
      </Card>
    </div>
  );
};

export default ExposoreSearch;
