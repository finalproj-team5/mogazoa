'use client';

import ReviewerRanking from './home/ReviewerRanking';
import MobileCategorySheet from './home/MobileCategorySheet';
import ProductGrid from '@/components/common/ProductGrid';
import CategoryList from './home/CategoryList';

import { useEffect, useState } from 'react';
import { getCategories } from '@/api/categories/getCategories';
import { Category } from '@/types/Category';
import { useGetProducts } from '@/api/categories/getProductList';
import { useSearchStore } from '@/lib/useSearchStore';

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<'recent' | 'rating' | 'reviewCount'>('recent');

  // 상품 목록 가져오기

  const keyword = useSearchStore((state) => state.keyword);

  const { data, isLoading, isError } = useGetProducts({
    keyword: keyword || undefined,
    category: selectedCategoryId || undefined,
    order: selectedOrder,
  });

  const products = data?.list ?? [];

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

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>상품을 불러오는데 실패했습니다.</div>;

  const hasKeyword = !!keyword;
  const hasCategoryId = selectedCategoryId !== null;
  const isDefaultView = !hasKeyword && !hasCategoryId;
  const defaultProducts = isDefaultView ? products.slice(0, 6) : products;

  const getTitle = () => {
    if (hasKeyword && hasCategoryId) {
      const categoryName = categories.find((c) => c.id === selectedCategoryId)?.name ?? '';

      return `${categoryName}에서 '${keyword}'로 검색한 상품`;
    }

    if (hasKeyword) {
      return `'${keyword}'로 검색한 상품`;
    }

    if (hasCategoryId) {
      return `${categories.find((c) => c.id === selectedCategoryId)?.name ?? ''}의 모든 상품`;
    }

    return '지금 핫한 상품';
  };

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

        <div className='flex flex-col flex-1 min-w-0 lg:max-w-5xl gap-4 lg:gap-5'>
          <ProductGrid
            title={getTitle()}
            products={defaultProducts}
            onOrderChange={setSelectedOrder}
          />

          {isDefaultView && <ProductGrid title='별점높은순' products={defaultProducts} />}
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
