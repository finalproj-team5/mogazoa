'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const code = searchParams.get('code');
    if (!code) {
      alert('인가 코드가 없습니다. 다시 로그인해주세요.');
      router.push('/signin');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://mogazoa-api.vercel.app/16-5/auth/signUp/kakao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          token: code,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('auth-token', data.accessToken);
        router.push('/');
      } else {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-white mb-2'>카카오 간편 회원가입</h1>
          <p className='text-gray-400'>사용하실 닉네임을 입력해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='nickname' className='block text-sm font-medium text-white mb-2'>
              닉네임
            </label>
            <input
              id='nickname'
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className='w-full px-4 py-3 bg-[#252530] border border-[#353542] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='닉네임을 입력해주세요'
              disabled={isLoading}
            />
          </div>

          <button
            type='submit'
            disabled={isLoading || !nickname.trim()}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200'
          >
            {isLoading ? '처리중...' : '가입하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
