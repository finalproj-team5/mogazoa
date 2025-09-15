'use client';

import ReviewerRanking from './home/ReviewerRanking';
import MobileCategorySheet from './home/MobileCategorySheet';
import ProductGrid from '@/components/common/ProductGrid';
import CategoryList from './home/CategoryList';
import { getCategories } from '@/api/categories/getCategories';
import { useEffect, useState } from 'react';
import { Category } from '@/types/Category';
import { useGetProducts } from '@/api/categories/getProductList';
import { useSearchStore } from '@/lib/useSearchStore';

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // 상품 목록 가져오기
  const { data, isLoading, isError } = useGetProducts();

  const products = data?.list ?? [];
  const keyword = useSearchStore((state) => state.keyword);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(`카테고리 불러오기 실패`, error);
      }
    };
    fetchCategories();
  }, []);

  // 카테고리별 필터링

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategoryId ? p.categoryId === selectedCategoryId : true;
    const matchKeyword = keyword ? p.name.toLowerCase().includes(keyword.toLowerCase()) : true;
    return matchCategory && matchKeyword;
  });

  // 핫상품 (리뷰 많은 순 상위 6개)
  const hotProducts = [...products]
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, 6);

  //별점 높은 순 상위 6개
  const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 6);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>상품을 불러오는데 실패했습니다.</div>;

  return (
    <main className='flex justify-between mt-5 gap-[30px]'>
      {/* PC/tablet 카테고리 */}
      <aside className='hidden md:flex flex-col p-2.5 md:pt-[45px] gap-1 w-45 lg:w-55'>
        <CategoryList
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </aside>

      {/* 모바일 카테고리 */}
      <aside className='md:hidden'>
        <MobileCategorySheet
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </aside>

      <section className='flex flex-col lg:flex-row flex-1 min-w-0 '>
        {/* [리뷰어 랭킹] Tablet/Mobile : Row-scroll */}
        <div className='grid grid-cols-2 lg:hidden overflow-x-auto space-x-4 mb-[60px]'>
          <ReviewerRanking />
        </div>

        {/* [상품 그리드] */}
        <div className='flex flex-col flex-1 min-w-0 lg:max-w-5xl'>
          <ProductGrid
            title={
              selectedCategoryId
                ? `${categories.find((c) => c.id === selectedCategoryId)?.name ?? ''}의 모든 상품`
                : '지금 핫한 상품'
            }
            products={keyword || selectedCategoryId ? filteredProducts : hotProducts}
          />
          {!keyword && !selectedCategoryId && (
            <div className='mt-15 lg:mt-20 flex flex-col flex-1 min-w-0 lg:max-w-5xl'>
              <ProductGrid title='별점높은순' products={topRatedProducts} />
            </div>
          )}
        </div>
      </section>

      {/* [리뷰어 랭킹] PC */}
      <div className='hidden lg:block w-[250px] '>
        <ReviewerRanking />
      </div>
    </main>
  );
};

export default Home;
