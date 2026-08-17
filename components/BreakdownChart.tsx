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

export default function BreakdownChart({ title, data }: BreakdownChartProps) {
  return (
    <ChartCard title={title} description="Units sold">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
