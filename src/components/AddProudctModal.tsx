'use client';

import { useEffect, useState } from 'react';
import Dialog from './common/Dialog';
import { getCategories } from '@/api/categories/getCategories';
import { Category } from '@/types/Category';
import { Product } from '@/types/ProductList';
import { getProductList } from '@/api/categories/getProductList';
import { useQuery } from '@tanstack/react-query';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNickName: string;
}

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { data: searchData } = useQuery({
    queryKey: ['searchProducts', query],
    queryFn: () => getProductList({ keyword: query }),
    enabled: query.length > 1,
  });

  const searchResult: Product[] = searchData?.list ?? [];

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

              {searchResult.length > 0 && isDropDownOpen && (
                <ul className='absolute top-full left-0 mt-2 w-full bg-[#252530] border border-[#353542] rounded-lg max-h-60 overflow-y-auto z-50'>
                  {searchResult.map((product) => {
                    const isSelected = selectedProduct?.id === product.id;
                    return (
                      <li
                        key={product.id}
                        className={`px-4 py-2 text-sm font-regular cursor-pointer 
                        ${
                          isSelected
                            ? 'bg-[#353542] text-[#F1F1F5] ' // 선택됨
                            : 'bg-[252530] hover:bg-[#2a2a35] hover:text-[#F1F1F5]' // 기본/hover
                        }`}
                        onClick={() => {
                          setQuery(product.name);
                          setSelectedProduct(product);
                          setIsDropDownOpen(false);
                        }}
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
                defaultValue=''
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
          <button className=' bg-[#252530] rounded-lg border border-zinc-700 text-gray-400'>
            🔍
          </button>
        </div>

        {/* 상품 설명 */}
        <div className='flex flex-col gap-2'>
          <textarea
            placeholder='상품 설명을 입력하세요'
            className='w-full px-4 py-3 rounded-lg border border-zinc-700 bg-[#252530] text-gray-100'
          />
          <div className='text-right text-sm text-gray-500'>0/500</div>
        </div>

        {/* 추가하기 버튼 */}
        <button className='w-full py-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg text-lg font-semibold'>
          추가하기
        </button>
      </div>
    </Dialog>
  );
};
export default AddProductModal;
