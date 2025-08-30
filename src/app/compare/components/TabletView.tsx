import React from 'react';
import Image from 'next/image';
import characterIcon from '@/assets/images/character.png';

// --- 태블릿 뷰에서 사용하는 하위 컴포넌트들 ---

interface ProductResultCardProps {
  label: string;
}

function ProductResultCard({ label }: ProductResultCardProps) {
  return (
    <div className='w-full h-56 bg-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center text-center'>
      <div className='flex-grow w-full flex items-center justify-center relative'>
        <Image
          src={characterIcon}
          alt='캐릭터 아이콘'
          fill
          style={{ objectFit: 'contain', padding: '1rem' }}
        />
      </div>
      <p className='font-semibold text-gray-400 text-sm mt-2'>{label}</p>
    </div>
  );
}

interface ResultBoxProps {
  icon: string;
  text: string;
}

function ResultBox({ icon, text }: ResultBoxProps) {
  return (
    <div className='flex items-center gap-3 text-gray-300'>
      <span className='text-2xl'>{icon}</span>
      <span className='font-medium'>{text}</span>
    </div>
  );
}

interface ProductSectionProps {
  productName: string;
  imageLabel: string;
}

function ProductSection({ productName, imageLabel }: ProductSectionProps) {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='w-40 h-40 bg-gray-700 rounded-2xl flex items-center justify-center'>
        <span className='text-8xl font-bold text-gray-500'>{productName}</span>
      </div>
      <div className='w-full rounded-2xl p-0.5 bg-gray-800 focus-within:bg-gradient-to-r focus-within:from-[#5097FA] focus-within:to-[#5363FF]'>
        <input
          type='text'
          placeholder='상품명을 입력해 주세요'
          className='w-full py-4 px-6 text-center rounded-2xl bg-gray-900 text-white focus:outline-none'
        />
      </div>
      <ProductResultCard label={imageLabel} />
    </div>
  );
}

// 태블릿 전용 UI (중간 크기 화면에서 보입니다)
export default function TabletView() {
  return (
    <div className='hidden md:grid lg:hidden grid-cols-[1fr_auto_1fr] gap-x-12 items-start'>
      <ProductSection productName='A' imageLabel='비교할 상품 A를 입력해 주세요' />
      <div className='flex flex-col justify-between items-center h-full pt-16 pb-8'>
        <span className='text-5xl font-semibold text-gray-500'>VS</span>
        <div className='flex flex-col items-start gap-4'>
          <ResultBox icon='⭐' text='별점' />
          <ResultBox icon='✍️' text='리뷰 개수' />
          <ResultBox icon='❤' text='찜 개수' />
        </div>
      </div>
      <ProductSection productName='B' imageLabel='비교할 상품 B를 입력해 주세요' />
    </div>
  );
}
