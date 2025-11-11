"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Popup {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface Props {
  popups: Popup[];
}

const PopupManager: React.FC<Props> = ({ popups }) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  useEffect(() => {
    const triggers = document.querySelectorAll(".popup-trigger");

    const handleClick = (e: any) => {
      const id = e.currentTarget.getAttribute("data-popup");
      setActivePopup(id);
    };

    triggers.forEach(t => t.addEventListener("click", handleClick));

    return () => triggers.forEach(t => t.removeEventListener("click", handleClick));
  }, []);

  const closePopup = () => setActivePopup(null);

  const current = popups.find(p => p.id === activePopup);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1000]"
    >
      {/* Popup box */}
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-fadeIn relative p-6">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{current.title}</h2>
          <button onClick={closePopup}>
            <X className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Popup content */}
        <div>{current.content}</div>

        {/* Close on outside click */}
        <button
          onClick={closePopup}
          className="absolute inset-0 -z-10"
        />
      </div>
    </div>
  );
};

export default PopupManager;
