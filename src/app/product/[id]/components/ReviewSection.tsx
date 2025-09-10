'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
// import ReviewForm from './ReviewForm';

const ReviewCard = () => (
  <div className='border-b border-gray-700 py-6 last:border-b-0'>
    <div className='flex items-start gap-4'>
      <Image
        src='/images/reviewers/user5.jpg'
        alt='유저 프로필'
        width={40}
        height={40}
        className='rounded-full'
      />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='font-semibold text-white'>likejh</p>
            <div className='flex items-center gap-0.5 text-yellow-400 mt-1'>
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={14} className='fill-current' />
              ))}
              {[...Array(1)].map((_, i) => (
                <Star key={i} size={14} className='text-gray-600 fill-current' />
              ))}
            </div>
          </div>
          <span className='text-sm text-gray-400'>2024-03-15</span>
        </div>
        <p className='mt-4 text-gray-300 leading-relaxed'>강추드립니다</p>
      </div>
    </div>
  </div>
);

export default function ReviewSection({ productId }: { productId: string }) {
  //리뷰목록 데이터 가져오기

  //사용처리
  const _productId = productId;

  return (
    <section className='mt-16'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold text-white'>상품 리뷰</h2>
        <select className='bg-[#2C2C3A] border-gray-600 rounded-md px-3 py-1.5 text-sm'>
          <option>최신순</option>
          <option>추천순</option>
          <option>별점 높은순</option>
        </select>
      </div>

      <div className='bg-[#2C2C3A] rounded-xl p-2 sm:p-6'>
        <ReviewCard />
        <ReviewCard />
      </div>
    </section>
  );
}
