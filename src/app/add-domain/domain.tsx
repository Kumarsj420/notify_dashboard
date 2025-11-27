"use client";

import { useState } from "react";
import Title from "@/components/Title";
import Intro from "@/components/Intro";
import Card from "@/components/Card";


export default function Resume() {

  return (
    <>
<Card>
  <div className="flex gap-12">
    <form className="space-y-6 flex-1">
      {/* Domain Name */}
      <div>
        <label className="block text-sm font-medium text-sc-900 mb-2">
          Domain Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="example.com"
          className="w-full border border-sc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-p-500"
        />
        <p className="text-xs text-sc-500 mt-1">
          Enter your domain without protocol (e.g., example.com)
        </p>
      </div>


      <div>
        <label className="block text-sm font-medium text-sc-900 mb-2">
          Description <span className="text-sc-400 text-sm">(Optional)</span>
        </label>
        <textarea
          placeholder="Optional note about this domain..."
          rows={8}
          className="w-full border border-sc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-p-500"
        ></textarea>
      </div>


      <div>
        <label className="block text-sm font-medium text-sc-900 mb-2">
          Scan Frequency
        </label>
        <select className="w-full border border-sc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-p-500">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>


      <div className="flex justify-between items-center pt-4">

        <button
          type="submit"
          className="bg-p-500 hover:bg-p-600 text-white px-6 py-2 rounded-lg w-full font-medium"
        >
          + Add Domain
        </button>
      </div>
    </form>

    <div className="flex-1">
      <div className="grid grid-cols-1 gap-12">
        <div>
          <h3 className="text-sm font-bold text-sc-900 mb-3">
            Monitoring Options
          </h3>
          <div className="space-y-3">
            {[
              { label: "Include Subdomains", desc: "Monitor all subdomains automatically" },
              { label: "Monitor for Credential Leaks", desc: "Track exposed credentials and passwords", default: true },
              { label: "Enable Dark Web Scanning", desc: "Monitor dark web marketplaces", default: true },
              { label: "Real-Time Alerts", desc: "Instant notifications for new threats" },
            ].map((opt, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-sc-900">{opt.label}</p>
                  <p className="text-xs text-sc-500">{opt.desc}</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={opt.default || false}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-sc-200 peer-checked:bg-p-500 rounded-full relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:left-[2px] after:top-[2px] after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            ))}
          </div>
        </div>


        <div>
          <h3 className="text-sm font-bold text-sc-900 mb-3">
            Verification Method
          </h3>
          <div className="space-y-3">
            {[
              { label: "DNS TXT Record", desc: "Add a TXT record to your DNS settings", selected: true },
              { label: "HTML Upload", desc: "Upload verification file to your website" },
              { label: "Email Verification", desc: "Verify via admin email address" },
            ].map((method, i) => (
              <label
                key={i}
                className={`block border rounded-lg p-3 cursor-pointer hover:border-p-500 transition ${
                  method.selected ? "border-p-500 bg-p-50" : "border-sc-200"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="verification"
                    defaultChecked={method.selected || false}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-sc-900">{method.label}</p>
                    <p className="text-xs text-sc-500">{method.desc}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</Card>

    </>
  );
}
