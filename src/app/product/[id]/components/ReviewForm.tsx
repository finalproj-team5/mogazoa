'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  // DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Star, ImagePlus, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Props {
  product: {
    category: string;
    name: string;
  };
  onReviewSubmit: (newReview: { rating: number; content: string; imageUrls?: string[] }) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReviewForm({ product, onReviewSubmit, isOpen, onOpenChange }: Props) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const REVIEW_MAX = 300;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || previewImages.length >= 3) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(`https://mogazoa-api.vercel.app/16-5/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const imageUrl = response.data.url;
      setUploadedImageUrls((prev) => [...prev, imageUrl]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };
  const removeImage = (indexToRemove: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = () => {
    if (!reviewText.trim() || rating === 0) {
      alert('별점과 리뷰 내용을 모두 입력해주세요.');
      return;
    }
    onReviewSubmit({ rating, content: reviewText, imageUrls: uploadedImageUrls });

    onOpenChange(false);
    setReviewText('');
    setRating(0);
    setPreviewImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button className='w-full h-12 rounded-lg bg-gradient-to-r from-[#5097FA] to-[#5363FF] text-white font-semibold'>
          리뷰 작성하기
        </Button>
      </DialogTrigger> */}
      <DialogContent className='sm:max-w-lg rounded-xl bg-[#2C2C3A] border-gray-700 text-white flex flex-col p-6'>
        <DialogHeader className='text-left'>
          <span className='text-sm font-semibold text-green-400'>{product.category}</span>
          <DialogTitle className='text-2xl font-bold text-white mt-1'>{product.name}</DialogTitle>
        </DialogHeader>

        <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100' />

        <div className='mt-4 flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer transition-colors ${
                  rating >= star
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-600 hover:text-yellow-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <div className='relative w-full'>
            <textarea
              placeholder='리뷰를 작성해 주세요'
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                console.log('리뷰값:', e.target.value);
              }}
              maxLength={REVIEW_MAX}
              className='min-h-[140px] w-full box-border bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-0 text-white placeholder-gray-500 resize-none p-4 pr-14 rounded-lg'
            />
            <span className='absolute bottom-3 right-3 text-xs text-gray-400 select-none'>
              {reviewText.length}/{REVIEW_MAX}
            </span>
          </div>

          <div className='flex items-center gap-4'>
            {previewImages.map((image, index) => (
              <div key={index} className='relative h-24 w-24 flex-shrink-0'>
                <Image
                  src={image}
                  alt={`미리보기 ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className='rounded-lg'
                />
                <button
                  onClick={() => removeImage(index)}
                  className='absolute -top-2 -right-2 bg-gray-900 rounded-full p-0.5 text-white'
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {previewImages.length < 3 && (
              <label
                htmlFor='image-upload'
                className='relative flex items-center justify-center h-24 w-24 rounded-lg border border-dashed border-gray-600 bg-gray-800 cursor-pointer'
              >
                {isUploading ? (
                  <Loader2 size={24} className='text-gray-400 animate-spin' />
                ) : (
                  <ImagePlus size={24} className='text-gray-400' />
                )}
                <input
                  id='image-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        </div>

        <DialogFooter className='mt-4'>
          <Button
            type='button'
            onClick={handleSubmit}
            size='lg'
            className='w-full bg-gradient-to-r from-[#5097FA] to-[#5363FF] text-white'
          >
            작성하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
