'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/api/categories/getCategories';
import { Category } from '@/types/Category';
import { Product } from '@/types/ProductList';
import { getProductList } from '@/api/categories/getProductList';
import { useQuery } from '@tanstack/react-query';
import { usePostImageUpload } from '@/lib/UploadImage';
import Dialog from './common/Dialog';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNickName: string;
}

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedCategory, SetSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  // const [imageUrl, setImageUrl] = useState<string | null>('');

  const { mutate } = usePostImageUpload();

  const { data: searchData } = useQuery({
    queryKey: ['searchProducts', query],
    queryFn: () => getProductList({ keyword: query }),
    enabled: query.length > 1,
  });

  const searchResult: Product[] = searchData?.list ?? [];

  // 업로드 함수
  const handleUpload = () => {
    if (!file) return;
    mutate({ imageFile: file });
  };

  //제출함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      alert('상품을 선택해주세요');
      return;
    }
    if (!selectedCategory) {
      alert('카테고리를 선택해주세요');
      return;
    }
    if (!description) {
      alert('상품설명을 입력해주세요');
    }

    // const payload = {
    //   categoryId: selectedCategory,
    //   image: 1,
    //   description: description,
    //   name: query,
    // };
  };

  //카테고리 호출
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(`카테고리 불러오기 실패`, error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className=''>
      <form onSubmit={handleSubmit}>
        <div className='bg-[#1C1C22] w-full rounded-2xl p-10 flex flex-col gap-5 text-gray-100 lg:max-w-[620px]'>
          {/* 헤더 */}
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>상품 추가</h2>
            <button className=' text-gray-400 hover:text-gray-200'>X</button>
          </div>

          {/* 상품명 입력 */}
          <div className='flex items-center gap-4'>
            <div className='flex flex-col gap-[20px] relative'>
              <div className='relative'>
                <input
                  type='text'
                  value={query}
                  placeholder='상품명 (상품 등록 여부를 확인해 주세요)'
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsDropDownOpen(true);
                  }}
                  className='flex-1 px-4 py-3 bg-[#252530] rounded-lg border border-[#353542] text-gray-100 focus:outline-none'
                />

                {/* 경고 메시지 */}
                {searchResult.some((p) => p.name === query) && (
                  <div className='mt-2 text-sm text-red-400'>이미 등록된 상품입니다.</div>
                )}

                {/* 자동완성 부분 */}
                {searchResult.length > 0 && isDropDownOpen && (
                  <ul className='absolute top-full left-0 mt-2 w-full bg-[#252530] border border-[#353542] rounded-lg max-h-60 overflow-y-auto z-50'>
                    {searchResult.map((product) => {
                      return (
                        <li
                          key={product.id}
                          className={`px-4 py-2 text-sm font-regular cursor-pointer`}
                        >
                          {product.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* 카테고리 선택 */}
              <div className='px-4 py-3 bg-[#252530] rounded-lg border border-zinc-700'>
                <select
                  className='w-full bg-transparent text-gray-100 focus:outline-none'
                  value={selectedCategory}
                  onChange={(e) => SetSelectedCategory(e.target.value)}
                >
                  <option value='' disabled>
                    카테고리 선택
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 사진 */}
            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (!selectedFile) return;
                setFile(selectedFile);
                mutate({ imageFile: selectedFile });
              }}
            />
            <button onClick={handleUpload}></button>
          </div>

          {/* 상품 설명 */}
          <div className='flex flex-col gap-2'>
            <textarea
              name='description'
              placeholder='상품 설명을 입력하세요'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className='w-full px-4 py-3 rounded-lg border border-zinc-700 bg-[#252530] text-gray-100 resize-none'
            />
            <div className='text-right text-sm text-gray-500'>0/500</div>
          </div>

          {/* 추가하기 버튼 */}
          <button
            type='submit'
            className='w-full py-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg text-lg font-semibold'
          >
            추가하기
          </button>
        </div>
      </form>
    </Dialog>
  );
};
export default AddProductModal;
