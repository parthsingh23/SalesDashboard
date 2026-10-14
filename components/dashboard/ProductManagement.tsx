"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProductForm from "@/components/dashboard/ProductForm";

interface ProductManagementProps {
  isAdmin: boolean;
}

export default function ProductManagement({ isAdmin }: ProductManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="mb-6">
      {showForm ? (
        <ProductForm
          mode="create"
          onSuccess={() => {
            setShowForm(false);
            router.refresh();
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="min-h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Add Product
        </button>
      )}
    </div>
  );
}
