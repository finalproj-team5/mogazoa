'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { getKakaoAccessToken, getKakaoUserInfo } from '@/lib/kakaoAuth';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const didRunRef = useRef(false);
  const { login } = useAuthStore();

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          throw new Error('카카오 로그인이 취소되었습니다.');
        }

        if (!code) {
          throw new Error('인증 코드가 없습니다.');
        }

        console.log('=== 카카오 로그인/회원가입 처리 시작 ===');
        console.log('인가 코드:', code.substring(0, 20) + '...');

        // 토큰 방식: 인가 코드 → 카카오 토큰으로 변환해서 전달
        console.log('인가 코드를 카카오 토큰으로 변환 중...');

        try {
          // 인가 코드로 카카오 액세스 토큰 발급
          const kakaoToken = await getKakaoAccessToken(code);
          console.log('카카오 토큰 발급 성공');

          // 카카오 사용자 정보 조회
          const kakaoUserInfo = await getKakaoUserInfo(kakaoToken);
          console.log('카카오 사용자 정보:', kakaoUserInfo.kakao_account.email);

          // 토큰과 사용자 정보를 세션에 저장하고 회원가입 페이지로 이동
          sessionStorage.setItem('kakaoToken', kakaoToken);
          sessionStorage.setItem('kakaoUserInfo', JSON.stringify(kakaoUserInfo));

          router.replace('/oauth/signup/kakao');
        } catch (tokenError) {
          console.error('카카오 토큰 처리 실패:', tokenError);
          alert('카카오 인증에 실패했습니다. 다시 시도해주세요.');
          router.replace('/signin');
        }
      } catch (error: unknown) {
        console.error('❌ 카카오 처리 중 오류:', error);
        const errorMessage =
          error instanceof Error ? error.message : '카카오 로그인에 실패했습니다.';
        alert(errorMessage);
        router.replace('/signin');
      }
    };

    handleCallback();
  }, [router, searchParams, login]);

  return (
    <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center'>
      <div className='text-white text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#5097FA] mx-auto mb-4'></div>
        <p>카카오 로그인 처리 중...</p>
      </div>
    </div>
  );
}
