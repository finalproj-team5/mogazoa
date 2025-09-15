import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'https://mogazoa-api.vercel.app/16-5';

interface CreateReviewParams {
  productId: string;
  rating: number;
  content: string;
  imageUrls?: string[];
}

const createReview = async ({ productId, rating, content, imageUrls }: CreateReviewParams) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('인증 토큰이 없습니다.');

  const headers = { Authorization: `Bearer ${token}` };
  const body = { rating, content, imageUrls };

  const response = await axios.post(`${API_BASE_URL}/products/${productId}/reviews`, body, {
    headers,
  });
  return response.data;
};

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      alert('리뷰가 성공적으로 등록되었습니다!');
    },
    onError: (error) => {
      console.error('리뷰 작성 실패:', error);
      alert('리뷰 작성 중 오류가 발생했습니다.');
    },
  });
};
