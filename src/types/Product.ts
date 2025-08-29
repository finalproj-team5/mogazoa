export interface Product {
  id?: number;
  name: string;
  description?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  favoriteCount?: number;
}

export interface ProductGridProps {
  title: string;
  products: Product[];
}
