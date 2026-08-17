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

type Granularity = "daily" | "weekly" | "monthly" | "yearly";

interface RevenueChartProps {
  initialData: SalesTrend[];
  startDate?: string;
  endDate?: string;
}

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
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>

          <p className="text-sm text-gray-500">Sales revenue over time</p>
        </div>

        <div className="flex gap-2">
          {(["daily", "weekly", "monthly", "yearly"] as Granularity[]).map(
            (option) => (
              <button
                key={option}
                onClick={() => setGranularity(option)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  granularity === option
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {option}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="mt-6 h-80">
        {loading && (
          <div className="flex h-full items-center justify-center">
            Loading chart...
          </div>
        )}

        {error && (
          <div className="flex h-full items-center justify-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="total_revenue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
