import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nickname, token } = body;

    console.log('카카오 회원가입 요청 데이터:', { nickname, token: !!token });

    if (!nickname || !token) {
      console.error('필수 정보 누락:', { nickname: !!nickname, token: !!token });
      return NextResponse.json({ message: '필수 정보가 누락되었습니다.' }, { status: 400 });
    }

    // 카카오 토큰으로 직접 회원가입 API 호출
    const response = await fetch(`https://mogazoa-api.vercel.app/16-5/auth/signUp/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        nickname,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '카카오 회원가입에 실패했습니다.');
    }

    const signUpData = await response.json();
    return NextResponse.json(signUpData);
  } catch (error: unknown) {
    console.error('카카오 회원가입 오류:', error);

    const errorMessage = error instanceof Error ? error.message : '카카오 회원가입에 실패했습니다.';

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
