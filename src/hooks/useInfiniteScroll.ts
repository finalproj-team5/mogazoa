'use client';

import { useState, useRef } from 'react';

interface UseInfiniteScrollOptions<T> {
  fetchFunction: (cursor: number | null) => Promise<{ list: T[]; nextCursor: number | null }>;
}

interface UseInfiniteScrollReturn<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  reset: () => Promise<void>;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

const useInfiniteScroll = <T>({
  fetchFunction,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [_hasInitialized, setHasInitialized] = useState(false);

  const isLoadingRef = useRef(false);

  const loadMore = async () => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchFunction(nextCursor);

      if (nextCursor === null) {
        // 첫 로드
        setItems(data.list);
      } else {
        // 추가 로드
        setItems((prev) => [...prev, ...data.list]);
      }

      setNextCursor(data.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  };

  const reset = async () => {
    setItems([]);
    setNextCursor(null);
    setError(null);
    setHasInitialized(false);
    isLoadingRef.current = false;

    // 첫 번째 페이지 로드
    await loadMore();
    setHasInitialized(true);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    // 스크롤이 하단에 가까워졌을 때 (50px 여유)
    if (
      scrollHeight - scrollTop <= clientHeight + 50 &&
      nextCursor !== null &&
      !isLoadingRef.current
    ) {
      loadMore();
    }
  };

  return {
    items,
    isLoading,
    error,
    hasMore: nextCursor !== null,
    loadMore,
    reset,
    handleScroll,
  };
};

export default useInfiniteScroll;
