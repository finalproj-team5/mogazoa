'use client';

import Image from 'next/image';
import GoogleIcon from '@/assets/icons/google.svg';
import KakaoIcon from '@/assets/icons/kakao.svg';

type SocialProvider = 'google' | 'kakao';

declare global {
  interface Window {
    Kakao: {
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
    };
  }
}

export default function SocialButtons() {
  const handleSocialLogin = (provider: SocialProvider) => {
    if (provider === 'kakao') {
      console.log('카카오 로그인 시작');
      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth/callback',
      });
    } else {
      alert('구글 로그인은 준비 중입니다.');
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='relative my-8'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-[#353542]' />
        </div>
        <div className='relative flex justify-center text-base'>
          <span className='bg-[#1C1C22] px-4 text-[#6E6E82]'>SNS로 바로 시작하기</span>
        </div>
      </div>

      <div className='flex gap-4 justify-center'>
        <button
          type='button'
          onClick={() => handleSocialLogin('google')}
          aria-label='구글로 로그인'
        >
          <Image src={GoogleIcon} alt='구글 로고' width={56} height={56} />
        </button>

        <button
          type='button'
          onClick={() => handleSocialLogin('kakao')}
          aria-label='카카오로 로그인'
        >
          <Image src={KakaoIcon} alt='카카오 로고' width={56} height={56} />
        </button>
      </div>
    </div>
  );
}
