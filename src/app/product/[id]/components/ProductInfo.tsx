'use client';

import { Heart, Share2, Edit3 } from 'lucide-react';
import ReviewForm from './ReviewForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import ProductEditModal from './ProductEditModal';

interface Props {
  product: {
    id?: string;
    category: string;
    name: string;
    description: string;
    imageUrl?: string;
    writerId?: number; // 상품 작성자 ID
  };
  currentUserId?: number; // 현재 로그인한 사용자 ID
  onReviewSubmit: (newReview: { rating: number; content: string; imageUrl?: string }) => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onProductUpdate?: () => void; // 상품 수정 완료 시 호출할 콜백
}

export default function ProductInfo({
  product,
  currentUserId,
  onReviewSubmit,
  isFavorited,
  onToggleFavorite,
  onProductUpdate,
}: Props) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('링크를 복사하는 데 실패했습니다.');
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  // 현재 사용자가 상품 작성자인지 확인
  const isOwner = product.writerId && currentUserId && product.writerId === currentUserId;

  const handleReviewButtonClick = () => {
    // 로그인 상태를 확인합니다.
    if (isLoggedIn) {
      // 로그인 되어 있다면, 리뷰 작성 모달을 켭니다.
      setIsReviewModalOpen(true);
    } else {
      // 로그인 되어 있지 않다면, alert을 띄우고 로그인 페이지로 보냅니다.
      alert('리뷰를 작성하려면 로그인이 필요합니다.');
      router.push('/login');
    }
  };
  return (
    <div className='flex flex-col justify-center space-y-4'>
      <div>
        <span className='text-sm font-semibold text-green-400'>{product.category}</span>
      </div>
      <div className='flex items-start justify-between gap-4'>
        <h1 className='text-3xl md:text-4xl font-bold text-white'>{product.name}</h1>
        <div className='flex items-center gap-3 md:gap-4 text-gray-400 flex-shrink-0 pt-2'>
          {/* 본인이 작성한 상품일 때만 편집 버튼 표시 */}
          {isOwner && (
            <button
              onClick={handleEditClick}
              className='hover:text-blue-400 transition-colors'
              title='상품 편집'
            >
              <Edit3 size={20} className='md:w-6 md:h-6' />
            </button>
          )}
          <button onClick={onToggleFavorite} className='hover:text-white transition-colors'>
            <Heart
              size={20}
              className={`md:w-6 md:h-6 transition-all ${
                isFavorited ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </button>
          <button onClick={handleShare} className='hover:text-white transition-colors'>
            <Share2 size={20} className='md:w-6 md:h-6' />
          </button>
        </div>
      </div>
      <p className='text-gray-400 leading-relaxed text-sm md:text-base'>{product.description}</p>

      <div className='grid grid-cols-1 sm:grid-cols-3 items-center gap-4 pt-4'>
        <div className='w-full sm:col-span-2'>
          <Button
            onClick={handleReviewButtonClick}
            className='w-full h-12 rounded-lg bg-gradient-to-r from-[#5097FA] to-[#5363FF] text-white font-semibold'
          >
            리뷰 작성하기
          </Button>
        </div>
        <div className='w-full sm:col-span-1'>
          <Link href='/compare'>
            <Button
              variant='tertiary'
              className='w-full h-12 border-[#5363FF] text-[#5363FF] hover:bg-blue-900/20 whitespace-nowrap'
            >
              비교하기
            </Button>
          </Link>
        </div>
      </div>

      {/* 리뷰 작성 모달 */}
      <ReviewForm
        product={product}
        onReviewSubmit={(reviewData) => {
          onReviewSubmit(reviewData);
          setIsReviewModalOpen(false);
        }}
        isOpen={isReviewModalOpen}
        onOpenChange={setIsReviewModalOpen}
      />

      {/* 상품 편집 모달 */}
      <ProductEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={onProductUpdate}
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          imageUrl: product.imageUrl || '/images/reviewers/user1.jpg',
        }}
      />
    </div>
  );
}
