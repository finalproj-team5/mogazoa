'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import NoProfileIcon from '@/assets/images/no_profile.svg';

interface User {
  id: number;
  nickname: string;
  image: string | null;
}

interface FollowItem {
  id: number;
  follower?: User;
  followee?: User;
}

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  nickname: string;
  type: 'followers' | 'followees';
}

const FollowModal = ({ isOpen, onClose, userId, nickname, type }: FollowModalProps) => {
  const router = useRouter();
  const [followItems, setFollowItems] = useState<FollowItem[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // 모달 제목 생성
  const modalTitle =
    type === 'followers' ? `${nickname}님을 팔로우하는 유저` : `${nickname}님이 팔로우하는 유저`;

  // ESC 키 처리
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 데이터 초기화
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      setFollowItems([]);
      setNextCursor(null);
      setHasInitialized(true);
      fetchUsers(null);
    }

    if (!isOpen) {
      setHasInitialized(false);
    }
  }, [isOpen, hasInitialized]);

  // 유저 목록 가져오기
  const fetchUsers = async (cursor: number | null) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const token = localStorage.getItem('auth-token');
      const endpoint = type === 'followers' ? 'followers' : 'followees';
      const url = cursor
        ? `https://mogazoa-api.vercel.app/16-5/users/${userId}/${endpoint}?cursor=${cursor}`
        : `https://mogazoa-api.vercel.app/16-5/users/${userId}/${endpoint}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${type}`);
      }

      const data = await response.json();

      // 디버깅을 위한 콘솔 로그
      console.log('API Response:', data);
      console.log('Follow items list:', data.list);
      console.log(`Loaded ${data.list.length} items, nextCursor: ${data.nextCursor}`);

      if (cursor) {
        setFollowItems((prev) => [...prev, ...data.list]);
      } else {
        setFollowItems(data.list);
      }

      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  // 무한 스크롤 처리
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

      // 스크롤이 하단에 도달했을 때
      if (scrollHeight - scrollTop <= clientHeight + 50 && nextCursor && !isLoading) {
        fetchUsers(nextCursor);
      }
    },
    [nextCursor, isLoading],
  );

  // 유저 클릭 처리
  const handleUserClick = (clickedUserId: number) => {
    console.log('Clicked user ID:', clickedUserId);
    onClose();
    router.push(`/user/${clickedUserId}`);
  };

  // 배경 클릭 처리
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs'
        onClick={handleOverlayClick}
      >
        <div className='bg-[#2E2E3A] rounded-xl w-full max-w-[500px] mx-4 max-h-[660px] flex flex-col'>
          {/* 헤더 */}
          <div className='flex items-center justify-between p-6 border-b border-[#43434F]'>
            <h2 className='text-xl font-medium text-[#F1F1F5]'>{modalTitle}</h2>
            <button
              onClick={onClose}
              className='text-[#9FA0A7] hover:text-[#F1F1F5] text-2xl leading-none'
            >
              ×
            </button>
          </div>

          {/* 유저 목록 */}
          <div
            className='flex-1 overflow-y-auto hide-scrollbar'
            onScroll={handleScroll}
            style={{
              scrollbarWidth: 'none' /* Firefox */,
              msOverflowStyle: 'none' /* IE and Edge */,
            }}
          >
            {followItems.length === 0 && !isLoading ? (
              <div className='flex items-center justify-center py-12'>
                <p className='text-[#9FA0A7]'>
                  {type === 'followers' ? '팔로워가 없습니다' : '팔로잉이 없습니다'}
                </p>
              </div>
            ) : (
              <div className='px-4 py-2'>
                {followItems.map((item) => {
                  const user = type === 'followers' ? item.follower : item.followee;
                  if (!user) return null;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleUserClick(user.id)}
                      className='flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-[#43434F] cursor-pointer transition-colors'
                    >
                      <div className='w-[52px] h-[52px] rounded-full overflow-hidden bg-[#43434F] flex-shrink-0'>
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.nickname}
                            width={52}
                            height={52}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <Image
                            src={NoProfileIcon}
                            alt='기본 프로필'
                            width={52}
                            height={52}
                            className='w-full h-full object-cover'
                          />
                        )}
                      </div>
                      <span className='text-[#F1F1F5] text-lg font-medium'>
                        {user.nickname || 'Unknown User'}
                      </span>
                    </div>
                  );
                })}

                {/* 로딩 상태 */}
                {isLoading && (
                  <div className='flex justify-center py-4'>
                    <div className='text-[#9FA0A7]'>로딩 중...</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default FollowModal;
