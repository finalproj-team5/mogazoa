import { ProductGridProps } from '@/types/Product';
import ProductCard from '@/components/common/ProductCard';

const ProductGrid = ({ title, products }: ProductGridProps) => {
  return (
    <>
      <h1 className='text-[#F1F1F5] lg:text-2xl text-xl font-semibold'>{title}</h1>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-[15px] lg:gap-5 justify-center'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
