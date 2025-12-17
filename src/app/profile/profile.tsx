"use client";

import React, { useState } from 'react';
import { Camera, Check, Settings, Shield, CreditCard, Bell, Clock, Edit2, Monitor, Smartphone } from 'lucide-react';
import Card from '@/components/Card';
import Label from '@/components/form/Label';
import Button from '@/components/Button';
import Input from '@/components/form/Input';

const ProfilePage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dashboardAlerts, setDashboardAlerts] = useState(true);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">

        <Card className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-orange-100"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <Camera className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Michael Rodriguez</h1>
                <p className="text-gray-600">michael.rodriguez@techcorp.com</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                    <Shield className="w-3 h-3" />
                    Administrator
                  </span>
                  <span className="text-sm text-gray-600">TechCorp Solutions</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Last login: Today at 9:42 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="px-5 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
                <Edit2 className="w-3 h-3" />
                Edit Profile
              </Button>
              <button className="p-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Personal Details</h2>
              <button className="text-orange-500 font-medium text-sm hover:text-orange-600">
                Edit
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label required>Full Name</Label>
                <Input
                  type="text"
                  defaultValue="Michael Rodriguez"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Email Address</label>
                <div className="relative">
                  <Input
                    type="email"
                    defaultValue="michael.rodriguez@techcorp.com"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    readOnly
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-green-600 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Verified
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Phone Number</label>
                <Input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Time Zone</label>
                  <select className="w-full h-10 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 ring-[0.1em] ring-inset outline-none border-none focus:ring-2 font-medium text-sc-900 focus:ring-p-400 bg-white hover:border-sc-400  ring-sc-400/60">
                    <option>EST (UTC-5)</option>
                    <option>PST (UTC-8)</option>
                    <option>CST (UTC-6)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Language</label>
                  <select className="w-full h-10 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 ring-[0.1em] ring-inset outline-none border-none focus:ring-2 font-medium text-sc-900 focus:ring-p-400 bg-white hover:border-sc-400  ring-sc-400/60">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>


          <Card>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">Security & Access</h2>
            </div>

            <div className="space-y-6">

              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Password</p>
                  <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                </div>
                <button className="text-orange-500 font-medium text-sm hover:text-orange-600">
                  Change
                </button>
              </div>


              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </div>
              </div>


              <div>
                <p className="font-semibold text-gray-900 mb-3">Recent Sessions</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Windows • Chrome</p>
                        <p className="text-xs text-gray-600">New York, NY • Current session</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-green-600">Active</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">iPhone • Safari</p>
                        <p className="text-xs text-gray-600">New York, NY • 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-red-600 hover:text-red-700">
                      Revoke
                    </button>
                  </div>
                </div>

                <button className="w-full mt-3 py-2.5 text-red-600 border border-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                  Logout from all other devices
                </button>
              </div>
            </div>
          </Card>


          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Company Information</h2>
              </div>
              <button className="text-orange-500 font-medium text-sm hover:text-orange-600 cursor-pointer">
                Edit Details
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Company Name</p>
                <p className="font-semibold text-gray-900">TechCorp Solutions</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Industry</p>
                <p className="font-semibold text-gray-900">Technology</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Company Size</p>
                <p className="font-semibold text-gray-900">500-1000 employees</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-semibold text-gray-900">New York, NY</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <p className="text-sm text-blue-900">
                Linked to domain monitoring and employee management
              </p>
            </div>
          </Card>


          <Card>
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">Subscription & Billing</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Current Plan</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-orange-500">Enterprise</span>
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Next billing date: January 15, 2024</p>
                <p className="text-sm text-gray-600 mb-2">Domain usage: 8 of 50 domains monitored</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant='outline' className="w-full flex items-center justify-center">
                  Manage Billing
                </Button>
                <Button variant='outline' className="w-full flex items-center justify-center">
                  View Invoices
                </Button>
              </div>

              <Button className="w-full text-center flex items-center justify-center">
                Upgrade Plan
              </Button>
            </div>
          </Card>


          <Card>
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">Notification & Preferences</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive alerts via email</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Dashboard Alerts</p>
                  <p className="text-sm text-gray-600">Show alerts in dashboard</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={dashboardAlerts}
                    onChange={(e) => setDashboardAlerts(e.target.checked)}
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Alert Frequency</label>
                <select className="w-full h-10 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 ring-[0.1em] ring-inset outline-none border-none focus:ring-2 font-medium text-sc-900 focus:ring-p-400 bg-white hover:border-sc-400  ring-sc-400/60">
                  <option>Instant</option>
                  <option>Hourly</option>
                  <option>Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Severity Filter</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-900">High</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-900">Medium</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-gray-300 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-900">Low</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>


          <Card>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Added domain techcorp.com</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Verified employee Sarah Johnson</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Resolved 3 security threats</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Last scan completed</p>
                  <p className="text-xs text-gray-500">Today at 10:45 AM</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;