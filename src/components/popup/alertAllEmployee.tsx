"use client";

import React from "react";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "../Modals";

interface AlertEmployeeProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

const AlertEmployee: React.FC<AlertEmployeeProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>Alert All Employees</ModalHeader>
      <ModalBody>
        <p className="text-gray-700">
          Are you sure you want to alert all employees? An email will be sent to their official work addresses.
        </p>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={() => {
            // you can trigger alert logic here
            onClose(false);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Yes, Alert All
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AlertEmployee;
