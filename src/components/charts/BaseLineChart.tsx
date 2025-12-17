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

interface BaseLineChartProps {
  title?: string;
  data: any[];
  xKey: string;
  yKey: string;
  lineColor?: string;
}

const BaseLineChart: React.FC<BaseLineChartProps> = ({
  title,
  data,
  xKey,
  yKey,
  lineColor = "#F97316",
}) => {
  return (
    <div className="bg-linear-to-b from-white to-sc-50 rounded-3xl ring-1 ring-inset ring-sc-200 py-5 px-6 shadow-lg shadow-sc-300/60 mb-6">
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={lineColor}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BaseLineChart;
