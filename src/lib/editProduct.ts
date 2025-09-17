import { useMutation } from '@tanstack/react-query';
import { apiClient } from './apiClient';
import { getAuthToken } from './authApi';
import axios from 'axios';

export interface EditProductPayload {
  categoryId: number;
  image: string;
  description: string;
  name: string;
}

export const editProduct = async (
  productId: string,
  payload: EditProductPayload,
): Promise<void> => {
  try {
    await apiClient.patch(`/products/${productId}`, payload, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || '상품 수정에 실패했습니다';
      throw new Error(message);
    }
    throw new Error('예상치 못한 오류가 발생했습니다.');
  }
};

export const useEditProduct = () => {
  return useMutation({
    mutationFn: ({ productId, payload }: { productId: string; payload: EditProductPayload }) =>
      editProduct(productId, payload),
  });
};
