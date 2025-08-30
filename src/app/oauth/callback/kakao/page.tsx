'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      console.log('카카오 인증 코드:', code);
      // TODO: 이 코드를 사용해서 액세스 토큰 요청하기

      // 임시로 홈페이지로 리다이렉트
      router.push('/');
    } else {
      // 인증 실패시 로그인 페이지로
      router.push('/signin');
    }
  }, [router, searchParams]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#1C1C22]'>
      <div className='text-center text-white'>
        <h2 className='text-xl mb-2'>카카오 로그인 처리 중...</h2>
        <p className='text-gray-400'>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
