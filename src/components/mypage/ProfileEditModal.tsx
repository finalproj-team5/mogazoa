'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import Dialog from '@/components/common/Dialog';
import Image from 'next/image';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
  currentDescription: string;
  currentImage: string | null;
  onSave: (data: { nickname: string; description: string; image: File | null }) => Promise<void>;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  currentNickname,
  currentDescription,
  currentImage,
  onSave,
}) => {
  const [nickname, setNickname] = useState(currentNickname);
  const [description, setDescription] = useState(currentDescription);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (nickname.trim().length === 0) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (nickname.length > 10) {
      alert('닉네임은 10자 이하로 입력해주세요.');
      return;
    }

    if (description.length > 500) {
      alert('자기소개는 500자 이하로 입력해주세요.');
      return;
    }

    try {
      setIsSaving(true);
      await onSave({
        nickname: nickname.trim(),
        description: description.trim(),
        image: imageFile,
      });
      onClose();
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      alert('프로필 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // 초기 상태로 복원
    setNickname(currentNickname);
    setDescription(currentDescription);
    setPreviewImage(currentImage);
    setImageFile(null);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleCancel} className=''>
      <div className='w-[calc(100vw-40px)] md:w-[672px] bg-[#21212A] rounded-xl p-8 text-[#F1F1F5] relative'>
        {/* 상단 헤더 - 제목 좌측 정렬, X버튼 우측 */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>프로필 편집</h2>
          <button
            onClick={handleCancel}
            className='w-6 h-6 flex items-center justify-center text-[#9FA0A7] hover:text-[#F1F1F5] transition-colors'
          >
            <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* 프로필 이미지 - 좌측 정렬 */}
        <div className='flex justify-start mb-6'>
          <div
            className='w-24 h-24 rounded-lg overflow-hidden bg-[#35353F] cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center'
            onClick={handleImageClick}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt='프로필 미리보기'
                width={96}
                height={96}
                className='w-full h-full object-cover'
              />
            ) : (
              <svg
                className='w-8 h-8 text-[#6E6E82]'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            )}
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
          />
        </div>

        {/* 닉네임 입력 */}
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>
            닉네임 <span className='text-[#9FA0A7]'>({nickname.length}/10)</span>
          </label>
          <input
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={10}
            className='w-full px-4 py-3 bg-[#35353F] border border-[#43434F] rounded-lg focus:outline-none focus:border-[#5097FA] text-[#F1F1F5]'
            placeholder='닉네임을 입력해 주세요'
          />
        </div>

        {/* 자기소개 입력 */}
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-2'>
            자기소개 <span className='text-[#9FA0A7]'>({description.length}/500)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={4}
            className='w-full px-4 py-3 bg-[#35353F] border border-[#43434F] rounded-lg focus:outline-none focus:border-[#5097FA] text-[#F1F1F5] resize-none'
            placeholder='자기소개를 적어주세요'
          />
        </div>

        {/* 저장하기 버튼 */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className='w-full py-3 px-4 bg-[#5097FA] hover:bg-[#4285E8] text-white rounded-lg font-medium transition-colors disabled:opacity-50'
        >
          {isSaving ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </Dialog>
  );
};

export default ProfileEditModal;
