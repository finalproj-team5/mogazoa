import { useMutation } from '@tanstack/react-query';
import { apiClient } from './apiClient';
import { getAuthToken } from './authApi';
import axios from 'axios';

export interface AddProductPayload {
  categoryId: number;
  image: string;
  description: string;
  name: string;
}

export const addProduct = async (payload: AddProductPayload): Promise<void> => {
  try {
    await apiClient.post('/products', payload, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || '상품 추가에 실패했습니다';
      throw new Error(message);
    }
    throw new Error('예상치 못한 오류가 발생했습니다.');
  }
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: (payload: AddProductPayload) => addProduct(payload),
  });
};
