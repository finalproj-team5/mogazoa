'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SigninFormData, signinSchema } from '@/lib/schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/stores/authStore';
import { signInAPI, transformUser, setAuthToken } from '@/lib/authApi';

export default function LoginForm() {
  const router = useRouter();
  const { login, setLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      setLoading(true);

      // 실제 로그인 API 호출
      const result = await signInAPI({
        email: data.email,
        password: data.password,
      });

      // 토큰 저장
      setAuthToken(result.accessToken);

      // 사용자 정보 store에 저장
      const user = transformUser(result.user);
      login(user);

      // 로그인 성공 시 홈으로 이동
      router.push('/');
    } catch {
      // 로그인 실패 시 에러 메시지 표시 (요구사항에 따라)
      setError('email', {
        type: 'manual',
        message: '이메일 혹은 비밀번호를 확인해주세요.',
      });
      setError('password', {
        type: 'manual',
        message: '', // 비밀번호 필드도 에러 상태로 만들기 (빈 메시지)
      });
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

        {/* 비밀번호 입력 */}
        <Input
          label='비밀번호'
          type='password'
          placeholder='비밀번호를 입력해 주세요'
          size='lg'
          {...register('password')}
          variant={errors.password ? 'error' : 'default'}
          errorMessage={errors.password?.message}
        />

        {/* 로그인 버튼 */}
        <Button type='submit' variant='primary' size='lg' className='w-full'>
          로그인
        </Button>
      </form>
    </div>
  );
}
