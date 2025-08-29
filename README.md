#  MOGAZOA 

> ### Would you compare with us?
>
> 

## 프로젝트 소개

### A/B 테스트 기반 상품 비교 플랫폼 사이트, 모가조아(MOGAZOA)

－ “ 다양한 상품 뿐만 아니라 음악, 식당, 여행지, 전자기기, 강의 등 비교가능한 사이트입니다”

－ “A/B 테스트 형식으로 비교하여, 사용자 맞춤형 선택을 돕는 **데이터 기반 상품비교 플랫폼**입니다”

－“**사용자 친화성** , **데이터 공유** 서비스, **UI/UX 흐름 등**을 고려하였습니다“
<br>

---
##  배포 주소

업데이트 예정

---
##  프로젝트 지향점 

### 프로젝트 목표
- 다양한 상품에 대해 **사용자 참여형 A/B 테스트** 기능 제공
- **Zustand 전역 상태관리** 및 **무한 스크롤**, **공통 컴포넌트 설계** 등 실무 유사 구조 경험

### **사용자 경험성 고려**

- 베타 테스트를 통한 **검색 / 비교 / 리뷰 / 랭킹**까지 이어지는 UX 흐름 설계
- 단순 기능 개발보다 사용자 경험성 고려 (베타 테스트를 통한 **UI 흐름**, **페이지 이탈 경로 체크** 등)

### **소프트스킬 강화**

- **마일스톤**을 통한 프로젝트 일정 관리 및 정리
- **데일리스크럼**과 **KPT회고**, PR 리뷰 등 협업 툴 활용

### **문제 해결 능력 향상**


- KPT 회고를 통한 문제해결 중심의 사고/능력 향상 
- PR 코드 리뷰 및 피드백 반영
- 의견 반영 과정에서 문제 해결 능력 향상
 
---


##  주요 기능 (Features)

###  회원가입 및 로그인

- 일반 로그인 / 소셜 로그인(카카오)
- 간편 회원가입 (닉네임 기반)

###  상품 비교 (A/B 테스트)

- 두 상품 중 하나를 선택하는 투표형 비교 인터페이스
- 비교 결과에 따른 애니메이션과 승자 표시

### 🛍 상품 상세 및 추가 기능

- 무한 스크롤 기반 상품 목록
- 상품 상세 페이지 → 플러스 버튼 → 상품 추가 모달

###  리뷰 및 별점 작성

- 모달 기반 별점 + 텍스트 리뷰 시스템
- 유저 기반 랭킹 정렬 지원

### 🗂 마이페이지 & 팔로우

- 내 정보 / 편집 / 내가 남긴 리뷰 확인 가능
- 다른 유저 팔로우 / 팔로잉 모달

###  공유 기능

- 카카오톡 / 링크 공유로 사용자 외부 유입 연결


<br>

---



## 🛠️ 기술 스택 (Tech Stack) 

### 💻 Frontend

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

### 🔐 Auth

<img src="https://img.shields.io/badge/localStorage-cccccc?style=for-the-badge"> <img src="https://img.shields.io/badge/Kakao_OAuth-FFCD00?style=for-the-badge&logo=KakaoTalk&logoColor=000000">

### 🚀 Deploy

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

### 🎨 Design

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">

### 🧰 Tooling

<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">


<br>

--- 

## 🧩 폴더 구조 (Folder Structure)

```bash
project/
├── 📁 public/                         # 정적 파일 (브라우저에서 직접 접근 가능)
│   ├── 📁 images/                     # 로고, 배경 등 일반 이미지
│   │   ├── logo.png
│   │   └── background.webp
│   └── favicon.ico                     # 즐겨찾기 아이콘

├── 📁 src/
│   ├── 📁 app/                        # Next.js App Router 페이지
│   │   ├── layout.tsx                 # 모든 페이지 공통 레이아웃
│   │   ├── globals.css                # 전역 스타일
│   │   ├── page.tsx                   # 루트 페이지 (`/`)
│   │   ├── 📁 login/                  # 로그인 페이지 (`/login`)
│   │   │   ├── page.tsx
│   │   │   ├── store.tsx              # 로그인 페이지 전용 Zustand 상태
│   │   │   └── 📁 components/         # 로그인 전용 UI 컴포넌트
│   │   │       ├── LoginForm.tsx
│   │   │       └── SocialButtons.tsx
│   │   ├── 📁 profile/                # 프로필 페이지 예시 (`/profile`)
│   │   │   ├── page.tsx
│   │   │   └── 📁 components/         # 프로필 전용 UI 컴포넌트
│   │   │       ├── ProfileCard.tsx    # 사용자 정보 카드
│   │   │       └── AvatarUpload.tsx   # 프로필 사진 업로드 컴포넌트
│   │   └── 📁 ...                      # 추가 페이지 폴더
│
│   ├── 📁 components/                 # 공용 컴포넌트 (앱 전역에서 사용)
│   │   ├── Button.tsx                 # 버튼 컴포넌트
│   │   ├── Modal.tsx                  # 모달 컴포넌트
│   │   ├── Input.tsx                  # 입력창 컴포넌트
│   │   ├── Select.tsx                 # 셀렉트 박스 컴포넌트
│   │   ├── Toast.tsx                  # 알림/피드백 컴포넌트
│   │   └── ...
│
│   ├── 📁 api/                        # API 요청 모음 (엔드포인트 단위)
│   │   ├── 📁 users/                  # 사용자 관련 API
│   │   ├── 📁 posts/                  # 게시글 관련 API 예시
│   │   └── ...
│
│   ├── 📁 lib/                        # 공통 라이브러리 / 유틸
│   │   ├── axiosInstance.ts            # 공통 axios 인스턴스
│   │   └── authApi.ts                  # 인증 관련 API 헬퍼
│
│   ├── 📁 hooks/                      # 커스텀 훅
│   │   ├── useForm.tsx                 # 폼 상태 관리용 커스텀 훅
│   │   └── useAsync.tsx               # 비동기 처리 훅 예시
│
│   ├── 📁 stores/                      # Zustand 전역 상태
│   │   └── useUserStore.tsx           # 로그인/사용자 상태 전역 관리
│
│   ├── 📁 utils/                      # 유틸 함수 모음
│
│   ├── 📁 assets/                     # 번들링 자원 (폰트, 아이콘 등)
│       ├── 📁 fonts/
│       │   └── InterVariable.ttf       # 프로젝트용 기본 폰트
│       └── 📁 icons/                  
│           ├── home.svg                # 홈 아이콘
│           ├── settings.svg            # 설정 아이콘
│           └── notification.svg        # 알림 아이콘
│
└── README.md                           # 프로젝트 설명


```

---

<h2> 팀원 소개</h2>

<table>
  <tr>
    <td align="center">
      <b>정해성 (팀장)</b><br />
      로그인,회원가입<br />
      간편 회원가입<br />
      상품 추가/편집(모달) <br />
    </td>
    <td align="center">
      <b>상진규</b><br />
      메인 페이지<br />
      상품카드<br />
      SNB <br />
      리뷰 랭킹순위 <br />
    </td>   
    <td align="center">
      <b>정수민</b><br />
      비교 상품 교체<br />
      상품 비교<br />
      GNB<br />
    </td>     
  </tr>
</table>

<br>

---



