"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { SalesTrend } from "@/types/analytics";
import ChartCard from "@/components/ChartCard";

type Granularity = "daily" | "weekly" | "monthly" | "yearly";

interface RevenueChartProps {
  initialData: SalesTrend[];
  startDate?: string;
  endDate?: string;
}

const revenueFormat = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const compactFormat = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export default function RevenueChart({
  initialData,
  startDate,
  endDate,
}: RevenueChartProps) {
  const [granularity, setGranularity] = useState<Granularity>("monthly");

  const [data, setData] = useState<SalesTrend[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrend() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.set("granularity", granularity);

        if (startDate) {
          params.set("start_date", startDate);
        }

        if (endDate) {
          params.set("end_date", endDate);
        }

        const response = await fetch(`/api/sales/trend?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to load sales trend");
        }

        const newData: SalesTrend[] = await response.json();
        setData(newData);
      } catch {
        setError("Failed to load sales trend.");
      } finally {
        setLoading(false);
      }
    }

    loadTrend();
  }, [granularity, startDate, endDate]);

  return (
    <ChartCard
      title="Revenue Trend"
      description="Sales revenue over time"
      action={
        <div className="flex flex-wrap gap-2">
          {(["daily", "weekly", "monthly", "yearly"] as Granularity[]).map(
            (option) => (
              <button
                key={option}
                onClick={() => setGranularity(option)}
                aria-pressed={granularity === option}
                className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  granularity === option
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                {option}
              </button>
            ),
          )}
        </div>
      }
    >
      <div className="h-72 min-w-0 sm:h-80">
        {loading && (
          <div
            role="status"
            className="flex h-full items-center justify-center text-sm text-slate-500"
          >
            Loading chart...
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="flex h-full items-center justify-center text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 12, left: 4, bottom: 8 }}
            >
              <CartesianGrid
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickMargin={10}
                minTickGap={24}
                tickFormatter={(value: string) => {
                  const date = new Date(value);

                  if (Number.isNaN(date.getTime())) {
                    return value;
                  }

                  return date.toLocaleDateString("en-IN", {
                    month: "short",
                    year: "2-digit",
                    timeZone: "UTC",
                  });
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickFormatter={(value: number) => compactFormat.format(value)}
                width={54}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) {
                    return null;
                  }

                  const point = payload[0].payload as SalesTrend;

                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                      <p className="mb-2 text-xs font-semibold text-slate-500">
                        {point.date}
                      </p>

                      <p className="text-sm font-semibold text-indigo-700">
                        Revenue:{" "}
                        {revenueFormat.format(Number(point.total_revenue))}
                      </p>

                      <p className="text-sm font-semibold text-indigo-700">
                        Orders: {Number(point.orders).toLocaleString("en-IN")}
                      </p>
                    </div>
                  );
                }}
              />

              <Line
                type="monotone"
                dataKey="total_revenue"
                name="Revenue"
                stroke="#4f46e5"
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  fill: "#ffffff",
                  stroke: "#4f46e5",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 5,
                  fill: "#4f46e5",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
}
