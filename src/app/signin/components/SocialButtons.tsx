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
      // TODO: 실제 소셜 로그인 API 호출
      console.log(`${provider} 로그인 시도`);

      // 임시: 소셜 로그인 시뮬레이션
      const loginResult = {
        success: true,
        isNewUser: true, // true면 간편 회원가입 화면으로
      };
      if (loginResult.success) {
        console.log('provider:', provider);
        console.log('isNewUser:', loginResult.isNewUser);
        console.log('조건 체크:', loginResult.isNewUser && provider === 'kakao');

        if (loginResult.isNewUser && provider === 'kakao') {
          console.log('카카오 간편가입으로 이동');
          router.push(`/oauth/signup/${provider}`);
        } else {
          console.log('홈으로 이동');
          router.push('/');
        }
      }
      if (loginResult.success) {
        if (loginResult.isNewUser && provider === 'kakao') {
          // 신규 유저이고 카카오인 경우 간편 회원가입으로
          router.push(`/oauth/signup/${provider}`);
        } else {
          // 기존 유저이거나 구글인 경우 홈으로
          router.push('/');
        }
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
