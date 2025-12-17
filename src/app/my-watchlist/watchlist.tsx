"use client";
import React, { useState } from 'react'; 
import { Search, ChevronDown, MoreHorizontal } from 'lucide-react';
import Badge from '@/components/Badge';

const Watchlist = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Domain', 'IP Address', 'Email Address', 'Phone Number', 'DWM Rule'];
  
  const assets = [
    { type: 'IP address', value: '45.137.204.7', status: 'Monitored', source: 'Auto Discovered', date: '10/31/2025' },
    { type: 'IP address', value: '13.250.241.131', status: 'Monitored', source: 'Auto Discovered', date: '10/31/2025' },
    { type: 'IP address', value: '54.169.119.106', status: 'Orphaned', source: 'Auto Discovered', date: '10/24/2025' },
    { type: 'IP address', value: '13.250.165.195', status: 'Orphaned', source: 'Auto Discovered', date: '10/24/2025' },
    { type: 'IP address', value: '54.179.135.220', status: 'Monitored', source: 'Auto Discovered', date: '10/24/2025' },
    { type: 'IP address', value: '18.136.114.235', status: 'Orphaned', source: 'Auto Discovered', date: '10/17/2025' },
    { type: 'IP address', value: '13.228.162.165', status: 'Orphaned', source: 'Auto Discovered', date: '10/10/2025' },
    { type: 'IP address', value: '13.228.178.164', status: 'Orphaned', source: 'Auto Discovered', date: '10/10/2025' },
  ];

  type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

const getThreatSeverityVariant = (
  severity: string
): 'error' | 'warning' | 'info' | 'secondary' => {
  switch (severity.toUpperCase()) {
    case 'CRITICAL':
      return 'error';
    case 'HIGH':
      return 'warning';
    case 'MEDIUM':
      return 'info';
    case 'LOW':
      return 'secondary';
    default:
      return 'secondary';
  }
};


  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">Assets Count</h2>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Total count</span>
                </div>
                <p className="text-4xl font-bold text-gray-900">106</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Monitored assets</span>
                </div>
                <p className="text-4xl font-bold text-gray-900">72</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Unmonitored assets</span>
                </div>
                <p className="text-4xl font-bold text-gray-900">34</p>
              </div>
            </div>
          </div>

          {/* Asset Type Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">Asset Type</h2>
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#FFA500" strokeWidth="20" strokeDasharray="220 440" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#9333EA" strokeWidth="20" strokeDasharray="110 440" strokeDashoffset="-220" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="55 440" strokeDashoffset="-330" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#10B981" strokeWidth="20" strokeDasharray="33 440" strokeDashoffset="-385" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="22 440" strokeDashoffset="-418" transform="rotate(-90 80 80)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">DWM Rule</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Phone Number</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-600">Email Address</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-600">IP Address</span>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              Asset type <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              Status <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              Source <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              Date added <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>


          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Asset Value</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Source</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date Added</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-700">{asset.type}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{asset.value}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        asset.status === 'Monitored'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{asset.source}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{asset.date}</td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;