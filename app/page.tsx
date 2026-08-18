import KPICard from "@/components/KPICard";
import RevenueChart from "@/components/RevenueChart";
import BreakdownChart from "@/components/BreakdownChart";
import TopProductsTable from "@/components/TopProductsTable";
import DateRangeFilter from "@/components/DateRangeFilter";

import {
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
  const params = await searchParams;

  const startDate = params.start_date;
  const endDate = params.end_date;

  const range = {
    start_date: startDate,
    end_date: endDate,
  };

  const [kpis, trend, regions, categories, topProducts] = await Promise.all([
    getKPIs(range),
    getSalesTrend("monthly", range),
    getRegionSales(range),
    getCategorySales(range),
    getTopProducts(10, range),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Sales Analytics Dashboard
        </h1>

        <p className="mt-2 text-gray-600">Overview of sales performance</p>

        <DateRangeFilter />

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Revenue"
            value={`₹${kpis.total_revenue.toLocaleString()}`}
          />

          <KPICard title="Orders" value={kpis.orders.toLocaleString()} />

          <KPICard title="AOV" value={`₹${kpis.aov.toLocaleString()}`} />

          <KPICard title="Top Category" value={kpis.top_category} />
        </section>

        <section className="mt-8">
          <RevenueChart
            initialData={trend}
            startDate={startDate}
            endDate={endDate}
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
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

        <section className="mt-8">
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
