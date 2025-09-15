'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Review } from '@/types/Reviewer'; // Review 타입 import

// 컴포넌트 import
import ProductImages from './components/ProductImages';
import ProductInfo from './components/ProductInfo';
import ProductStats from './components/ProductStats';
import ReviewSection from './components/ReviewSection';

// --- UI 확인을 위한 예시(mock) 데이터 ---
const productData = {
  id: '123',
  category: '전자기기',
  name: 'Sony WH-1000XM3',
  description:
    '업계 최고 수준의 노이즈 캔슬링을 자랑하는 무선 헤드폰입니다. 몰입의 즐거움을 경험해 보세요.',
  imageUrl: '/images/reviewers/user1.jpg',
  stats: {
    rating: 4.9,
    reviewCount: 154,
    wishCount: 566,
  },
};

// const mockReviews: Review[] = [
//   {
//     id: 1,
//     author: { name: 'surfer', avatarUrl: '/images/reviewers/user1.jpg' },
//     rating: 5,
//     content:
//       '품질 좋습니다~ e북리더기 어플 연결해서 쓸려고 샀는데 아주 만족스럽네요. 음질도 깨끗하고, 특히 노이즈 캔슬링 기능이 대박입니다.',
//     createdAt: '2024-05-28',
//     likes: 132,
//   },
//   {
//     id: 2,
//     author: { name: '아배나비', avatarUrl: '/images/reviewers/user2.jpg' },
//     rating: 3,
//     content:
//       '전작과 동일하게, 소니 헤드셋 특유의 노이즈 캔슬링이 가능해요! 1000XM5로 넘어갈까 고민했는데 이걸로도 충분하네요. 가성비 최고!',
//     createdAt: '2023-12-18',
//     likes: 7,
//   },
// ];
// --- mock 데이터 끝 ---

export default function ProductPage() {
  // Client Component에서 URL 파라미터를 안전하게 가져오기 위해 useParams 훅 사용

  const params = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const _productId = Array.isArray(params.id) ? params.id[0] : params.id;

  // productId가 없을 경우를 대비한 방어 코드
  if (!_productId) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  const handleReviewSubmit = (newReview: { rating: number; content: string }) => {
    const newReviewData: Review = {
      id: Date.now(),
      author: { name: '새 유저', avatarUrl: '/images/reviewers/user_default.png' },
      rating: newReview.rating,
      content: newReview.content,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
    };
    setReviews([newReviewData, ...reviews]);
  };

  return (
    <div className='bg-[#1C1C22] text-white min-h-screen'>
      <main className='max-w-screen-lg mx-auto px-4 sm:px-6 py-12'>
        <section className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8'>
          <ProductImages imageUrl={productData.imageUrl} productName={productData.name} />
          <ProductInfo product={productData} onReviewSubmit={handleReviewSubmit} />
        </section>

        <ProductStats stats={productData.stats} />

        <ReviewSection productId={_productId} reviews={reviews} />
      </main>

      <button
        onClick={() => alert('상품 추가 기능 구현 필요!')}
        className='fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-[#5097FA] to-[#5363FF] rounded-full flex items-center justify-center text-white text-4xl shadow-lg transition hover:brightness-110 active:scale-95 cursor-pointer'
      >
        <span className='relative bottom-0.5'>+</span>
      </button>
    </div>
  );
}
