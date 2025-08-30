'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';

export default function KakaoSignupCallbackPage() {
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
      console.log('회원가입 요청:', {
        nickname,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
        token: code,
      });

      const response = await fetch('https://mogazoa-api.vercel.app/16-5/auth/signUp/kakao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI,
          token: code,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('회원가입 성공:', data);
        localStorage.setItem('auth-token', data.accessToken);
        router.push('/');
      } else {
        const errorData = await response.json().catch(() => null);
        console.error('회원가입 실패:', errorData);
        alert(errorData?.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center px-4'>
      <div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <Input
            id='nickname'
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            label='닉네임'
            placeholder='닉네임을 입력해주세요'
            disabled={isLoading}
            size='lg'
          />

          <Button
            type='submit'
            disabled={isLoading || !nickname.trim()}
            variant='primary'
            size='lg'
          >
            {isLoading ? '처리중...' : '가입하기'}
          </Button>
        </form>
      </div>
    </div>
  );
}
