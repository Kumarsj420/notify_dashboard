"use client";

import React, { useState } from "react";
import Tabs, { Tab } from "@/components/Tabs";
import TableSkeleton from "@/components/TableSkeleton";
import InfoCard from "@/components/InfoCard"
import VictimCard from "@/components/VictimCard";
import { UserGroupIcon, UsersIcon, ChartBarIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { cn } from "@/utils/style";
import Badge from "@/components/Badge";

type RecentVictim = {
  name: string;
  flag: string;
  group: string;
  description: string;
  activity: string;
  attackDate: string;
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

type ransomwareVictimProp = {
  title: string,
  value: number,
  icon: React.ElementType,
  msg?: string,
  iconVariant?: 'info' | 'warning' | 'error' | 'success';
  messageVariant?: 'info' | 'warning' | 'error' | 'success';
}

const ransomwareVictims: ransomwareVictimProp[] = [
  {
    title: "Total Groups",
    value: 273,
    icon: UserGroupIcon,
    msg: "(+ 12%) 5 new groups",
    iconVariant: 'warning',
    messageVariant: 'error'

  },
  {
    title: "Total Victims",
    value: 20607,
    icon: UsersIcon,
    iconVariant: 'error',
  },
  {
    title: "This Year",
    value: 4188,
    icon: ChartBarIcon,
    msg: "2000 in current year",
    iconVariant: 'success',
    messageVariant: 'warning'
  },
  {
    title: "This Month",
    value: 0,
    icon: CalendarDaysIcon,
    msg: "- 40% decrease"
  }
];


const ransomwareTabs: Tab[] = [
  { name: "Victims", count: 6 },
  { name: "Groups", count: 52 },
];




const StatCard: React.FC<{ icon: React.ReactNode, count: string, label: string }> = ({ icon, count, label }) => (
  <div className="p-4 bg-gray-50 rounded-xl flex flex-col items-start shadow-sm">
    <div className="text-gray-500 mb-2">{icon}</div>
    <div className="text-3xl font-bold text-gray-900">{count}</div>
    <div className="text-sm text-gray-600 uppercase tracking-wider">{label}</div>
  </div>
);



interface RansomwareGroup {
  name: string;
  victimsCount: number;
}

const GroupCard: React.FC<{ group: RansomwareGroup }> = ({ group }) => {
  const isDanger = group.victimsCount > 0;

  return (
    <div
      className={cn(
        "bg-linear-to-b from-white to-sc-50 rounded-3xl ring-1 ring-inset ring-sc-200 p-5 shadow-lg shadow-sc-300/60 hover:shadow-xl transition-all duration-200 cursor-pointer"
      )}
    >
      <h3 className="text-lg font-semibold text-sc-900 mb-2 tracking-tight">
        {group.name}
      </h3>
     
      <Badge variant={isDanger ? 'error' : 'secondary'} className="w-max">{group.victimsCount} Victims</Badge>
     
      {/* <p
        className={cn(
          "text-sm font-semibold",
          isDanger ? "text-red-600" : "text-sc-600/80"
        )}
      >
        {group.victimsCount} Victims
      </p> */}
    </div>
  );
};


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
              {
                ransomwareVictims.map(info => (
                  <InfoCard title={info.title} value={info.value} icon={<info.icon className='size-8' />} message={info.msg} iconVariant={info.iconVariant} messageVariant={info.messageVariant} />
                ))
              }
            </div>



            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Victims</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {recentVictims.map((victim, index) => (
                <VictimCard key={index} victim={victim} />
              ))}
            </div>
          </div>
        )}


        {!isLoading && activeTab === "Groups" && (
          <div className="space-y-8">

            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-sc-900 tracking-tight">
                Ransomware Groups
              </h1>
              <p className="text-sc-600/90 text-sm max-w-xl">
                Browse all known ransomware groups. Use the search bar to filter by name or alt name.
              </p>
            </div>


            {/* Grid */}
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