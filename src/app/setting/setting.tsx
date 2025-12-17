"use client";

import React, { useState } from 'react';
import { Bell, Globe, Shield, Mail, Smartphone, Eye, EyeOff, Save } from 'lucide-react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/form/Input';
import Label from '@/components/form/Label';

const SettingsPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>


        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Notifications</h3>
          </div>

          <div className="space-y-6">

            <div className="pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Email Notifications</h4>
              <div className="space-y-4">
                {[
                  { label: 'Asset monitoring alerts', description: 'Get notified when assets require attention' },
                  { label: 'Weekly reports', description: 'Receive weekly summary of your assets' },
                  { label: 'Security updates', description: 'Important security notifications' },
                  { label: 'Product updates', description: 'New features and announcements' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 ml-4">
                      <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                      <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Push Notifications</h4>
              <div className="space-y-4">
                {[
                  { label: 'Critical alerts', description: 'Urgent notifications requiring immediate action' },
                  { label: 'Team mentions', description: 'When someone mentions you' },
                  { label: 'Status changes', description: 'Asset status updates' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 ml-4">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Security</h3>
          </div>

          <div className="space-y-6">
            {/* Change Password */}
            <div className="pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Change Password</h4>
              
              <div className="space-y-4 max-w-2xl">
                <div>
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label>New Password</Label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button>
                  Update Password
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 max-w-2xl">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900">2FA Enabled</p>
                  <p className="text-xs text-green-700">Using authenticator app</p>
                </div>
              </div>
            </div>
          </div>
        </Card>


        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Preferences</h3>
          </div>

          <div className="space-y-6">

            <div className="pb-6 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Language & Region</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div>
                  <Label>Language</Label>
                  <select className="w-full h-10 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 ring-[0.1em] ring-inset outline-none border-none focus:ring-2 font-medium text-sc-900 focus:ring-p-400 bg-white hover:border-sc-400  ring-sc-400/60">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <Label>Timezone</Label>
                  <select className="w-full h-10 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 ring-[0.1em] ring-inset outline-none border-none focus:ring-2 font-medium text-sc-900 focus:ring-p-400 bg-white hover:border-sc-400  ring-sc-400/60">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                  </select>
                </div>
              </div>
            </div>


            <div className="pb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Date & Time Format</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div>
                  <Label>Date Format</Label>
                  <select className="w-full h-10 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 ring-[0.1em] ring-inset outline-none border-none focus:ring-2 font-medium text-sc-900 focus:ring-p-400 bg-white hover:border-sc-400  ring-sc-400/60">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <Label>Time Format</Label>
                  <select className="w-full h-10 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 ring-[0.1em] ring-inset outline-none border-none focus:ring-2 font-medium text-sc-900 focus:ring-p-400 bg-white hover:border-sc-400  ring-sc-400/60">
                    <option>12-hour</option>
                    <option>24-hour</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </Card>


        <div className="flex justify-end gap-3">
          <Button variant='outline'>
            Cancel
          </Button>
          <Button>
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;