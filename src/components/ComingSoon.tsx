"use client";

import React from "react";
import { Clock, Construction } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "We’re working hard to bring this feature to you. Stay tuned for updates.",
  icon,
}) => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 p-8">
        
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
          {icon ?? <Construction size={28} />}
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          {description}
        </p>

        <div className="my-6 h-px bg-gray-200" />

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>Feature under development</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
