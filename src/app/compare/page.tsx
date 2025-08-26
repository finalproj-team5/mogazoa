import React from 'react';

function ComparisonSelector() {
  return (
    <div className='flex items-center justify-center gap-6 my-8'>
      <div className='w-28 h-28 bg-gray-700 rounded-2xl flex items-center justify-center'>
        <span className='text-5xl font-bold text-gray-500'>A</span>
      </div>
      <span className='text-2xl font-semibold text-gray-500'>VS</span>
      <div className='w-28 h-28 bg-gray-700 rounded-2xl flex items-center justify-center'>
        <span className='text-5xl font-bold text-gray-500'>B</span>
      </div>
    </div>
  );
}

function InputSection() {
  return (
    <div className='px-2 space-y-6'>
      <div>
        <label className='block mb-2 font-semibold text-gray-200'>상품 1</label>
        <div className='rounded-2xl p-0.5 bg-dark-bg focus-within:bg-gradient-to-r focus-within:from-[#5097FA] focus-within:to-[#5363FF]'>
          <input
            type='text'
            placeholder='상품명 (상품 등록 여부를 확인 해 주세요)'
            className='w-full p-4 text-center rounded-2xl bg-gray-900 text-white focus:outline-none'
          />
        </div>
      </div>
      <div>
        <label className='block mb-2 font-semibold text-gray-200'>상품 2</label>
        <div className='rounded-2xl p-0.5 bg-dark-bg focus-within:bg-gradient-to-r focus-within:from-[#5097FA] focus-within:to-[#5363FF]'>
          <input
            type='text'
            placeholder='상품명 (상품 등록 여부를 확인 해 주세요)'
            className='w-full p-4 text-center rounded-2xl bg-gray-900 text-white focus:outline-none'
          />
        </div>
      </div>
    </div>
  );
}

function FloatingActionButton() {
  return (
    <button className='fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-[#5097FA] to-[#5363FF] rounded-full flex items-center justify-center text-white text-4xl shadow-lg transition hover:brightness-80 cursor-pointer'>
      <span className='relative bottom-0.5'>+</span>
    </button>
  );
}

function BottomStatusBar() {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 bg-transparent'>
      <div className='w-full text-center text-gray-400 bg-gray-700 rounded-full py-4'>
        비교할 상품 2개를 입력해 주세요 (0/2)
      </div>
    </div>
  );
}

export default function ComparisonPage() {
  return (
    <div className='w-full max-w-md mx-auto min-h-screen relative font-sans'>
      <div className='h-16 w-full sticky top-0 bg-dark-bg border-b border-gray-700 flex items-center justify-center text-sm text-gray-400'>
        (Header가 들어올 영역)
      </div>

      <main className='pt-8 px-4 pb-40'>
        <h1 className='text-3xl font-bold text-center text-gray-200'>둘 중 뭐가 더 나을까?</h1>
        <ComparisonSelector />
        <InputSection />
      </main>

      <FloatingActionButton />
      <BottomStatusBar />
    </div>
  );
}
