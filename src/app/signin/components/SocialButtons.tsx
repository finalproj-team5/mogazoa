'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GoogleIcon from '@/assets/icons/google.svg';
import KakaoIcon from '@/assets/icons/kakao.svg';

type SocialProvider = 'google' | 'kakao';

export default function SocialButtons() {
  const router = useRouter();

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      if (provider === 'kakao') {
        const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
        return;
      }

      // TODO: 구글 소셜 로그인 API 호출
      console.log(`${provider} 로그인 시도`);

      // 임시: 소셜 로그인 시뮬레이션 (구글용)
      const loginResult = {
        success: true,
        isNewUser: true, // true면 간편 회원가입 화면으로
      };
      if (loginResult.success) {
        console.log('구글 로그인 성공, 홈으로 이동');
        router.push('/');
      } else {
        // 소셜 로그인 실패
        alert('소셜 로그인에 실패했습니다.');
      }
    } catch {
      alert('소셜 로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='relative my-8'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full  border-[#353542]' />
        </div>
        <div className='relative flex justify-center text-base'>
          <span className='bg-[#1C1C22] px-4 text-[#6E6E82]'>SNS로 바로 시작하기</span>
        </div>
      </div>

      {/* 소셜 로그인 버튼들 */}
      <div className='flex gap-4 justify-center'>
        {/* 구글 로그인 버튼 */}
        <button
          type='button'
          onClick={() => handleSocialLogin('google')}
          aria-label='구글로 로그인'
        >
          <Image src={GoogleIcon} alt='구글 로고' width={56} height={56} />
        </button>

        {/* 카카오 로그인 버튼 */}
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
