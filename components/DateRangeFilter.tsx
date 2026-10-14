"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

const MIN_DATE = "2022-01-01";
const MAX_DATE = "2024-12-31";

export default function DateRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(
    searchParams.get("start_date") || "",
  );

  const [endDate, setEndDate] = useState(searchParams.get("end_date") || "");

  const [error, setError] = useState<string | null>(null);

  function applyFilter() {
    setError(null);

    if (!startDate || !endDate) {
      setError("Please enter both start and end dates.");
      return;
    }

    if (
      startDate < MIN_DATE ||
      startDate > MAX_DATE ||
      endDate < MIN_DATE ||
      endDate > MAX_DATE
    ) {
      setError(
        "Please enter a date valid for the database. Available data is from 01-01-2022 to 31-12-2024.",
      );
      return;
    }

    if (startDate > endDate) {
      setError("Start date cannot be later than the end date.");
      return;
    }

    const params = new URLSearchParams();

    params.set("start_date", startDate);
    params.set("end_date", endDate);

    trackEvent("filter_changed", {
      filter_type: "date_range",
      start_date: startDate,
      end_date: endDate,
    });

    router.push(`/?${params.toString()}`);
  }

  function clearFilter() {
    setStartDate("");
    setEndDate("");
    setError(null);

    trackEvent("filter_changed", {
      filter_type: "date_range",
      action: "clear",
    });

    router.push("/");
  }

  return (
    <div className="mt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-0">
          <label
            htmlFor="start-date"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            From
          </label>

          <input
            id="start-date"
            type="date"
            min={MIN_DATE}
            max={MAX_DATE}
            value={startDate}
            onChange={(event) => {
              setStartDate(event.target.value);
              setError(null);
            }}
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-auto"
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="end-date"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            To
          </label>

          <input
            id="end-date"
            type="date"
            min={MIN_DATE}
            max={MAX_DATE}
            value={endDate}
            onChange={(event) => {
              setEndDate(event.target.value);
              setError(null);
            }}
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-auto"
          />
        </div>

        <button
          type="button"
          onClick={applyFilter}
          className="min-h-11 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Apply Filter
        </button>

        <button
          type="button"
          onClick={clearFilter}
          className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Clear
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
