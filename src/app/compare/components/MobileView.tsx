import React from 'react';

export default function MobileView() {
  return (
    <div className='md:hidden'>
      <div className='flex items-center justify-center gap-12 my-8'>
        <div className='w-28 h-28 bg-gray-700 rounded-2xl flex items-center justify-center'>
          <span className='text-5xl font-bold text-gray-500'>A</span>
        </div>
        <span className='text-2xl font-semibold text-gray-500'>VS</span>
        <div className='w-28 h-28 bg-gray-700 rounded-2xl flex items-center justify-center'>
          <span className='text-5xl font-bold text-gray-500'>B</span>
        </div>
      </div>
      <div className='px-2 space-y-6'>
        <div>
          <label className='block mb-2 font-semibold text-gray-200'>상품 1</label>
          <div className='rounded-2xl p-0.5 bg-gray-800 focus-within:bg-gradient-to-r focus-within:from-[#5097FA] focus-within:to-[#5363FF]'>
            <input
              type='text'
              placeholder='상품명을 입력해주세요'
              className='w-full p-4 text-center rounded-2xl bg-gray-900 text-white focus:outline-none'
            />
          </div>
        </div>
        <div>
          <label className='block mb-2 font-semibold text-gray-200'>상품 2</label>
          <div className='rounded-2xl p-0.5 bg-gray-800 focus-within:bg-gradient-to-r focus-within:from-[#5097FA] focus-within:to-[#5363FF]'>
            <input
              type='text'
              placeholder='상품명을 입력해주세요'
              className='w-full p-4 text-center rounded-2xl bg-gray-900 text-white focus:outline-none'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
