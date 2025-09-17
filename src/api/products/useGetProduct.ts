import { useQuery, type QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '@/types/Product';

const API_BASE_URL = 'https://mogazoa-api.vercel.app/16-5';

const getProductById = async (productId: string): Promise<Product> => {
  const token = localStorage.getItem('accessToken');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axios.get<Product>(`${API_BASE_URL}/products/${productId}`, { headers });
  return response.data;
};

export const useGetProduct = (productId: string) => {
  const queryKey: QueryKey = ['product', productId];

  return useQuery({
    queryKey,
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};
