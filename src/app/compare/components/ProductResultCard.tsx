'use client';
import React from 'react';
import { Product, ComparisonResult } from '@/types/Product';
import Image from 'next/image';
import characterIcon from '@/assets/images/character.png';

export const ProductResultCard: React.FC<{
  product: Product | null;
  label: string;
  comparisonResult?: ComparisonResult | null;
  productLetter: 'A' | 'B';
}> = ({ product, label, comparisonResult, productLetter }) => {
  // 비교 전 UI
  if (!comparisonResult || !product) {
    return (
      <div className='w-full h-56 bg-[#2E2E3A] rounded-2xl p-4 flex flex-col items-center justify-center text-center'>
        <div className='flex-grow w-full flex items-center justify-center relative'>
          <Image
            src={characterIcon}
            alt='캐릭터 아이콘'
            fill
            style={{ objectFit: 'contain', padding: '1rem' }}
          />
        </div>
        <p className='font-semibold text-gray-400 text-sm mt-2'>{label}</p>
      </div>
    );
  }

  // 비교 후 UI
  const StatItem: React.FC<{ value: number | string; isWinner: boolean }> = ({
    value,
    isWinner,
  }) => (
    <div
      className={`text-2xl font-bold flex items-center gap-2 ${isWinner ? 'text-white' : 'text-gray-500'}`}
    >
      <span className={isWinner ? 'border-b-4 border-yellow-400' : ''}>{value}</span>
      {isWinner && <span>🏆</span>}
    </div>
  );

  return (
    <div className='w-full bg-white/5 rounded-2xl p-6 flex flex-col items-center justify-around text-center h-56'>
      <StatItem
        value={(product.rating ?? 0).toFixed(1)}
        isWinner={comparisonResult.rating.winner === productLetter}
      />
      <hr className='w-full border-gray-600' />
      <StatItem
        value={`${(product.reviewCount ?? 0).toLocaleString()}개`}
        isWinner={comparisonResult.reviews.winner === productLetter}
      />
      <hr className='w-full border-gray-600' />
      <StatItem
        value={`${(product.favoriteCount ?? 0).toLocaleString()}개`}
        isWinner={comparisonResult.likes.winner === productLetter}
      />
    </div>
  );
};
