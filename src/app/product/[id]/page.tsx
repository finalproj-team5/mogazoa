'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ChangeEvent, useState } from 'react';

export default function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('dfdfd');
  const handleSubmit = () => {
    alert(`${name}을 제출하겠습니다.`);
    setIsOpen(false);
    setName('');
  };

  return (
    <>
      {name}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant='secondary'
            onClick={() => {
              setIsOpen(true);
            }}
          >
            모달열기
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>제목부분</DialogTitle>
            <DialogDescription>
              <input
                id='inputField'
                type='text'
                placeholder='여기입력'
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button className='flex justify-end space-x-2' onClick={handleSubmit}>
              제출
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
