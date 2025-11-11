"use client";

import React, { useState } from "react";

export const renderAlertEmployeePopup = (payload: any) => {
  const { fullName, workEmail, personalEmail } = payload;
  const [selectedEmail, setSelectedEmail] = useState(workEmail);

  return (
    <div className="space-y-4">
      <p className="text-gray-700">
        You are about to send an alert to <b>{fullName}</b>.
      </p>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            checked={selectedEmail === workEmail}
            onChange={() => setSelectedEmail(workEmail)}
          />
          Work email: <b>{workEmail}</b>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            checked={selectedEmail === personalEmail}
            onChange={() => setSelectedEmail(personalEmail)}
          />
          Personal email: <b>{personalEmail}</b>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button className="border px-4 py-2 rounded-lg">Cancel</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Alert
        </button>
      </div>
    </div>
  );
};
