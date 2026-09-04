import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProducts } from "@/lib/api";
import ProductTable from "@/components/dashboard/ProductTable";
import ProductPagination from "@/components/dashboard/ProductPagination";
import ProductManagement from "@/components/dashboard/ProductManagement";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (!session.accessToken) {
    redirect("/login");
  }

  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);

  const pageSize = Math.min(500, Math.max(25, Number(params.pageSize) || 100));

  const offset = (page - 1) * pageSize;

  const result = await getProducts(offset, pageSize, session.accessToken);

  const products = result.items;
  const total = result.total;

  const totalPages = Math.ceil(total / pageSize);

  const isAdmin = session.user.role === "admin";

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>

            <p className="mt-1 text-sm text-gray-600">
              Manage and view product information.
            </p>
          </div>

          <ProductManagement isAdmin={isAdmin} />
        </div>

        <ProductTable products={products} isAdmin={isAdmin} />

        <ProductPagination
          page={page}
          pageSize={pageSize}
          total={total}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
