"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ProductPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export default function ProductPagination({
  page,
  pageSize,
  total,
  totalPages,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  function updatePagination(newPage: number, newPageSize: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));
    params.set("pageSize", String(newPageSize));

    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
      <div>
        Showing {start}–{end} of {total}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="pageSize">Rows per page:</label>

        <select
          id="pageSize"
          value={pageSize}
          onChange={(event) => updatePagination(1, Number(event.target.value))}
          className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-gray-900"
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={250}>250</option>
          <option value={500}>500</option>
        </select>

        <button
          type="button"
          disabled={page === 1}
          onClick={() => updatePagination(page - 1, pageSize)}
          className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="min-w-[100px] text-center">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => updatePagination(page + 1, pageSize)}
          className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
