'use client';

import { Button } from '@/components/ui/button';
// import ReviewerRanking from './ReviewerRanking';
// import MobileCategorySheet from './MobileCategorySheet';
import ProductGrid from '@/components/common/ProductGrid';
// import { useState } from 'react';

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

export default function Home() {
  //   const [category, setCategory] = useState('전체');
  //   const categories = [1, 2, 3, 4, 5];

  return (
    <main className='flex flex-col items-center justify-center p-24'>
      {/* <aside className='hidden md:flex gap-4'>
        {/* pc버전에서는 그냥 메뉴 */}
      {/* {categories.map((category) => (
          <button key={category}>{category}</button>
        ))} */}
      {/* </aside> */}
      {/* <aside className='flex md:hidden'>
        <MobileCategorySheet onSelect={setCategory} />
      </aside> */}
      <div className='md:w-[564px] lg:w-940 max-w-[940px] ml-[90px] mr-[60px]'>
        <ProductGrid title='가장 핫한 상품 TOP 6' products={products} />
      </div>
      {/* PC 버전: grid */}
      {/* <div className='hidden md:grid grid-cols-4 gap-4'>
        {reviewers.map((review) => (
          <ReviewerRanking key={review.id} {...review} />
        ))}
      </div> */}
      {/* 모바일 버전: 가로 스크롤 */}
      {/* <div className='flex md:hidden overflow-x-auto space-x-4 scrollbar-hide'>
        {reviewers.map((review) => (
          <ReviewerRanking key={review.id} {...review} />
        ))}
      </div> */}

      <Button variant='outline' className='ml-4'>
        Outline
      </Button>
    </main>
  );
}
