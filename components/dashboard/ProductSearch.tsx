"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  }

  function handleClear() {
    setSearch("");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex gap-2"
    >
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-black-500 outline-none focus:border-gray-500"
      />

      <button
        type="submit"
        className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Search
      </button>

      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
      )}
    </form>
  );
}