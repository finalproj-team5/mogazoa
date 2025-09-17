'use client';

import { useState, useEffect } from 'react';
import { getCategories } from '@/api/categories/getCategories';
import { Category } from '@/types/Category';
import { usePostImageUpload } from '@/lib/UploadImage';
import { useEditProduct } from '@/lib/editProduct';
import Dialog from '@/components/common/Dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // 편집 성공 시 호출할 콜백
  product: {
    id?: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
  };
}

const ProductEditModal = ({ isOpen, onClose, onSuccess, product }: ProductEditModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productName, setProductName] = useState(product.name);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState(product.description);
  const [imageUrl, setImageUrl] = useState<string>(product.imageUrl);

  const { mutate: uploadImage, isPending: isUploading } = usePostImageUpload();
  const { mutate: editProduct, isPending: isEditing } = useEditProduct();

  // 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName.trim()) {
      alert('상품명을 입력해주세요');
      return;
    }
    if (!selectedCategory) {
      alert('카테고리를 선택해주세요');
      return;
    }
    if (!description.trim()) {
      alert('상품 설명을 입력해주세요');
      return;
    }
    if (!imageUrl) {
      alert('이미지를 업로드해주세요');
      return;
    }
    if (!product.id) {
      alert('상품 ID가 없습니다');
      return;
    }

    const payload = {
      categoryId: Number(selectedCategory),
      image: imageUrl,
      description: description,
      name: productName,
    };

    editProduct(
      { productId: product.id, payload },
      {
        onSuccess: () => {
          alert('상품이 성공적으로 수정되었습니다.');
          onClose();
          if (onSuccess) {
            onSuccess(); // 부모 컴포넌트에서 데이터 새로고침
          }
        },
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  };

  // 카테고리 목록 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);

        // 기존 카테고리 찾아서 설정 (임시로 첫 번째 카테고리 선택)
        if (data.length > 0) {
          setSelectedCategory(data[0].id.toString());
        }
      } catch (error) {
        console.error('카테고리 불러오기 실패:', error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // 모달이 열릴 때 상품 정보로 초기화
  useEffect(() => {
    if (isOpen) {
      setProductName(product.name);
      setDescription(product.description);
      setImageUrl(product.imageUrl);
    }
  }, [isOpen, product]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className=''>
      <form onSubmit={handleSubmit}>
        <div className='bg-[#1C1C22] w-full rounded-2xl p-8 flex flex-col gap-6 text-gray-100 lg:max-w-[620px]'>
          {/* 헤더 */}
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>상품 편집</h2>
            <button
              type='button'
              onClick={onClose}
              className='text-gray-400 hover:text-gray-200 text-2xl leading-none'
            >
              ×
            </button>
          </div>

          {/* 상품명 입력 */}
          <div className='flex items-start gap-6'>
            <div className='flex flex-col gap-5 flex-1'>
              <div>
                <label htmlFor='productName' className='block text-sm font-medium mb-2'>
                  상품명
                </label>
                <input
                  id='productName'
                  type='text'
                  value={productName}
                  placeholder='상품명을 입력하세요'
                  onChange={(e) => setProductName(e.target.value)}
                  className='w-full px-4 py-3 bg-[#252530] rounded-lg border border-[#353542] text-gray-100 focus:outline-none focus:border-blue-500'
                />
              </div>

              {/* 카테고리 선택 */}
              <div>
                <label htmlFor='category' className='block text-sm font-medium mb-2'>
                  카테고리
                </label>
                <div className='px-4 py-3 bg-[#252530] rounded-lg border border-[#353542] focus-within:border-blue-500'>
                  <select
                    id='category'
                    className='w-full bg-transparent text-gray-100 focus:outline-none'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className='bg-[#252530]'>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 이미지 업로드 */}
            <div className='flex flex-col items-center gap-2'>
              <label htmlFor='image-upload' className='block text-sm font-medium mb-2'>
                상품 이미지
              </label>
              <label
                htmlFor='image-upload'
                className='cursor-pointer w-32 h-32 bg-[#252530] border-2 border-dashed border-[#353542] rounded-lg flex
                items-center justify-center text-gray-400 hover:bg-[#353542] hover:border-gray-400 transition-colors relative overflow-hidden'
              >
                {isUploading ? (
                  <span className='text-xs'>업로드중...</span>
                ) : imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt='상품 이미지'
                    fill
                    sizes='128px'
                    className='object-cover'
                  />
                ) : (
                  <span className='text-xs text-center'>
                    + 이미지
                    <br />
                    변경
                  </span>
                )}
              </label>
              <input
                id='image-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    uploadImage(selectedFile, {
                      onSuccess: (data) => {
                        setImageUrl(data.url);
                      },
                      onError: (error) => {
                        alert('이미지 업로드 실패');
                        console.error(error);
                      },
                    });
                  }
                }}
              />
            </div>
          </div>

          {/* 상품 설명 */}
          <div>
            <label htmlFor='description' className='block text-sm font-medium mb-2'>
              상품 설명
            </label>
            <textarea
              id='description'
              placeholder='상품 설명을 입력하세요'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={4}
              className='w-full px-4 py-3 rounded-lg border border-[#353542] bg-[#252530] text-gray-100 resize-none focus:outline-none focus:border-blue-500'
            />
            <div className='text-right text-sm text-gray-500 mt-1'>{description.length}/500</div>
          </div>

          {/* 버튼들 */}
          <div className='flex gap-3 pt-2'>
            <Button type='button' variant='tertiary' size='sm' onClick={onClose} className='flex-1'>
              취소
            </Button>
            <Button
              type='submit'
              variant='primary'
              size='sm'
              disabled={isUploading || isEditing}
              className='flex-1'
            >
              {isUploading ? '업로드 중...' : isEditing ? '수정 중...' : '수정하기'}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default ProductEditModal;
