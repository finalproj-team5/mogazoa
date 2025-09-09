'use client';
import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/Product';

export const ProductImagePreview: React.FC<{
  productLetter: 'A' | 'B';
  selectedProduct: Product | null;
}> = ({ productLetter, selectedProduct }) => {
  return (
    <div className='relative w-40 h-40 bg-[#2E2E3A] rounded-2xl flex items-center justify-center overflow-hidden'>
      {selectedProduct ? (
        <Image
          src={selectedProduct.image}
          alt={selectedProduct.name}
          layout='fill'
          objectFit='cover'
        />
      ) : (
        <span className='text-8xl font-bold text-gray-500'>{productLetter}</span>
      )}
    </div>
  );
};
