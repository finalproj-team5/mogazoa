// 새로운 카카오 OAuth 전용 API 파일

const API_BASE_URL = 'https://mogazoa-api.vercel.app';
const TEAM_ID = '16-5';

interface KakaoUser {
  id: number;
  kakao_account: {
    email: string;
    profile: {
      nickname: string;
      profile_image_url?: string;
    };
  };
}

interface AuthUser {
  id: number;
  email: string;
  nickname: string;
  description: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

// 1. 카카오 토큰 발급
export const getKakaoAccessToken = async (code: string): Promise<string> => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`카카오 토큰 발급 실패: ${error.error_description}`);
  }

  const data = await response.json();
  return data.access_token;
};

// 2. 카카오 사용자 정보 조회
export const getKakaoUserInfo = async (accessToken: string): Promise<KakaoUser> => {
  const response = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('카카오 사용자 정보 조회 실패');
  }

  return response.json();
};

// 3. 카카오 로그인 시도
export const tryKakaoLogin = async (code: string): Promise<AuthResponse | null> => {
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

  console.log('=== 카카오 로그인 시도 시작 ===');
  console.log('API URL:', `${API_BASE_URL}/${TEAM_ID}/auth/signIn/kakao`);
  console.log('요청 Body:', {
    tokenLength: code.length,
    tokenPrefix: code.substring(0, 10) + '...',
    redirectUri,
  });

  try {
    const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signIn/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: code,
        redirectUri,
      }),
    });

    console.log('=== 로그인 시도 응답 ===');
    console.log('응답 상태:', response.status);
    console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      console.log('로그인 성공:', data.user?.email);
      return data;
    } else {
      const errorText = await response.text();
      console.log('로그인 실패 응답:', errorText);
      return null; // 기존 사용자가 아님
    }
  } catch (error) {
    console.error('카카오 로그인 시도 실패:', error);
    return null;
  }
};

// 4. 카카오 로그인 또는 회원가입 (통합)
export const kakaoSignUp = async (code: string, nickname: string): Promise<AuthResponse> => {
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
  const requestBody = {
    token: code,
    nickname,
    redirectUri,
  };

  console.log('=== 카카오 회원가입 API 요청 시작 ===');
  console.log('API URL:', `${API_BASE_URL}/${TEAM_ID}/auth/signUp/kakao`);
  console.log('요청 Body:', {
    nickname,
    redirectUri,
    tokenLength: code.length,
    tokenPrefix: code.substring(0, 10) + '...',
  });

  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signUp/kakao`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  console.log('=== API 응답 정보 ===');
  console.log('응답 상태:', response.status);
  console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    const errorText = await response.text();
    console.error('=== 에러 응답 상세 정보 ===');
    console.error('에러 상태:', response.status);
    console.error('에러 상태 텍스트:', response.statusText);
    console.error('에러 응답 원본:', errorText);

    try {
      const error = JSON.parse(errorText);
      console.error('에러 응답 JSON:', error);
      throw new Error(error.message || `회원가입 실패: ${errorText}`);
    } catch (parseError) {
      console.error('JSON 파싱 실패:', parseError);
      throw new Error(`회원가입 실패 (상태: ${response.status}) - ${errorText}`);
    }
  }

  const result = await response.json();
  console.log('회원가입 성공:', result.user?.email);
  return result;
};

// 5. 카카오 토큰으로 회원가입 (토큰 재사용 방지)
export const kakaoSignUpWithToken = async (
  kakaoToken: string,
  nickname: string,
): Promise<AuthResponse> => {
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
  const requestBody = {
    token: kakaoToken,
    nickname,
    redirectUri,
  };

  console.log('=== 카카오 토큰 회원가입 API 요청 시작 ===');
  console.log('API URL:', `${API_BASE_URL}/${TEAM_ID}/auth/signUp/kakao`);
  console.log('요청 Body:', {
    nickname,
    redirectUri,
    tokenLength: kakaoToken.length,
    tokenPrefix: kakaoToken.substring(0, 10) + '...',
  });

  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signUp/kakao`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  console.log('=== API 응답 정보 ===');
  console.log('응답 상태:', response.status);
  console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    const errorText = await response.text();
    console.error('=== 에러 응답 상세 정보 ===');
    console.error('에러 상태:', response.status);
    console.error('에러 상태 텍스트:', response.statusText);
    console.error('에러 응답 원본:', errorText);

    try {
      const error = JSON.parse(errorText);
      console.error('에러 응답 JSON:', error);
      throw new Error(error.message || `회원가입 실패: ${errorText}`);
    } catch (parseError) {
      console.error('JSON 파싱 실패:', parseError);
      throw new Error(`회원가입 실패 (상태: ${response.status}) - ${errorText}`);
    }
  }

  const result = await response.json();
  console.log('토큰 회원가입 성공:', result.user?.email);
  return result;
};

// 6. 카카오 토큰으로 로그인 시도
export const tryKakaoLoginWithToken = async (kakaoToken: string): Promise<AuthResponse | null> => {
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;

  console.log('=== 카카오 토큰 로그인 시도 시작 ===');
  console.log('API URL:', `${API_BASE_URL}/${TEAM_ID}/auth/signIn/kakao`);
  console.log('요청 Body:', {
    tokenLength: kakaoToken.length,
    tokenPrefix: kakaoToken.substring(0, 10) + '...',
    redirectUri,
  });

  try {
    const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signIn/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: kakaoToken,
        redirectUri,
      }),
    });

    console.log('=== 토큰 로그인 시도 응답 ===');
    console.log('응답 상태:', response.status);
    console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      console.log('토큰 로그인 성공:', data.user?.email);
      return data;
    } else {
      const errorText = await response.text();
      console.log('토큰 로그인 실패 응답:', errorText);
      return null; // 기존 사용자가 아님
    }
  } catch (error) {
    console.error('카카오 토큰 로그인 시도 실패:', error);
    return null;
  }
};
