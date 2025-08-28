const API_BASE_URL = 'https://mogazoa-api.vercel.app';
const TEAM_ID = '16-5';

// API 응답 타입 정의
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

interface SignInResponse {
  user: AuthUser;
  accessToken: string;
}

interface SignUpResponse {
  accessToken: string;
  user: AuthUser;
}

// 로그인 API
export const signInAPI = async (data: {
  email: string;
  password: string;
}): Promise<SignInResponse> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '로그인에 실패했습니다.');
  }

  return response.json();
};

// 회원가입 API
export const signUpAPI = async (data: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}): Promise<SignUpResponse> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '회원가입에 실패했습니다.');
  }

  return response.json();
};

// authStore에서 사용할 수 있도록 사용자 정보 변환
export const transformUser = (apiUser: AuthUser) => ({
  id: apiUser.id.toString(),
  email: apiUser.email,
  nickname: apiUser.nickname,
  profileImage: apiUser.image || undefined,
});

// 토큰을 localStorage에 저장
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth-token', token);
};

// 토큰을 localStorage에서 가져오기
export const getAuthToken = () => {
  return localStorage.getItem('auth-token');
};

// 토큰 삭제 (로그아웃 시)
export const removeAuthToken = () => {
  localStorage.removeItem('auth-token');
};

// 카카오 OAuth 토큰 발급
export const getKakaoToken = async (code: string, redirectUri: string) => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '';
  console.log('카카오 토큰 발급 시도:', {
    code: code.substring(0, 20) + '...',
    redirectUri,
    clientId: clientId.substring(0, 10) + '...',
  });

  const requestBody = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  console.log('카카오 토큰 요청 바디:', requestBody.toString());

  const response = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  });

  console.log('카카오 토큰 응답 상태:', response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('카카오 토큰 발급 실패 응답:', errorText);

    try {
      const errorData = JSON.parse(errorText);
      console.error('카카오 토큰 발급 실패 JSON:', errorData);
      throw new Error(
        `카카오 토큰 발급에 실패했습니다: ${errorData.error_description || errorData.error}`,
      );
    } catch (parseError) {
      console.error('카카오 응답 파싱 실패:', parseError);
      throw new Error(`카카오 토큰 발급에 실패했습니다 (상태: ${response.status})`);
    }
  }

  const tokenData = await response.json();
  console.log('카카오 토큰 발급 성공:', {
    access_token: 'hidden',
    ...tokenData,
    access_token: undefined,
  });
  return tokenData;
};

// 카카오 사용자 정보 조회
export const getKakaoUserInfo = async (accessToken: string) => {
  const response = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('카카오 사용자 정보 조회에 실패했습니다.');
  }

  return response.json();
};

// 카카오 OAuth 로그인/회원가입
export const kakaoOAuthAPI = async (data: {
  code: string;
  redirectUri: string;
}): Promise<{ isNewUser: boolean; user?: AuthUser; accessToken?: string; kakaoToken?: string }> => {
  try {
    console.log('kakaoOAuthAPI - 토큰 발급 시작');

    // 1. 카카오 토큰 발급 (한 번만!)
    const tokenData = await getKakaoToken(data.code, data.redirectUri);
    console.log('kakaoOAuthAPI - 토큰 발급 완료');

    // 2. 토큰으로 로그인 시도 (기존 사용자인지 확인)
    const checkResponse = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signIn/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: tokenData.access_token,
      }),
    });

    if (checkResponse.ok) {
      // 기존 사용자 - 로그인 처리
      console.log('kakaoOAuthAPI - 기존 사용자 로그인 성공');
      const signInData = await checkResponse.json();
      return {
        isNewUser: false,
        user: signInData.user,
        accessToken: signInData.accessToken,
      };
    } else {
      // 신규 사용자 - 회원가입 필요 (토큰 보존)
      console.log('kakaoOAuthAPI - 신규 사용자, 회원가입 필요');
      return {
        isNewUser: true,
        kakaoToken: tokenData.access_token,
      };
    }
  } catch (error) {
    console.error('kakaoOAuthAPI 오류:', error);
    throw new Error('카카오 OAuth 처리 중 오류가 발생했습니다.');
  }
};

// 카카오 OAuth 회원가입
export const kakaoSignUpAPI = async (data: {
  nickname: string;
  code: string;
  redirectUri: string;
}): Promise<SignUpResponse> => {
  // 1. 카카오 토큰 발급
  const tokenData = await getKakaoToken(data.code, data.redirectUri);

  // 2. 우리 서비스에 회원가입
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signUp/kakao`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: tokenData.access_token,
      nickname: data.nickname,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '카카오 회원가입에 실패했습니다.');
  }

  return response.json();
};
