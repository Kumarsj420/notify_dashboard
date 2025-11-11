"use client";

import React, { useEffect, useState } from "react";

interface Popup {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface PopupManagerProps {
  popups: Popup[];
}

const PopupManager: React.FC<PopupManagerProps> = ({ popups }) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Detect clicks on ANY popup-trigger button
  useEffect(() => {
    const handler = (e: any) => {
      const btn = e.target.closest(".popup-trigger");
      if (!btn) return;

      const popupId = btn.getAttribute("data-popup");
      setActivePopup(popupId);
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const closePopup = () => setActivePopup(null);

  return (
    <>
      {popups.map((popup) =>
        popup.id === activePopup ? (
          <div
            key={popup.id}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
          >
            <div className="bg-white rounded-2xl shadow-xl w-[380px] p-6 relative">
              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>

              <h2 className="text-lg font-semibold mb-2">{popup.title}</h2>
              <div className="text-sm text-gray-700">{popup.content}</div>
            </div>
          </div>
        ) : null
      )}
    </>
  );
};

export default PopupManager;
