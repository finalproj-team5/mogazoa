'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { OAuthSignupFormData, oauthSignupSchema } from '@/lib/schemas';
import { useAuthStore } from '@/lib/stores/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { kakaoSignUpWithToken } from '@/lib/kakaoAuth';

export default function OAuthSignupForm() {
  const router = useRouter();
  const { login, setLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<OAuthSignupFormData>({
    resolver: zodResolver(oauthSignupSchema),
  });

  const onSubmit = async (data: OAuthSignupFormData) => {
    try {
      setLoading(true);

      const kakaoToken = sessionStorage.getItem('kakaoToken');

      if (!kakaoToken) {
        alert('카카오 인증 정보가 없습니다. 다시 로그인해 주세요.');
        router.push('/signin');
        return;
      }

      console.log('카카오 토큰 회원가입 시작:', data.nickname);

      // 페이지에서 이미 로그인 체크를 했으므로 바로 회원가입 시도 (토큰 사용)
      console.log('토큰으로 회원가입 시도...');
      const signUpData = await kakaoSignUpWithToken(kakaoToken, data.nickname);

      // 토큰 저장 및 로그인 처리
      localStorage.setItem('auth-token', signUpData.accessToken);
      login({
        id: signUpData.user.id.toString(),
        email: signUpData.user.email,
        nickname: signUpData.user.nickname,
        profileImage: signUpData.user.image || undefined,
      });

      // 세션 스토리지 정리
      sessionStorage.removeItem('kakaoToken');
      sessionStorage.removeItem('kakaoUserInfo');

      console.log('카카오 토큰 회원가입 완료');
      router.push('/');
    } catch (error: unknown) {
      console.error('=== 카카오 회원가입 에러 상세 ===');
      console.error('에러 객체:', error);

      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.';
      console.error('에러 메시지:', errorMessage);

      // 일단 모든 에러를 alert로 표시해서 정확히 뭔 에러인지 확인
      alert(`에러 발생: ${errorMessage}`);

      if (error instanceof Error && error.message?.includes('닉네임')) {
        setError('nickname', {
          type: 'manual',
          message: error.message,
        });
      } else {
        // 다른 모든 에러는 일단 그냥 표시만 하고 아무것도 안함
        console.error('처리되지 않은 에러:', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* 닉네임 입력 */}
        <Input
          label='닉네임'
          type='text'
          placeholder='닉네임을 입력해 주세요'
          size='lg'
          {...register('nickname')}
          variant={errors.nickname ? 'error' : 'default'}
          errorMessage={errors.nickname?.message}
        />

        {/* 가입하기 버튼 */}
        <Button type='submit' variant='primary' size='lg' className='w-full mt-8'>
          가입하기
        </Button>
      </form>
    </div>
  );
}
