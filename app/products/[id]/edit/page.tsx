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
    <main className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen flex-col md:flex-row">
        <DashboardNav />

        <div className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
            <header className="mb-7">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition hover:text-blue-800"
              >
                <span aria-hidden="true">←</span>
                Back to products
              </Link>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Edit Product
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Update product information and pricing.
              </p>
            </header>

            <ProductForm mode="edit" product={product} />

            <footer className="mt-8 border-t border-slate-200 py-5 text-center text-xs text-slate-500">
              Sales Intelligence · Product Catalog
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
