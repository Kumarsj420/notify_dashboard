"use client";

import React, { useState } from "react";
 
const AddEmployee = () => {
  const [form, setForm] = useState({
    fullName: "",
    jobTitle: "",
    workEmail: "",
    personalEmail: "",
    phone: "",
    location: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>


      <div className="space-y-1">
        <label className="text-sm font-medium">Job Title</label>
        <input
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          placeholder="Software Engineer"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>


      <div className="space-y-1">
        <label className="text-sm font-medium">Work Email</label>
        <input
          name="workEmail"
          value={form.workEmail}
          onChange={handleChange}
          placeholder="john@company.com"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>


      <div className="space-y-1">
        <label className="text-sm font-medium">Personal Email</label>
        <input
          name="personalEmail"
          value={form.personalEmail}
          onChange={handleChange}
          placeholder="john@gmail.com"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>


      <div className="space-y-1">
        <label className="text-sm font-medium">Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1234567890"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>


      <div className="space-y-1">
        <label className="text-sm font-medium">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="New York, NY"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>


      <div className="flex justify-end gap-3 pt-2">
        <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm">
          Cancel
        </button>
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
