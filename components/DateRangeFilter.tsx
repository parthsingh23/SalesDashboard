"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

    router.push(`/?${params.toString()}`);
  }

  function clearFilter() {
    setStartDate("");
    setEndDate("");
    setError(null);

    router.push("/");
  }

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div>
          <label
            htmlFor="start-date"
            className="mb-1 block text-sm font-medium text-gray-700"
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
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="end-date"
            className="mb-1 block text-sm font-medium text-gray-700"
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
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <button
          type="button"
          onClick={applyFilter}
          className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
        >
          Apply Filter
        </button>

        <button
          type="button"
          onClick={clearFilter}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
