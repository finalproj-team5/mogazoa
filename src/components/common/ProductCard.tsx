import { Product } from '@/types/Product';
import Image from 'next/image';
import rilakkuma from './리락쿠마.jpg';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, reviewCount, rating, favoriteCount } = product;

  return (
    <>
      <div className='flex flex-col w-full h-[183px] md:h-[256px] lg:h-[308px] max-w-[300px] max-h-[308px] rounded-xl p-3 md:p-4 lg:p-5 font-sans bg-[#21212A]'>
        <div className='mb-2 md:mb-4 overflow-hidden'>
          <Image
            src={rilakkuma}
            alt={name}
            width={284}
            height={200}
            className='w-full h-auto object-cover rounded-xl'
          />
        </div>

        <div className='flex flex-col justify-end grow'>
          <h2 className='text-[#F1F1F5] text-sm md:text-base lg:text-lg font-bold mb-2'>{name}</h2>

          <div className='flex justify-between items-center text-xs md:text-sm text-[#6E6E82]'>
            <div>
              <span>리뷰 {reviewCount}</span>
              <span className='ml-2'>찜 {favoriteCount}</span>
            </div>

            <div className='flex items-center'>
              <span className='font-semibold ml-1'>⭐️ {rating}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
