'use client';

import { useRouter } from 'next/navigation';
import SignupForm from './components/SignupForm';
import { useAuthStore } from '@/lib/stores/authStore';
import { useEffect } from 'react';

export default function SignupPage() {
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
        {/* 회원가입 폼 */}
        <SignupForm />

        {/* 로그인 링크 */}
        <div className='mt-8 text-center'>
          <span className='text-[#6E6E82]'>이미 계정이 있으신가요? </span>
          <button
            type='button'
            onClick={() => router.push('/signin')}
            className='text-[#5097FA] hover:underline transition-all'
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
