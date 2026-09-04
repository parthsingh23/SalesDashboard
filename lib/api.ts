import type {
  KPIData,
  SalesTrend,
  RegionSales,
  CategorySales,
  TopProduct,
  Granularity,
} from "@/types/analytics";

const API_URL = process.env.API_URL;
// const API_URL = "http://127.0.0.1:8000";

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

async function fetchAPI<T>(endpoint: string, accessToken?: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    cache: "no-store",
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getKPIs(
  range: DateRange = {},
  accessToken?: string,
): Promise<KPIData> {
  const query = buildQuery({ ...range });

  return fetchAPI<KPIData>(`/analytics/kpis?${query}`, accessToken);
}

export async function getSalesTrend(
  granularity: Granularity,
  range: DateRange = {},
  accessToken?: string,
): Promise<SalesTrend[]> {
  const query = buildQuery({
    granularity,
    ...range,
  });

  return fetchAPI<SalesTrend[]>(`/analytics/sales/trend?${query}`, accessToken);
}

export async function getRegionSales(
  range: DateRange = {},
  accessToken?: string,
): Promise<RegionSales[]> {
  const query = buildQuery({ ...range });

  return fetchAPI<RegionSales[]>(
    `/analytics/sales/by-region?${query}`,
    accessToken,
  );
}

export async function getCategorySales(
  range: DateRange = {},
  accessToken?: string,
): Promise<CategorySales[]> {
  const query = buildQuery({ ...range });

  return fetchAPI<CategorySales[]>(
    `/analytics/sales/by-category?${query}`,
    accessToken,
  );
}

export async function getTopProducts(
  limit: number = 10,
  range: DateRange = {},
  accessToken?: string,
): Promise<TopProduct[]> {
  const query = buildQuery({
    limit,
    ...range,
  });

  return fetchAPI<TopProduct[]>(`/analytics/top?${query}`, accessToken);
}
