'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

export default function ReviewForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    console.log({ rating, reviewText });
    setIsOpen(false); // 모달 닫기
    // 성공 후 입력 필드 초기화
    setReviewText('');
    setRating(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className='w-full h-12 rounded-lg bg-gradient-to-r focus-within:from-[#5097FA] focus-within:to-[#5363FF] text-white font-semibold transition-transform hover:scale-105'
          onClick={() => setIsOpen(true)}
        >
          리뷰 작성하기
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-[#2C2C3A] border-gray-700 text-white'>
        <DialogHeader>
          <DialogTitle>리뷰 작성</DialogTitle>
          <DialogDescription>상품에 대한 솔직한 리뷰를 남겨주세요.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {/* 별점 */}
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium text-gray-300'>별점:</span>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 hover:text-yellow-300'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          {/* 리뷰 내용 */}
          <Textarea
            placeholder='이곳에 리뷰를 작성해주세요.'
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className='bg-gray-800 border-gray-600 focus:ring-blue-500'
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button type='button' variant='secondary' onClick={() => setIsOpen(false)}>
            취소
          </Button>
          <Button type='submit' onClick={handleSubmit} className='bg-blue-600 hover:bg-blue-700'>
            제출하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
