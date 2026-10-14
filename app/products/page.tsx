import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { APIError, getProducts } from "@/lib/api";

import ProductManagement from "@/components/dashboard/ProductManagement";
import ProductTable from "@/components/dashboard/ProductTable";
import ProductPagination from "@/components/dashboard/ProductPagination";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ProductSearch from "@/components/dashboard/ProductSearch";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/login");
  }

  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);

  const pageSize = Math.min(500, Math.max(25, Number(params.pageSize) || 25));

  const search = params.search?.trim() || "";

  const offset = (page - 1) * pageSize;

  let result;

  try {
    result = await getProducts(offset, pageSize, session.accessToken, search);
  } catch (error) {
    if (error instanceof APIError && error.status === 401) {
      redirect("/login");
    }

    throw error;
  }

  const products = result.items;
  const total = result.total;

  const totalPages = Math.ceil(total / pageSize);

  const isAdmin = session.user.role === "admin";

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen flex-col md:flex-row">
        <DashboardNav />

        <div className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
            <header className="mb-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Product Catalog
              </div>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Product Management
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                View, search, and manage your product catalog.
              </p>
            </header>

            <section aria-label="Product management" className="min-w-0">
              <ProductManagement isAdmin={isAdmin} />

              <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="mb-3 text-sm font-semibold text-slate-900">
                  Search products
                </h2>
                <ProductSearch />
              </div>

              <ProductTable products={products} isAdmin={isAdmin} />

              <ProductPagination
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                total={total}
              />
            </section>

            <footer className="mt-8 border-t border-slate-200 py-5 text-center text-xs text-slate-500">
              Sales Intelligence · Product Catalog
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
