import React from "react";
import Card from "../components/Card";
import {
  Search,
  Users,
  Filter,
  Calendar,
  MessageCircle,
  AlertCircle,
  Play,
} from "lucide-react";

import { TagIcon, RectangleGroupIcon, FunnelIcon } from "@heroicons/react/24/solid";

import Title from "../components/Title";
import Intro from "../components/Intro";
import Button from "../components/Button";

const Telegram = () => {
  return (
    <div className="w-full min-h-screen font-sans text-[#1e1e1e]">

      <Title>Telegram Search Tool</Title>
      <Intro>Seach your company breaches in telegram here</Intro>
      <Card className="mt-4">
        <h2 className="font-semibold mb-2 text-sm text-sc-900">Query</h2>

        <div className="flex items-stretch gap-2">
          <input
            type="text"
            placeholder="Enter your search query..."
            className="flex-1 ring-[0.1em] ring-sc-400/60 ring-inset hover:ring-p-400 hover:ring-2 outline-none border-none rounded-xl px-4 py-3 bg-white font-medium placeholder:text-sc-400"
          />

          <Button size="lg" >
            <span><Search size={18} /></span> Search
          </Button>

          {/* <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer">
            <span><Search size={18} /></span> Search
          </button> */}
        </div>


        <div className="flex items-center gap-2 mt-6 flex-wrap text-sm justify-between">
          <div className="flex gap-2 items-center">
            <div className="font-semibold">Mode:</div>

            <button className="bg-p-600 text-white px-6 py-2 rounded-full cursor-pointer">
              Search
            </button>

            <button className="bg-[#f0f0f5] px-6 py-2 rounded-full cursor-pointer">
              Human
            </button>
          </div>

          <div className="flex gap-2 items-center">

            <div className="font-semibold ml-12">Filters:</div>

            <Button variant="outline" className="rounded-full!" size="sm">
              <TagIcon className="text-sc-400 size-4"  />
              <span>All</span>
            </Button>
            <Button variant="outline" className="rounded-full!" size="sm">
              <FunnelIcon className="text-sc-400 size-4" />
              <span>Channel</span>
            </Button>
            <Button variant="outline" className="rounded-full!" size="sm">
              <RectangleGroupIcon className="text-sc-400 size-4"  />
              <span>Groups</span>
            </Button>
          </div>


        </div>
      </Card>

      <h2 className="text-xl font-bold mb-6 mt-12">Your Search Jobs</h2>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[
          { title: "adani", date: "Nov 8, 2025, 12:33 PM" },
          { title: "akshaysharnagat", date: "Nov 1, 2025, 03:48 PM" },
          { title: "medical tourism", date: "Oct 10, 2025, 01:11 PM" },
          { title: "medical tourism", date: "Oct 10, 2025, 12:46 PM" },
          { title: "medical tourism", date: "Oct 10, 2025, 12:46 PM" },
          { title: "Jobs", date: "Sep 11, 2025, 11:45 AM" },
        ].map((job, index) => (
          <Card
            key={index}
          >

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <span className="text-gray-500 flex items-center gap-1 text-sm"><AlertCircle size={14} /> Failed</span>
            </div>


            <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm">
              <Calendar size={16} />{job.date}
            </div>


            <div className="flex items-center gap-3 text-sm">
              <button className="bg-p-100 text-p-700 px-3 py-1.5 rounded-xl flex items-center gap-2 cursor-pointer">
                <Search size={12} /> Search
              </button>

              <button className="bg-sc-100 px-3 py-1.5 rounded-xl flex items-center gap-2 cursor-pointer">
                <Filter size={12} /> All
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Telegram;
