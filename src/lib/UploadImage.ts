import { useMutation } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface UrlResponse {
  url: string;
}

export const postImageUpload = async (imageFile: File): Promise<UrlResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await apiClient.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const usePostImageUpload = () => {
  return useMutation({
    mutationFn: (imageFile: File) => postImageUpload(imageFile),
  });
};
