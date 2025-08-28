'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/authStore';
import OAuthSignupForm from './components/OAuthSignupForm';
import { tryKakaoLoginWithToken } from '@/lib/kakaoAuth';

export default function OAuthSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    const { isLoggedIn } = useAuthStore.getState();

    // 이미 로그인되어 있다면 홈으로 리다이렉트
    if (isLoggedIn) {
      router.push('/');
      return;
    }

    const handleKakaoProcess = async () => {
      const kakaoToken = sessionStorage.getItem('kakaoToken');
      const kakaoUserInfo = sessionStorage.getItem('kakaoUserInfo');

      if (!kakaoToken || !kakaoUserInfo) {
        alert('잘못된 접근입니다. 다시 로그인해 주세요.');
        router.push('/signin');
        return;
      }

      try {
        // 토큰으로 로그인 시도
        console.log('토큰으로 로그인 시도...');
        const loginResult = await tryKakaoLoginWithToken(kakaoToken);

        if (loginResult) {
          // 기존 사용자 - 로그인 성공
          console.log('✅ 기존 사용자 로그인 성공');
          localStorage.setItem('auth-token', loginResult.accessToken);
          login({
            id: loginResult.user.id.toString(),
            email: loginResult.user.email,
            nickname: loginResult.user.nickname,
            profileImage: loginResult.user.image || undefined,
          });
          sessionStorage.removeItem('kakaoToken');
          sessionStorage.removeItem('kakaoUserInfo');
          router.push('/');
        } else {
          // 로그인 실패 - 신규 사용자, 회원가입 폼 표시
          console.log('❌ 로그인 실패 - 신규 사용자');
          setShowSignupForm(true);
          setIsCheckingLogin(false);
        }
      } catch (error) {
        console.error('로그인 시도 중 에러:', error);
        // 에러가 나도 회원가입 폼 표시
        setShowSignupForm(true);
        setIsCheckingLogin(false);
      }
    };

    handleKakaoProcess();
  }, [router, searchParams, login]);

  const handleGoHome = () => {
    router.push('/');
  };

  // 로그인 확인 중이면 로딩 표시
  if (isCheckingLogin) {
    return (
      <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center px-4'>
        <div className='text-white text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#5097FA] mx-auto mb-4'></div>
          <p>카카오 로그인 확인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center px-4'>
      <div className=''>
        {showSignupForm ? (
          <>
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
          </>
        ) : null}
      </div>
    </div>
  );
}
