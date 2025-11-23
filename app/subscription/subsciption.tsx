"use client";

import React, { useState } from 'react';
import { Check, CreditCard, Download, Headphones, Shield, Lock, ArrowUp } from 'lucide-react';
import Card from '../components/Card';

const SubscriptionBillingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Subscription & Billing</h1>
          <p className="text-gray-600">Manage your plan, billing, and usage</p>
        </div>

<Card>
    <div className="grid grid-cols-3 gap-6 mx-auto">
      <div className="col-span-2">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pro Plan</h2>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                Active
              </span>
              <span className="text-sm text-gray-600 underline cursor-pointer">Monthly Billing</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-orange-600 leading-none">$99</p>
            <p className="text-sm text-gray-600">/month</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Domains Monitored</span>
              <span className="text-sm font-semibold text-gray-900">5 / 10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">

              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>


          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Employees Monitored</span>
              <span className="text-sm font-semibold text-gray-900">120 / 500</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">

              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between pt-6 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600 mb-1">Payment Method</p>
            <p className="font-semibold text-gray-900">•••• •••• •••• 1234</p>

            <p className="text-xs text-gray-500">Expires 12/25</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Next Renewal</p>

            <p className="font-semibold text-lg text-gray-900">Dec 15, 2024</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            Change Payment Method
          </button>
          <button className="text-sm font-medium text-red-600 hover:text-red-700">
            Cancel Subscription
          </button>
        </div>
      </div>


      <div className="col-span-1 bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-white mb-6">Usage Overview</h3>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Total Alerts</span>

            <span className="text-sm font-bold text-white">2,847</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Critical Threats</span>

            <span className="text-sm font-bold text-red-400">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Scans This Month</span>

            <span className="text-sm font-bold text-white">1,456</span>
          </div>
        </div>
      </div>
    </div>
</Card>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          <Card>
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-900">Billing Information</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Billing Contact</p>
                  <p className="font-semibold text-gray-900">John Smith</p>
                  <p className="text-sm text-gray-600">billing@techcorp.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/26</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-600">Current Plan</span>
                <span className="font-semibold text-gray-900">Pro Plan - $299/month</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Billing</span>
                <span className="font-semibold text-gray-900">December 15, 2024</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax ID</span>
                <span className="font-semibold text-gray-900">US-12345789</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                View Invoices
              </button>
              <button className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Change Plan
              </button>
            </div>
          </Card>


          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Billing History</h3>
              <button className="text-orange-500 font-medium text-sm hover:text-orange-600 flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download All
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">#INV-2024-001</p>
                  <p className="text-xs text-gray-600">Nov 15, 2024</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">$99.00</p>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 font-medium rounded">
                      Paid
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-orange-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">#INV-2024-002</p>
                  <p className="text-xs text-gray-600">Oct 15, 2024</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">$99.00</p>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 font-medium rounded">
                      Paid
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-orange-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Spent This Year</span>
                <span className="text-xl font-bold text-orange-500">$1,188.00</span>
              </div>
            </div>
          </Card>
        </div>


        <div className="mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upgrade Plan</h2>
            <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
            <p className="text-sm text-orange-500 font-medium mt-2">Most Popular</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-orange-500">$29</span>
                <span className="text-gray-600">/month</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Up to 3 domains</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">100 employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Daily scans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Email alerts</span>
                </div>
              </div>

              <button className="w-full py-3 bg-white border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                Current Plan
              </button>
            </Card>


            <Card>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-orange-500">$99</span>
                <span className="text-gray-600">/month</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Up to 10 domains</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">500 employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Hourly scans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Priority support</span>
                </div>
              </div>

              <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Current Plan
              </button>
            </Card>


            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-orange-500">$299</span>
                <span className="text-gray-600">/month</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Unlimited domains</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Unlimited employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Real-time scans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Dedicated support</span>
                </div>
              </div>

              <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Upgrade
              </button>
            </Card>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Subscription Actions</h3>

            <div className="space-y-3 mb-6">
              <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                <ArrowUp className="w-4 h-4" />
                Change Plan
              </button>

              <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                + Manage Add-ons
              </button>

              <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                ⏸ Pause Subscription
              </button>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <span className="text-gray-700 font-medium">Auto-Renew</span>
              <div className="relative inline-block w-12 h-6">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-green-600">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">PCI Compliant</span>
              </div>
            </div>
          </Card>


          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-6">FAQ & Support</h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold text-gray-900 mb-2">How does billing work?</p>
                <p className="text-sm text-gray-600">
                  You're billed monthly or annually based on your selected plan.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">What's your refund policy?</p>
                <p className="text-sm text-gray-600">
                  We offer a 30-day money-back guarantee for all new subscriptions.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">How does auto-renewal work?</p>
                <p className="text-sm text-gray-600">
                  Your subscription automatically renews unless cancelled 24 hours before the renewal date.
                </p>
              </div>
            </div>

            <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors  items-center justify-center gap-2">
              <div className='flex items-center justify-center gap-2'>
                <Headphones className="w-4 h-4" />
                <span>Need help?</span>
              </div>

              <div>Contact Billing Support</div>
            </button>

            <div className="flex justify-center gap-4 mt-4 text-xs">
              <a href="#" className="text-orange-500 hover:text-orange-600">Terms of Service</a>
              <a href="#" className="text-orange-500 hover:text-orange-600">Privacy Policy</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBillingPage;