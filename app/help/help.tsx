"use client";

import React, { useState } from 'react';
import { Mail, Clock, MessageCircle, Book, CreditCard, Headphones, ChevronDown, Star, Paperclip } from 'lucide-react';
import Card from '../components/Card';

const HelpSupportPage = () => {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [rating, setRating] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I verify my domain?',
      answer: 'To verify your domain, you need to add a DNS TXT record or upload an HTML file to your website root directory. Detailed instructions are available in your dashboard.'
    },
    {
      id: 2,
      question: 'What types of breaches do you monitor?',
      answer: 'We monitor for data breaches, credential leaks, exposed databases, compromised email addresses, and various security incidents across the dark web and public sources.'
    },
    {
      id: 3,
      question: 'How often do you scan for employee exposure?',
      answer: 'We perform continuous monitoring with scans running every 24 hours. Enterprise plans can access real-time scanning capabilities.'
    },
    {
      id: 4,
      question: 'Can I customize notification settings?',
      answer: 'Yes, you can fully customize notification preferences including frequency, severity levels, and delivery channels (email, SMS, webhook) from your account settings.'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">Get assistance, report issues, or explore NotifyBreach resources.</p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Support</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />

              <div className="relative">
                <select
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                >
                  <option value="">Issue Type</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="account">Account Access</option>
                  <option value="feature">Feature Request</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <textarea
                placeholder="Describe your issue..."
                rows="5"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Paperclip className="w-4 h-4" />
                <span>Attach screenshot (optional)</span>
              </div>

              <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Send Message
              </button>
            </div>
          </Card>

          {/* Get in Touch */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">support@notifybreach.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Response Time</p>
                    <p className="text-sm text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Open Live Chat
                </button>
                <button className="w-full py-3 bg-white border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Email Support
                </button>
              </div>
            </Card>

            {/* System Status */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">System Status</h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Dashboard</span>
                  <span className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">API</span>
                  <span className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Scanning Engine</span>
                  <span className="flex items-center gap-2 text-yellow-600 text-sm font-semibold">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    Maintenance
                  </span>
                </div>
              </div>

              <a href="#" className="text-orange-500 font-medium text-sm hover:text-orange-600 flex items-center gap-1">
                View Status Page →
              </a>
            </Card>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Contact Support */}
          <Card>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600 mb-4">
              Reach our support team for account or billing queries.
            </p>
            <button className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Contact Us
            </button>
          </Card>

          {/* Knowledge Base */}
          <Card>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-sm text-gray-600 mb-4">
              Browse detailed guides and FAQs.
            </p>
            <button className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              View Docs
            </button>
          </Card>

          {/* Billing Support */}
          <Card>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Billing Support</h3>
            <p className="text-sm text-gray-600 mb-4">
              Need help with invoices or renewals?
            </p>
            <button className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Billing Help
            </button>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <input
            type="text"
            placeholder="Filter FAQs..."
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-6"
          />

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedFaq === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Feedback Section */}
        <Card>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Have Feedback?</h2>
            <p className="text-gray-600">Help us improve NotifyBreach with your suggestions</p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-colors"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            placeholder="Share your feedback..."
            rows="5"
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none mb-4"
          />

          <div className="flex justify-center">
            <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Submit Feedback
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpSupportPage;