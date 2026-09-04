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
    <>
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
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Product
        </button>
      )}
    </>
  );
}
