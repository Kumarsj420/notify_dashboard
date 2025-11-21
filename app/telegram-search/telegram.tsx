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

const Telegram = () => {
  return (
    <div className="w-full min-h-screen font-sans text-[#1e1e1e]">

      <h1 className="text-3xl font-bold mb-8">Telegram Search Tool</h1>


<Card>
           <h2 className="font-semibold mb-3">Query</h2>


        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter your search query..."
            className="flex-1 border border-sc-300 rounded-xl px-4 py-3 bg-[#fafafa]"
          />


          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer">
            <span><Search size={18} /></span> Search
          </button>
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

                <button className="bg-[#f0f0f5] px-6 py-2 rounded-full flex items-center gap-1.5 cursor-pointer">
                    <Filter className="text-sc-500" size={12}/>
                    <span>All</span>
                </button>        <button className="bg-[#f0f0f5] px-6 py-2 rounded-full flex items-center gap-1.5 cursor-pointer">
                    <Filter className="text-sc-500" size={12}/>
                    <span>Channel</span>
                </button>        <button className="bg-[#f0f0f5] px-6 py-2 rounded-full flex items-center gap-1.5 cursor-pointer">
                    <Filter className="text-sc-500" size={12}/>
                    <span>Groups</span>
                </button>
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
            className="bg-white shadow-md rounded-2xl p-6 border border-[#ececec]"
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
