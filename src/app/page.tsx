'use client';

import ReviewerRanking from './home/ReviewerRanking';
import MobileCategorySheet from './home/MobileCategorySheet';
import ProductGrid from '@/components/common/ProductGrid';
import CategoryList from './home/CategoryList';
import { getCategories } from '@/api/categories/getCategories';
import { useEffect, useState } from 'react';
import { Category } from '@/types/Category';

const products = [
  {
    id: 1,
    name: '다이슨 슈퍼소닉 블루',
    image: '/images/reviewers/user1.jpg',
    reviewCount: 120,
    rating: 4.8,
    favoriteCount: 5,
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Apple Watch 7',
    image: '/images/reviewers/user2.jpg',
    reviewCount: 98,
    rating: 4.6,
    favoriteCount: 213,
    categoryId: 2,
  },
  {
    id: 3,
    name: '헤라 블랙쿠션',
    image: '/images/reviewers/user3.jpg',
    reviewCount: 75,
    rating: 4.2,
    favoriteCount: 123,
    categoryId: 2,
  },
  {
    id: 4,
    name: '우스티드 울 폴로 셔츠',
    image: '/images/reviewers/user4.jpg',
    reviewCount: 150,
    rating: 4.9,
    favoriteCount: 234,
    categoryId: 2,
  },
  {
    id: 5,
    name: '돌화분',
    image: '/images/reviewers/user5.jpg',
    reviewCount: 60,
    rating: 4.4,
    favoriteCount: 6,
    categoryId: 1,
  },
  {
    id: 6,
    name: '아디다스 퍼피렛 코어 블랙',
    image: '/images/reviewers/user6.jpg',
    reviewCount: 124,
    rating: 4.2,
    favoriteCount: 7,
    categoryId: 3,
  },
];

const hotProducts = [...products]
  .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
  .slice(0, 6);
const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const filteredProducts = selectedCategoryId
    ? products.filter((stuff) => stuff.categoryId === selectedCategoryId)
    : products;

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
        {/* [리뷰어 랭킹] Tablet/Mobile : Row-sroll */}
        <div className='grid grid-cols-2 lg:hidden overflow-x-auto space-x-4 mb-[60px]'>
          <ReviewerRanking />
        </div>

        {/* [상품 그리드]: 중앙정렬 제거, 남은 폭 사용 */}
        <div className='flex flex-col flex-1 min-w-0 lg:max-w-5xl'>
          <ProductGrid
            title={
              selectedCategoryId
                ? `${categories.find((c) => c.id === selectedCategoryId)?.name ?? ''}의 모든 상품`
                : '지금 핫한 상품'
            }
            products={selectedCategoryId ? filteredProducts : hotProducts}
          />
        </div>
      </section>
      {/* [리뷰어 랭킹] PC 고정 너비 + shrink 방지 + 상단정렬 */}
      <div className='hidden lg:block w-[250px] '>
        <ReviewerRanking />
      </div>
    </main>
  );
};

export default Home;
