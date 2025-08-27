'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { OAuthSignupFormData, oauthSignupSchema } from '@/lib/schemas';
import { useAuthStore } from '@/lib/stores/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';

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

      // TODO: 실제 간편 회원가입 API 호출
      console.log('카카오 간편 회원가입 시도:', data);

      // TODO: 닉네임 중복 확인 API 호출
      const isDuplicateNickname = false; // 임시

      if (isDuplicateNickname) {
        setError('nickname', {
          type: 'manual',
          message: '이미 사용중인 닉네임입니다.',
        });
        return;
      }

      // 임시: OAuth에서 받은 정보 + 입력한 닉네임으로 사용자 생성
      const mockUser = {
        id: 'kakaouser123',
        email: 'kakao@example.com', // TODO: OAuth에서 받은 이메일
        nickname: data.nickname,
        profileImage: undefined, // TODO: OAuth에서 받은 프로필 이미지
      };

      // Zustand store에 자동 로그인 처리
      login(mockUser);

      // 회원가입 완료 후 홈으로 이동
      router.push('/');
    } catch {
      alert('간편 회원가입에 실패했습니다.');
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
