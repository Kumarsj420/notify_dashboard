"use client";

import React from "react";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "../Modals";

interface AddEmployeeProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>Add Employee</ModalHeader>
      <ModalBody>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Software Engineer"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Email
            </label>
            <input
              type="email"
              placeholder="john@company.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personal Email
            </label>
            <input
              type="email"
              placeholder="john@gmail.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1234567890"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="New York, NY"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end space-x-3 w-full">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 w-1/2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-300 hover:bg-orange-400 text-white rounded-lg text-sm font-medium w-1/2"
          >
            Add Employee
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default AddEmployee;
