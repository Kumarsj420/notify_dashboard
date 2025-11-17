"use client";

import React, { useState } from "react";
import Tabs, { Tab } from "../components/Tabs";
import TableSkeleton from "../components/TableSkeleton";
import { Siren, Plus, AlertTriangle, ShieldAlert } from 'lucide-react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserIcon
} from '@heroicons/react/20/solid'
import Modal, { ModalHeader, ModalBody, ModalFooter } from "../components/Modals";
import Accordian, { AccordianHeader, AccordianBody } from "../components/Accordian";

import { EmployeeExposureData } from "../data/EmployeeExposureData";
const mockData = EmployeeExposureData;


import EmployeeList from "../components/employeeList";
import { employeeData } from "../data/employeeData";


import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TablePagination,
  TableStructure,
} from "../components/Table";


const domainTabs: Tab[] = [
  { name: "Identity theft", count: "6" },
  { name: "Malware infections", count: "52" },
];

const Domain: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState("Identity theft");

  const [isLoading, setIsLoading] = useState(false);


  const handleTabChange = (tab: Tab) => {
    if (tab.name === activeTab) return;
    setIsLoading(true);
    setActiveTab(tab.name);
    setTimeout(() => setIsLoading(false), 600);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-700";
      case "midium":
        return "bg-yellow-100 text-yellow-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const [tableData, setTableData] = useState(mockData);
  const handleStatusToggle = (id: string) => {
    setTableData(prev =>
      prev.map(item =>
        item.id === id
          ? {
            ...item,
            status: item.status === "resolve" ? "resolved" : "resolve",
          }
          : item
      )
    );
  };

  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [addEmploeyee, setAddEmployee] = useState(false);
  const [addAlertAll, setAddAlertAll] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const handleViewModal = (employee: any) => {
    setSelectedEmployee(employee);
    setViewOpen(true);
  };

  const handleEditModal = (employee: any) => {
    setSelectedEmployee(employee);
    setEditOpen(true);
  };

  const handleAlertModal = (employee: any) => {
    setSelectedEmployee(employee);
    setAlertOpen(true);
  };

  return (
    <>

      <Modal open={addEmploeyee} maxWidth="xl" onClose={setAddEmployee}>
        <ModalHeader onClose={setAddEmployee}>Add Employee</ModalHeader>
        <ModalBody>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-sc-300 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Software Engineer"
                className="w-full border border-sc-300 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                className="w-full border border-sc-300 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal Email
              </label>
              <input
                type="email"
                placeholder="john@gmail.com"
                className="w-full border border-sc-300 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1234567890"
                className="w-full border border-sc-300 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="New York, NY"
                className="w-full border border-sc-300 rounded-xl px-3 py-2 text-sm placeholder:text-sc-500/80 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setAddEmployee(false)}
              type="button"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition bg-white text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-400 transition text-sm font-semibold"
            >
              Add Employee
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal open={addAlertAll} maxWidth="xl" onClose={setAddAlertAll}>
        <ModalHeader onClose={setAddAlertAll}>Alert All Employees</ModalHeader>
        <ModalBody className="relative z-10">
          <ShieldCheckIcon className="absolute top-1/2 left-1/2 -translate-1/2 size-24 -z-10 text-emerald-400/40" />
          <p className="text-gray-600/90">
            Are you sure you want to send an alert to all employees? This action will immediately trigger email notifications to their official work addresses. Please confirm before proceeding, as this message will be distributed organization-wide and may require follow-up communication or action.
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setAddAlertAll(false)}
              type="button"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition bg-white text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-xl text-sm font-semibold "
            >
              Yes, Alert All
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal open={alertOpen} maxWidth="xl" onClose={setAlertOpen}>
        <ModalHeader onClose={setAlertOpen}>Alert Rohan Gupta</ModalHeader>
        <ModalBody>
          <p className="text-gray-700 mb-4">
            Choose how you’d like to alert this employee:
          </p>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="radio" name='alert-email'
              />
              <span>Alert via <b>official email</b>: example@email.com</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio" name='alert-email'
              />
              <span>Alert via <b>personal email</b>: example@email.com</span>
            </label>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setAddEmployee(false)}
              type="button"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition bg-white text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-400 transition text-sm font-semibold"
            >
              Send Alert
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal open={editOpen} maxWidth="xl" onClose={setEditOpen}>
        <ModalHeader onClose={setEditOpen}>Edit Contact Details</ModalHeader>
        <ModalBody>
          {/* Profile Section */}
          <div className="flex items-center gap-4 bg-linear-to-b from-sc-50 to-sc-100 border border-sc-200 rounded-xl p-4 mb-6">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Profile"
              className="size-12 ring-[0.1em] ring-sc-300 ring-offset-2 ring-offset-white rounded-full border border-gray-200 object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">Dan Hockenmaier</h3>
              <p className="text-sm text-sc-600/90 font-light">Chief Strategy Officer</p>
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                placeholder="work@company.com"
                className="w-full rounded-xl border border-sc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-p-500 focus:border-transparent transition placeholder:text-sc-500/80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal Email
              </label>
              <input
                type="email"
                defaultValue="hockenmaier@gmail.com"
                className="w-full rounded-xl border border-sc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-p-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 805-320-2386"
                className="w-full rounded-xl border border-sc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-p-500 focus:border-transparent transition"
              />
            </div>

          </form>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setEditOpen(false)}
              type="button"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition bg-white text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-400 transition text-sm font-semibold"
            >
              Save Changes
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal open={viewOpen} maxWidth="3xl" onClose={setViewOpen}>
        <ModalHeader onClose={setViewOpen}>Employee Details & Threat Profile</ModalHeader>
        <ModalBody>
          <div className="md:flex md:items-center md:justify-between md:space-x-5v">
            <div className="flex items-start space-x-5 pt-2 pb-7 border-b border-b-sc-200 w-full">
              <div className="shrink-0">
                <div className="relative">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                    className="size-12 ring-[0.1em] ring-offset-4 ring-sc-300 rounded-full"
                  />
                  <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                </div>
              </div>

              <div className="">
                <div className="flex gap-4 items-center">
                  <h2 className="text-2xl/8 font-bold text-gray-900">Ricardo Cooper</h2>
                  <div className=" flex flex-row gap-2 items-center">
                    <span className=" ring-1 ring-inset ring-red-200 px-3 py-1 bg-linear-to-b from-red-50 to-red-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-red-600">
                      <ShieldAlert className="size-3.5" />
                      Critical
                    </span>
                    <span className=" ring-1 ring-inset ring-sc-300/80 px-3 py-1 bg-linear-to-b from-sc-50 to-sc-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-sc-600/90">
                      8 Exposure
                    </span>
                  </div>
                </div>
                <span className="text-sm/5  text-sc-600/90 font-light">
                  <span className="text-sc-700 font-medium">CPO</span> @ Faire, ex-VP Product & Design @ WhatsApp
                </span>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-600/90 font-light">
                    <EnvelopeIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
                    example@email.com
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600/90 font-light">
                    <PhoneIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
                    1234567879
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600/90 font-light">
                    <MapPinIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
                    San Francisco, California, United States
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-xl/7 font-semibold text-sc-900">Detailed Threat Profiles</h2>
            <p className="text-sm/5 font-light text-sc-600/90">Comprehensive overview of data breach exposure.</p>
          </div>
          <div className="mt-3 ring-1 w-full ring-inset ring-sc-300 px-5 py-4 rounded-xl bg-sc-50">
            <span className="ring-1 ring-inset ring-amber-200 px-3 py-1 bg-linear-to-b from-amber-50 to-amber-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-amber-600 w-max">
              <AlertTriangle className="size-3.5" />
              Medium
            </span>

            <h2 className="mt-2 font-semibold text-lg">Personal Email Analysis</h2>
            <span className="text-sm/5 font-medium text-p-500 ">thevikramme@gmail.com</span>
            <div className="mt-4 flex flex-row gap-3 flex-wrap">
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Exposures : <span className="font-semibold text-sc-900"> 2</span> </span>
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Last Scanned : <span className="font-semibold text-sc-900"> 05/10/2025</span> </span>
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Status : <span className="font-semibold text-emerald-500"> Completed</span> </span>
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Databases : <span className="font-semibold text-sc-900"> 2</span> </span>
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Total Results : <span className="font-semibold text-sc-900"> 2</span> </span>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold flex gap-2 items-center">
                <ShieldCheckIcon className="size-6 text-sc-500" />
                Recent Data Exposures</h3>
              <Accordian className="mt-3">
                <AccordianHeader>
                  <div className="flex gap-4">
                    <div className="p-2.5 ring-1 ring-inset ring-p-200 rounded-lg bg-linear-to-b from-p-50 to-p-100 h-max">
                      <UserIcon className="size-6 text-p-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-left">
                        Canva</h3>
                      <div className="mt-1 flex gap-2">
                        <span className="text-xs font-bold px-2 py-1 ring-1 ring-inset ring-p-200 rounded-lg bg-linear-to-b  from-p-50 to-p-100 text-p-500">1 Record</span>
                        <span className="text-sm text-sc-600/90 font-light">Database Breach</span>
                      </div>
                    </div>
                  </div>
                </AccordianHeader>
                <AccordianBody>
                  <p className="text-sc-500  text-sm">In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence and passwords stored as bcrypt hashes for users not using social logins.</p>
                  <div>

                    <div className="px-4 sm:px-0 mt-5">
                      <h3 className="text-base/7 font-semibold text-gray-900">Exposed Data Fields</h3>
                      <p className=" max-w-2xl text-sm/5 text-gray-500">Compromised details are listed below.</p>
                    </div>
                    <div className="mt-4 border-t border-gray-100">
                      <dl className="divide-y divide-gray-100">
                        <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
                          <dd className="mt-1 text-sm/6 text-p-500 hover:text-p-400 sm:col-span-2 sm:mt-0 font-semibold">Verify email to see leaked email info</dd>
                        </div>
                        <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Username</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">vikram_mehta</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Vikram Mehta</dd>
                        </div>
                        <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Password
                            Encrypted</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            $2a$10$xQz8...</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </AccordianBody>
              </Accordian>
              <Accordian className="mt-3">
                <AccordianHeader>
                  <div className="flex gap-4">
                    <div className="p-2.5 ring-1 ring-inset ring-p-200 rounded-lg bg-linear-to-b from-p-50 to-p-100 h-max">
                      <UserIcon className="size-6 text-p-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-left">
                        Cit0Day</h3>
                      <div className="mt-1 flex gap-2">
                        <span className="text-xs font-bold px-2 py-1 ring-1 ring-inset ring-p-200 rounded-lg bg-linear-to-b  from-p-50 to-p-100 text-p-500">1 Record</span>
                        <span className="text-sm text-sc-600/90 font-light">Database Breach</span>
                      </div>
                    </div>
                  </div>
                </AccordianHeader>
                <AccordianBody>
                  <p className="text-sc-500  text-sm"> CIT0DAY is an now non -existent service for the search for e -mail among various leaks. After its closure in November 2020, a collection of more than 23,000 hacked sites fell into open access. The data was sorted into several dozen categories and contained more than 226 million posts and passwords to them. Some passwords were protected with the help of hashes.</p>
                  <div>

                    <div className="px-4 sm:px-0 mt-5">
                      <h3 className="text-base/7 font-semibold text-gray-900">Exposed Data Fields</h3>
                      <p className=" max-w-2xl text-sm/5 text-gray-500">Compromised details are listed below.</p>
                    </div>
                    <div className="mt-4 border-t border-gray-100">
                      <dl className="divide-y divide-gray-100">
                        <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
                          <dd className="mt-1 text-sm/6 text-p-500 hover:text-p-400 sm:col-span-2 sm:mt-0 font-semibold">Verify email to see leaked email info</dd>
                        </div>
                        <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Category</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Business</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Leak Site</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">accentsourcing.com</dd>
                        </div>
                        <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Password
                            Encrypted</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            $2a$10$268e0382332e1d8380994u</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </AccordianBody>
              </Accordian>
            </div>



          </div>
          <div className="mt-3 ring-1 w-full ring-inset ring-sc-300 px-5 py-4 rounded-xl bg-sc-50">
            <span className="ring-1 ring-inset ring-emerald-200 px-3 py-1 bg-linear-to-b from-emerald-50 to-emerald-100 rounded-xl flex flex-row justify-center items-center gap-2 text-xs font-semibold text-emerald-600 w-max">
              <AlertTriangle className="size-3.5" />
              Low
            </span>

            <h2 className="mt-2 font-semibold text-lg">Phone Number Analysis</h2>
            <span className="text-sm/5 font-medium text-p-500 ">9825123987</span>
            <div className="mt-4 flex flex-row gap-3 flex-wrap">
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Exposures : <span className="font-semibold text-sc-900"> 2</span> </span>
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Last Scanned : <span className="font-semibold text-sc-900"> 05/10/2025</span> </span>
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Status : <span className="font-semibold text-emerald-500"> Completed</span> </span>
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Databases : <span className="font-semibold text-sc-900"> 2</span> </span>
              <span className="text-sm px-3 py-2 ring-1 ring-inset ring-sc-300/80 rounded-xl shadow-md shadow-sc-200 bg-white text-sc-600/90">Total Results : <span className="font-semibold text-sc-900"> 2</span> </span>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold flex gap-2 items-center">
                <ShieldCheckIcon className="size-6 text-sc-500" />
                Recent Data Exposures</h3>
              <Accordian className="mt-3">
                <AccordianHeader>
                  <div className="flex gap-4">
                    <div className="p-2.5 ring-1 ring-inset ring-p-200 rounded-lg bg-linear-to-b from-p-50 to-p-100 h-max">
                      <UserIcon className="size-6 text-p-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-left">
                        Canva</h3>
                      <div className="mt-1 flex gap-2">
                        <span className="text-xs font-bold px-2 py-1 ring-1 ring-inset ring-p-200 rounded-lg bg-linear-to-b  from-p-50 to-p-100 text-p-500">1 Record</span>
                        <span className="text-sm text-sc-600/90 font-light">Database Breach</span>
                      </div>
                    </div>
                  </div>
                </AccordianHeader>
                <AccordianBody>
                  <p className="text-sc-500  text-sm">In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence and passwords stored as bcrypt hashes for users not using social logins.</p>
                  <div>

                    <div className="px-4 sm:px-0 mt-5">
                      <h3 className="text-base/7 font-semibold text-gray-900">Exposed Data Fields</h3>
                      <p className=" max-w-2xl text-sm/5 text-gray-500">Compromised details are listed below.</p>
                    </div>
                    <div className="mt-4 border-t border-gray-100">
                      <dl className="divide-y divide-gray-100">
                        <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
                          <dd className="mt-1 text-sm/6 text-p-500 hover:text-p-400 sm:col-span-2 sm:mt-0 font-semibold">Verify email to see leaked email info</dd>
                        </div>
                        <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Username</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">vikram_mehta</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Vikram Mehta</dd>
                        </div>
                        <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Password
                            Encrypted</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            $2a$10$xQz8...</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </AccordianBody>
              </Accordian>
              <Accordian className="mt-3">
                <AccordianHeader>
                  <div className="flex gap-4">
                    <div className="p-2.5 ring-1 ring-inset ring-p-200 rounded-lg bg-linear-to-b from-p-50 to-p-100 h-max">
                      <UserIcon className="size-6 text-p-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-left">
                        Cit0Day</h3>
                      <div className="mt-1 flex gap-2">
                        <span className="text-xs font-bold px-2 py-1 ring-1 ring-inset ring-p-200 rounded-lg bg-linear-to-b  from-p-50 to-p-100 text-p-500">1 Record</span>
                        <span className="text-sm text-sc-600/90 font-light">Database Breach</span>
                      </div>
                    </div>
                  </div>
                </AccordianHeader>
                <AccordianBody>
                  <p className="text-sc-500  text-sm"> CIT0DAY is an now non -existent service for the search for e -mail among various leaks. After its closure in November 2020, a collection of more than 23,000 hacked sites fell into open access. The data was sorted into several dozen categories and contained more than 226 million posts and passwords to them. Some passwords were protected with the help of hashes.</p>
                  <div>

                    <div className="px-4 sm:px-0 mt-5">
                      <h3 className="text-base/7 font-semibold text-gray-900">Exposed Data Fields</h3>
                      <p className=" max-w-2xl text-sm/5 text-gray-500">Compromised details are listed below.</p>
                    </div>
                    <div className="mt-4 border-t border-gray-100">
                      <dl className="divide-y divide-gray-100">
                        <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
                          <dd className="mt-1 text-sm/6 text-p-500 hover:text-p-400 sm:col-span-2 sm:mt-0 font-semibold">Verify email to see leaked email info</dd>
                        </div>
                        <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Category</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Business</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Leak Site</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">accentsourcing.com</dd>
                        </div>
                        <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt className="text-sm/6 font-medium text-gray-900">Password
                            Encrypted</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            $2a$10$268e0382332e1d8380994u</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </AccordianBody>
              </Accordian>
            </div>



          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setAddEmployee(false)}
              type="button"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition bg-white text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-400 transition text-sm font-semibold"
            >
              Download
            </button>
          </div>
        </ModalFooter>
      </Modal>

      <div>
        <Tabs
          tabs={domainTabs.map((t) => ({
            ...t,
            current: t.name === activeTab,
          }))}
          onTabChange={handleTabChange}
        />



        <div className="mt-7 min-h-[380px] relative">
          {isLoading && <TableSkeleton />}

          {/* TAB 1 */}
          {!isLoading && activeTab === "Identity theft" && (
            <TableStructure className="" >
              <div className="flex justify-between items-center px-6 pb-5 border-b border-b-sc-200 ">
                <h1 className="text-xl font-bold"> Employees Monitoring</h1>

                <div className="flex items-center gap-2">
                  <button onClick={() => setAddEmployee(true)} className="bg-white hover:bg-sc-50 text-sc-500 rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 font-semibold shadow-md shadow-gray-200 transition cursor-pointer popup-trigger ring-1 ring-inset ring-sc-300 hover:ring-sc-400/80" data-popup="addEmployee">
                    <Plus size={16} /> Add employee
                  </button>

                  <button onClick={() => setAddAlertAll(true)} className="bg-linear-to-r from-amber-500 to-orange-600 hover:bg-sc-700 text-white rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transition cursor-pointer popup-trigger" data-popup="alertPopup">
                    <Siren size={16} className="scale-105" /> Alert all
                  </button>

                </div>
              </div>

              <div>
                {employeeData.map((event) => (
                  <EmployeeList key={event.id} data={event} onView={handleViewModal} onEdit={handleEditModal} onAlert={handleAlertModal} />
                ))}
              </div>





            </TableStructure>
          )}

          {/* TAB 2 */}
          {!isLoading && activeTab === "Malware infections" && (
            <TableStructure className="mt-7">
              <h1 className="text-xl font-bold mb-5 px-6"> Malware Infection </h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead sortable>Email</TableHead>
                    <TableHead sortable>Username</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead sortable>Url</TableHead>
                    <TableHead sortable>Source</TableHead>
                    <TableHead sortable>Risk level</TableHead>
                    <TableHead sortable>Detection date</TableHead>
                    <TableHead sortable>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {tableData.map((event) => (
                    <TableRow key={event.id}>


                      <TableCell className="text-sc-600/90 blur-xs">
                        {event.email}
                      </TableCell>
                      <TableCell className="text-sc-600/90">{event.user}</TableCell>
                      <TableCell className="text-sc-600/90">{event.password}</TableCell>
                      <TableCell className="text-sc-600/90">
                        <a href={event.url} target="_blank">
                          {event.url}
                        </a>
                      </TableCell>
                      <TableCell className="text-sc-600/90">{event.source}</TableCell>

                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(
                            event.riskLevel
                          )}`}
                        >
                          {event.riskLevel}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="px-3 py-1 rounded-full text-xs font-medium">
                          {event.detectionDate}
                        </span>
                      </TableCell>

                      <TableCell>
                        <button
                          onClick={() => handleStatusToggle(event.id)}
                          className={`
                          px-3 py-1 rounded-full text-xs font-medium cursor-pointer 
                          ${event.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"}
                        `}
                        >
                          {event.status}
                        </button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <tr>
                    <td colSpan={7}>
                      <TablePagination
                        currentPage={currentPage}
                        totalPages={42}
                        totalResults={1247}
                        onPageChange={setCurrentPage}
                      />
                    </td>
                  </tr>
                </TableFooter>
              </Table>
            </TableStructure>
          )}
        </div>


      </div>
    </>
  );
};

export default Domain;
