import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 사용자 정보 타입
interface User {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
}

// Auth store 상태 타입
interface AuthState {
  // 상태
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  // 액션
  login: (userData: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (userData: Partial<User>) => void;
}

// Auth store 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      isLoggedIn: false,
      isLoading: false,

      // 로그인 함수
      login: (userData: User) => {
        set({
          user: userData,
          isLoggedIn: true,
          isLoading: false,
        });
      },

      // 로그아웃 함수
      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
          isLoading: false,
        });
      },

      // 로딩 상태 설정
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // 사용자 정보 업데이트
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage 키 이름
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        // isLoading은 저장하지 않음 (새로고침 시 false로 초기화)
      }),
    },
  ),
);
