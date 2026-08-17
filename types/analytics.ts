export interface KPIData {
  total_revenue: number;
  orders: number;
  aov: number;
  top_category: string;
}

export interface SalesTrend {
  date: string;
  units_sold: number;
  total_revenue: number;
  total_delivered_qty: number;
}

export interface RegionSales {
  region: string;
  units_sold: number;
}

export interface CategorySales {
  category: string;
  units_sold: number;
}

export interface TopProduct {
  product_id: string;
  product_name: string;
  units_sold: number;
}

export type Granularity =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";