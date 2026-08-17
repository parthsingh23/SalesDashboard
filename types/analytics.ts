export interface KPIResponse {
    total_records: number;
    total_units_sold: number;
    total_delivered_qty: number;
    total_revenue: number;
    average_price: number;
    unique_products: number;
}

export interface RegionSales {
    region: string;
    units_sold: number;
}

export interface CategorySales {
    category: string;
    units_sold: number;
}

export interface SalesTrend {
    date: string;
    units_sold: number;
    total_revenue: number;
    total_delivered_qty: number;
}

export interface TopProduct {
    product_id: string;
    product_name: string;
    units_sold: number;
}
