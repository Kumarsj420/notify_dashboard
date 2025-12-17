"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, RotateCcw, Download, Eye, CheckCircle, X, AlertTriangle, Shield, Key, Wifi } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/form/Input';
import Badge from '@/components/Badge';

const ThreatsIncidentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');

  const threats = [
    {
      id: 'THR-2024-001',
      name: 'Phishing Attack - Email Compromised',
      icon: AlertTriangle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      user: 'john.doe@company.com',
      severity: 'Critical',
      severityColor: 'bg-red-100 text-red-700',
      domain: 'company.com',
      records: '1,247',
      lastDetected: '2 hours ago'
    },
    {
      id: 'THR-2024-002',
      name: 'Malware Detection - Endpoint',
      icon: Shield,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      user: 'IT Department',
      severity: 'High',
      severityColor: 'bg-orange-100 text-orange-700',
      domain: 'internal.company.com',
      records: '99',
      lastDetected: '5 hours ago'
    },
    {
      id: 'THR-2024-003',
      name: 'Credential Exposure - Dark Web',
      icon: Key,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      user: 'sarah.wilson@company.com',
      severity: 'Medium',
      severityColor: 'bg-yellow-100 text-yellow-700',
      domain: 'company.com',
      records: '1',
      lastDetected: '1 day ago'
    },
    {
      id: 'THR-2024-004',
      name: 'Suspicious Network Activity',
      icon: Wifi,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      user: 'Network Admin',
      severity: 'Low',
      severityColor: 'bg-blue-100 text-blue-700',
      domain: 'ifirewall.company.com',
      records: '456',
      lastDetected: '2 day ago'
    },
    {
      id: 'THR-2024-001',
      name: 'Phishing Attack - Email Compromised',
      icon: AlertTriangle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      user: 'john.doe@company.com',
      severity: 'Critical',
      severityColor: 'bg-red-100 text-red-700',
      domain: 'company.com',
      records: '1,247',
      lastDetected: '2 hours ago'
    },
    {
      id: 'THR-2024-002',
      name: 'Malware Detection - Endpoint',
      icon: Shield,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      user: 'IT Department',
      severity: 'High',
      severityColor: 'bg-orange-100 text-orange-700',
      domain: 'internal.company.com',
      records: '99',
      lastDetected: '5 hours ago'
    },
    {
      id: 'THR-2024-003',
      name: 'Credential Exposure - Dark Web',
      icon: Key,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      user: 'sarah.wilson@company.com',
      severity: 'Medium',
      severityColor: 'bg-yellow-100 text-yellow-700',
      domain: 'company.com',
      records: '1',
      lastDetected: '1 day ago'
    },
    {
      id: 'THR-2024-004',
      name: 'Suspicious Network Activity',
      icon: Wifi,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      user: 'Network Admin',
      severity: 'Low',
      severityColor: 'bg-blue-100 text-blue-700',
      domain: 'ifirewall.company.com',
      records: '456',
      lastDetected: '2 day ago'
    }
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Threats & Incidents</h1>
          <p className="text-gray-600">Monitor and manage detected cyber threats across domains, employees, and systems.</p>
        </div>


        <Card>
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by threat name, domain, or user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <Button>
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-4 pr-10 py-2 bg-white border text-sm text-gray-500 border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none cursor-pointer"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="severity">Sort by Severity</option>
                    <option value="name">Sort by Name</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="pl-4 pr-10 py-2 bg-white border text-sm text-gray-500 border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none cursor-pointer"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="pl-4 pr-10 py-2 bg-white border text-sm text-gray-500 border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none cursor-pointer"
                  >
                    <option value="all">All Domains</option>
                    <option value="company">company.com</option>
                    <option value="internal">internal.company.com</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant='outline'>
                  <RotateCcw className="w-4 h-4" />
                  Reset Filters
                </Button>
                <Button>
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 pb-3 mb-3 border-b border-gray-200 text-sm font-semibold text-gray-600">
            <div className="col-span-3">Threat Name</div>
            <div className="col-span-2">User/Role</div>
            <div className="col-span-2">Severity</div>
            <div className="col-span-2">Domain</div>
            <div className="col-span-1">Records</div>
            <div className="col-span-1">Last Detected</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="space-y-3">
            {threats.map((threat, index) => {
              const Icon = threat.icon;
              return (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 items-center py-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <div className={`w-10 h-10 ${threat.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${threat.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{threat.name}</p>
                      <p className="text-xs text-gray-500">ID: {threat.id}</p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <p className="text-sm text-gray-700">{threat.user}</p>
                  </div>

                  <Badge
                    variant={getThreatSeverityVariant(threat.severity)}
                    size="sm"
                    className="col-span-2"
                  >
                    {threat.severity}
                  </Badge>


                  <div className="col-span-2">
                    <p className="text-sm text-gray-700">{threat.domain}</p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-sm text-gray-700">{threat.records}</p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-sm text-gray-700">{threat.lastDetected}</p>
                  </div>

                  <div className="col-span-1 flex items-center justify-end ">
                    <button  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors" title="View">
                      <Eye className="w-4 h-4 text-orange-500" />
                    </button>
                    <button  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors" title="Resolve">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </button>
                    <button  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors" title="Dismiss">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>


          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">Showing 1 to 4 of 47 results</p>
            <div className="flex items-center gap-2">
              <button  className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronDown className="w-4 h-4 text-gray-600 transform rotate-90" />
              </button>
              <button  className="w-9 h-9 flex items-center justify-center bg-orange-500 text-white rounded-lg font-semibold">
                1
              </button>
              <button  className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                2
              </button>
              <button  className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                3
              </button>
              <button  className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronDown className="w-4 h-4 text-gray-600 transform -rotate-90" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ThreatsIncidentsPage;