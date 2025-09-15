import Image from 'next/image';
import type { Product } from '@/types/Product';

interface ProductImagesProps {
  product: Product;
}

export default function ProductImages({ product }: ProductImagesProps) {
  const imageUrl = product.image;
  return (
    <div className='flex justify-center items-start'>
      <div className='relative aspect-square w-full max-w-sm bg-[#1E1E26] rounded-lg overflow-hidden'>
        <Image
          src={imageUrl}
          alt={product.name || '상품 대표 이미지'}
          fill
          className='object-cover'
          priority
        />
      </div>
    </div>
  );
}
