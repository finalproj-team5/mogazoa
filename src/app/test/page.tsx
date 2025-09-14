'use client';

import useModal from '@/hooks/useModal';
import { useState } from 'react';
import AddProductModal from '@/components/AddProudctModal';

const Page = () => {
  const addProductModal = useModal();
  const [name, setName] = useState('진');

  const handleAddProduct = () => {
    setName('상'); // 모달 열기 전에 값 세팅
    addProductModal.openModal();
  };

  return (
    <div className='text-white'>
      <button onClick={handleAddProduct}>상품추가</button>
      {addProductModal.renderModal(AddProductModal, { currentNickName: name })}
    </div>
  );
};

export default Page;
