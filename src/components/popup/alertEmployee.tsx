"use client";

import React, { useState } from "react";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "../Modals";

interface AlertEmployeeProps {
  open: boolean;
  onClose: (value: boolean) => void;
  email: string;
  name: string
}

const AlertEmployee: React.FC<AlertEmployeeProps> = ({ open, onClose, email, name }) => {
  const [alertOfficial, setAlertOfficial] = useState(false);
  const [alertPersonal, setAlertPersonal] = useState(false);

  const handleAlert = () => {
    const chosenEmails = [];
    if (alertOfficial) chosenEmails.push(`Official: ${email}`);
    if (alertPersonal) chosenEmails.push(`Personal: ${email}`);

    if (chosenEmails.length === 0) {
      alert("Please select at least one option.");
      return;
    }

    console.log("Alerting via:", chosenEmails);
    onClose(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>Alert {name}</ModalHeader>
      <ModalBody>
        <p className="text-gray-700 mb-4">
          Choose how you’d like to alert this employee:
        </p>

        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={alertOfficial}
              onChange={(e) => setAlertOfficial(e.target.checked)}
            />
            <span>Alert via <b>official email</b> — {email}</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={alertPersonal}
              onChange={(e) => setAlertPersonal(e.target.checked)}
            />
            <span>Alert via <b>personal email</b> — {email}</span>
          </label>
        </div>
      </ModalBody>

      <ModalFooter>
        <button
          onClick={handleAlert}
          className="bg-p-500 hover:bg-p-400 text-white px-4 py-2 rounded-lg w-full"
        >
          Send Alert
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AlertEmployee;
