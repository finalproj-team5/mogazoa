import { Product } from '@/types/Product';
import Image from 'next/image';
import rilakkuma from './리락쿠마.jpg';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, reviewCount, rating, favoriteCount } = product;

  return (
    <div className='p-2.5 md:pb-[10px] bg-zinc-800 rounded-lg flex flex-col '>
      {/* 이미지 영역: 카드 폭에 맞춰 반응형, 비율 140:98 유지 */}
      <div className='w-full aspect-[140/98] mb-[10px] relative'>
        <Image src={rilakkuma} alt={name} fill className='object-cover rounded-xl' />
      </div>

      {/* 텍스트 영역 */}
      <div className='flex flex-col gap-[5px] flex-1'>
        <div className='text-[#F1F1F5] text-sm md:text-base xl:text-lg font-medium'>{name}</div>

        <div className='inline-flex gap-2.5'>
          <div className='flex gap-[5px]'>
            <div className='text-[#6E6E82] text-xs font-light'>후기</div>
            <div className='text-[#6E6E82] text-xs font-light'>{reviewCount}</div>
          </div>
          <div className='flex gap-[5px]'>
            <div className='text-[#6E6E82] text-xs font-light'>찜</div>
            <div className='text-[#6E6E82] text-xs font-light'>{favoriteCount}</div>
          </div>
        </div>

        <div className='inline-flex items-center gap-0.5'>
          <div className='text-gray-400 text-xs font-light'>⭐️ {rating}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
