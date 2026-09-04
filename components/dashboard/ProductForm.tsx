"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { useRouter } from "next/navigation";
interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProductForm({
  mode,
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    product_id: product?.product_id ?? "",
    product_name: product?.product_name ?? "",
    brand_name: product?.brand_name ?? "",
    brand_desc: product?.brand_desc ?? "",
    category: product?.category ?? "",
    product_size: product?.product_size ?? "",
    currency: product?.currency ?? "Rs.",
    mrp: product ? String(product.mrp) : "",
    sell_price: product ? String(product.sell_price) : "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const payload = {
        product_name: form.product_name,
        brand_name: form.brand_name,
        brand_desc: form.brand_desc,
        category: form.category,
        product_size: form.product_size,
        currency: form.currency,
        mrp: Number(form.mrp),
        sell_price: Number(form.sell_price),
      };

      const url =
        mode === "create" ? "/api/products" : `/api/products/${product?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          mode === "create"
            ? {
                ...payload,
                product_id: form.product_id,
              }
            : payload,
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to save product");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/products");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/products");
    }
  }

  const fields = [
    ["product_id", "Product ID"],
    ["product_name", "Product Name"],
    ["brand_name", "Brand"],
    ["brand_desc", "Description"],
    ["category", "Category"],
    ["product_size", "Size"],
    ["currency", "Currency"],
    ["mrp", "MRP"],
    ["sell_price", "Selling Price"],
  ] as const;

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        {mode === "create" ? "Add Product" : "Edit Product"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label]) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {label}
            </label>

            <input
              id={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              disabled={mode === "edit" && name === "product_id"}
              type={name === "mrp" || name === "sell_price" ? "number" : "text"}
              step={
                name === "mrp" || name === "sell_price" ? "0.01" : undefined
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-black disabled:bg-gray-100"
            />
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Create Product"
              : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
