'use client';

import { Heart, Share2 } from 'lucide-react';
import ReviewForm from './ReviewForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  product: {
    category: string;
    name: string;
    description: string;
  };
  onReviewSubmit: (newReview: { rating: number; content: string; imageUrl?: string }) => void;
}

export default function ProductInfo({ product, onReviewSubmit }: Props) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('링크를 복사하는 데 실패했습니다.');
    }
  };

  return (
    <div className='flex flex-col justify-center space-y-4'>
      <div>
        <span className='text-sm font-semibold text-green-400'>{product.category}</span>
      </div>
      <div className='flex items-start justify-between gap-4'>
        <h1 className='text-3xl md:text-4xl font-bold text-white'>{product.name}</h1>
        <div className='flex items-center gap-3 md:gap-4 text-gray-400 flex-shrink-0 pt-2'>
          <button className='hover:text-white transition-colors'>
            <Heart size={20} className='md:w-6 md:h-6' />
          </button>
          <button onClick={handleShare} className='hover:text-white transition-colors'>
            <Share2 size={20} className='md:w-6 md:h-6' />
          </button>
        </div>
      </div>
      <p className='text-gray-400 leading-relaxed text-sm md:text-base'>{product.description}</p>

      <div className='grid grid-cols-3 items-center gap-4 pt-4'>
        <div className='col-span-2'>
          <ReviewForm product={product} onReviewSubmit={onReviewSubmit} />
        </div>
        <div className='col-span-1'>
          <Link href='/compare'>
            <Button
              variant='tertiary'
              className='w-full h-12 border-[#5363FF] text-[#5363FF] hover:bg-blue-900/20 whitespace-nowrap'
            >
              비교하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
