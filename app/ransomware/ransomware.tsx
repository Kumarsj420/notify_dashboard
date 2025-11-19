"use client";

import React, { useState } from "react";
import Tabs, { Tab } from "../components/Tabs";
import TableSkeleton from "../components/TableSkeleton"; 


type RecentVictim = {
  name: string;
  flag: string;
  group: string;
  description: string;
  activity: string;
  attackDate: string;
};


type RansomwareGroup = {
  name: string;
  victimsCount: number;
};


const recentVictims: RecentVictim[] = [
  {
    name: "The Providence Warwick Co...",
    flag: "🇺🇸",
    group: "lynx",
    description: "Providence Warwick Convention & Visitors Bureau is a creative capital community. It offers services...",
    activity: "Hospitality and Tourism",
    attackDate: "Jul 8, 2025",
  },
  {
    name: "Doak Shirreff Lawyers",
    flag: "🇨🇦",
    group: "direwolf",
    description: "Doak Shirreff Kelowna Lawyers is a full-service law firm situated in Kelowna, British Columbia.",
    activity: "Business Services",
    attackDate: "Jul 8, 2025",
  },
  {
    name: "UPG Enterprises",
    flag: "🇺🇸",
    group: "direwolf",
    description: "UPG Enterprises is a privately held operator of industrial companies that focus on steel, lamination...",
    activity: "Industrial",
    attackDate: "Jul 8, 2025",
  },

];


const ransomwareGroups: RansomwareGroup[] = [
  { name: "Omega", victimsCount: 7 },
  { name: "8base", victimsCount: 455 },
  { name: "abrahams_ax", victimsCount: 0 },
  { name: "abyss", victimsCount: 81 },
  { name: "adminlocker", victimsCount: 0 },
  { name: "againstthewest", victimsCount: 0 },
  { name: "agl0bgvrcg", victimsCount: 0 },
  { name: "akira", victimsCount: 851 },
  { name: "ako", victimsCount: 0 },

];



const ransomwareTabs: Tab[] = [
  { name: "Victims", count: "6" },
  { name: "Groups", count: "52" },
];




const StatCard: React.FC<{ icon: React.ReactNode, count: string, label: string }> = ({ icon, count, label }) => (
  <div className="p-4 bg-gray-50 rounded-xl flex flex-col items-start shadow-sm">
    <div className="text-gray-500 mb-2">{icon}</div>
    <div className="text-3xl font-bold text-gray-900">{count}</div>
    <div className="text-sm text-gray-600 uppercase tracking-wider">{label}</div>
  </div>
);



const VictimCard: React.FC<{ victim: RecentVictim }> = ({ victim }) => (
  <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-200">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-lg font-semibold text-gray-900 leading-tight">
        {victim.name}
      </h3>
      <span className="text-2xl">{victim.flag}</span>
    </div>
    <p className={`text-xs font-medium ${victim.group === 'direwolf' ? 'text-red-600' : 'text-orange-600'} mb-2`}>
      {victim.group}
    </p>
    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
      {victim.description}
    </p>
    <div className="text-xs text-gray-500">
      <p className="flex items-center mb-1">
        <span role="img" aria-label="activity" className="mr-1">💼</span>
        <span className="font-medium text-gray-700">Activity:</span> {victim.activity}
      </p>
      <p className="flex items-center">
        <span role="img" aria-label="attack date" className="mr-1">🗓️</span>
        <span className="font-medium text-gray-700">Attack Date:</span> {victim.attackDate}
      </p>
    </div>
  </div>
);



const GroupCard: React.FC<{ group: RansomwareGroup }> = ({ group }) => (
  <div className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition duration-200 cursor-pointer">
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.name}</h3>
    <p className={`text-sm font-medium ${group.victimsCount > 0 ? 'text-red-600' : 'text-gray-500'}`}>
      {group.victimsCount} Victims
    </p>
  </div>
);


const Ransomware: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Victims");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: Tab) => {
    if (tab.name === activeTab) return;
    setIsLoading(true);
    setActiveTab(tab.name);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <div className="">      
      <Tabs
        tabs={ransomwareTabs.map((t) => ({
          ...t,
          current: t.name === activeTab,
        }))}
        onTabChange={handleTabChange}
      />

      <div className="mt-7 min-h-[380px] relative">
        {isLoading && <TableSkeleton />}


        {!isLoading && activeTab === "Victims" && (
          <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2h-.09A1.993 1.993 0 0015 17m1-6a4 4 0 10-8 0 4 4 0 008 0zM12 11V9"></path></svg>}
                count="273"
                label="Total Groups"
              />
              <StatCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-5.143 0-8.86 2.5-12 8h24c-3.14-5.5-6.857-8-12-8z"></path></svg>}
                count="20,607"
                label="Total Victims"
              />
              <StatCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2-7H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z"></path></svg>}
                count="4,188"
                label="This Year"
              />
              <StatCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                count="0"
                label="This Month"
              />
            </div>
            

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600 text-sm flex-grow">
                Showing the 100 most recent victims by default. Use the search above to filter results.
              </p>
              <div className="relative w-full max-w-xs sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by victim name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>


            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Victims</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentVictims.map((victim, index) => (
                <VictimCard key={index} victim={victim} />
              ))}
            </div>
          </div>
        )}


        {!isLoading && activeTab === "Groups" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Ransomware Groups</h1>
            

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600 text-sm flex-grow">
                Showing all ransomware groups. Use the search to filter by group name.
              </p>
              <div className="relative w-full max-w-xs sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by group name or altname..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ransomwareGroups.map((group, index) => (
                <GroupCard key={index} group={group} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ransomware;