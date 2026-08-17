"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function DateRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(
    searchParams.get("start_date") ?? "",
  );

  const [endDate, setEndDate] = useState(searchParams.get("end_date") ?? "");

  function applyFilter() {
    const params = new URLSearchParams(searchParams.toString());

    if (startDate) {
      params.set("start_date", startDate);
    } else {
      params.delete("start_date");
    }

    if (endDate) {
      params.set("end_date", endDate);
    } else {
      params.delete("end_date");
    }

    router.push(`/?${params.toString()}`);
  }

  function clearFilter() {
    setStartDate("");
    setEndDate("");

    router.push("/");
  }

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700"
          >
            From
          </label>

          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700"
          >
            To
          </label>

          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
        </div>

        <button
          onClick={applyFilter}
          disabled={!startDate || !endDate || startDate > endDate}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply Filter
        </button>

        <button
          onClick={clearFilter}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Clear
        </button>
      </div>

      {startDate && endDate && startDate > endDate && (
        <p className="mt-2 text-sm text-red-600">
          Start date must be before end date.
        </p>
      )}
    </div>
  );
}
