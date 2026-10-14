import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import KPICard from "@/components/KPICard";
import RevenueChart from "@/components/RevenueChart";
import BreakdownChart from "@/components/BreakdownChart";
import TopProductsTable from "@/components/TopProductsTable";
import DateRangeFilter from "@/components/DateRangeFilter";
import DashboardNav from "@/components/dashboard/DashboardNav";
import DashboardAnalytics from "@/components/analytics/DashboardAnalytics";

import {
  APIError,
  getKPIs,
  getSalesTrend,
  getRegionSales,
  getCategorySales,
  getTopProducts,
} from "@/lib/api";

interface HomeProps {
  searchParams: Promise<{
    start_date?: string;
    end_date?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  if (!accessToken) {
    redirect("/login");
  }

  const params = await searchParams;

  const startDate = params.start_date;
  const endDate = params.end_date;

  const range = {
    start_date: startDate,
    end_date: endDate,
  };

  let kpis;
  let trend;
  let regions;
  let categories;
  let topProducts;

  try {
    [kpis, trend, regions, categories, topProducts] = await Promise.all([
      getKPIs(range, accessToken),
      getSalesTrend("monthly", range, accessToken),
      getRegionSales(range, accessToken),
      getCategorySales(range, accessToken),
      getTopProducts(10, range, accessToken),
    ]);
  } catch (error) {
    if (error instanceof APIError && error.status === 401) {
      redirect("/login");
    }

    throw error;
  }

  return (
    <main className="min-h-screen overflow-x-clip px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <DashboardAnalytics />

      <div className="mx-auto w-full max-w-7xl">
        <DashboardNav />

        <header className="mb-7 flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            SALES OVERVIEW
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Sales Analytics Dashboard
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Track revenue, monitor sales performance, and discover your
            best-performing products.
          </p>
        </header>

        <DateRangeFilter />

        <section
          aria-label="Key performance indicators"
          className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <KPICard
            title="Total Revenue"
            value={`₹${kpis.total_revenue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          />

          <KPICard title="Orders" value={kpis.orders.toLocaleString("en-IN")} />

          <KPICard
            title="Average Order Value"
            value={`₹${kpis.aov.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          />

          <KPICard title="Top Category" value={kpis.top_category} />
        </section>

        <section className="mt-6 min-w-0">
          <RevenueChart
            initialData={trend}
            startDate={startDate}
            endDate={endDate}
          />
        </section>

        <section className="mt-6 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
          <BreakdownChart
            title="Units Sold by Region"
            data={regions.map((item) => ({
              name: item.region,
              value: item.units_sold,
            }))}
          />

          <BreakdownChart
            title="Units Sold by Category"
            data={categories.map((item) => ({
              name: item.category,
              value: item.units_sold,
            }))}
          />
        </section>

        <section className="mt-6 min-w-0">
          <TopProductsTable
            initialProducts={topProducts}
            startDate={startDate}
            endDate={endDate}
          />
        </section>
      </div>
    </main>
  );
}
