import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'https://mogazoa-api.vercel.app/16-5';

interface ToggleFavoriteParams {
  productId: string;
  isFavorited: boolean;
}

// 1. 실제 API를 호출하는 비동기 함수
const toggleFavoriteStatus = async ({ productId, isFavorited }: ToggleFavoriteParams) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('인증 토큰이 없습니다.');

  const headers = { Authorization: `Bearer ${token}` };
  const API_ENDPOINT = `${API_BASE_URL}/products/${productId}/favorite`;

  if (isFavorited) {
    // 찜 해제
    await axios.delete(API_ENDPOINT, { headers });
  } else {
    // 찜하기
    await axios.post(API_ENDPOINT, {}, { headers });
  }
};

export const useToggleFavorite = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavoriteStatus,
    // Mutation 성공 시, 관련 쿼리를 무효화하여 최신 데이터로 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
    onError: (error) => {
      console.error('찜하기/해제 처리 실패:', error);
      alert('요청 처리 중 오류가 발생했습니다.');
    },
  });
};
