"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface BasePieChartProps {
  title?: string;
  data: PieData[];
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
}

const DEFAULT_COLORS = [
  "#EF4444",
  "#F97316",
  "#FACC15",
  "#22C55E",
  "#3B82F6",
];

const BasePieChart: React.FC<BasePieChartProps> = ({
  title,
  data,
  colors = DEFAULT_COLORS,
  innerRadius = 60,
  outerRadius = 90,
}) => {
  return (
    <div className="bg-linear-to-b from-white to-sc-50 rounded-3xl ring-1 ring-inset ring-sc-200 py-5 px-6 shadow-lg shadow-sc-300/60 mb-6">
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BasePieChart;
