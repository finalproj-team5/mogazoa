'use client';
import React, { useState, useEffect } from 'react';
import { Product, ProductState, ComparisonResult } from '@/types/Product';
import { MobileView } from './views/MobileView';
import { TabletAndDesktopView } from './views/TabletAndDesktopView';

export default function ComparisonPage() {
  const [productA, setProductA] = useState<ProductState>({ selectedProduct: null });
  const [productB, setProductB] = useState<ProductState>({ selectedProduct: null });
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    const savedA = localStorage.getItem('productA');
    if (savedA) {
      const parsed = JSON.parse(savedA);
      setProductA({ selectedProduct: parsed.selectedProduct || null });
    }
    const savedB = localStorage.getItem('productB');
    if (savedB) {
      const parsed = JSON.parse(savedB);
      setProductB({ selectedProduct: parsed.selectedProduct || null });
    }
  }, []);

  const handleProductSelect = (productLetter: 'A' | 'B', product: Product | null) => {
    setComparisonResult(null);

    const setter = productLetter === 'A' ? setProductA : setProductB;
    setter((prevState) => {
      const newState = { ...prevState, selectedProduct: product };
      localStorage.setItem(`product${productLetter}`, JSON.stringify(newState));
      return newState;
    });
  };

  const handleCompare = () => {
    const pA = productA.selectedProduct;
    const pB = productB.selectedProduct;
    if (pA && pB) {
      const getWinner = (valA: number, valB: number): 'A' | 'B' | 'draw' => {
        if (valA > valB) return 'A';
        if (valB > valA) return 'B';
        return 'draw';
      };

      const ratingA = pA.rating ?? 0;
      const ratingB = pB.rating ?? 0;
      const reviewCountA = pA.reviewCount ?? 0;
      const reviewCountB = pB.reviewCount ?? 0;
      const favoriteCountA = pA.favoriteCount ?? 0;
      const favoriteCountB = pB.favoriteCount ?? 0;

      const ratingResult = {
        winner: getWinner(ratingA, ratingB),
        diff: Math.abs(ratingA - ratingB),
      };
      const reviewsResult = {
        winner: getWinner(reviewCountA, reviewCountB),
        diff: Math.abs(reviewCountA - reviewCountB),
      };
      const likesResult = {
        winner: getWinner(favoriteCountA, favoriteCountB),
        diff: Math.abs(favoriteCountA - favoriteCountB),
      };

      const wins = { A: 0, B: 0 };
      [ratingResult, reviewsResult, likesResult].forEach((result) => {
        if (result.winner !== 'draw') wins[result.winner]++;
      });
      const overallWinner = wins.A > wins.B ? 'A' : wins.B > wins.A ? 'B' : 'draw';
      setComparisonResult({
        rating: ratingResult,
        reviews: reviewsResult,
        likes: likesResult,
        overallWinner: overallWinner,
      });
    }
  };

  const handleReset = () => {
    setComparisonResult(null);
  };

  const selectedCount = [productA.selectedProduct, productB.selectedProduct].filter(Boolean).length;
  const canCompare = selectedCount === 2;

  const getPageTitle = () => {
    if (!comparisonResult) return '둘 중 뭐가 더 나을까?';
    const winner = comparisonResult.overallWinner;
    const winnerProduct = winner === 'A' ? productA.selectedProduct : productB.selectedProduct;
    if (winner !== 'draw' && winnerProduct) {
      return `'${winnerProduct.name}' 상품을 선택하는 게 좋아요!`;
    }
    return '둘 다 좋은 선택이에요!';
  };

  const viewProps = { productA, productB, comparisonResult, handleProductSelect };

  return (
    <div className='w-full min-h-screen font-sans bg-[#1C1C22] text-white'>
      {/* --- 메인 콘텐츠 --- */}
      <main className='w-full max-w-md md:max-w-5xl lg:max-w-7xl mx-auto pt-12 pb-40 px-4'>
        <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-200 mb-10'>
          {getPageTitle()}
        </h1>

        <MobileView {...viewProps} />
        <TabletAndDesktopView {...viewProps} />

        <div className='mt-12 flex justify-center'>
          {comparisonResult ? (
            <button
              onClick={handleReset}
              className='w-full max-w-sm text-center text-white rounded-full py-4 transition-colors duration-300 bg-gray-600 hover:bg-gray-700'
            >
              다시 비교하기
            </button>
          ) : (
            <button
              onClick={handleCompare}
              disabled={!canCompare}
              className={`w-full max-w-sm text-center text-white rounded-full py-4 transition-all duration-300 ${
                canCompare
                  ? 'bg-gradient-to-r from-[#5097FA] to-[#5363FF] hover:brightness-110'
                  : 'bg-gray-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canCompare ? '상품 비교하기' : `비교할 상품을 선택해주세요 (${selectedCount}/2)`}
            </button>
          )}
        </div>
      </main>
      <button className='fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-[#5097FA] to-[#5363FF] rounded-full flex items-center justify-center text-white text-4xl shadow-lg transition hover:brightness-110 active:scale-95 cursor-pointer'>
        <span className='relative bottom-0.5'>+</span>
      </button>
    </div>
  );
}
