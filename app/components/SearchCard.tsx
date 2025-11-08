'use client';
import React from 'react';
import Card from './Card';
import { Search, FileDown, RotateCcw, Plus } from 'lucide-react';

const SearchCard = () => {
  return (
    <div className="mt-5">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-5">

          <div className='flex items-center gap-2 w-full'>
            <div className="flex items-center ring-1 ring-inset ring-p-400/80 focus-within:ring-p-400 focus-within:ring-2 rounded-xl overflow-hidden w-full bg-p-50 focus-within:bg-white">
              <Search className="ml-3 text-sc-500/80" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="w-full px-3 py-2 focus:outline-none font-medium placeholder:text-sc-500/70 "
              />
            </div>

            <button className="bg-p-500 hover:bg-p-400  text-white rounded-xl px-4 cursor-pointer py-2.5 text-sm flex items-center gap-2 font-semibold">
              <Search size={16} /> Search
            </button>
          </div>


          <div className="flex items-center justify-between w-full">
            <div className='flex items-center gap-2'>
              <span className="border border-dashed border-sc-400/80 rounded-full px-3.5 py-1.5 text-sm text-sc-600/90 focus:outline-none flex items-center gap-1.5 font-medium hover:bg-gray-50 cursor-pointer hover:border-sc-400">
                <Plus size={16} className='text-sc-500/80' /> Source
              </span>
              <span className="border border-dashed border-sc-400/80 rounded-full px-3.5 py-1.5 text-sm text-sc-600/90 focus:outline-none flex items-center gap-1.5 font-medium hover:bg-gray-50 cursor-pointer hover:border-sc-400">
                <Plus size={16} className='text-sc-500/80' /> Infection date
              </span>
              <span className="border border-dashed border-sc-400/80 rounded-full px-3.5 py-1.5 text-sm text-sc-600/90 focus:outline-none flex items-center gap-1.5 font-medium hover:bg-gray-50 cursor-pointer hover:border-sc-400">
                <Plus size={16} className='text-sc-500/80' /> Date added
              </span>
              <span className="border border-dashed border-sc-400/80 rounded-full px-3.5 py-1.5 text-sm text-sc-600/90 focus:outline-none flex items-center gap-1.5 font-medium hover:bg-gray-50 cursor-pointer hover:border-sc-400">
                <Plus size={16} className='text-sc-500/80' /> Email
              </span>
              <span className="border border-dashed border-sc-400/80 rounded-full px-3.5 py-1.5 text-sm text-sc-600/90 focus:outline-none flex items-center gap-1.5 font-medium hover:bg-gray-50 cursor-pointer hover:border-sc-400">
                <Plus size={16} className='text-sc-500/80' /> Url
              </span>
              <span className="border border-dashed border-sc-400/80 rounded-full px-3.5 py-1.5 text-sm text-sc-600/90 focus:outline-none flex items-center gap-1.5 font-medium hover:bg-gray-50 cursor-pointer hover:border-sc-400">
                <Plus size={16} className='text-sc-500/80' /> Username
              </span>
            </div>


            <div className='flex items-center gap-2'>
              <button className="border border-sc-400/80 rounded-xl px-3.5 py-1.5 text-sm text-sc-600/90 focus:outline-none flex items-center gap-1 cursor-pointer hover:bg-sc-50 hover:border-sc-400">
                <span className="text-lg"><RotateCcw size={16} className='text-sc-500/80' /></span> Clear Filters
              </button>

              <button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl px-3.5 py-1.5 text-sm flex items-center gap-2">
                <FileDown size={18} /> Export
              </button>
            </div>
          </div>



        </div>
      </Card>
    </div>
  );
};

export default SearchCard;
