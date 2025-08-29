'use client';

import { useRouter } from 'next/navigation';
import LoginForm from './components/LoginForm';
import SocialButtons from './components/SocialButtons';
import { useAuthStore } from '@/lib/stores/authStore';
import { useEffect } from 'react';

export default function SigninPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div className='min-h-screen bg-[#1C1C22] flex items-center justify-center px-4'>
      <div className=''>
        {/* 로그인 폼 */}
        <LoginForm />

        {/* 소셜 로그인 버튼들 */}
        <SocialButtons />

        {/* 회원가입 링크 */}
        <div className='mt-8 text-center'>
          <span className='text-[#6E6E82]'>계정이 없으신가요? </span>
          <button
            type='button'
            onClick={() => router.push('/signup')}
            className='text-[#5097FA] hover:underline transition-all'
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
