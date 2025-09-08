// types.ts

// 단일 상품 타입
export interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  favoriteCount: number;
}

// API 응답 타입
export interface ProductListResponse {
  list: Product[];
  nextCursor?: number | null;
}

// 쿼리 파라미터 타입
export interface GetProductsParams {
  keyword?: string; // 상품명 검색 키워드
  category?: number; // 카테고리 ID
  order?: 'recent' | 'rating' | 'reviewCount'; // 정렬 옵션
  cursor?: number; // 다음 페이지 커서
}
