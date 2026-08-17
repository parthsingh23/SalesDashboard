"use client";

import { useEffect, useState } from "react";
import type { TopProduct } from "@/types/analytics";

interface TopProductsTableProps {
  initialProducts: TopProduct[];
  startDate?: string;
  endDate?: string;
}

export default function TopProductsTable({
  initialProducts,
  startDate,
  endDate,
}: TopProductsTableProps) {
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState<TopProduct[]>(initialProducts);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        params.set("limit", String(limit));

        if (startDate) {
          params.set("start_date", startDate);
        }

        if (endDate) {
          params.set("end_date", endDate);
        }

        const response = await fetch(`/api/analytics/top?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to load top products");
        }

        const data: TopProduct[] = await response.json();

        setProducts(data);
      } catch {
        setError("Failed to load top products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [limit, startDate, endDate]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>

          <p className="mt-1 text-sm text-gray-500">
            Products ranked by units sold
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="product-limit"
            className="text-sm font-medium text-gray-700"
          >
            Show
          </label>

          <input
            id="product-limit"
            type="number"
            min="1"
            max="30"
            value={limit}
            onChange={(event) => {
              const value = Number(event.target.value);

              if (value >= 1 && value <= 30) {
                setLimit(value);
              }
            }}
            className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
          />

          <span className="text-sm text-gray-500">products</span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        {loading && (
          <div className="py-8 text-center text-gray-500">
            Loading products...
          </div>
        )}

        {error && <div className="py-8 text-center text-red-600">{error}</div>}

        {!loading && !error && (
          <table className="w-full text-left text-sm text-gray-900">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 font-semibold">SL NO.</th>

                <th className="px-4 py-3 font-semibold">Product ID</th>

                <th className="px-4 py-3 text-right font-semibold">
                  Units Sold
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.product_id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 font-medium">
                    {product.product_id}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {product.units_sold.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
