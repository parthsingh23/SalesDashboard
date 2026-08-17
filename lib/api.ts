import type {
    KPIResponse,
    RegionSales,
    CategorySales,
    SalesTrend,
    TopProduct,
} from "@/types/analytics";

const API_URL = "https://sales-analytics-api-parth.onrender.com";

async function fetchAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
}

export async function getKPIs(): Promise<KPIResponse> {
    return fetchAPI<KPIResponse>("/analytics/kpis");
}

export async function getSalesTrend(
    granularity: "daily" | "weekly" | "monthly" | "yearly"
): Promise<SalesTrend[]> {
    return fetchAPI<SalesTrend[]>(
        `/analytics/sales/trend?granularity=${granularity}`
    );
}