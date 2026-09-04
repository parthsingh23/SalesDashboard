import type {
  KPIData,
  SalesTrend,
  RegionSales,
  CategorySales,
  TopProduct,
  Granularity,
} from "@/types/analytics";

import type {
  Product,
  ProductCreate,
  ProductUpdate,
  ProductListResponse,
} from "@/types/product";

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

export async function getProducts(
  offset = 0,
  limit = 100,
  accessToken?: string,
  search?: string,
): Promise<ProductListResponse> {
  const query = buildQuery({
    offset,
    limit,
    search: search || undefined,
  });

  return fetchAPI<ProductListResponse>(`/products/?${query}`, accessToken);
}

export async function getProduct(
  productId: number,
  accessToken?: string,
): Promise<Product> {
  return fetchAPI<Product>(`/products/${productId}`, accessToken);
}

export async function createProduct(
  product: ProductCreate,
  accessToken: string,
): Promise<Product> {
  const response = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function updateProduct(
  productId: number,
  product: ProductUpdate,
  accessToken: string,
): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function deleteProduct(
  productId: number,
  accessToken: string,
): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}
