export type ProductId = string;

export interface Product {
  id: ProductId;
  title: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
  tags?: string[];
  [key: string]: unknown;
}

export type SortMode = 'none' | 'price-asc' | 'price-desc';

export interface ProductFilter {
  search?: string;
  category?: string | null;
  sort?: SortMode;
}
