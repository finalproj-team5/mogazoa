'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SignupFormData, signupSchema } from '@/lib/schemas';
import { useAuthStore } from '@/lib/stores/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';

export default function SignupForm() {
  const router = useRouter();
  const { login, setLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);

      // TODO: 실제 회원가입 API 호출
      console.log('회원가입 시도:', data);

      // 임시: 회원가입 성공 시 사용자 정보 생성
      const mockUser = {
        id: 'newuser123',
        email: data.email,
        nickname: data.nickname,
        profileImage: undefined,
      };

      // Zustand store에 자동 로그인 처리
      login(mockUser);

      // 회원가입 완료 후 홈으로 이동
      router.push('/');
    } catch {
      // 회원가입 실패 처리 (API에서 받은 에러에 따라)
      alert('회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* 이메일 입력 */}
        <Input
          label='이메일'
          type='email'
          placeholder='이메일을 입력해 주세요'
          size='lg'
          {...register('email')}
          variant={errors.email ? 'error' : 'default'}
          errorMessage={errors.email?.message}
        />

        {/* 닉네임 입력 */}
        <Input
          label='닉네임'
          type='text'
          placeholder='닉네임을 입력해 주세요'
          helperText='최대 10자 가능'
          size='lg'
          {...register('nickname')}
          variant={errors.nickname ? 'error' : 'default'}
          errorMessage={errors.nickname?.message}
        />

        {/* 비밀번호 입력 */}
        <Input
          label='비밀번호'
          type='password'
          placeholder='비밀번호를 입력해 주세요'
          helperText='최소 8자 이상'
          size='lg'
          {...register('password')}
          variant={errors.password ? 'error' : 'default'}
          errorMessage={errors.password?.message}
        />

        {/* 비밀번호 확인 입력 */}
        <Input
          label='비밀번호 확인'
          type='password'
          placeholder='비밀번호를 한번 더 입력해 주세요'
          size='lg'
          {...register('confirmPassword')}
          variant={errors.confirmPassword ? 'error' : 'default'}
          errorMessage={errors.confirmPassword?.message}
        />

        {/* 가입하기 버튼 */}
        <Button type='submit' variant='primary' size='lg' className='w-full mt-8'>
          가입하기
        </Button>
      </form>
    </div>
  );
}
