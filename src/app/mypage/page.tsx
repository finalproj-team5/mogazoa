'use client';

import { useEffect, useState, useCallback } from 'react';
import { getUserProfile, UserDetail } from '@/lib/user/userApi';
import {
  getUserReviewedProducts,
  getUserCreatedProducts,
  getUserFavoriteProducts,
  ProductListItem,
} from '@/lib/user/userProductsApi';
import Image from 'next/image';
import ProductCard from '@/components/common/ProductCard';
import { useAuthStore } from '@/lib/stores/authStore';
import FollowModal from '@/components/user/FollowModal';
import NoProfileIcon from '@/assets/images/no_profile.svg';
import usePageInfiniteScroll from '@/hooks/usePageInfiniteScroll';
import ProfileEditModal from '@/components/mypage/ProfileEditModal';
import useModal from '@/hooks/useModal';

const MyPage = () => {
  const { user, logout } = useAuthStore();
  const [profile, setProfile] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: '',
    show: false,
  });

  // 프로필 편집 모달
  const profileEditModal = useModal();

  // 팔로우 모달 상태
  const [followModal, setFollowModal] = useState<{
    isOpen: boolean;
    type: 'followers' | 'followees';
  }>({
    isOpen: false,
    type: 'followers',
  });

  // 탭 상태
  const [activeTab, setActiveTab] = useState<'reviewed' | 'created' | 'favorite'>('reviewed');

  // fetchFunction들을 useCallback으로 메모이제이션
  const fetchReviewedProducts = useCallback(
    (cursor: number | null) =>
      user?.id
        ? getUserReviewedProducts(parseInt(user.id), cursor ? { cursor } : undefined)
        : Promise.resolve({ list: [], nextCursor: null }),
    [user?.id],
  );

  const fetchCreatedProducts = useCallback(
    (cursor: number | null) =>
      user?.id
        ? getUserCreatedProducts(parseInt(user.id), cursor ? { cursor } : undefined)
        : Promise.resolve({ list: [], nextCursor: null }),
    [user?.id],
  );

  const fetchFavoriteProducts = useCallback(
    (cursor: number | null) =>
      user?.id
        ? getUserFavoriteProducts(parseInt(user.id), cursor ? { cursor } : undefined)
        : Promise.resolve({ list: [], nextCursor: null }),
    [user?.id],
  );

  // 무한스크롤 훅들
  const reviewedProducts = usePageInfiniteScroll<ProductListItem>({
    fetchFunction: fetchReviewedProducts,
  });

  const createdProducts = usePageInfiniteScroll<ProductListItem>({
    fetchFunction: fetchCreatedProducts,
  });

  const favoriteProducts = usePageInfiniteScroll<ProductListItem>({
    fetchFunction: fetchFavoriteProducts,
  });

  // Hydration 완료 체크
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isHydrated) return; // Hydration이 완료될 때까지 대기

      if (!user?.id) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserProfile(user.id);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id, isHydrated]);

  // 무한스크롤 탭들 초기화
  useEffect(() => {
    if (profile && activeTab === 'reviewed') {
      reviewedProducts.reset();
    }
  }, [profile, activeTab]);

  useEffect(() => {
    if (profile && activeTab === 'created') {
      createdProducts.reset();
    }
  }, [profile, activeTab]);

  useEffect(() => {
    if (profile && activeTab === 'favorite') {
      favoriteProducts.reset();
    }
  }, [profile, activeTab]);

  const handleTabChange = (tab: 'reviewed' | 'created' | 'favorite') => {
    setActiveTab(tab);
  };

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: '', show: false });
    }, 1500);
  };

  const handleEditProfile = () => {
    profileEditModal.openModal();
  };

  const handleSaveProfile = async (data: {
    nickname: string;
    description: string;
    image: File | null;
  }) => {
    // TODO: API 호출로 프로필 업데이트
    console.log('프로필 저장:', data);
    showToast('프로필이 저장되었습니다.');

    // 프로필 정보 다시 로드
    if (user?.id) {
      const updatedProfile = await getUserProfile(user.id);
      setProfile(updatedProfile);
    }
  };

  const handleLogout = () => {
    logout();
    showToast('로그아웃되었습니다.');
    // TODO: 홈페이지로 리다이렉트
  };

  // 팔로우 모달 열기
  const openFollowModal = (type: 'followers' | 'followees') => {
    setFollowModal({ isOpen: true, type });
  };

  // 팔로우 모달 닫기
  const closeFollowModal = () => {
    setFollowModal({ isOpen: false, type: 'followers' });
  };

  if (loading || !isHydrated) {
    return (
      <div className='min-h-screen bg-[#0B0B0B] flex items-center justify-center'>
        <div className='text-[#F1F1F5]'>로딩 중...</div>
      </div>
    );
  }

  if (error || !profile || !user) {
    return (
      <div className='min-h-screen bg-[#0B0B0B] flex items-center justify-center'>
        <div className='text-red-500'>{error || '프로필을 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#1C1C22] text-[#F1F1F5]'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* 좌측 프로필 섹션 */}
          <div className='w-full lg:w-[340px] flex-shrink-0'>
            <div className='bg-[#21212A] rounded-xl p-6 min-h-[500px] flex flex-col'>
              {/* 프로필 이미지 */}
              <div className='flex justify-center mb-8'>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden bg-[#35353F]'>
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.nickname}
                      width={200}
                      height={200}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <Image
                      src={NoProfileIcon}
                      alt='기본 프로필'
                      width={200}
                      height={200}
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>
              </div>

              {/* 닉네임과 설명 */}
              <div className='text-center mb-6 flex-grow'>
                <h1 className='text-2xl font-bold mb-2'>{profile.nickname}</h1>
                {profile.description && (
                  <p className='text-[#6E6E82] text-base leading-relaxed'>{profile.description}</p>
                )}
              </div>

              {/* 팔로워/팔로잉 */}
              <div className='flex justify-center gap-12 mb-6 text-sm mt-auto'>
                <div
                  className='text-center cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={() => openFollowModal('followers')}
                >
                  <div className='font-bold text-lg'>{profile.followersCount}</div>
                  <div className='text-[#9FA0A7]'>팔로워</div>
                </div>
                <div className='w-px h-12 bg-[#35353F] self-center'></div>
                <div
                  className='text-center cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={() => openFollowModal('followees')}
                >
                  <div className='font-bold text-lg'>{profile.followeesCount}</div>
                  <div className='text-[#9FA0A7]'>팔로잉</div>
                </div>
              </div>

              {/* 프로필 편집/로그아웃 버튼들 */}
              <div className='space-y-3'>
                <button
                  onClick={handleEditProfile}
                  className='w-full py-4 rounded-lg font-medium transition-colors bg-[#5097FA] text-white hover:bg-[#4285E8]'
                >
                  프로필 편집
                </button>
                <button
                  onClick={handleLogout}
                  className='w-full py-4 rounded-lg font-medium transition-colors bg-[#35353F] text-[#F1F1F5] hover:bg-[#43434F]'
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>

          {/* 우측 활동 내역 섹션 */}
          <div className='flex-1'>
            {/* 활동 내역 헤더 */}
            <div className='mb-6'>
              <h2 className='text-xl font-bold mb-4'>활동 내역</h2>

              {/* 통계 카드들 */}
              <div className='flex flex-col md:flex-row gap-4 mb-6'>
                <div className='bg-[#21212A] rounded-xl p-4 text-center w-full md:w-[300px] h-[128px] flex flex-col justify-center'>
                  <div className='text-[#9FA0A7] text-sm mb-2'>남긴 별점 평균</div>
                  <div className='text-2xl font-bold text-[#FFD700]'>
                    ⭐ {profile.averageRating}
                  </div>
                </div>
                <div className='bg-[#21212A] rounded-xl p-4 text-center w-full md:w-[300px] h-[128px] flex flex-col justify-center'>
                  <div className='text-[#9FA0A7] text-sm mb-2'>남긴 리뷰</div>
                  <div className='text-2xl font-bold text-[#5097FA]'>📝 {profile.reviewCount}</div>
                </div>
                <div className='bg-[#21212A] rounded-xl p-4 text-center w-full md:w-[300px] h-[128px] flex flex-col justify-center'>
                  <div className='text-[#9FA0A7] text-sm mb-2'>관심 카테고리</div>
                  <div className='text-lg font-medium text-[#00D2A3]'>
                    {profile.mostFavoriteCategory ? profile.mostFavoriteCategory.name : '없음'}
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 목록 탭 */}
            <div className='mb-6'>
              <nav className='flex space-x-8'>
                <button
                  onClick={() => handleTabChange('reviewed')}
                  className={`py-2 px-1 text-xl whitespace-nowrap ${
                    activeTab === 'reviewed'
                      ? 'font-semibold text-[#F1F1F5]'
                      : 'font-normal text-[#6E6E82] hover:text-[#F1F1F5]'
                  }`}
                >
                  리뷰 남긴 상품
                </button>
                <button
                  onClick={() => handleTabChange('created')}
                  className={`py-2 px-1 text-xl whitespace-nowrap ${
                    activeTab === 'created'
                      ? 'font-semibold text-[#F1F1F5]'
                      : 'font-normal text-[#6E6E82] hover:text-[#F1F1F5]'
                  }`}
                >
                  등록한 상품
                </button>
                <button
                  onClick={() => handleTabChange('favorite')}
                  className={`py-2 px-1 text-xl whitespace-nowrap ${
                    activeTab === 'favorite'
                      ? 'font-semibold text-[#F1F1F5]'
                      : 'font-normal text-[#6E6E82] hover:text-[#F1F1F5]'
                  }`}
                >
                  찜한 상품
                </button>
              </nav>
            </div>

            {/* 상품 목록 내용 */}
            {activeTab === 'reviewed' ? (
              /* 무한스크롤 적용된 reviewed 탭 */
              <div>
                {/* 에러 상태 */}
                {reviewedProducts.error && (
                  <div className='text-center text-red-500 py-12'>{reviewedProducts.error}</div>
                )}

                {/* 빈 상태 */}
                {!reviewedProducts.isLoading &&
                  !reviewedProducts.error &&
                  reviewedProducts.items.length === 0 && (
                    <div className='text-center text-[#9FA0A7] py-12'>
                      리뷰를 남긴 상품이 없습니다.
                    </div>
                  )}

                {/* 상품 목록 */}
                {reviewedProducts.items.length > 0 && (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2'>
                    {reviewedProducts.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={{
                          id: product.id,
                          name: product.name,
                          image: product.image,
                          rating: product.rating,
                          reviewCount: product.reviewCount,
                          favoriteCount: product.favoriteCount,
                          categoryId: product.categoryId,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* 로딩 상태 */}
                {reviewedProducts.isLoading && (
                  <div className='flex justify-center items-center py-8'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#5097FA]'></div>
                    <span className='ml-3 text-[#9FA0A7]'>상품을 불러오는 중...</span>
                  </div>
                )}

                {/* 더 로드할 데이터가 없을 때 */}
                {!reviewedProducts.hasMore &&
                  reviewedProducts.items.length > 0 &&
                  !reviewedProducts.isLoading && (
                    <div className='text-center text-[#9FA0A7] py-8 text-sm'>
                      모든 상품을 불러왔습니다.
                    </div>
                  )}

                {/* IntersectionObserver를 위한 로딩 엘리먼트 */}
                <div ref={reviewedProducts.loadingElementRef} className='h-4'></div>
              </div>
            ) : activeTab === 'created' ? (
              /* 무한스크롤 적용된 created 탭 */
              <div>
                {/* 에러 상태 */}
                {createdProducts.error && (
                  <div className='text-center text-red-500 py-12'>{createdProducts.error}</div>
                )}

                {/* 빈 상태 */}
                {!createdProducts.isLoading &&
                  !createdProducts.error &&
                  createdProducts.items.length === 0 && (
                    <div className='text-center text-[#9FA0A7] py-12'>등록한 상품이 없습니다.</div>
                  )}

                {/* 상품 목록 */}
                {createdProducts.items.length > 0 && (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2'>
                    {createdProducts.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={{
                          id: product.id,
                          name: product.name,
                          image: product.image,
                          rating: product.rating,
                          reviewCount: product.reviewCount,
                          favoriteCount: product.favoriteCount,
                          categoryId: product.categoryId,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* 로딩 상태 */}
                {createdProducts.isLoading && (
                  <div className='flex justify-center items-center py-8'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#5097FA]'></div>
                    <span className='ml-3 text-[#9FA0A7]'>상품을 불러오는 중...</span>
                  </div>
                )}

                {/* 더 로드할 데이터가 없을 때 */}
                {!createdProducts.hasMore &&
                  createdProducts.items.length > 0 &&
                  !createdProducts.isLoading && (
                    <div className='text-center text-[#9FA0A7] py-8 text-sm'>
                      모든 상품을 불러왔습니다.
                    </div>
                  )}

                {/* IntersectionObserver를 위한 로딩 엘리먼트 */}
                <div ref={createdProducts.loadingElementRef} className='h-4'></div>
              </div>
            ) : (
              /* 무한스크롤 적용된 favorite 탭 */
              <div>
                {/* 에러 상태 */}
                {favoriteProducts.error && (
                  <div className='text-center text-red-500 py-12'>{favoriteProducts.error}</div>
                )}

                {/* 빈 상태 */}
                {!favoriteProducts.isLoading &&
                  !favoriteProducts.error &&
                  favoriteProducts.items.length === 0 && (
                    <div className='text-center text-[#9FA0A7] py-12'>찜한 상품이 없습니다.</div>
                  )}

                {/* 상품 목록 */}
                {favoriteProducts.items.length > 0 && (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2'>
                    {favoriteProducts.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={{
                          id: product.id,
                          name: product.name,
                          image: product.image,
                          rating: product.rating,
                          reviewCount: product.reviewCount,
                          favoriteCount: product.favoriteCount,
                          categoryId: product.categoryId,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* 로딩 상태 */}
                {favoriteProducts.isLoading && (
                  <div className='flex justify-center items-center py-8'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#5097FA]'></div>
                    <span className='ml-3 text-[#9FA0A7]'>상품을 불러오는 중...</span>
                  </div>
                )}

                {/* 더 로드할 데이터가 없을 때 */}
                {!favoriteProducts.hasMore &&
                  favoriteProducts.items.length > 0 &&
                  !favoriteProducts.isLoading && (
                    <div className='text-center text-[#9FA0A7] py-8 text-sm'>
                      모든 상품을 불러왔습니다.
                    </div>
                  )}

                {/* IntersectionObserver를 위한 로딩 엘리먼트 */}
                <div ref={favoriteProducts.loadingElementRef} className='h-4'></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast 알림 */}
      {toast.show && (
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#21212A] text-[#F1F1F5] px-6 py-3 rounded-lg shadow-lg border border-[#35353F] z-50 animate-fade-in'>
          {toast.message}
        </div>
      )}

      {/* 팔로우 모달 */}
      <FollowModal
        isOpen={followModal.isOpen}
        onClose={closeFollowModal}
        userId={user.id}
        nickname={profile?.nickname || ''}
        type={followModal.type}
      />

      {/* 프로필 편집 모달 */}
      {profileEditModal.renderModal(ProfileEditModal, {
        currentNickname: profile?.nickname || '',
        currentDescription: profile?.description || '',
        currentImage: profile?.image || null,
        onSave: handleSaveProfile,
      })}
    </div>
  );
};

export default MyPage;
