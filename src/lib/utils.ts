// clsx와 tailwind-merge를 임포트
import { clsx, type ClassValue } from 'clsx'; // clsx: 조건부 클래스 이름 결합, ClassValue 타입
import { twMerge } from 'tailwind-merge'; // twMerge: Tailwind 클래스 중복 제거 및 병합

// cn 함수 정의
export function cn(...inputs: ClassValue[]) {
  // clsx로 입력된 클래스들을 조건부로 문자열로 변환하고,
  // twMerge로 Tailwind 클래스 중복을 제거하고 최종 문자열 반환
  return twMerge(clsx(inputs));
}
