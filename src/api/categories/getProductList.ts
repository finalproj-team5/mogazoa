import { useQuery, queryOptions } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';
import { ProductListResponse, GetProductsParams } from '@/types/ProductList';

// 상품 목록 조회 API
export const getProductList = async (params?: GetProductsParams): Promise<ProductListResponse> => {
  const response = await apiClient.get(`/products`, {
    params,
  });
  return response.data;
};

// react-query 옵션
export const productsQueryOptions = (params?: GetProductsParams) =>
  queryOptions({
    queryKey: ['productsList', params],
    queryFn: () => getProductList(params),
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000, // 10분
  });

export const useGetProducts = (params?: GetProductsParams) => {
  return useQuery(productsQueryOptions(params));
};
