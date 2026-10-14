"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ChartCard from "@/components/ChartCard";

interface BreakdownData {
  name: string;
  value: number;
}

interface BreakdownChartProps {
  title: string;
  data: BreakdownData[];
}

const numberFormat = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const compactFormat = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export default function BreakdownChart({ title, data }: BreakdownChartProps) {
  const chartColor = title === "Units Sold by Region" ? "#0d9488" : "#8b5cf6";

  const activeChartColor =
    title === "Units Sold by Region" ? "#0f766e" : "#7c3aed";
  return (
    <ChartCard title={title} description="Units sold">
      <div className="h-72 min-w-0  sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickMargin={10}
              interval={0}
              height={45}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickFormatter={(value: number) => compactFormat.format(value)}
              width={52}
            />

            <Tooltip
              cursor={{ fill: `${chartColor}14` }}
              formatter={(value) => [
                numberFormat.format(Number(value)),
                "Units sold",
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                padding: "10px 14px",
              }}
              labelStyle={{
                color: "#334155",
                fontWeight: 600,
                marginBottom: 4,
              }}
              itemStyle={{
                color: chartColor,
                fontSize: 13,
                fontWeight: 700
              }}
            />

            <Bar
              dataKey="value"
              fill={chartColor}
              radius={[6, 6, 0, 0]}
              maxBarSize={64}
              activeBar={{ fill: activeChartColor }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
