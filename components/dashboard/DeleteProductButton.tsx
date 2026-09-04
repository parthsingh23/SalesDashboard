"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteProductButtonProps {
  productId: number;
}

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to delete product");
      }

      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex items-center">
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      {error && <span className="ml-2 text-xs text-red-600">{error}</span>}
    </div>
  );
}
