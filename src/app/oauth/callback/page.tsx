'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      console.log('카카오 인증 코드:', code);
      handleKakaoLogin(code);
    } else {
      router.push('/signin');
    }
  }, [router, searchParams]);

  const [loginResult, setLoginResult] = useState<{
    status: 'loading' | 'success' | 'needSignup' | 'error';
    error?: string;
  }>({ status: 'loading' });

  const handleKakaoLogin = async (code: string) => {
    try {
      // 로그인 시도 (기존 회원인지 확인)
      const signInResult = await trySignIn(code);
      if (signInResult) {
        console.log('기존 회원 로그인 성공:', signInResult);
        localStorage.setItem('auth-token', signInResult.accessToken);
        setLoginResult({ status: 'success' });
        router.push('/');
        return;
      }

      // 로그인 실패시 회원가입 버튼 표시
      setLoginResult({ status: 'needSignup' });
    } catch (error) {
      console.error('소셜 로그인 처리 중 오류:', error);
      setLoginResult({ status: 'error', error: '로그인 처리 중 오류가 발생했습니다.' });
    }
  };

  const handleSignupClick = () => {
    // 새로운 인가코드를 받기 위해 카카오 회원가입 OAuth URL로 리다이렉트
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  };

  const trySignIn = async (code: string) => {
    try {
      const requestData = {
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        token: code, // 인가코드를 token 필드에
      };
      console.log('로그인 요청 데이터:', requestData);

      const response = await fetch('https://mogazoa-api.vercel.app/16-5/auth/signIn/kakao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json().catch(() => null);
        console.error('로그인 실패:', response.status, errorData);
      }

      return null;
    } catch (error) {
      console.error('로그인 시도 실패:', error);
      return null;
    }
  };

  if (loginResult.status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#1C1C22]'>
        <div className='text-center text-white'>
          <h2 className='text-xl mb-2'>카카오 로그인 처리 중...</h2>
          <p className='text-gray-400'>잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  if (loginResult.status === 'needSignup') {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#1C1C22]'>
        <div className='text-center text-white'>
          <h2 className='text-2xl font-bold mb-4'>카카오 간편 회원가입</h2>
          <p className='text-gray-400 mb-8'>
            등록되지 않은 사용자입니다.
            <br />
            간편하게 회원가입을 진행해보세요!
          </p>
          <button
            onClick={handleSignupClick}
            className='bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg text-lg transition duration-200'
          >
            카카오로 회원가입하기
          </button>
        </div>
      </div>
    );
  }

  if (loginResult.status === 'error') {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#1C1C22]'>
        <div className='text-center text-white'>
          <h2 className='text-xl mb-2'>오류가 발생했습니다</h2>
          <p className='text-gray-400 mb-4'>{loginResult.error}</p>
          <button
            onClick={() => router.push('/signin')}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg'
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
