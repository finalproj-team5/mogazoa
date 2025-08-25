'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

type CommonDialogProps<T> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data?: T; // 부모에서 전달된 초기 데이터
  onSelect?: (value: T) => void; // 확인 버튼 시 부모로 전달
};

export function CommonDialog<T extends { id: number; name: string }>({
  open,
  onOpenChange,
  title,
  data,
  onSelect,
}: CommonDialogProps<T>) {
  const [localData, setLocalData] = useState<T | undefined>(data);

  // 모달 열릴 때마다 부모 데이터로 초기화
  useEffect(() => {
    if (open) setLocalData(data);
  }, [open, data]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className='flex justify-end gap-2 pt-4'>
          <Button
            variant='outline'
            onClick={() => {
              onOpenChange(false); // 취소 → 부모 데이터 변경 없음
            }}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              if (localData && onSelect) onSelect(localData); // 선택 반영
              onOpenChange(false);
            }}
          >
            선택하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
