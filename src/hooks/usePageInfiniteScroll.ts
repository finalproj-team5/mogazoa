'use client';

import { useState, useRef, useEffect } from 'react';

interface UsePageInfiniteScrollOptions<T> {
  fetchFunction: (cursor: number | null) => Promise<{ list: T[]; nextCursor: number | null }>;
}

interface UsePageInfiniteScrollReturn<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  reset: () => Promise<void>;
  loadingElementRef: React.MutableRefObject<HTMLDivElement | null>;
}

const usePageInfiniteScroll = <T>({
  fetchFunction,
}: UsePageInfiniteScrollOptions<T>): UsePageInfiniteScrollReturn<T> => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const isLoadingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingElementRef = useRef<HTMLDivElement | null>(null);

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

  // IntersectionObserver 설정
  useEffect(() => {
    if (!hasInitialized) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && nextCursor !== null && !isLoadingRef.current) {
          loadMore();
        }
      },
      {
        rootMargin: '100px', // 100px 전에 미리 로드
      },
    );

    if (loadingElementRef.current) {
      observerRef.current.observe(loadingElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasInitialized, nextCursor]);

  return {
    items,
    isLoading,
    error,
    hasMore: nextCursor !== null,
    loadMore,
    reset,
    loadingElementRef,
  };
};

export default usePageInfiniteScroll;
