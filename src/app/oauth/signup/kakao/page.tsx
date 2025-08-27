'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/authStore';
import OAuthSignupForm from './components/OAuthSignupForm';

export default function OAuthSignupPage() {
  const router = useRouter();

  useEffect(() => {
    const { isLoggedIn } = useAuthStore.getState();

    // 이미 로그인되어 있다면 홈으로 리다이렉트
    if (isLoggedIn) {
      router.push('/');
      return;
    }

    // TODO: OAuth 토큰 확인
    // 카카오 로그인 과정에서 받은 토큰이 있는지 확인
    // 토큰이 없다면 비정상적인 접근으로 처리
  }, [router]);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center px-4'>
      <div className=''>
        {/* 간편 회원가입 폼 */}
        <OAuthSignupForm />

        {/* 홈으로 가기 링크 */}
        <div className='mt-8 text-center'>
          <button
            type='button'
            onClick={handleGoHome}
            className='text-[#6E6E82] hover:text-[#5097FA] transition-all'
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}
