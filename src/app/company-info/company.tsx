"use client";

import React from 'react';
import { Building2, Check, BarChart3, Globe, Calendar, MapPin, Users, Server, FileText, TrendingUp, Shield, Archive, CreditCard, Edit2 } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';

const CompanyInfoPage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Company Information</h1>
          <p className="text-gray-600">An overview of your organization's key details and domain insights.</p>
        </div>


        <Card>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">TechCorp Solutions</h2>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Verified Domain</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant='outline'>
                Upgrade Plan
              </Button>
              <Button >
                <Edit2 className="w-4 h-4" />
                Edit Company Info
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Industry</p>
                <p className="font-semibold text-gray-900">Technology</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Founded</p>
                <p className="font-semibold text-gray-900">2018</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Company Size</p>
                <p className="font-semibold text-gray-900">51-200 employees</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-900">San Francisco, CA</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <a href="https://techcorp.com" className="font-semibold text-orange-500 hover:text-orange-600">
                  techcorp.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Server className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Domain</p>
                <p className="font-semibold text-gray-900">techcorp.com</p>
              </div>
            </div>
          </div>
        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">

          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-gray-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Basic Details</h3>
              </div>
              <button className="text-orange-500 font-medium text-sm hover:text-orange-600 flex items-center gap-1 cursor-pointer">
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Founded</span>
                <span className="font-semibold text-gray-900">March 2018</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Company Size</span>
                <span className="font-semibold text-gray-900">250-500 employees</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Headquarters</span>
                <span className="font-semibold text-gray-900">San Francisco, CA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Website</span>
                <a href="https://techcorp.com" className="font-semibold text-orange-500 hover:text-orange-600">
                  techcorp.com
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-900 mb-2">
                Leading fintech company providing secure payment solutions and financial infrastructure for modern businesses worldwide.
              </p>
              <p className="text-sm text-gray-500 italic">
                "Empowering the future of digital finance"
              </p>
            </div>
          </Card>


          <Card>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Monitoring Overview</h3>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 mb-1">12</p>
                <p className="text-sm text-gray-600">Monitored Domains</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 mb-1">247</p>
                <p className="text-sm text-gray-600">Active Employees</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monitoring Since</span>
                <span className="font-semibold text-gray-900">Jan 15, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Scan Frequency</span>
                <span className="font-semibold text-gray-900">Every 24 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Security Rating</span>
                <Badge>
                  <Shield className="w-3 h-3" />
                  Excellent
                </Badge>
              </div>
            </div>
          </Card>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Activity & History</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Created</span>
                <span className="font-semibold text-gray-900">June 15, 2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Activity</span>
                <span className="font-semibold text-gray-900">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Alerts Detected</span>
                <span className="font-semibold text-gray-900">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Issues Resolved</span>
                <span className="font-semibold text-gray-900">1,198</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm text-green-900 font-medium">
                  +3 domains added in last 30 days
                </p>
              </div>
            </div>
          </Card>


          <Card>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Verification & Compliance</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Domain Verification</span>
                <div className="flex items-center gap-2">
                  <Badge>
                    10 Verified
                  </Badge>
                  <Badge>
                    2 Pending
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600">Compliance Certificates</span>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">ISO 27001, SOC 2 Type II</p>
                  <p className="text-xs text-gray-500">Valid until Dec 2025</p>
                </div>
              </div>
            </div>

            <Button className='w-full flec items-center justify-center py-4' variant='outline'>
              <FileText className="w-4 h-4" />
              View Compliance Report
            </Button>
          </Card>
        </div>


        <Card>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Edit2 className="w-4 h-4" />
              Edit Company Info
            </Button>
            <Button variant='outline'>
              <TrendingUp className="w-4 h-4" />
              Upgrade Plan
            </Button>
            <Button variant='outline'>
              <CreditCard className="w-4 h-4" />
              View Billing History
            </Button>
            <Button variant='outline'>
              <Globe className="w-4 h-4" />
              Manage Domains
            </Button>
            <Button variant='outline'>
              <Archive className="w-4 h-4" />
              Archive Company
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyInfoPage;