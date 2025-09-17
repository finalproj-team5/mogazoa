'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { useGetProduct } from '@/api/products/useGetProduct';
import { useToggleFavorite } from '@/api/products/useToggleFavorite';

// 컴포넌트 import
import ProductImages from './components/ProductImages';
import ProductInfo from './components/ProductInfo';
import ProductStats from './components/ProductStats';
import ReviewSection from './components/ReviewSection';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = (Array.isArray(params.id) ? params.id[0] : params.id) || '';
  const { isLoggedIn, user } = useAuthStore();

  const { data: product, isLoading, isError, refetch } = useGetProduct(productId);

  const { mutate: toggleFavorite } = useToggleFavorite(productId);

  // 찜하기 버튼 클릭 시 실행될 핸들러
  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      router.push('/login');
      return;
    }
    if (!product) return;
    toggleFavorite({
      productId,
      isFavorited: !!product.isFavorited, // boolean 타입 보장
    });
  };
  if (isLoading) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>상품 정보를 불러오는 데 실패했습니다.</div>;
  }

  if (!product || !productId) {
    return <div>상품 정보가 없습니다.</div>;
  }

  return (
    <div className='bg-[#1C1C22] text-white min-h-screen'>
      <main className='max-w-screen-lg mx-auto px-4 sm:px-6 py-12'>
        <section className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8'>
          <ProductImages product={product} />
          <ProductInfo
            product={{
              id: product.id?.toString(),
              category: `카테고리 ID: ${product.categoryId}`,
              description: product.description ?? '',
              name: product.name,
              imageUrl: product.image,
              writerId: product.writerId, // 실제 API에서 받아온 작성자 ID
            }}
            currentUserId={user ? parseInt(user.id) : undefined}
            onReviewSubmit={() => {}}
            isFavorited={!!product.isFavorited}
            onToggleFavorite={handleToggleFavorite}
            onProductUpdate={() => refetch()}
          />
        </section>
        <ProductStats
          stats={{
            rating: product.rating ?? 0,
            reviewCount: product.reviewCount ?? 0,
            wishCount: product.favoriteCount ?? 0,
          }}
        />
        <ReviewSection productId={productId} reviews={[]} />{' '}
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
