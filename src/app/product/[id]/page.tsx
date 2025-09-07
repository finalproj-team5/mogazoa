import ProductImages from './components/ProductImages';
import ProductInfo from './components/ProductInfo';
import ProductStats from './components/ProductStats';
import ReviewSection from './components/ReviewSection';

// UI 확인을 위한 예시(mock) 데이터
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

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id: productId } = params;

  // 나중에 실제 API를 연결할 때 이 productData 부분을 API 호출 결과로 교체하기

  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <main className='max-w-screen-lg mx-auto px-4 sm:px-6 py-12'>
        {/* 상단 섹션: 이미지와 정보 */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8'>
          {/* 왼쪽: 상품 이미지 */}
          <ProductImages imageUrl={productData.imageUrl} productName={productData.name} />

          {/* 오른쪽: 상품 정보 */}
          <ProductInfo product={productData} />
        </section>

        {/* 중단 섹션: 통계 */}
        <ProductStats stats={productData.stats} />

        {/* 하단 섹션: 리뷰 */}
        <ReviewSection productId={productId} />
      </main>
    </div>
  );
}
