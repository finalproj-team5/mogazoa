import { ProductGridProps } from '@/types/Product';
import ProductCard from '@/components/common/ProductCard';

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <>
      <div>{title} </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-[15px] lg:gap-5 justify-center'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
