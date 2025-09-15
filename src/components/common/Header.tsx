'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useAuthStore } from '@/lib/stores/authStore';
import { useSearchStore } from '@/lib/useSearchStore';

import logoSvg from '../../assets/icons/logo.svg';
import menuSvg from '../../assets/icons/menu.svg';
import searchSvg from '../../assets/icons/search.svg';

// --- 스타일 정의 (cva) ---
const headerVariants = cva('w-full relative z-50 transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      home: 'bg-transparent',
      default: 'bg-[#1C1C22]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const headerContentVariants = cva('flex items-center max-w-screen-xl mx-auto px-6 h-[80px]', {
  variants: {
    variant: {
      home: 'flex-row justify-between',
      default: 'flex-row justify-between',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {}

const Header = ({ className, ...props }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const keyword = useSearchStore((state) => state.keyword);
  const setKeyword = useSearchStore((state) => state.setKeyword);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const variant = pathname === '/' ? 'home' : 'default';

  const handleSearch = () => {
    if (keyword.trim().length > 0) {
      router.push(`/?keyword=${encodeURIComponent(keyword.trim())}`);
      setKeyword('');
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const MenuLinks = () =>
    isLoggedIn ? (
      <>
        <Link href='/compare' className='hover:text-white' onClick={() => setIsMenuOpen(false)}>
          비교하기
        </Link>
        <Link href='/mypage' className='hover:text-white' onClick={() => setIsMenuOpen(false)}>
          내 프로필
        </Link>
      </>
    ) : (
      <>
        <Link href='/signin' className='hover:text-white' onClick={() => setIsMenuOpen(false)}>
          로그인
        </Link>
        <Link href='/signup' className='hover:text-white' onClick={() => setIsMenuOpen(false)}>
          회원가입
        </Link>
      </>
    );

  if (!isMounted) {
    return null;
  }

  return (
    <header className={cn(headerVariants({ variant }), className)} {...props}>
      <div className={cn(headerContentVariants({ variant }))}>
        {/* --- 모바일 뷰 --- */}
        <div className='flex w-full items-center justify-between md:hidden'>
          {isSearchOpen ? (
            <div className='flex w-full items-center gap-4'>
              <button onClick={() => setIsSearchOpen(false)}>
                <Image src={menuSvg} alt='메뉴' width={24} height={24} />
              </button>
              <div className='relative flex-1 rounded-full p-[0.5px] bg-transparent focus-within:bg-gradient-to-r from-[#5097FA] to-[#5363FF]'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                    <Image src={searchSvg} alt='검색 아이콘' width={20} height={20} />
                  </div>
                  <input
                    type='text'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='상품 이름을 검색해 보세요'
                    autoFocus
                    className='w-full h-11 rounded-full bg-[#2E2E3A] pl-11 pr-4 text-sm text-white focus:outline-none'
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Image src={menuSvg} alt='메뉴' width={24} height={24} />
              </button>
              <Link href='/'>
                <Image src={logoSvg} alt='Mogazoa Logo' width={112} height={28} priority />
              </Link>
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <Image src={searchSvg} alt='검색 열기' width={24} height={24} />
              </button>
            </>
          )}
        </div>

        {/* --- 데스크탑 뷰 --- */}
        <div className='hidden w-full items-center justify-between md:flex'>
          <div className='flex-shrink-0'>
            <Link href='/'>
              <Image src={logoSvg} alt='Mogazoa Logo' width={128} height={32} priority />
            </Link>
          </div>
          <div className='flex items-center gap-6'>
            <div className='relative w-full max-w-md rounded-full p-px transition-all focus-within:bg-gradient-to-r from-[#5097FA] to-[#5363FF]'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none'>
                  <Image src={searchSvg} alt='검색 아이콘' width={20} height={20} />
                </div>
                <input
                  type='text'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='상품 이름을 검색해 보세요'
                  className='w-full h-11 rounded-full bg-[#2E2E3A] border-none pl-12 pr-5 text-sm text-white placeholder-[#7B7B87] focus:outline-none'
                />
              </div>
            </div>
            <nav className='flex-shrink-0 flex items-center gap-6 text-sm text-gray-300'>
              <MenuLinks />
            </nav>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className='absolute left-4 top-full mt-2 w-40 rounded-lg bg-[#2E2E3A] p-4 shadow-lg md:hidden'>
          <nav className='flex flex-col gap-4 text-white'>
            <MenuLinks />
          </nav>
        </div>
      )}
      <div className='absolute bottom-0 left-0 w-full h-px bg-white/10' />
    </header>
  );
};

export default Header;
