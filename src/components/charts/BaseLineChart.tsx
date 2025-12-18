"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Construction, Clock } from "lucide-react";



const BaseLineChart = ({

}) => {
  return (
    <div className="bg-linear-to-b from-white to-sc-50 rounded-3xl ring-1 ring-inset ring-sc-200 py-5 px-6 shadow-lg shadow-sc-300/60">
      <h3 className="text-lg font-semibold mb-4">Breach Trends (Last 6 Months)</h3>

    <div className="flex items-center justify-center mt-10">
      <div >
        
        <div className=" mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
          <Construction size={28} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Coming Soon
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          We're currently building this feature, soon you will be able to use this one.
        </p>

        <div className="my-6 h-px bg-gray-200" />

        <div className="flex items-center  gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>Feature under development</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BaseLineChart;
