import React from 'react';
import MobileView from './components/MobileView';
import TabletView from './components/TabletView';
import DesktopView from './components/DesktopView';

// --- 최종 페이지 컴포넌트 ---
export default function ComparisonPage() {
  return (
    <div className='w-full min-h-screen font-sans bg-gray-900 text-white'>
      {/* --- 헤더 --- */}
      <header className='h-16 w-full sticky top-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 flex items-center justify-center text-sm text-gray-400 z-10'>
        (Header가 들어올 영역)
      </header>

      {/* --- 메인 콘텐츠 --- */}
      <main className='w-full max-w-md md:max-w-5xl lg:max-w-7xl mx-auto pt-12 pb-40 px-4'>
        <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-200 mb-10'>
          둘 중 뭐가 더 나을까?
        </h1>

        {/* --- 화면 크기별 뷰 렌더링 --- */}
        <MobileView />
        <TabletView />
        <DesktopView />

        {/* --- 하단 상태 바 --- */}
        <div className='mt-12'>
          <div className='max-w-sm mx-auto text-center text-gray-400 bg-gray-800 rounded-full py-4'>
            비교할 상품 2개를 입력해 주세요 (0/2)
          </div>
        </div>
      </main>

      {/* --- 플로팅 액션 버튼 --- */}
      <button className='fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-[#5097FA] to-[#5363FF] rounded-full flex items-center justify-center text-white text-4xl shadow-lg transition hover:brightness-95 active:scale-95 cursor-pointer'>
        <span className='relative bottom-0.5'>+</span>
      </button>
    </div>
  );
}
