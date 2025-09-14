'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star, ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

interface Props {
  product: {
    category: string;
    name: string;
  };
  onReviewSubmit: (newReview: { rating: number; content: string; imageUrls?: string[] }) => void;
}
export default function ReviewForm({ product, onReviewSubmit }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && previewImages.length < 3) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages([...previewImages, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = (indexToRemove: number) => {
    setPreviewImages(previewImages.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    if (!reviewText.trim() || rating === 0) {
      alert('별점과 리뷰 내용을 모두 입력해주세요.');
      return;
    }
    onReviewSubmit({ rating, content: reviewText, imageUrls: previewImages });

    setIsOpen(false);
    setReviewText('');
    setRating(0);
    setPreviewImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='w-full h-12 rounded-lg bg-gradient-to-r from-[#5097FA] to-[#5363FF] text-white font-semibold transition-transform hover:scale-105'>
          리뷰 작성하기
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-lg rounded-xl bg-[#2C2C3A] border-gray-700 text-white flex flex-col p-8'>
        <DialogHeader className='text-left'>
          <span className='text-sm font-semibold text-green-400'>{product.category}</span>
          <DialogTitle className='text-2xl font-bold text-white mt-1'>{product.name}</DialogTitle>
        </DialogHeader>

        <DialogClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100'></DialogClose>

        <div className='py-6 space-y-6'>
          <div className='flex'>
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

          <div className='relative'>
            <Textarea
              placeholder='이곳에 리뷰를 작성해주세요.'
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className='h-40 bg-gray-800 border-gray-600 text-white placeholder-gray-500 resize-none p-4 pr-68 w-full'
              maxLength={300}
            />
          </div>

          <div className='flex items-center gap-4'>
            {previewImages.map((image, index) => (
              <div key={index} className='relative h-24 w-24 flex-shrink-0'>
                <Image
                  src={image}
                  alt={`미리보기 ${index + 1}`}
                  layout='fill'
                  objectFit='cover'
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
                <ImagePlus size={24} className='text-gray-400' />
                <input
                  id='image-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                />
              </label>
            )}
          </div>
        </div>

        <DialogFooter>
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
