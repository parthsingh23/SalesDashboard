import Link from "next/link";
import type { Product } from "@/types/product";
import DeleteProductButton from "@/components/dashboard/DeleteProductButton";

interface ProductTableProps {
  products: Product[];
  isAdmin: boolean;
}

export default function ProductTable({ products, isAdmin }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm text-gray-900">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Product
            </th>

            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Brand
            </th>

            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Category
            </th>

            <th className="px-4 py-3 text-right font-semibold text-slate-700">
              MRP
            </th>

            <th className="px-4 py-3 text-right font-semibold text-slate-700">
              Selling Price
            </th>

            <th className="px-4 py-3 text-right font-semibold text-slate-700">
              Discount
            </th>

            {isAdmin && (
              <th className="px-4 py-3 text-right font-semibold text-slate-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-slate-100 last:border-0 transition-colors hover:bg-blue-50/40"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900">
                  {product.product_name}
                </div>

                <div className="text-xs text-slate-500">
                  {product.product_id}
                </div>
              </td>

              <td className="px-4 py-3 text-slate-700">{product.brand_name}</td>

              <td className="px-4 py-3 text-slate-700">{product.category}</td>

              <td className="px-4 py-3 text-right text-slate-700">
                {product.currency} {product.mrp.toFixed(2)}
              </td>

              <td className="px-4 py-3 text-right font-medium text-slate-900">
                {product.currency} {product.sell_price.toFixed(2)}
              </td>

              <td className="px-4 py-3 text-right text-slate-700">
                {product.discount}%
              </td>

              {isAdmin && (
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="mr-2 inline-block rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                  >
                    Edit
                  </Link>

                  <DeleteProductButton productId={product.id} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
