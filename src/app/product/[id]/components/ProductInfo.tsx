'use client';

import { Heart, Share2 } from 'lucide-react';
import ReviewForm from './ReviewForm';
// import { Button } from '@/components/ui/button';

interface Props {
  product: {
    category: string;
    name: string;
    description: string;
  };
}

export default function ProductInfo({ product }: Props) {
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
          <button className='hover:text-white transition-colors'>
            <Share2 size={20} className='md:w-6 md:h-6' />
          </button>
        </div>
      </div>
      <p className='text-gray-400 leading-relaxed text-sm md:text-base'>{product.description}</p>

      <div className='flex flex-col sm:flex-row items-center gap-4 pt-4'>
        <div className='w-full sm:w-2/3'>
          <ReviewForm />
        </div>
        <div className='w-full sm:w-1/3'>
          <div className='rounded-lg bg-gradient-to-r from-[#5097FA] to-[#5363FF] p-px h-12'>
            <button className='w-full h-full rounded-lg bg-gray-900 hover:bg-gray-800 border-none flex items-center justify-center transition-colors'>
              <span className='font-semibold bg-gradient-to-r from-[#5097FA] to-[#5363FF] bg-clip-text text-transparent'>
                비교하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
