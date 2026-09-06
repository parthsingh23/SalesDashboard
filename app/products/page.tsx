import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { APIError, getProducts } from "@/lib/api";

import ProductManagement from "@/components/dashboard/ProductManagement";
import ProductTable from "@/components/dashboard/ProductTable";
import ProductPagination from "@/components/dashboard/ProductPagination";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ProductSearch from "@/components/dashboard/ProductSearch";
import LogoutButton from "@/components/LogoutButton";

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

  const pageSize = Math.min(500, Math.max(25, Number(params.pageSize) || 100));

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
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <DashboardNav />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>

          <p className="mt-2 text-gray-600">View and manage products.</p>
        </div>

        <ProductManagement isAdmin={isAdmin} />

        <ProductSearch />

        <ProductTable products={products} isAdmin={isAdmin} />

        <ProductPagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          total={total}
        />
      </div>
    </main>
  );
}
