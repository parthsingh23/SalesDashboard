import type {
  KPIData,
  SalesTrend,
  RegionSales,
  CategorySales,
  TopProduct,
  Granularity,
} from "@/types/analytics";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not configured");
}

interface DateRange {
  start_date?: string;
  end_date?: string;
}

function buildQuery(params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getKPIs(range: DateRange = {}): Promise<KPIData> {
  const query = buildQuery({ ...range });

  return fetchAPI<KPIData>(`/analytics/kpis?${query}`);
}

export async function getSalesTrend(
  granularity: Granularity,
  range: DateRange = {},
): Promise<SalesTrend[]> {
  const query = buildQuery({
    granularity,
    ...range,
  });

  return fetchAPI<SalesTrend[]>(`/analytics/sales/trend?${query}`);
}

export async function getRegionSales(
  range: DateRange = {},
): Promise<RegionSales[]> {
  const query = buildQuery({ ...range });

  return fetchAPI<RegionSales[]>(`/analytics/sales/by-region?${query}`);
}

export async function getCategorySales(
  range: DateRange = {},
): Promise<CategorySales[]> {
  const query = buildQuery({ ...range });

  return fetchAPI<CategorySales[]>(`/analytics/sales/by-category?${query}`);
}

export async function getTopProducts(
  limit: number = 10,
  range: DateRange = {},
): Promise<TopProduct[]> {
  const query = buildQuery({
    limit,
    ...range,
  });

  return fetchAPI<TopProduct[]>(`/analytics/top?${query}`);
}
