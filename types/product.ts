export interface Product {
  id: number;
  product_id: string;
  product_name: string;
  brand_name: string;
  brand_desc: string;
  category: string;
  product_size: string;
  currency: string;
  mrp: number;
  sell_price: number;
  discount: number;
}

export interface ProductCreate {
  product_id: string;
  product_name: string;
  brand_name: string;
  brand_desc: string;
  category: string;
  product_size: string;
  currency: string;
  mrp: number;
  sell_price: number;
}

export interface ProductUpdate {
  product_name?: string;
  brand_name?: string;
  brand_desc?: string;
  category?: string;
  product_size?: string;
  currency?: string;
  mrp?: number;
  sell_price?: number;
}