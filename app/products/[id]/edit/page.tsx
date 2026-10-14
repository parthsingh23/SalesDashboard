import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProduct } from "@/lib/api";

import Link from "next/link";

import ProductForm from "@/components/dashboard/ProductForm";
import DashboardNav from "@/components/dashboard/DashboardNav";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/products");
  }

  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    notFound();
  }

  let product;

  try {
    product = await getProduct(productId, session.accessToken);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <DashboardNav
          userName={
            session.user?.name ?? session.user?.email?.split("@")[0] ?? "User"
          }
          role={session.user?.role ?? "user"}
        />

        <div className="mb-6">
          <Link
            href="/products"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            ← Back to products
          </Link>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Edit Product
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update the product details below.
          </p>
        </div>

        <ProductForm mode="edit" product={product} />
      </div>
    </main>
  );
}
