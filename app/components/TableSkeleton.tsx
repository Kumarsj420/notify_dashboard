"use client";

import React from "react";
import Card from "./Card";

const SkeletonRow = () => (
  <div className="grid grid-cols-8 gap-4 py-4 border-b border-gray-100">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200/70 rounded animate-pulse"
      />
    ))}
  </div>
);

const TableSkeleton = () => {
  return (
    <Card>
          <div className="h-6 mb-3 bg-gray-200/70 rounded animate-pulse w-52"></div>

      <div className="grid grid-cols-8 gap-4 py-4 border-b border-gray-200">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-5 w-20 bg-gray-300/70 rounded animate-pulse"
          />
        ))}
      </div>

      {/* Body Skeleton */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    </Card>
  );
};

export default TableSkeleton;
