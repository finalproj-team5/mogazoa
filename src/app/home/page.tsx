'use client';

// import ReviewerRanking from './ReviewerRanking';
// import MobileCategorySheet from './MobileCategorySheet';
import ProductGrid from '@/components/common/ProductGrid';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: '다이슨 슈퍼소닉 블루',
    image: '/images/reviewers/user1.jpg',
    reviewCount: 120,
    rating: 4.8,
    favoriteCount: 5,
  },
  {
    id: 2,
    name: 'Apple Watch 7',
    image: '/images/reviewers/user2.jpg',
    reviewCount: 98,
    rating: 4.6,
    favoriteCount: 213,
  },
  {
    id: 3,
    name: '헤라 블랙쿠션',
    image: '/images/reviewers/user3.jpg',
    reviewCount: 75,
    rating: 4.2,
    favoriteCount: 123,
  },
  {
    id: 4,
    name: '우스티드 울 폴로 셔츠',
    image: '/images/reviewers/user4.jpg',
    reviewCount: 150,
    rating: 4.9,
    favoriteCount: 234,
  },
  {
    id: 5,
    name: '돌화분',
    image: '/images/reviewers/user5.jpg',
    reviewCount: 60,
    rating: 4.4,
    favoriteCount: 6,
  },
  {
    id: 6,
    name: '아디다스 퍼피렛 코어 블랙',
    image: '/images/reviewers/user6.jpg',
    reviewCount: 124,
    rating: 4.2,
    favoriteCount: 7,
  },
];

const categories = [
  {
    id: 1,
    name: '음악',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 2,
    name: '영화/드라마',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 3,
    name: '강의/책',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 4,
    name: '호텔',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 5,
    name: '가구/인테리어',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 6,
    name: '식당',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 7,
    name: '전자기기',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 8,
    name: '화장품',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 9,
    name: '의류/잡화',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 10,
    name: '앱',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
];

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <main className='flex items-center justify-center p-24'>
      {/* pc버전에서는 그냥 메뉴 */}
      <aside className='hidden md:flex flex-col gap-4'>
        <div className='text-[#F1F1F5] gap-1 '>카테고리</div>
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`text-left whitespace-nowrap px-4 py-[15px] gap-[10px] rounded text-sm md:text-base
                ${isSelected ? 'text-[#F1F1F5] bg-[#252530]' : 'text-[#6E6E82]'}`}
            >
              {category.name}
            </button>
          );
        })}
      </aside>

      {/* 그 머냐 버튼 누르면 메뉴창 나오게 하는거 */}
      <div className='md:hidden'>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}></button>
      </div>

      {/* 위에서 분부하신 메뉴창 */}
      {/* <aside className='flex md:hidden'>
        <MobileCategorySheet onSelect={setCategories} />
      </aside> */}

      {/* 태블릿/모바일 버전: 가로 스크롤 */}
      {/* <div className='flex lg:hidden overflow-x-auto space-x-4 scrollbar-hide'>
        {reviewers.map((review) => (
          <ReviewerRanking key={review.id} {...review} />
        ))}
      </div> */}

      <section>
        <div className='md:w-[564px] lg:w-940 max-w-[940px] ml-[90px] mr-[60px]'>
          <ProductGrid title='가장 핫한 상품 TOP 6' products={products} />
        </div>
      </section>

      {/* PC 버전: grid */}
      {/* <div className='hidden lg:grid flex-col gap-4'>
        {reviewers.map((review) => (
          <ReviewerRanking key={review.id} {...review} />
        ))}
      </div> */}
    </main>
  );
};

export default Home;
