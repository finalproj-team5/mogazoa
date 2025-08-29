import { z } from 'zod';

// 로그인 폼 검증 규칙
export const signinSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요.'),
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

// 회원가입 폼 검증 규칙
export const signupSchema = z
  .object({
    email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요.'),
    nickname: z
      .string()
      .min(1, '닉네임은 필수 입력입니다.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.'),
    password: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.')
      .min(8, '비밀번호는 최소 8자 이상입니다.')
      .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'], // 에러가 confirmPassword 필드에 표시됨
  });

// 간편 회원가입 폼 검증 규칙 (닉네임만)
export const oauthSignupSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임은 필수 입력입니다.')
    .max(10, '닉네임은 최대 10자까지 가능합니다.'),
  // 추가로 중복 확인은 API 호출로 따로 처리해야 함
});

// TypeScript 타입 정의 (React Hook Form에서 사용)
export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type OAuthSignupFormData = z.infer<typeof oauthSignupSchema>;
