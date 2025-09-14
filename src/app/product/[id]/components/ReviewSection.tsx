'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Review } from '@/types/Reviewer';
import component from '@/assets/images/component.png';

const ReviewCard = ({ review }: { review: Review }) => (
  <div className='border-b border-gray-700 py-6 last:border-b-0'>
    <div className='flex items-start gap-4'>
      <Image
        src={review.author.avatarUrl}
        alt={`${review.author.name}의 프로필`}
        width={40}
        height={40}
        className='rounded-full'
      />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='font-semibold text-white'>{review.author.name}</p>
            <div className='flex items-center gap-0.5 text-yellow-400 mt-1'>
              {[...Array(review.rating)].map((_, i) => (
                <Star key={`filled-${i}`} size={14} className='fill-current' />
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <Star key={`empty-${i}`} size={14} className='text-gray-600 fill-current' />
              ))}
            </div>
          </div>
          <span className='text-sm text-gray-400'>{review.createdAt}</span>
        </div>
        <p className='mt-4 text-gray-300 leading-relaxed'>{review.content}</p>
      </div>
    </div>
  </div>
);

const NoReviewsPlaceholder = () => (
  <div className='flex flex-col items-center justify-center rounded-xl py-20 text-center'>
    <Image src={component} alt='첫 리뷰를 작성해 보세요!' width={48} height={48} />
    <p className='mt-3 text-gray-400'>첫 리뷰를 작성해 보세요!</p>
  </div>
);

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '추천순' },
  { value: 'rating', label: '별점 높은순' },
];

interface Props {
  productId: string;
  reviews: Review[];
}

export default function ReviewSection({ productId: _productId, reviews = [] }: Props) {
  return (
    <section className='mt-16'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold text-white'>상품 리뷰</h2>
        <select className='bg-[#2C2C3A] border-gray-600 rounded-md px-3 py-1.5 text-sm'>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {reviews.length === 0 ? (
        <NoReviewsPlaceholder />
      ) : (
        <div className='rounded-xl bg-[#2C2C3A] p-2 sm:p-6'>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}
