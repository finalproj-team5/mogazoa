export interface Product {
  id?: number;
  name: string;
  description?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  favoriteCount?: number;
  categoryId: number;
}

export interface ProductGridProps {
  title: string;
  products: Product[];
}

// 비교 페이지에서 각 상품(A, B)의 상태를 관리하기 위한 타입
export interface ProductState {
  selectedProduct: Product | null;
}

export interface ComparisonResult {
  rating: { winner: 'A' | 'B' | 'draw'; diff: number };
  reviews: { winner: 'A' | 'B' | 'draw'; diff: number };
  likes: { winner: 'A' | 'B' | 'draw'; diff: number };
  overallWinner: 'A' | 'B' | 'draw';
}
export interface ViewProps {
  productA: ProductState;
  productB: ProductState;
  comparisonResult: ComparisonResult | null;
  handleProductSelect: (productLetter: 'A' | 'B', product: Product | null) => void;
}
