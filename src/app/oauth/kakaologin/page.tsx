'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { tryKakaoLogin } from '@/lib/kakaoAuth';

export default function KakaoLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const didRunRef = useRef(false);
  const { login } = useAuthStore();
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    const handleKakaoLogin = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          throw new Error('카카오 로그인이 취소되었습니다.');
        }

        if (!code) {
          throw new Error('인증 코드가 없습니다.');
        }

        console.log('=== 카카오 로그인 시도 ===');
        console.log('인가 코드:', code.substring(0, 20) + '...');

        // 로그인 시도
        const loginResult = await tryKakaoLogin(code);

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
          router.replace('/');
        } else {
          // 로그인 실패 - 신규 사용자, 회원가입 버튼 표시
          console.log('❌ 로그인 실패 - 신규 사용자, 회원가입 버튼 표시');
          setShowSignupButton(true);
          setIsLoading(false);
        }
      } catch (error: unknown) {
        console.error('❌ 카카오 로그인 중 오류:', error);
        const errorMessage =
          error instanceof Error ? error.message : '카카오 로그인에 실패했습니다.';
        alert(errorMessage);
        router.replace('/signin');
      }
    };

    handleKakaoLogin();
  }, [router, searchParams, login]);

  const handleSignupRedirect = () => {
    // 인가 코드가 이미 사용되었으므로 새로운 카카오 로그인 시작 (회원가입용)
    if (typeof window !== 'undefined' && window.Kakao) {
      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth/callback?signup=true',
      });
    } else {
      router.push('/signin');
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center'>
        <div className='text-white text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#5097FA] mx-auto mb-4'></div>
          <p>카카오 로그인 처리 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center px-4'>
      <div className='text-white text-center'>
        {showSignupButton && (
          <div>
            <h2 className='text-xl mb-4'>신규 사용자입니다</h2>
            <p className='text-[#6E6E82] mb-6'>카카오 계정으로 회원가입을 진행하시겠습니까?</p>
            <button
              onClick={handleSignupRedirect}
              className='bg-[#5097FA] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors'
            >
              카카오 회원가입하러가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
