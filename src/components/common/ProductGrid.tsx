import { ProductGridProps } from '@/types/Product';

import ProductCard from '@/components/common/ProductCard';

import Link from 'next/link';

const ProductGrid = ({ title, products, onOrderChange }: ProductGridProps) => {
  const Options = {
    recent: '최신순',
    rating: '별점순',
    reviewCount: '리뷰 많은 순',
  };
  return (
    <>
      <div className='flex items-center gap-2.5'>
        <div className='flex gap-2.5'>
          <h1 className='text-[#F1F1F5] text-xl font-semibold'>{title}</h1>

          <h1
            className='font-semibold text-xl lg:text-2xl bg-gradient-to-r from-[#5097FA] to-[#5363FF] 
          bg-clip-text text-transparent '
          >
            TOP 6
          </h1>
        </div>

        <div className='w-40 inline-flex justify-between items-center'>
          <select
            className="text-right justify-start text-gray-500 text-base font-normal font-['Pretendard']"
            onChange={(e) => onOrderChange?.(e.target.value as 'recent' | 'rating' | 'reviewCount')}
          >
            {Object.entries(Options).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-[15px] lg:gap-[20px] lg:grid-cols-3'>
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
